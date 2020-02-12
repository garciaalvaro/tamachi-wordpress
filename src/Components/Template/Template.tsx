import { useContext } from "react";

import "./Template.styl";
import { ContextView } from "../Context/ContextView";
import { LayoutArchive } from "../LayoutArchive/LayoutArchive";
import { LayoutSingular } from "../LayoutSingular/LayoutSingular";
import { LayoutHome } from "../LayoutHome/LayoutHome";
import { TemplateContainer } from "./TemplateContainer";

export const Template: React.ComponentType = () => {
	const { template, template_data } = useContext(ContextView);

	return (
		<TemplateContainer>
			{template === "error404" || template === "singular" ? (
				<LayoutSingular />
			) : /* If a post has not been assigned to the front page load the archive. */
			template === "home" && template_data.post_id ? (
				<LayoutHome />
			) : (
				<LayoutArchive />
			)}
		</TemplateContainer>
	);
};
