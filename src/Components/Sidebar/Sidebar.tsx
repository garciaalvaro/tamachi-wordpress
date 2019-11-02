import { useContext, useState, useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

import "./Sidebar.styl";
import { NavRef, Nav } from "utils/Components";
import { useWindowSize } from "utils/hooks";
import { ContextView } from "../Context/ContextView";
import { ContextSidebar } from "../Context/ContextSidebar";
import { ButtonColor } from "../Buttons/ButtonColor";
import { ButtonSearch } from "../Buttons/ButtonSearch";
import { Menu } from "../Menu/Menu";
import { Search } from "../Search/Search";
import { ButtonSidebar } from "../Buttons/ButtonSidebar";

export const Sidebar: React.ComponentType = props => {
	const {
		search_is_open,
		sidebar_is_open,
		sidebar_is_hidden,
		menu
	} = useContext(ContextSidebar);
	const sidebar_ref = useRef<HTMLDivElement | null>(null);
	const { window_height } = useWindowSize();
	const [height, setHeight] = useState(window_height);
	const { layout, is_ready } = useContext(ContextView);

	useEffect(() => {
		if (!sidebar_ref.current) {
			return;
		}

		setHeight(sidebar_ref.current.clientHeight);
	}, [window_height, layout, sidebar_is_open]);

	if (!is_ready || !menu.length) {
		return <Nav id="sidebar"></Nav>;
	}

	if (sidebar_is_hidden && !sidebar_is_open) {
		return (
			<Nav id="sidebar" className="no-is_open">
				<ButtonSidebar />
				<ButtonColor />
			</Nav>
		);
	}

	return (
		<NavRef
			id="sidebar"
			ref={sidebar_ref}
			className={sidebar_is_hidden ? "is_open" : null}
		>
			<SimpleBar style={{ height }} autoHide={false}>
				{sidebar_is_hidden && <ButtonSidebar />}
				<ButtonColor />
				<ButtonSearch />
				<Menu />
			</SimpleBar>
			{search_is_open && <Search />}
		</NavRef>
	);
};
