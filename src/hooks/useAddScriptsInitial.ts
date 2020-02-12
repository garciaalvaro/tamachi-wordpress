import { useEffect } from "react";

import { useAddScripts } from "./useAddScripts";
import { useAddStyles } from "./useAddStyles";

declare global {
	interface Window {
		tamachi_scripts: ScriptsRaw;
		tamachi_styles: StylesRaw;
	}
}

export const useAddScriptsInitial = () => {
	const addScripts = useAddScripts();
	const addStyles = useAddStyles();

	// Add the initial scripts and styles.
	useEffect(() => {
		const { tamachi_scripts, tamachi_styles } = window;

		addScripts(tamachi_scripts);
		addStyles(tamachi_styles, true);
	}, []);
};
