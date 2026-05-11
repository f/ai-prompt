# AI Prompt

A Gutenberg block that renders beautiful, interactive AI prompts inline. No iframe required.

[![Release](https://img.shields.io/github/v/release/f/ai-prompt?display_name=tag&sort=semver)](https://github.com/f/ai-prompt/releases)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL_v2%2B-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)
[![CI](https://github.com/f/ai-prompt/actions/workflows/ci.yml/badge.svg)](https://github.com/f/ai-prompt/actions/workflows/ci.yml)

Inspired by [prompts.chat](https://prompts.chat). Unlike iframe-based embeds, this block renders the prompt UI natively in your post — themed by the visitor's OS preference, zero external requests, and serializable as static HTML.

## Features

- Native Gutenberg block (`fka/ai-prompt`) — no iframe, no JavaScript runtime on the frontend.
- Prompt text + comma-separated context: `@mentions`, `#image`, file paths, `https://` URLs.
- Model and mode selection (Chat / Code / Ask / Plan).
- Indicator flags: Thinking, Reasoning, Planning, Fast, Max.
- Optional file tree sidebar.
- Optional diff view with flashing Accept / Reject button.
- Optional MCP tools list.
- Auto / Light / Dark theme with configurable accent colors per mode.
- `align: wide/full` and spacing supports.

## Installation

### From a release zip (recommended)

1. Download the latest `ai-prompt.zip` from the [Releases page](https://github.com/f/ai-prompt/releases).
2. In your WordPress admin: **Plugins → Add New → Upload Plugin**.
3. Upload the zip and activate.

### From source

```bash
git clone https://github.com/f/ai-prompt.git wp-content/plugins/ai-prompt
cd wp-content/plugins/ai-prompt
npm ci
npm run build
```

Then activate "AI Prompt" in WordPress admin.

### Auto-updates from GitHub

This plugin's headers are compatible with the [Git Updater](https://git-updater.com/) plugin. Install Git Updater and your site will receive updates whenever a new release is tagged here.

## Usage

In the block editor, type `/ai prompt` (or open the inserter and search for it). Configure the block in the right sidebar across six panels:

| Panel | What it controls |
|---|---|
| Prompt | The prompt text and a comma-separated list of context items. |
| AI Settings | Model, mode, and indicator flags. |
| File Tree | Toggleable file tree sidebar (one path per line, indent with spaces). |
| Diff View | Filename, old/new code, and a pulsing Accept/Reject button. |
| MCP Tools | A list of MCP tools in `server:tool` format, one per line. |
| Appearance | Theme mode (auto/light/dark) and accent colors. |

## Block name

The block registers as `fka/ai-prompt`. In `post_content` it serializes as:

```html
<!-- wp:fka/ai-prompt {"prompt":"...","mode":"chat","themeMode":"auto"} -->
<div class="wp-block-fka-ai-prompt ai-prompt-wrapper">
  ...
</div>
<!-- /wp:fka/ai-prompt -->
```

## Development

```bash
npm ci
npm run start         # watch + rebuild on save
npm run build         # one-shot production build
npm run plugin-zip    # build a release-ready zip in the repo root
npm run lint:js       # lint JS with @wordpress/scripts presets
npm run lint:css      # lint SCSS
npm run format        # format JS/SCSS
```

Testing locally with WordPress Playground:

```bash
npx @wp-playground/cli server \
  --mount=$(pwd):/wordpress/wp-content/plugins/ai-prompt \
  --login=true
```

## Releasing

Releases are automated. On any pushed tag matching `v*` (for example `v0.2.0`), the [release workflow](.github/workflows/release.yml) will:

1. `npm ci`
2. `npm run build`
3. `npm run plugin-zip` to produce `ai-prompt.zip`
4. Create a GitHub Release and attach the zip

To cut a release:

```bash
# bump version in package.json, ai-prompt.php, readme.txt, block.json
git commit -am "Release v0.2.0"
git tag v0.2.0
git push origin main --tags
```

## License

[GPL-2.0-or-later](LICENSE). See [LICENSE](LICENSE) for the full text.
