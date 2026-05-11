/**
 * Shared visual renderer for the AI Prompt block.
 *
 * IMPORTANT: This component is imported by both `edit.js` (mounted, alive React)
 * AND `save.js` (called once at save, return value serialized to HTML).
 *
 * Constraints when used from save.js:
 *   - No state, no effects, no event handlers (they'd be stripped).
 *   - No hooks like useSelect that talk to the editor store.
 *
 * Everything here is pure presentation derived from `attributes`.
 */

const MODE_LABELS = {
	chat: 'Chat',
	code: 'Code',
	ask: 'Ask',
	plan: 'Plan',
};

const RUN_TARGETS = {
	chat: [
		{ label: 'ChatGPT', url: 'https://chatgpt.com/?q={prompt}' },
		{ label: 'Claude', url: 'https://claude.ai/new?q={prompt}' },
		{
			label: 'Perplexity',
			url: 'https://www.perplexity.ai/search?q={prompt}',
		},
	],
	code: [
		{
			label: 'Cursor',
			url: 'cursor://anysphere.cursor-deeplink/prompt?text={prompt}',
			isDeeplink: true,
		},
		{
			label: 'GitHub Copilot',
			url: 'https://github.com/copilot?prompt={prompt}',
		},
		{ label: 'v0', url: 'https://v0.dev/chat?q={prompt}' },
		{ label: 'Bolt', url: 'https://bolt.new?prompt={prompt}' },
	],
	ask: [
		{ label: 'ChatGPT', url: 'https://chatgpt.com/?q={prompt}' },
		{ label: 'Claude', url: 'https://claude.ai/new?q={prompt}' },
		{
			label: 'Perplexity',
			url: 'https://www.perplexity.ai/search?q={prompt}',
		},
	],
	plan: [
		{ label: 'ChatGPT', url: 'https://chatgpt.com/?q={prompt}' },
		{ label: 'Claude', url: 'https://claude.ai/new?q={prompt}' },
		{ label: 'Manus', url: 'https://manus.im/app?q={prompt}' },
	],
};

function classifyChip( raw ) {
	const item = raw.trim();
	if ( ! item ) {
		return null;
	}
	if ( item.startsWith( '@' ) ) {
		return { label: item, kind: 'mention' };
	}
	if ( item.startsWith( '#' ) ) {
		return { label: item, kind: 'image' };
	}
	if ( /^https?:\/\//i.test( item ) ) {
		return { label: item, kind: 'url' };
	}
	return { label: item, kind: 'file' };
}

function normalizeFileTreeLines( filetree ) {
	if ( ! filetree ) {
		return [];
	}

	return filetree
		.split( '\n' )
		.map( ( line ) => line.trim() )
		.filter( Boolean );
}

function buildFileTree( paths ) {
	const root = [];

	for ( const path of paths ) {
		const parts = path.split( '/' ).filter( Boolean );
		let currentLevel = root;
		let currentPath = '';

		for ( let i = 0; i < parts.length; i++ ) {
			const part = parts[ i ];
			currentPath = currentPath ? `${ currentPath }/${ part }` : part;
			const isLastPart = i === parts.length - 1;
			const isFolder = path.endsWith( '/' ) ? true : ! isLastPart;
			let existing = currentLevel.find( ( node ) => node.name === part );

			if ( ! existing ) {
				existing = {
					name: part,
					path: isFolder ? `${ currentPath }/` : currentPath,
					isFolder,
					children: [],
				};
				currentLevel.push( existing );
			}

			if ( isFolder ) {
				currentLevel = existing.children;
			}
		}
	}

	const sortNodes = ( nodes ) =>
		nodes
			.sort( ( a, b ) => {
				if ( a.isFolder && ! b.isFolder ) {
					return -1;
				}
				if ( ! a.isFolder && b.isFolder ) {
					return 1;
				}
				return a.name.localeCompare( b.name );
			} )
			.map( ( node ) => ( {
				...node,
				children: sortNodes( node.children ),
			} ) );

	return sortNodes( root );
}

function FileIcon( { isFolder } ) {
	return (
		<svg
			className={ `ai-prompt__file-icon ${
				isFolder ? 'is-folder' : 'is-file'
			}` }
			aria-hidden="true"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			{ isFolder ? (
				<path d="M2 6a2 2 0 0 1 2-2h4.586a2 2 0 0 1 1.414.586L11.414 6H16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" />
			) : (
				<path
					fillRule="evenodd"
					d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.414A2 2 0 0 0 17.414 6L14 2.586A2 2 0 0 0 12.586 2H4zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7z"
					clipRule="evenodd"
				/>
			) }
		</svg>
	);
}

