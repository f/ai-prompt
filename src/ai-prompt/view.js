function fallbackCopy( text ) {
	const textarea = document.createElement( 'textarea' );
	textarea.value = text;
	textarea.setAttribute( 'readonly', '' );
	textarea.style.position = 'fixed';
	textarea.style.top = '-9999px';
	document.body.appendChild( textarea );
	textarea.select();
	document.execCommand( 'copy' );
	document.body.removeChild( textarea );
}

function markCopied( button ) {
	const original = button.textContent;
	button.classList.add( 'is-copied' );
	button.textContent = 'Copied';

	window.setTimeout( () => {
		button.classList.remove( 'is-copied' );
		button.textContent = original;
	}, 1600 );
}

function closeRunMenusOutside( target ) {
	document
		.querySelectorAll( '.ai-prompt__run-menu[open]' )
		.forEach( ( menu ) => {
			if ( ! menu.contains( target ) ) {
				menu.removeAttribute( 'open' );
			}
		} );
}

document.addEventListener( 'click', async ( event ) => {
	closeRunMenusOutside( event.target );

	const button = event.target.closest( '[data-ai-prompt-copy]' );
	if ( ! button ) {
		return;
	}

	const text = button.dataset.aiPromptText || '';
	if ( navigator.clipboard?.writeText ) {
		await navigator.clipboard.writeText( text );
	} else {
		fallbackCopy( text );
	}

	markCopied( button );
} );

document.addEventListener( 'keydown', ( event ) => {
	if ( event.key !== 'Escape' ) {
		return;
	}

	document
		.querySelectorAll( '.ai-prompt__run-menu[open]' )
		.forEach( ( menu ) => menu.removeAttribute( 'open' ) );
} );
