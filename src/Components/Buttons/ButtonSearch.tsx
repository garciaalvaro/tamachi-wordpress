import { useContext } from "react";

import { Button, Icon } from "utils/Components";
import { ContextSidebar } from "../Context/ContextSidebar";

export const ButtonSearch: React.ComponentType = () => {
	const { setSearchIsOpen, search_is_open } = useContext(ContextSidebar);

	return (
		<Button
			className="button-toggle_search"
			onClick={() => setSearchIsOpen((is_open: boolean) => !is_open)}
		>
			<Icon icon={search_is_open ? "close" : "search"} />
		</Button>
	);
};