function getFileInputId( path ) {
	return `ai-prompt-file-${ path.replace( /[^a-z0-9_-]+/gi, '-' ) }`;
}

function TreeNode( { node, depth = 0 } ) {
	const inputId = getFileInputId( node.path );

	return (
		<li>
			{ node.isFolder ? (
				<details className="ai-prompt__file-folder" open>
					<summary
						className="ai-prompt__file-node is-folder"
						style={ { '--ai-prompt-tree-depth': depth } }
					>
						<FileIcon isFolder={ true } />
						<span className="ai-prompt__file-name">
							{ node.name }
						</span>
					</summary>
					{ node.children.length > 0 && (
						<ul>
							{ node.children.map( ( child ) => (
								<TreeNode
									key={ child.path }
									node={ child }
									depth={ depth + 1 }
								/>
							) ) }
						</ul>
					) }
				</details>
			) : (
				<>
					<input
						className="ai-prompt__file-checkbox"
						id={ inputId }
						type="checkbox"
					/>
					<label
						className="ai-prompt__file-node is-file"
						htmlFor={ inputId }
						style={ { '--ai-prompt-tree-depth': depth } }
					>
						<FileIcon isFolder={ false } />
						<span className="ai-prompt__file-name">
							{ node.name }
						</span>
					</label>
				</>
			) }
		</li>
	);
}

function buildRunUrl( target, prompt ) {
	return target.url.replace( '{prompt}', encodeURIComponent( prompt || '' ) );
}

function parseRunTargets( value ) {
	if ( ! value ) {
		return [];
	}

	return value
		.split( '\n' )
		.map( ( line ) => line.trim() )
		.filter( Boolean )
		.map( ( line ) => {
			const [ label, ...urlParts ] = line.split( '|' );
			const url = urlParts.join( '|' ).trim();

			return {
				label: label.trim(),
				url,
				isDeeplink: url ? ! /^https?:\/\//i.test( url ) : false,
			};
		} )
		.filter( ( target ) => target.label && target.url );
}

function Indicator( { icon, label } ) {
	return (
		<span className="ai-prompt__flag">
			<span aria-hidden="true" className="ai-prompt__flag-icon">
				{ icon }
			</span>
			{ label }
		</span>
	);
}

