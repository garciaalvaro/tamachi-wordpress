import { prepareProps } from "utils/tools/prepareProps";

export const Nav: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <nav {...prepareProps(rest)}>{children}</nav>;
};
