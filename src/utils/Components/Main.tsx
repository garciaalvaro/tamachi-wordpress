import { prepareProps } from "utils/tools/prepareProps";

export const Main: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <main {...prepareProps(rest)}>{children}</main>;
};
