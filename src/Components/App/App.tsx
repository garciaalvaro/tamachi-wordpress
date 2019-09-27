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

export const App: React.ComponentType = props => {
	const { setIsReady } = useContext(ContextView);

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
			<Sidebar />
		</AppContainer>
	);
};
