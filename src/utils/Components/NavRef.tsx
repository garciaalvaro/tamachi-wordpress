import { forwardRef } from "react";

import { prepareProps } from "utils/tools/prepareProps";

export const NavRef = forwardRef<HTMLElement, ComponentProps>((props, ref) => {
	const { children, ...rest } = props;

	return (
		<nav {...prepareProps(rest)} ref={ref}>
			{children}
		</nav>
	);
});
