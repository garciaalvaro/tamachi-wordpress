import { useState, createContext } from "react";
import { noop } from "lodash";

interface ProviderProps {
	children: React.ReactElement;
}

interface ContextProps {
	scripts: Scripts;
	setScripts: Function;
	styles: Styles;
	setStyles: Function;
}

export const ContextScripts = createContext<ContextProps>({
	scripts: {},
	setScripts: noop,
	styles: {},
	setStyles: noop
});

export const ContextScriptsProvider: React.ComponentType<ProviderProps> = props => {
	const [scripts, setScripts] = useState<Scripts>({});
	const [styles, setStyles] = useState<Styles>({});

	return (
		<ContextScripts.Provider
			value={{
				scripts,
				setScripts,
				styles,
				setStyles
			}}
		>
			{props.children}
		</ContextScripts.Provider>
	);
};
