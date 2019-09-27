import { useRef, useEffect, Fragment, useContext } from "react";

import "./LayoutArchive.styl";
import { addPrefix } from "utils/tools";
import { useLoadPage } from "hooks";
import { LayoutArchiveContent } from "./LayoutArchiveContent";
import { NavigationPagination } from "../NavigationPagination/NavigationPagination";
import { LayoutArchiveToolbar } from "./LayoutArchiveToolbar";
import { ContextView } from "../Context/ContextView";

export const LayoutArchive: React.ComponentType = props => {
	const { template_data, is_ready } = useContext(ContextView);
	const { pages_total } = template_data;
	const content_ref = useRef<HTMLDivElement | null>(null);
	const loadPage = useLoadPage();

	// Add event listeners to archive links to load the content dynamically.
	useEffect(() => {
		if (!content_ref.current) {
			return;
		}

		const links = content_ref.current.querySelectorAll(".tamachi-post-link");

		[...links].forEach(link =>
			link.addEventListener("click", (e: any) => {
				if (e.shiftKey || e.ctrlKey || e.metaKey) {
					return;
				}

				e.preventDefault();

				link.classList.add(addPrefix("is_active"));

				const href = link.getAttribute("href");

				if (href) {
					loadPage(href, true);
				}
			})
		);
	}, []);

	return (
		<Fragment>
			<LayoutArchiveToolbar />
			<LayoutArchiveContent ref={content_ref} />
			{is_ready && pages_total > 1 && <NavigationPagination />}
		</Fragment>
	);
};
