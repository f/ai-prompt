=== AI Prompt ===
Contributors:      fka
Tags:              gutenberg, block, ai, prompt, llm
Tested up to:      6.8
Requires at least: 6.7
Requires PHP:      7.4
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A Gutenberg block that renders beautiful, interactive AI prompts inline. No iframe required.

== Description ==

AI Prompt is a Gutenberg block for embedding AI prompts directly in your WordPress posts and pages. Unlike iframe-based solutions, the prompt UI is rendered natively in your page, respects your theme, supports light/dark mode, and ships zero external dependencies at runtime.

Features:

* Block name: `fka/ai-prompt`
* Prompt text + comma-separated context (`@mentions`, `#image`, file paths, `https://` URLs)
* Model and mode selection (Chat / Code / Ask / Plan)
* Indicator flags: Thinking, Reasoning, Planning, Fast, Max
* Optional file tree sidebar
* Optional diff view with Accept / Reject flash
* Optional MCP tools list
* Auto / Light / Dark theme with configurable accent colors per mode
* `align: wide/full` and spacing supports
* No iframe, no external requests

== Installation ==

1. Download the latest release zip from https://github.com/f/ai-prompt/releases
2. In your WordPress admin, go to Plugins → Add New → Upload Plugin.
3. Upload `ai-prompt.zip` and activate.
4. Add the "AI Prompt" block from the inserter.

For automatic updates from GitHub, install the "Git Updater" plugin.

== Frequently Asked Questions ==

= Does this make any network requests? =

No. The block is fully rendered from the saved attributes; no external API is called.

= Is this affiliated with prompts.chat? =

The visual design is inspired by prompts.chat's embed designer. This plugin is an independent implementation.

= Can I use custom colors? =

Yes. Open the block, then in the right sidebar under Appearance set the Light and Dark accent colors independently. They are applied via CSS custom properties.

== Changelog ==

= 0.1.0 =
* Initial release.
