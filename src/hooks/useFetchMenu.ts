import { useEffect, useContext } from "react";
import { addQueryArgs } from "@wordpress/url";
import apiFetch from "@wordpress/api-fetch";

import { prepareMenu } from "utils/tools";
import { ContextSidebar } from "Components/Context/ContextSidebar";

export const useFetchMenu = () => {
	const { setMenu } = useContext(ContextSidebar);

	// Fetch and add the menu data.
	useEffect(() => {
		const fetchMenu = async () => {
			const menu = await apiFetch<MenuRaw>({
				path: addQueryArgs("/tamachi/v1/menu", {
					menu_name: "tamachi-sidebar"
				})
			});

			if (!menu) {
				return;
			}

			setMenu(prepareMenu(menu));
		};

		fetchMenu();
	}, []);
};
