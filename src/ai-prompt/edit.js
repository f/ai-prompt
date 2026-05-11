import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';

import AiPromptUi from './ai-prompt-ui';
import './editor.scss';

const MODEL_OPTIONS = [
	{ value: 'GPT-5.5', label: 'GPT-5.5' },
	{ value: 'GPT-5.5 Pro', label: 'GPT-5.5 Pro' },
	{ value: 'GPT-5', label: 'GPT-5' },
	{ value: 'Claude Sonnet 4.8', label: 'Claude Sonnet 4.8' },
	{ value: 'Claude Opus 4.7', label: 'Claude Opus 4.7' },
	{ value: 'Gemini 3.1 Pro', label: 'Gemini 3.1 Pro' },
	{ value: 'Gemini 3.1 Flash-Lite', label: 'Gemini 3.1 Flash-Lite' },
	{
		value: 'Grok 4.20 Multi-Agent Beta',
		label: 'Grok 4.20 Multi-Agent Beta',
	},
	{ value: 'DeepSeek V4-Pro', label: 'DeepSeek V4-Pro' },
	{ value: 'DeepSeek V4-Flash', label: 'DeepSeek V4-Flash' },
	{ value: 'Kimi K2.6', label: 'Kimi K2.6' },
	{ value: 'Qwen 3.6 Max-Preview', label: 'Qwen 3.6 Max-Preview' },
	{ value: 'Llama 4 Scout', label: 'Llama 4 Scout' },
	{ value: 'custom', label: 'Custom…' },
];

const MODE_OPTIONS = [
	{ value: 'chat', label: 'Chat' },
	{ value: 'code', label: 'Code' },
	{ value: 'ask', label: 'Ask' },
	{ value: 'plan', label: 'Plan' },
];

const THEME_OPTIONS = [
	{ value: 'auto', label: 'Auto' },
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
];

const FLASH_OPTIONS = [
	{ value: 'none', label: 'None' },
	{ value: 'accept', label: 'Accept' },
	{ value: 'reject', label: 'Reject' },
];

