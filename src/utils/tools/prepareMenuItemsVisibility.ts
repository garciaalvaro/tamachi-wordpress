export const prepareMenuItemsVisibility = (
	menu: Menu,
	toggle_is_open_id = 0
) => {
	const item_active = menu.find(item => item.url === window.location.href);

	menu = menu.map(item => {
		let { is_open } = item;

		if (toggle_is_open_id === item.id) {
			is_open = !is_open;
		} else if (
			item_active &&
			(item_active.ancestors_id.includes(item.id) ||
				(item_active && item.id === item_active.id))
		) {
			is_open = true;
		}

		return {
			...item,
			// If the new item has an url update the active item.
			is_active: (item_active && item.id === item_active.id) || false,
			is_open,
		};
	});

	return menu.map(item => ({
		...item,
		ancestor_is_closed: !!item.ancestors_id.filter(ancestor_id => {
			const ancestor = menu.find(item => item.id === ancestor_id);

			if (!ancestor) {
				return false;
			}

			return !ancestor.is_open;
		}).length,
	}));
};
