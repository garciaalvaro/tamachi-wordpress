import { useState, createContext } from "react";
import DOMPurify from "dompurify";
import { noop } from "lodash";

interface ProviderProps {
	children: React.ReactElement;
}

interface ContextProps {
	title: string;
	setTitle: Function;
	content: string;
	setContent: Function;
}

export const ContextContent = createContext<ContextProps>({
	title: "",
	setTitle: noop,
	content: "",
	setContent: noop
});

const getTitle = () => {
	const title = document.getElementById("tamachi-post-title");

	if (!title) {
		return "";
	}

	return title.textContent || "";
};

const getContent = () => {
	const content =
		document.getElementById("tamachi-home") ||
		document.getElementById("tamachi-archive") ||
		document.getElementById("tamachi-post-content");

	if (!content) {
		return "";
	}

	return content.innerHTML;
};

export const ContextContentProvider: React.ComponentType<
	ProviderProps
> = props => {
	const [title, setTitle] = useState(getTitle());
	const [content, setContent] = useState(getContent());

	return (
		<ContextContent.Provider
			value={{
				title,
				setTitle,
				content,
				// Sanitize the given HTML string, as it will be used raw.
				setContent: (content: string) =>
					setContent(DOMPurify.sanitize(content, { ADD_ATTR: ["target"] }))
			}}
		>
			{props.children}
		</ContextContent.Provider>
	);
};
