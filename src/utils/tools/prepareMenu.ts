import { last } from "lodash";

import { prepareMenuItemsVisibility } from "utils/tools/prepareMenuItemsVisibility";

export const prepareMenu = (items_raw: MenuItemRaw[]): Menu => {
	let ancestors_id: MenuItem["id"][] = [];

	const menu = items_raw.map(item_raw => {
		const {
			ID: id,
			type,
			url: url_raw,
			title,
			menu_item_parent,
			object_id,
		} = item_raw;
		const parent_id = parseInt(menu_item_parent);
		const children_id = items_raw.filter(
			({ menu_item_parent }) => parseInt(menu_item_parent) === id
		);

		// The menu array is sorted from Parent to Children in hierarchical
		// order so we can build the ancestors array in a first loop.
		if (!parent_id) {
			ancestors_id = [];
		} else if (
			last(ancestors_id) !== parent_id &&
			!ancestors_id.includes(parent_id)
		) {
			ancestors_id = [...ancestors_id, parent_id];
		} else if (last(ancestors_id) !== parent_id) {
			const parent_index = ancestors_id.findIndex(id => id === parent_id);

			ancestors_id = ancestors_id.slice(0, parent_index + 1);
		}

		return {
			id,
			url: url_raw !== "#" ? url_raw : "",
			title,
			post_id: type === "post_type" ? parseInt(object_id) : 0,
			is_active: false,
			children_id,
			has_children: !!children_id.length,
			is_open: false,
			ancestors_id,
			ancestor_is_closed: false,
		};
	}, []);

	return prepareMenuItemsVisibility(menu);
};
