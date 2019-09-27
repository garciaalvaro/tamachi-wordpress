import { useEffect, useState, useContext } from "react";
import { last } from "lodash";

import { ContextSidebar } from "Components/Context/ContextSidebar";

export const useMenuItemSiblingIsActive = (
	ancestors_id: MenuItem["ancestors_id"]
) => {
	const { menu } = useContext(ContextSidebar);
	const [is_active, setIsActive] = useState(false);
	const item_active = menu.find(({ is_active }) => is_active);
	const item_active_id = item_active ? item_active.id : 0;

	useEffect(() => {
		if (!item_active || last(item_active.ancestors_id) !== last(ancestors_id)) {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [item_active_id]);

	return is_active;
};
