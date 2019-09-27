import { useContext } from "react";

import { Div, H1, A } from "utils/Components";
import { NavigationBreadcrumbs } from "../NavigationBreadcrumbs/NavigationBreadcrumbs";
import { ContextContent } from "../Context/ContextContent";
import { ContextView } from "../Context/ContextView";

interface Props {
	ancestors?: Item[];
}

export const LayoutSingularHeader: React.ComponentType<Props> = props => {
	const { ancestors } = props;
	const { url } = useContext(ContextView);
	const { title } = useContext(ContextContent);

	return (
		<Div id="post-header">
			{ancestors && <NavigationBreadcrumbs ancestors={ancestors} />}
			<H1 id="post-title">
				{url ? (
					<A href={url} id="post-link">
						{title}
					</A>
				) : (
					title
				)}
			</H1>
		</Div>
	);
};