const COLOR_PRESETS = [
	{ name: 'Blue', color: '#3b82f6' },
	{ name: 'Green', color: '#10b981' },
	{ name: 'Orange', color: '#f97316' },
	{ name: 'Purple', color: '#8b5cf6' },
	{ name: 'Pink', color: '#ec4899' },
	{ name: 'Red', color: '#ef4444' },
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'ai-prompt-wrapper',
	} );

	const update = ( patch ) => setAttributes( patch );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Prompt', 'ai-prompt' ) }
					initialOpen={ true }
				>
					<TextareaControl
						label={ __( 'Prompt text', 'ai-prompt' ) }
						value={ attributes.prompt }
						onChange={ ( prompt ) => update( { prompt } ) }
						rows={ 5 }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Context (comma-separated)', 'ai-prompt' ) }
						help={ __(
							'@mentions, file paths, #image, https:// URLs',
							'ai-prompt'
						) }
						value={ attributes.context }
						onChange={ ( context ) => update( { context } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'AI Settings', 'ai-prompt' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Model', 'ai-prompt' ) }
						value={ attributes.model }
						options={ MODEL_OPTIONS }
						onChange={ ( model ) => update( { model } ) }
						__nextHasNoMarginBottom
					/>
					{ attributes.model === 'custom' && (
						<TextControl
							label={ __( 'Custom model name', 'ai-prompt' ) }
							help={ __(
								'Shown in the model badge exactly as typed.',
								'ai-prompt'
							) }
							value={ attributes.customModel }
							onChange={ ( customModel ) =>
								update( { customModel } )
							}
							placeholder={ __(
								'Example: Claude Opus 4.1',
								'ai-prompt'
							) }
							__nextHasNoMarginBottom
						/>
					) }
					<SelectControl
						label={ __( 'Mode', 'ai-prompt' ) }
						value={ attributes.mode }
						options={ MODE_OPTIONS }
						onChange={ ( mode ) => update( { mode } ) }
						__nextHasNoMarginBottom
					/>
					<PanelRow>
						<ToggleControl
							label={ __( 'Thinking', 'ai-prompt' ) }
							checked={ attributes.thinking }
							onChange={ ( thinking ) => update( { thinking } ) }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Reasoning', 'ai-prompt' ) }
							checked={ attributes.reasoning }
							onChange={ ( reasoning ) =>
								update( { reasoning } )
							}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Planning', 'ai-prompt' ) }
							checked={ attributes.planning }
							onChange={ ( planning ) => update( { planning } ) }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Fast', 'ai-prompt' ) }
							checked={ attributes.fast }
							onChange={ ( fast ) => update( { fast } ) }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Max', 'ai-prompt' ) }
							checked={ attributes.max }
							onChange={ ( max ) => update( { max } ) }
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={ __( 'Run Dropdown', 'ai-prompt' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Run button', 'ai-prompt' ) }
						help={ __(
							'Adds one Run button with a dropdown of static links for the selected mode.',
							'ai-prompt'
						) }
						checked={ attributes.showRunButtons }
						onChange={ ( showRunButtons ) =>
							update( { showRunButtons } )
						}
						__nextHasNoMarginBottom
					/>
					{ attributes.showRunButtons && (
						<TextareaControl
							label={ __( 'Custom run targets', 'ai-prompt' ) }
							help={ __(
								'Optional. One per line: Label | URL. Use {prompt} where the encoded prompt should go. Leave blank for mode defaults.',
								'ai-prompt'
							) }
							value={ attributes.runTargets }
							onChange={ ( runTargets ) =>
								update( { runTargets } )
							}
							placeholder={
								'Cursor | cursor://anysphere.cursor-deeplink/prompt?text={prompt}\nClaude | https://claude.ai/new?q={prompt}'
							}
							rows={ 5 }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'File Tree', 'ai-prompt' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show file tree', 'ai-prompt' ) }
						checked={ attributes.showFiletree }
						onChange={ ( showFiletree ) =>
							update( { showFiletree } )
						}
						__nextHasNoMarginBottom
					/>
					{ attributes.showFiletree && (
						<TextareaControl
							label={ __(
								'File tree (one per line)',
								'ai-prompt'
							) }
							help={ __(
								'Use slash-separated paths. End folder-only entries with /.',
								'ai-prompt'
							) }
							value={ attributes.filetree }
							onChange={ ( filetree ) => update( { filetree } ) }
							rows={ 6 }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Diff View', 'ai-prompt' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show diff', 'ai-prompt' ) }
						checked={ attributes.showDiff }
						onChange={ ( showDiff ) => update( { showDiff } ) }
						__nextHasNoMarginBottom
					/>
					{ attributes.showDiff && (
						<>
							<TextControl
								label={ __( 'Filename', 'ai-prompt' ) }
								value={ attributes.diffFilename }
								onChange={ ( diffFilename ) =>
									update( { diffFilename } )
								}
								__nextHasNoMarginBottom
							/>
							<TextareaControl
								label={ __( 'Old code', 'ai-prompt' ) }
								value={ attributes.diffOldText }
								onChange={ ( diffOldText ) =>
									update( { diffOldText } )
								}
								rows={ 4 }
								__nextHasNoMarginBottom
							/>
							<TextareaControl
								label={ __( 'New code', 'ai-prompt' ) }
								value={ attributes.diffNewText }
								onChange={ ( diffNewText ) =>
									update( { diffNewText } )
								}
								rows={ 4 }
								__nextHasNoMarginBottom
							/>
							<SelectControl
								label={ __( 'Flash button', 'ai-prompt' ) }
								value={ attributes.flashButton }
								options={ FLASH_OPTIONS }
								onChange={ ( flashButton ) =>
									update( { flashButton } )
								}
								__nextHasNoMarginBottom
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'MCP Tools', 'ai-prompt' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show MCP tools', 'ai-prompt' ) }
						checked={ attributes.showMcpTools }
						onChange={ ( showMcpTools ) =>
							update( { showMcpTools } )
						}
						__nextHasNoMarginBottom
					/>
					{ attributes.showMcpTools && (
						<TextareaControl
							label={ __(
								'MCP tools (one per line, server:tool)',
								'ai-prompt'
							) }
							value={ attributes.mcpTools }
							onChange={ ( mcpTools ) => update( { mcpTools } ) }
							rows={ 4 }
							__nextHasNoMarginBottom
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Appearance', 'ai-prompt' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Theme mode', 'ai-prompt' ) }
						value={ attributes.themeMode }
						options={ THEME_OPTIONS }
						onChange={ ( themeMode ) => update( { themeMode } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Inherit page font', 'ai-prompt' ) }
						help={ __(
							'Use the surrounding theme font for the block chrome and prompt text.',
							'ai-prompt'
						) }
						checked={ attributes.inheritFont }
						onChange={ ( inheritFont ) =>
							update( { inheritFont } )
						}
						__nextHasNoMarginBottom
					/>
					<p>{ __( 'Light accent', 'ai-prompt' ) }</p>
					<ColorPalette
						colors={ COLOR_PRESETS }
						value={ attributes.lightColor }
						onChange={ ( lightColor ) =>
							update( { lightColor: lightColor || '#3b82f6' } )
						}
						disableCustomColors={ false }
						clearable={ false }
					/>
					<p>{ __( 'Dark accent', 'ai-prompt' ) }</p>
					<ColorPalette
						colors={ COLOR_PRESETS.map( ( c ) => ( {
							name: c.name,
							color: c.color,
						} ) ) }
						value={ attributes.darkColor }
						onChange={ ( darkColor ) =>
							update( { darkColor: darkColor || '#60a5fa' } )
						}
						disableCustomColors={ false }
						clearable={ false }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<AiPromptUi attributes={ attributes } />
			</div>
		</>
	);
}
