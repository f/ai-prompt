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
	'GPT-5',
	'GPT-4o',
	'o3',
	'o4-mini',
	'Claude 4.5 Sonnet',
	'Claude 4 Opus',
	'Gemini 3',
	'Gemini 2.5 Pro',
	'Grok 4',
	'DeepSeek R2',
	'Llama 4',
].map( ( value ) => ( { value, label: value } ) );

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
								'Indent with spaces to nest.',
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
