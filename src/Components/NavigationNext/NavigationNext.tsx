import { useContext } from "react";
import { __ } from "@wordpress/i18n";

import "./NavigationNext.styl";
import { Div, Span, A } from "utils/Components";
import { useLoadPage } from "hooks";
import { ContextView } from "../Context/ContextView";

export const NavigationNext: React.ComponentType = props => {
	const { template_data } = useContext(ContextView);
	const loadPage = useLoadPage();

	if (!template_data.next) {
		return null;
	}

	const { url, title } = template_data.next;

	return (
		<Div id="navigation-next">
			<Span id="navigation-next-label">{__("Next")}</Span>
			<A
				id="navigation-next-link"
				href={url}
				onClick={(e: any) => {
					if (e.shiftKey || e.ctrlKey || e.metaKey) {
						return;
					}

					e.preventDefault();

					loadPage(url, true);
				}}
			>
				{title}
			</A>
		</Div>
	);
};
