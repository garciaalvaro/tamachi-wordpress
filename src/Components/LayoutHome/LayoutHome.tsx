import { useRef, useEffect } from "react";

import "./LayoutHome.styl";
import { addPrefix } from "utils/tools";
import { useLoadPage } from "hooks";
import { LayoutHomeContent } from "./LayoutHomeContent";

export const LayoutHome: React.ComponentType = props => {
	const content_ref = useRef<HTMLDivElement | null>(null);
	const loadPage = useLoadPage();

	// If the block melonpan-block-post-list is in use,
	// add event listeners to its links to load the posts dynamically.
	useEffect(() => {
		if (!content_ref.current) {
			return;
		}

		const links = content_ref.current.querySelectorAll(
			".wp-block-melonpan-block-post-list a"
		);
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

	return <LayoutHomeContent ref={content_ref} />;
};
