import dayjs from 'dayjs';
import { FileSystemAdapter, MarkdownView, Menu, Notice, Plugin, TAbstractFile, TFile } from 'obsidian';
import open from 'open';

const { exec } = require('child_process');
const optimageCmd = '/Applications/Optimage.app/Contents/MacOS/cli/optimage --lossy --srgb -f'
const supportedExt = ['av1', 'gif', 'heic', 'jpg', 'jpeg', 'mp4', 'png', 'webm', 'webp'];
const imageExt = ['jpg', 'jpeg', 'png'];

export default class OptimageKit extends Plugin {
	async onload() {
		this.app.workspace.on('file-menu', this.addMenuItem);
		this.addCommand({
			id: 'optimage-optimize-rename',
			name: 'Optimize and rename image(s) under cursor',
			checkCallback: (checking: boolean) => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (checking) return !!view;
				if (!view) return false;

				// Get links under cursor
				const editor = view.editor;
				const from = editor.getCursor('from');
				const to = editor.getCursor('to');
				let ch = -1;
				let selection = editor.getRange(from, to);
				if (!selection.length) {
					// Get line at cursor if selection isn't a range
					const position = editor.getCursor('from');
					ch = position.ch;
					selection = editor.getLine(position.line);
					if (!selection.length) return;
				}
				const matches = selection.matchAll(/\[\[(.*?)\]\]/gm);
				let links = new Set<string>();
				for (const match of matches) {
					const start = match.index;
					const end = start + match[0].length;
					if (ch === -1 || ch >= start && ch <= end) {
						// Add link if in selection or under cursor
						links.add(match[1])
					}
				}

				if (!links.size) {
					new Notice('No link(s) found under cursor.', 3000);
					return;
				}

				// Rename and optimize each link
				const notePath = view.file.path;
				const adapter = app.vault.adapter as FileSystemAdapter
				const nowDate = dayjs().format('YYYYMMDD_HHmmss');
				let count = 0
				for (const link of links) {
					const file = app.metadataCache.getFirstLinkpathDest(link, notePath);
					if (file === null) continue;
					if (!supportedExt.contains(file.extension)) continue;
					const path = file.path;
					const fullPath = adapter.getFullPath(file.path);
					const suffix = (count > 0) ? `_${count}` : '';
					const newName = nowDate + suffix;
					const newExt = imageExt.contains(file.extension) ? 'jpg' : file.extension;
					const subpath = file.path.substr(0, file.path.length - file.name.length);
					const fullSubpath = fullPath.substr(0, fullPath.length - file.name.length);
					const newPath = `${subpath}${newName}.${newExt}`;
					const newFullPath = `${fullSubpath}${newName}.${newExt}`;
					count++;
					console.log('Optimizing image…', path, newPath);
					new Notice(`Optimizing ${path}…`);
					app.fileManager.renameFile(file, newPath).then(() => {
						// Make a copy first
						adapter.copy(newPath, path).then(() => {
							if (path.endsWith('png')) {
								// Optimize from original PNG to new JPG image
								exec(`${optimageCmd} -o "${newFullPath}" "${fullPath}"`, (error: any, stdout: any, stderr: any) => {
									const err = error?.message || stderr;
									if (err) {
											console.error(`Optimage: ${newPath} ${err}`);
											new Notice(`Failed to optimized PNG "${newPath}".`);
											return;
									}
									adapter.trashSystem(path);
									console.log(`Optimage: ${newPath} ${stdout}`);
									new Notice(`Successfully optimized "${newPath}".`);
								});
								return;
							}
							// Trash original file and optimize new file in place
							adapter.trashSystem(path);
							exec(`${optimageCmd} "${fullPath}"`, (error: any, stdout: any, stderr: any) => {
								const err = error?.message || stderr;
								if (err) {
										console.error(`Optimage: ${newPath} ${err}`);
										new Notice(`Failed to optimized "${newPath}".`);
										return;
								}
								adapter.trashSystem(path);
								console.log(`Optimage: ${newPath} ${stdout}`);
								new Notice(`Successfully optimized "${newPath}".`);
							});
						});
					});
				}
			}
		});
	}

	addMenuItem(menu: Menu, file: TAbstractFile) {
		if (file instanceof TFile && !supportedExt.contains(file.extension)) {
			// Omit files that Optimage don't support
			return;
		}
		const adapter = file.vault.adapter
		if (!(adapter instanceof FileSystemAdapter)) return;
		const path = adapter.getFullPath(file.path);
		menu.addItem((item) => {
			item.setTitle('Open with Optimage');
			item.setIcon('popup-open');
			item.onClick(() => {
				open(path, { app: { name: 'optimage' } });
			});
		});
	}

	onunload() {
		this.app.workspace.off('file-menu', this.addMenuItem);
	}
}