import { useContext } from "react";

import { Div } from "utils/Components";
import { ContextContent } from "../Context/ContextContent";

export const LayoutSingularContent: React.ComponentType = props => {
	// content is already sanitized. See ContextContent setContent.
	const { content } = useContext(ContextContent);

	return (
		<Div id="post-content" dangerouslySetInnerHTML={{ __html: content }} />
	);
};
