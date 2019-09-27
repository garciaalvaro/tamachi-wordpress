import { useContext } from "react";

import { A } from "utils/Components";
import { useLoadPage } from "hooks";
import { prepareMenuItemsVisibility } from "utils/tools";
import { ContextSidebar } from "../Context/ContextSidebar";

interface Props extends MenuItem {
	children: React.ReactNode;
}

export const MenuItemLink: React.ComponentType<Props> = props => {
	const { children, url, is_active, id } = props;
	const { setMenu } = useContext(ContextSidebar);
	const loadPage = useLoadPage();

	return (
		<A
			className="menu-item"
			href={url}
			onClick={(e: any) => {
				if (e.shiftKey || e.ctrlKey || e.metaKey) {
					return;
				}

				e.preventDefault();

				if (is_active) {
					setMenu((menu: Menu) => prepareMenuItemsVisibility(menu, id));
				} else {
					loadPage(url, true);
				}
			}}
		>
			{children}
		</A>
	);
};
