import { __ } from "@wordpress/i18n";

import { A } from "utils/Components";
import { useLoadPage } from "hooks";

interface Props extends PaginationItem {
	is_active?: boolean;
	is_first?: any;
	is_last?: any;
}

export const NavigationPaginationItem: React.ComponentType<Props> = props => {
	const { number, url, is_active, is_first, is_last } = props;
	const loadPage = useLoadPage();

	return (
		<A
			className={[
				"navigation-pagination-link",
				is_active ? "is_active" : null,
				is_first ? "is_first" : null,
				is_last ? "is_last" : null
			]}
			href={url}
			onClick={(e: any) => {
				if (e.shiftKey || e.ctrlKey || e.metaKey) {
					return;
				}

				e.preventDefault();

				if (!is_active) {
					loadPage(url, true);
				}
			}}
		>
			{is_first ? __("first") : is_last ? __("last") : number}
		</A>
	);
};
