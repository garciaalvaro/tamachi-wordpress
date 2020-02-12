import { useState, createContext } from "react";
import { noop } from "lodash";

interface ProviderProps {
	children: React.ReactElement;
}

interface ContextProps {
	sidebar_is_hidden: boolean; // sidebar is hidden behind a toggle button
	setSidebarIsHidden: Function;
	sidebar_is_open: boolean;
	setSidebarIsOpen: Function;
	search_is_open: boolean;
	setSearchIsOpen: Function;
	menu: Menu;
	setMenu: Function;
}

const window_width =
	document.documentElement.clientWidth ||
	document.body.clientWidth ||
	window.innerWidth;

export const ContextSidebar = createContext<ContextProps>({
	sidebar_is_hidden: window_width < 769,
	setSidebarIsHidden: noop,
	sidebar_is_open: false,
	setSidebarIsOpen: noop,
	search_is_open: false,
	setSearchIsOpen: noop,
	menu: [],
	setMenu: noop
});

export const ContextSidebarProvider: React.ComponentType<ProviderProps> = props => {
	const [menu, setMenu] = useState([]);
	const [sidebar_is_hidden, setSidebarIsHidden] = useState(
		window_width < 769
	);
	const [sidebar_is_open, setSidebarIsOpen] = useState(false);
	const [search_is_open, setSearchIsOpen] = useState(false);

	return (
		<ContextSidebar.Provider
			value={{
				sidebar_is_hidden,
				setSidebarIsHidden,
				sidebar_is_open,
				setSidebarIsOpen,
				search_is_open,
				setSearchIsOpen,
				menu,
				setMenu
			}}
		>
			{props.children}
		</ContextSidebar.Provider>
	);
};
