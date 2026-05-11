/**
 * Shared visual renderer for the Prompt Embed block.
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

function Indicator( { icon, label } ) {
	return (
		<span className="ai-prompt__flag">
			<span aria-hidden="true" className="ai-prompt__flag-icon">{ icon }</span>
			{ label }
		</span>
	);
}

export default function AiPromptUi( { attributes } ) {
	const {
		prompt,
		context,
		model,
		mode,
		thinking,
		reasoning,
		planning,
		fast,
		max,
		lightColor,
		darkColor,
		themeMode,
		showFiletree,
		filetree,
		showDiff,
		diffFilename,
		diffOldText,
		diffNewText,
		flashButton,
		showMcpTools,
		mcpTools,
	} = attributes;

	const wrapperStyle = {
		'--ai-prompt-accent-light': lightColor,
		'--ai-prompt-accent-dark': darkColor,
	};

	const contextChips = context
		? context.split( ',' ).map( classifyChip ).filter( Boolean )
		: [];

	const filetreeLines = showFiletree && filetree
		? filetree.split( '\n' ).map( ( l ) => l.replace( /\s+$/, '' ) ).filter( Boolean )
		: [];

	const diffOldLines = showDiff && diffOldText ? diffOldText.split( '\n' ) : [];
	const diffNewLines = showDiff && diffNewText ? diffNewText.split( '\n' ) : [];

	const mcpToolList = showMcpTools && mcpTools
		? mcpTools.split( '\n' ).map( ( l ) => l.trim() ).filter( Boolean )
		: [];

	return (
		<div
			className="ai-prompt"
			data-theme-mode={ themeMode }
			data-mode={ mode }
			style={ wrapperStyle }
		>
			<header className="ai-prompt__header">
				<span className="ai-prompt__badge ai-prompt__badge--model">{ model }</span>
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
				{ filetreeLines.length > 0 && (
					<aside className="ai-prompt__filetree" aria-label="File tree">
						<div className="ai-prompt__pane-title">Files</div>
						<ul>
							{ filetreeLines.map( ( line ) => {
								const depth = ( line.match( /^\s+/ )?.[ 0 ].length ) || 0;
								return (
									<li
										key={ line }
										style={ { paddingLeft: `${ depth * 8 }px` } }
									>
										{ line.trim() }
									</li>
								);
							} ) }
						</ul>
					</aside>
				) }

				<div className="ai-prompt__main">
					{ showDiff && ( diffOldLines.length > 0 || diffNewLines.length > 0 ) && (
						<section className="ai-prompt__diff" aria-label="Diff">
							<div className="ai-prompt__diff-header">
								<span className="ai-prompt__diff-filename">
									{ diffFilename || 'untitled' }
								</span>
								{ flashButton !== 'none' && (
									<span className={ `ai-prompt__diff-btn is-${ flashButton }` }>
										{ flashButton === 'accept' ? 'Accept' : 'Reject' }
									</span>
								) }
							</div>
							<pre className="ai-prompt__diff-body">
								{ diffOldLines.map( ( line, i ) => (
									<div key={ `o${ i }` } className="ai-prompt__diff-line is-old">
										<span className="ai-prompt__diff-marker">−</span>
										<span>{ line }</span>
									</div>
								) ) }
								{ diffNewLines.map( ( line, i ) => (
									<div key={ `n${ i }` } className="ai-prompt__diff-line is-new">
										<span className="ai-prompt__diff-marker">+</span>
										<span>{ line }</span>
									</div>
								) ) }
							</pre>
						</section>
					) }

					{ mcpToolList.length > 0 && (
						<section className="ai-prompt__mcp" aria-label="MCP tools">
							<div className="ai-prompt__pane-title">MCP Tools</div>
							<ul>
								{ mcpToolList.map( ( tool ) => {
									const [ server, name ] = tool.split( ':' );
									return (
										<li key={ tool }>
											{ name ? (
												<>
													<span className="ai-prompt__mcp-server">{ server }</span>
													<span className="ai-prompt__mcp-sep">:</span>
													<span className="ai-prompt__mcp-name">{ name }</span>
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

					<section className="ai-prompt__composer" aria-label="Prompt">
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
							<span className="ai-prompt__hint">⌘ + ↵ to send</span>
							<span
								className="ai-prompt__send"
								role="img"
								aria-label="Send"
							>
								↑
							</span>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