export default function AiPromptUi( { attributes } ) {
	const {
		prompt,
		context,
		model,
		customModel,
		mode,
		thinking,
		reasoning,
		planning,
		fast,
		max,
		lightColor,
		darkColor,
		themeMode,
		inheritFont,
		showFiletree,
		filetree,
		showDiff,
		diffFilename,
		diffOldText,
		diffNewText,
		flashButton,
		showMcpTools,
		mcpTools,
		showRunButtons,
		runTargets,
	} = attributes;

	const wrapperStyle = {
		'--ai-prompt-accent-light': lightColor,
		'--ai-prompt-accent-dark': darkColor,
	};

	const contextChips = context
		? context.split( ',' ).map( classifyChip ).filter( Boolean )
		: [];

	const filetreeLines =
		showFiletree && filetree ? normalizeFileTreeLines( filetree ) : [];
	const fileTree = buildFileTree( filetreeLines );

	const diffOldLines =
		showDiff && diffOldText ? diffOldText.split( '\n' ) : [];
	const diffNewLines =
		showDiff && diffNewText ? diffNewText.split( '\n' ) : [];

	const mcpToolList =
		showMcpTools && mcpTools
			? mcpTools
					.split( '\n' )
					.map( ( l ) => l.trim() )
					.filter( Boolean )
			: [];
	const customRunTargets = parseRunTargets( runTargets );
	let activeRunTargets = [];
	if ( showRunButtons ) {
		activeRunTargets =
			customRunTargets.length > 0
				? customRunTargets
				: RUN_TARGETS[ mode ] || RUN_TARGETS.chat;
	}
	const modelName =
		model === 'custom'
			? customModel || 'Custom model'
			: model || 'AI Model';

	return (
		<div
			className={ `ai-prompt ${
				inheritFont ? 'is-font-inherited' : ''
			}` }
			data-theme-mode={ themeMode }
			data-mode={ mode }
			style={ wrapperStyle }
		>
			<header className="ai-prompt__header">
				<span className="ai-prompt__badge ai-prompt__badge--model">
					{ modelName }
				</span>
				<span className="ai-prompt__badge ai-prompt__badge--mode">
					{ MODE_LABELS[ mode ] || mode }
				</span>
				{ thinking && <Indicator icon="✦" label="Thinking" /> }
				{ reasoning && <Indicator icon="◎" label="Reasoning" /> }
				{ planning && <Indicator icon="▱" label="Planning" /> }
				{ fast && <Indicator icon="⚡" label="Fast" /> }
				{ max && <Indicator icon="◆" label="MAX" /> }
			</header>

			<div className="ai-prompt__body">
				{ fileTree.length > 0 && (
					<aside
						className="ai-prompt__filetree"
						aria-label="File tree"
					>
						<div className="ai-prompt__pane-title ai-prompt__filetree-title">
							Files
						</div>
						<ul>
							{ fileTree.map( ( node ) => (
								<TreeNode key={ node.path } node={ node } />
							) ) }
						</ul>
					</aside>
				) }

				<div className="ai-prompt__main">
					{ showDiff &&
						( diffOldLines.length > 0 ||
							diffNewLines.length > 0 ) && (
							<section
								className="ai-prompt__diff"
								aria-label="Diff"
							>
								<div className="ai-prompt__diff-header">
									<span className="ai-prompt__diff-filename">
										{ diffFilename || 'untitled' }
									</span>
									{ flashButton !== 'none' && (
										<span
											className={ `ai-prompt__diff-btn is-${ flashButton }` }
										>
											{ flashButton === 'accept'
												? 'Accept'
												: 'Reject' }
										</span>
									) }
								</div>
								<pre className="ai-prompt__diff-body">
									{ diffOldLines.map( ( line, i ) => (
										<div
											key={ `o${ i }` }
											className="ai-prompt__diff-line is-old"
										>
											<span className="ai-prompt__diff-marker">
												−
											</span>
											<span>{ line }</span>
										</div>
									) ) }
									{ diffNewLines.map( ( line, i ) => (
										<div
											key={ `n${ i }` }
											className="ai-prompt__diff-line is-new"
										>
											<span className="ai-prompt__diff-marker">
												+
											</span>
											<span>{ line }</span>
										</div>
									) ) }
								</pre>
							</section>
						) }

					{ mcpToolList.length > 0 && (
						<section
							className="ai-prompt__mcp"
							aria-label="MCP tools"
						>
							<div className="ai-prompt__pane-title">
								MCP Tools
							</div>
							<ul>
								{ mcpToolList.map( ( tool ) => {
									const [ server, name ] = tool.split( ':' );
									return (
										<li key={ tool }>
											{ name ? (
												<>
													<span className="ai-prompt__mcp-server">
														{ server }
													</span>
													<span className="ai-prompt__mcp-sep">
														:
													</span>
													<span className="ai-prompt__mcp-name">
														{ name }
													</span>
												</>
											) : (
												tool
											) }
										</li>
									);
								} ) }
							</ul>
						</section>
					) }

					<section
						className="ai-prompt__composer"
						aria-label="Prompt"
					>
						<div className="ai-prompt__prompt">
							{ prompt || (
								<span className="ai-prompt__placeholder">
									Your prompt will appear here…
								</span>
							) }
						</div>

						{ contextChips.length > 0 && (
							<div className="ai-prompt__context">
								{ contextChips.map( ( chip ) => (
									<span
										key={ chip.label }
										className={ `ai-prompt__chip is-${ chip.kind }` }
									>
										{ chip.label }
									</span>
								) ) }
							</div>
						) }

						<div className="ai-prompt__composer-footer">
							<span className="ai-prompt__hint">
								⌘ + ↵ to send
							</span>
							<div className="ai-prompt__actions">
								<button
									className="ai-prompt__copy-button"
									type="button"
									data-ai-prompt-copy
									data-ai-prompt-text={ prompt || '' }
								>
									<span aria-hidden="true">⧉</span>
									Copy
								</button>
								{ activeRunTargets.length > 0 && (
									<details className="ai-prompt__run-menu">
										<summary className="ai-prompt__run-summary">
											<span aria-hidden="true">▶</span>
											Run
										</summary>
										<div
											className="ai-prompt__run-list"
											aria-label="Run prompt"
										>
											{ activeRunTargets
												.slice( 0, 8 )
												.map( ( target ) => (
													<a
														key={ target.label }
														className={ `ai-prompt__run-option ${
															target.isDeeplink
																? 'is-deeplink'
																: ''
														}` }
														href={ buildRunUrl(
															target,
															prompt
														) }
														target="_blank"
														rel="noreferrer"
													>
														<span aria-hidden="true">
															↗
														</span>
														{ target.label }
													</a>
												) ) }
										</div>
									</details>
								) }
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
