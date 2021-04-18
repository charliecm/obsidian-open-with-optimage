# Obsidian Open with Optimage

An [Obsidian](https://obsidian.md) plugin that adds a right-click menu item for any supported files inside your vault so you can easily open them with [Optimage](https://optimage.app) for compression.

## How to Install

From inside Obsidian…
1. Go to Settings → **Community plugins**.
2. Disable **Safe mode**.
3. Click **Browse**, search for **Open with Optimage**, and click **Install**.
4. Click the toggle button to enable the plugin.

For manual installation, download this repo and copy over `main.js`, `styles.css`, and `manifest.json` to your vault: `VaultFolder/.obsidian/plugins/open-with-optimage/`.

## Development

1. Clone this repo.
2. `npm i` or `yarn` to install dependencies.
3. `npm run dev` to start compilation in watch mode.
4. `bash install-built.sh /path/to/your/vault -d` to create symbolic links of built files to your vault for quick development.

## Support

If you really like this plugin and want to support its development, please consider [buying me a coffee](https://www.buymeacoffee.com/charliecm) 🙂 Thanks!

<a href="https://www.buymeacoffee.com/charliecm" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60" /></a>
