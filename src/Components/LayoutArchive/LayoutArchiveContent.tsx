import { useContext, forwardRef } from "react";

import { DivRef } from "utils/Components";
import { ContextContent } from "../Context/ContextContent";

export const LayoutArchiveContent = forwardRef<HTMLDivElement>((props, ref) => {
	// content is already sanitized. See ContextContent setContent.
	const { content } = useContext(ContextContent);

	return (
		<DivRef
			ref={ref}
			id="archive"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
});
