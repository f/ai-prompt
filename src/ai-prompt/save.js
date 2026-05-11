import { useBlockProps } from '@wordpress/block-editor';

import AiPromptUi from './ai-prompt-ui';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'ai-prompt-wrapper',
	} );

	return (
		<div { ...blockProps }>
			<AiPromptUi attributes={ attributes } />
		</div>
	);
}
