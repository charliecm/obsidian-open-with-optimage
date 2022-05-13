# Obsidian Optimage Kit

An [Obsidian](https://obsidian.md) plugin that adds shortcuts to optimize images using [Optimage](https://optimage.app) (required to run):
- “Open with Optimage” right-click menu item for files
- “Optimize and rename image(s) under cursor” command

This plugin doesn't support mobile.

## How to Install

From inside Obsidian…
1. Go to Settings → **Community plugins**.
2. Disable **Safe mode**.
3. Click **Browse**, search for **Optimage Kit**, and click **Install**.
4. Click the toggle button to enable the plugin.

For manual installation, download this repo and copy over `main.js` and `manifest.json` to your vault: `VaultFolder/.obsidian/plugins/optimage-kit/`.

## Development

1. Clone this repo.
2. `yarn` to install dependencies.
3. `yarn dev` to start compilation in watch mode.
4. `bash install-built.sh /path/to/your/vault -d` to create symbolic links of built files to your vault for quick development.

## Release

1. Run `yarn build`.
2. Bump version in `manifest.json` and `versions.json`.
3. Add changes in `CHANGELOG.md`.
4. Add a new release in Github with the changelog texts and the built `main.js` and `manifest.json` attached.

## Support

If you really like this plugin and want to support its development, please consider [buying me a coffee](https://www.buymeacoffee.com/charliecm) 🙂 Thanks!

<a href="https://www.buymeacoffee.com/charliecm" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60" /></a>
