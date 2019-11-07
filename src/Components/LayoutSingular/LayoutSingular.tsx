import { useContext } from "react";

import "./LayoutSingular.styl";
import { Article } from "utils/Components";
import { LayoutSingularHeader } from "./LayoutSingularHeader";
import { LayoutContent } from "../LayoutContent/LayoutContent";
import { NavigationNext } from "../NavigationNext/NavigationNext";
import { ContextView } from "../Context/ContextView";

export const LayoutSingular: React.ComponentType = props => {
	const { template_data } = useContext(ContextView);
	const { ancestors } = template_data;

	return (
		<Article id="post">
			<LayoutSingularHeader ancestors={ancestors} />
			<LayoutContent id="post-content" />
			<NavigationNext />
		</Article>
	);
};
