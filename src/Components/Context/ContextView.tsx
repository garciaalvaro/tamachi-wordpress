import { useState, createContext } from "react";
import { noop } from "lodash";

import { preparePageData } from "utils/tools";

declare global {
	interface Window {
		tamachi_page_data: PageData;
	}
}

interface ProviderProps {
	children: React.ReactElement;
}

interface ContextProps {
	is_ready: boolean;
	setIsReady: Function;
	template: Template;
	setTemplate: Function;
	template_data: TemplateData;
	setTemplateData: Function;
	is_loading: boolean;
	setIsLoading: Function;
	url: string;
	setUrl: Function;
	layout: Layout;
	setLayout: Function;
}

const page_data = preparePageData(window.tamachi_page_data);
const {
	template: initial_template,
	template_data: initial_template_data,
	layout: initial_layout,
} = page_data;

export const ContextView = createContext<ContextProps>({
	is_ready: false,
	setIsReady: noop,
	template: initial_template,
	setTemplate: noop,
	template_data: initial_template_data,
	setTemplateData: noop,
	is_loading: false,
	setIsLoading: noop,
	url: window.location.href,
	setUrl: noop,
	layout: initial_layout,
	setLayout: noop,
});

export const ContextViewProvider: React.ComponentType<ProviderProps> = props => {
	const [template, setTemplate] = useState<Template>(initial_template);
	const [template_data, setTemplateData] = useState<TemplateData>(
		initial_template_data
	);
	const [is_loading, setIsLoading] = useState(false);
	const [url, setUrl] = useState(window.location.href);
	const [layout, setLayout] = useState(initial_layout);
	const [is_ready, setIsReady] = useState(false);

	return (
		<ContextView.Provider
			value={{
				is_ready,
				setIsReady,
				template,
				setTemplate,
				template_data,
				setTemplateData,
				is_loading,
				setIsLoading,
				url,
				setUrl,
				layout,
				setLayout,
			}}
		>
			{props.children}
		</ContextView.Provider>
	);
};
