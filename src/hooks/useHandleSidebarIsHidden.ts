import { useEffect, useContext } from "react";

import { useWindowSize } from "utils/hooks";
import { ContextSidebar } from "Components/Context/ContextSidebar";

export const useHandleSidebarIsHidden = () => {
	const { setSidebarIsHidden } = useContext(ContextSidebar);
	const { window_width } = useWindowSize();

	// Update sidebar_is_hidden if the window resizes.
	useEffect(() => {
		setSidebarIsHidden(window_width < 768);
	}, [window_width]);
};
