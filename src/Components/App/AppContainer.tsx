import { useContext } from "react";

import { Div } from "utils/Components";
import { ContextView } from "../Context/ContextView";

interface Props {
	children: React.ReactNode;
}

export const AppContainer: React.ComponentType<Props> = props => {
	const { children } = props;
	const { template, layout, is_loading } = useContext(ContextView);

	return (
		<Div
			id="page"
			className={[
				`template-${template}`,
				`layout-${layout}`,
				is_loading ? "is_loading" : "no-is_loading",
			]}
		>
			{children}
		</Div>
	);
};
