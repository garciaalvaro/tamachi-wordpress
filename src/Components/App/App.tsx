import { useContext, useEffect } from "react";

import "./App.styl";
import {
	useFetchMenu,
	useAddScriptsInitial,
	useHandleScripts,
	useHandleStyles,
	useHandleUrlChanges,
	useHandleSidebarIsHidden
} from "hooks";
import { AppContainer } from "./AppContainer";
import { Template } from "../Template/Template";
import { Sidebar } from "../Sidebar/Sidebar";
import { ContextView } from "../Context/ContextView";
import { ContextSidebar } from "../Context/ContextSidebar";

export const App: React.ComponentType = props => {
	const { is_ready, setIsReady } = useContext(ContextView);
	const { menu } = useContext(ContextSidebar);

	useFetchMenu();
	useAddScriptsInitial();
	useHandleScripts();
	useHandleStyles();
	useHandleUrlChanges();
	useHandleSidebarIsHidden();

	// The initial render of the page finished
	useEffect(() => {
		setIsReady(true);
	}, []);

	return (
		<AppContainer>
			<Template />
			{is_ready && !!menu.length && <Sidebar />}
		</AppContainer>
	);
};
