import { Nav, Ol } from "utils/Components";
import { NavigationBreadcrumbsItem } from "./NavigationBreadcrumbsItem";

import "./NavigationBreadcrumbs.styl";

interface Props {
	ancestors: Item[];
	use_span?: true;
}

export const NavigationBreadcrumbs: React.ComponentType<Props> = props => {
	const { ancestors, use_span } = props;

	if (!ancestors.length) {
		return null;
	}

	return (
		<Nav className="navigation-breadcrumbs">
			<Ol>
				{ancestors.map(item => (
					<NavigationBreadcrumbsItem
						key={item.id}
						{...item}
						use_span={use_span}
					/>
				))}
			</Ol>
		</Nav>
	);
};
