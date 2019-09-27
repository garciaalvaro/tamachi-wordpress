import { useContext } from "react";

import { Button, Icon } from "utils/Components";
import { ContextSidebar } from "../Context/ContextSidebar";

export const ButtonSidebar: React.ComponentType = props => {
	const { sidebar_is_open, setSidebarIsOpen } = useContext(ContextSidebar);

	return (
		<Button
			id="button-toggle_sidebar"
			onClick={() => setSidebarIsOpen((is_open: boolean) => !is_open)}
		>
			<Icon icon={sidebar_is_open ? "close" : "menu"} />
		</Button>
	);
};
