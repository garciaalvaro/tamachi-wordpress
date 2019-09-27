import { prepareProps } from "utils/tools/prepareProps";

export const Article: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <article {...prepareProps(rest)}>{children}</article>;
};
