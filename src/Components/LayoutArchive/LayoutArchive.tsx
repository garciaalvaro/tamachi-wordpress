import { Fragment, useContext } from "react";

import "./LayoutArchive.styl";
import { LayoutContent } from "../LayoutContent/LayoutContent";
import { NavigationPagination } from "../NavigationPagination/NavigationPagination";
import { LayoutArchiveToolbar } from "./LayoutArchiveToolbar";
import { ContextView } from "../Context/ContextView";

export const LayoutArchive: React.ComponentType = props => {
	const { template_data, is_ready } = useContext(ContextView);
	const { pages_total } = template_data;

	return (
		<Fragment>
			<LayoutArchiveToolbar />
			<LayoutContent id="archive" />
			{is_ready && pages_total > 1 && <NavigationPagination />}
		</Fragment>
	);
};
