import { forwardRef } from "react";

import { prepareProps } from "utils/tools/prepareProps";

export const InputRef = forwardRef<HTMLInputElement, ComponentProps>(
	(props, ref) => {
		const { ...rest } = props;

		return <input {...prepareProps(rest)} ref={ref} />;
	}
);
