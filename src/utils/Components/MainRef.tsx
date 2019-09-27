import { forwardRef } from "react";

import { prepareProps } from "utils/tools/prepareProps";

export const MainRef = forwardRef<HTMLElement, ComponentProps>((props, ref) => {
	const { children, ...rest } = props;

	return (
		<main {...prepareProps(rest)} ref={ref}>
			{children}
		</main>
	);
});
