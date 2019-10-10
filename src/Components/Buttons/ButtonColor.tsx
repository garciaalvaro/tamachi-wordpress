import { useState } from "react";

import { getColorScheme } from "utils/tools";
import { Button, Icon } from "utils/Components";

export const ButtonColor: React.ComponentType = props => {
	const [color, setColor] = useState<Color>(getColorScheme());

	return (
		<Button
			id="button-toggle_color"
			onClick={() => {
				const color_next = color === "light" ? "dark" : "light";
				const { classList } = document.documentElement;

				setColor(color_next);
				localStorage.setItem("color", color_next);

				// This class is kept in the root of the document and is initially
				// handled by the script tamachi-front-color which is loaded in the head.
				classList.remove("tamachi-color-light", "tamachi-color-dark");
				classList.add(`tamachi-color-${color_next}`);
			}}
		>
			<Icon icon={color === "light" ? "moon" : "sun"} />
		</Button>
	);
};
