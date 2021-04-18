import { Plugin, Menu, TAbstractFile, FileSystemAdapter, TFile } from 'obsidian';
import open from 'open';

export default class OpenWithOptimage extends Plugin {
	async onload() {
		this.app.workspace.on('file-menu', this.addMenuItem);
	}

	addMenuItem(menu: Menu, file: TAbstractFile) {
		if (file instanceof TFile && !['av1', 'gif', 'heic', 'jpg', 'jpeg', 'mp4', 'png', 'webm', 'webp'].contains(file.extension)) {
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