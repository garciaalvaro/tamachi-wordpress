import { useEffect, useContext } from "react";

import { useLoadPage } from "./useLoadPage";
import { prepareMenuItemsVisibility } from "utils/tools";
import { ContextView } from "Components/Context/ContextView";
import { ContextSidebar } from "Components/Context/ContextSidebar";

export const useHandleUrlChanges = () => {
	const loadPage = useLoadPage();
	const { url } = useContext(ContextView);
	const { menu, setMenu, setSidebarIsOpen } = useContext(ContextSidebar);

	// Listen to url changes made by the browser and load the url.
	const popstateCallback = () => {
		const new_url = location.href;

		loadPage(new_url);
	};

	// Add the event listener.
	useEffect(() => {
		window.addEventListener("popstate", popstateCallback);

		return () => window.removeEventListener("popstate", popstateCallback);
	}, []);

	// If the url changes we need to update the menu is_open is_active items.
	useEffect(() => {
		if (!menu.length) return;

		setMenu((menu: Menu) => prepareMenuItemsVisibility(menu));
		setSidebarIsOpen(false);
	}, [url]);
};
