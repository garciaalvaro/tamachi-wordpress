import { useContext, useRef } from "react";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

import { getPageData, preparePageData } from "utils/tools";
import { useAddScripts } from "./useAddScripts";
import { useAddStyles } from "./useAddStyles";
import { ContextContent } from "Components/Context/ContextContent";
import { ContextView } from "Components/Context/ContextView";

export const useLoadPage = () => {
	// We use a counter to keep track of the fetch order.
	const counter = useRef(0);
	const {
		setIsLoading,
		setTemplate,
		setTemplateData,
		setLayout,
		setUrl
	} = useContext(ContextView);
	const { setContent, setTitle } = useContext(ContextContent);
	const addScripts = useAddScripts();
	const addStyles = useAddStyles();

	const updatePage = (html_string: string) => {
		const html = new DOMParser().parseFromString(html_string, "text/html");

		const document_title = html.getElementsByTagName("title")[0]
			.textContent;

		if (document_title) {
			document.title = document_title;
		}

		const content =
			html.getElementById("tamachi-home") ||
			html.getElementById("tamachi-archive") ||
			html.getElementById("tamachi-post-content");
		const title = html.getElementById("tamachi-post-title");

		setContent(content ? content.innerHTML : "");
		setTitle(title ? title.textContent : "");

		const scripts_raw = html.getElementsByTagName("script");

		if (scripts_raw) {
			const { scripts, styles, page_data } = getPageData([
				...scripts_raw
			]);

			addScripts(scripts);
			addStyles(styles);

			const { template, template_data, layout } = preparePageData(
				page_data
			);

			setTemplate(template);
			setTemplateData(template_data);
			setLayout(layout);
		}

		setIsLoading(false);
	};

	const fetchHtml = async (url: string) => {
		setIsLoading(true);

		const html = await apiFetch({
			parse: false,
			url
		})
			.then(response => response.text())
			.catch(() => {
				// Error 404
				setIsLoading(false);
				setTemplate("error404");
				setContent(
					__(
						"It looks like nothing was found at this location. " +
							"Maybe try one of the links in the sidebar or a search?"
					)
				);
				setTitle(__("Oops! That page can't be found."));

				const { template, template_data, layout } = preparePageData();

				setTemplate(template);
				setTemplateData(template_data);
				setLayout(layout);
			});

		return html;
	};

	const loadPage = async (url: string, push_url = false) => {
		if (push_url) {
			window.history.pushState({}, "", url);
		}

		setUrl(url);

		// Update the counter.
		counter.current = counter.current + 1;
		// Assign the local counter the value the counter had before the fetch.
		const counter_before_fetch = counter.current;

		// TODO: Set a timeout in case the request takes too long.
		const html = await fetchHtml(url);

		// If the counter is not the same these are the results from an outdated fetch.
		if (!html || counter_before_fetch !== counter.current) return;

		updatePage(html);
	};

	return loadPage;
};
