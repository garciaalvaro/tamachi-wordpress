import { useContext, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";

import { useWindowSize } from "utils/hooks";
import { Main, MainRef } from "utils/Components";
import { ContextView } from "../Context/ContextView";

interface Props {
	children: React.ReactNode;
}

export const TemplateContainer: React.ComponentType<Props> = props => {
	const { children } = props;
	const { is_loading, is_ready } = useContext(ContextView);
	const { window_height } = useWindowSize();
	const [height, setHeight] = useState(window_height);
	const template_ref = useRef<HTMLDivElement | null>(null);
	const simplebar_ref = useRef<Object | null>(null);

	// When the page finishes loading new content scroll to the top.
	useEffect(() => {
		if (is_loading || !simplebar_ref.current) {
			return;
		}

		simplebar_ref.current.getScrollElement().scrollTop = 0;
	}, [is_loading]);

	// When the page resizes update the height state.
	useEffect(() => {
		if (!template_ref.current) {
			return;
		}

		setHeight(template_ref.current.clientHeight);
	}, [window_height]);

	// The server-side HTML doesnt include the HTML produced by SimpleBar.
	if (!is_ready) {
		return <Main id="content">{children}</Main>;
	}

	return (
		<MainRef id="content" ref={template_ref}>
			<SimpleBar
				ref={simplebar_ref}
				style={{ height }}
				data-simplebar-auto-hide={false}
			>
				{children}
			</SimpleBar>
		</MainRef>
	);
};
