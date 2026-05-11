=== AI Prompt ===
Contributors:      fka
Tags:              gutenberg, block, ai, prompt, llm
Tested up to:      6.8
Requires at least: 6.7
Requires PHP:      7.4
Stable tag:        0.3.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A Gutenberg block for showing AI prompts the way they're meant to be seen. No iframe. No third-party service.

== Description ==

If you write tutorials, documentation, or blog posts about AI, you eventually need to show a prompt. Today, the options are bad — code blocks make prompts look like executable code, blockquotes lose the framing, screenshots go stale, and iframes pull in third-party origins that can't match your theme.

**AI Prompt** is a first-class WordPress block for prompts. It renders a faithful "composer card" — the kind of UI your readers already recognize from their AI assistant — with the model, mode, context chips, and indicators visible at a glance.

= Why use it =

* **First-class semantic for prompts.** Not a code block, not a quote — a prompt.
* **No iframe.** Real HTML in `post_content`. Crawlable by search engines, survives in RSS, AMP and email.
* **Theme-aware.** Light, dark, or auto-follow-OS. Configurable accent colors for each mode.
* **Tiny runtime JavaScript.** Only used for the always-visible Copy button. Rendering and the Run dropdown are HTML + CSS.

= Use cases =

* **Tutorial blog posts.** Show the exact prompt with model + mode visible.
* **Documentation.** Demonstrate example prompts for your SaaS or course.
* **Prompt-engineering write-ups.** Compare prompt variants side-by-side with model badges.
* **AI tool walkthroughs.** Cursor, Claude Code, ChatGPT, Codex tutorials with parsed file tree, diff, MCP tools, and a Run dropdown as part of the story.
* **Case studies.** "We shipped this with one prompt" — show the real workflow.
* **Release notes.** Demonstrate AI features with real prompts instead of screenshots.

= Features =

* Model badge with up-to-date presets or any custom model name
* Mode badge: Chat / Code / Ask / Plan
* Indicator chips: Thinking, Reasoning, Planning, Fast, Max
* Context chips, auto-classified by prefix: `@mentions`, `#image`, file paths, `https://` URLs
* Optional parsed file tree sidebar, built from slash-separated paths
* Optional diff view with a pulsing Accept / Reject button
* Optional MCP tools row (server : tool styled)
* Optional single Run button with static links for relevant tools like ChatGPT, Claude, Cursor, GitHub Copilot, v0, Bolt, Perplexity, and Manus
* Configurable run targets using `Label | URL` lines and a `{prompt}` variable
* Always-visible Copy button that copies the prompt text to the clipboard
* Optional page-font inheritance for matching the surrounding theme
* Auto / Light / Dark theme with independent accent colors per mode
* `align: wide/full` and spacing supports

= Block name =

`fka/ai-prompt`

== Installation ==

= From a release zip =

1. Download the latest release zip from https://github.com/f/ai-prompt/releases
2. In your WordPress admin, go to **Plugins → Add New → Upload Plugin**.
3. Upload `ai-prompt.zip` and activate.
4. In any post or page, open the inserter and search for **AI Prompt**.

= Auto-updates from GitHub =

The plugin headers are compatible with the [Git Updater](https://git-updater.com/) plugin. Install Git Updater once, and your sites will pick up each tagged release automatically.

== Frequently Asked Questions ==

= Does this block make any network requests? =

No API requests are made automatically. If the Run dropdown is enabled, it contains plain links that readers can click to open the prompt in external tools.

= Will search engines see the prompt text? =

Yes. The prompt is stored as real HTML in `post_content`. Crawlers see it, RSS readers see it, screen readers see it.

= Can I theme it to match my site? =

Yes. Set Light and Dark accent colors independently in the Appearance panel. The block also respects your site's font and inherits margins via the standard block spacing supports.

= How much JavaScript does it ship on the frontend? =

A tiny frontend script is loaded only to power the Copy button. The rendered card, file tree, and Run dropdown are native HTML + CSS.

= Can I use a custom model name? =

Yes. The Model field accepts free text. The dropdown is a convenience for common models.

== Screenshots ==

1. A fully-featured AI Prompt block: Claude 4.5 Sonnet in Code mode with Thinking, Reasoning, and Fast indicators, a parsed file tree, a unified diff with an Accept button, MCP tools, and a Run dropdown.
2. A minimal AI Prompt block: GPT-5 in Ask mode with a single Thinking indicator, a web mention, and a URL context chip.

== Changelog ==

= 0.3.0 =
* Added page-font inheritance option for matching the surrounding theme.
* Added a reusable "How to vibecode a Gutenberg block" example post source.
* Included examples in the release zip.

= 0.2.0 =
* Added an always-visible Copy button for copying prompt text to the clipboard.
* Added an optional Run dropdown with configurable `Label | URL` targets and `{prompt}` interpolation.
* Added collapsible/expandable file tree folders and clickable file rows.
* Updated model presets and added custom model name support.
* Improved file tree rendering with folder/file icons and slash-separated path parsing.

= 0.1.0 =
* Initial release.
