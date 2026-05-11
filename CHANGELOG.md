# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-05-12

### Added
- Page-font inheritance option to better match surrounding theme typography.
- Reusable example post: "How to vibecode a Gutenberg block".
- Example source files in the release zip.

## [0.2.0] - 2026-05-12

### Added
- Always-visible Copy button that copies prompt text to the clipboard.
- Optional Run dropdown with mode-aware defaults.
- Configurable Run targets using `Label | URL` lines and `{prompt}` interpolation.
- Custom model name support.
- Collapsible/expandable folders in the file tree.
- Clickable/selectable file rows.

### Changed
- Updated model presets to newer GPT, Claude, Gemini, Grok, DeepSeek, Kimi, Qwen, and Llama names.
- Reworked file tree rendering to parse slash-separated paths into nested folders/files with icons.
- Allowed the Run dropdown to escape the block bounds instead of being clipped.
- Updated docs to describe the tiny frontend clipboard helper.

## [0.1.0] - 2026-05-11

### Added
- Initial release.
- Gutenberg block `fka/ai-prompt` that renders an AI prompt embed inline (no iframe).
- Prompt, context, model, mode, and indicator flags (Thinking / Reasoning / Planning / Fast / Max).
- Optional file tree, diff view (with Accept/Reject flash), and MCP tools list.
- Auto/light/dark theme with configurable accent colors per mode.
- `align: wide/full` and spacing/margin block supports.
- GitHub Actions workflow for build-and-release-on-tag.

[Unreleased]: https://github.com/f/ai-prompt/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/f/ai-prompt/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/f/ai-prompt/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/f/ai-prompt/releases/tag/v0.1.0
