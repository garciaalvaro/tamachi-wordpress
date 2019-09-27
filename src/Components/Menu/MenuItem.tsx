import { Div, Span, Icon } from "utils/Components";
import { useMenuItemSiblingIsActive } from "hooks";
import { MenuItemLink } from "./MenuItemLink";
import { MenuItemButton } from "./MenuItemButton";

export const MenuItem: React.ComponentType<MenuItem> = props => {
	const {
		title,
		url,
		is_open,
		is_active,
		has_children,
		ancestors_id,
		ancestor_is_closed
	} = props;
	const sibling_is_active = useMenuItemSiblingIsActive(ancestors_id);
	const Container = url ? MenuItemLink : MenuItemButton;

	if (ancestor_is_closed) {
		return null;
	}

	return (
		<Div
			className={[
				"menu-item-container",
				`depth-${ancestors_id.length}`,
				has_children ? "has_children" : "no-has_children",
				is_active ? "is_active" : null,
				is_open ? "is_open" : null,
				sibling_is_active ? "sibling-is_active" : null
			]}
		>
			<Container {...props}>
				<Span>{title}</Span>
				{has_children && <Icon icon={is_open ? "collapse" : "expand"} />}
			</Container>
		</Div>
	);
};
