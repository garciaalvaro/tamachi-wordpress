import { useContext } from "react";

import { Button } from "utils/Components";
import { prepareMenuItemsVisibility } from "utils/tools";
import { ContextSidebar } from "../Context/ContextSidebar";

interface Props extends MenuItem {
	children: React.ReactNode;
}

export const MenuItemButton: React.ComponentType<Props> = props => {
	const { id, children } = props;
	const { setMenu } = useContext(ContextSidebar);

	return (
		<Button
			className="menu-item"
			onClick={() =>
				setMenu((menu: Menu) => prepareMenuItemsVisibility(menu, id))
			}
		>
			{children}
		</Button>
	);
};
