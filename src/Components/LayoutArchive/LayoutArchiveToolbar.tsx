import { useContext, useState, useEffect } from "react";
import { __, sprintf } from "@wordpress/i18n";

import { H1, Div, Span } from "utils/Components";
import { NavigationBreadcrumbs } from "../NavigationBreadcrumbs/NavigationBreadcrumbs";
import { ContextView } from "../Context/ContextView";

const getLabel = (template: Template, template_data: TemplateData) => {
	const { site_title, query, name } = template_data;

	switch (template) {
		case "home":
			return site_title;
			break;

		case "search":
			return sprintf(__("Search results for: %s"), query);
			break;

		case "author":
			return sprintf(__("Posts by: %s"), name);
			break;

		case "post_type":
			return name;
			break;

		default:
			return "";
			break;
	}
};

export const LayoutArchiveToolbar: React.ComponentType = () => {
	const { template, template_data } = useContext(ContextView);
	const [label, setLabel] = useState(getLabel(template, template_data));
	const { items } = template_data;

	useEffect(() => {
		setLabel(getLabel(template, template_data));
	}, [template, template_data]);

	return (
		<Div id="archive-toolbar">
			{template === "home" ? (
				<H1>{label}</H1>
			) : template === "date" ? (
				<NavigationBreadcrumbs ancestors={items} />
			) : template === "taxonomy" ? (
				<NavigationBreadcrumbs ancestors={items} />
			) : (
				<Span>{label}</Span>
			)}
		</Div>
	);
};
