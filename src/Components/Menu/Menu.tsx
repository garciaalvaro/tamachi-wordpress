import { useContext } from "react";

import "./Menu.styl";
import { Div } from "utils/Components";
import { ContextSidebar } from "../Context/ContextSidebar";
import { MenuItem } from "./MenuItem";

export const Menu: React.ComponentType = props => {
	const { menu } = useContext(ContextSidebar);

	return (
		<Div id="menu">
			{menu.map(item => (
				<MenuItem key={item.id} {...item} />
			))}
		</Div>
	);
};
