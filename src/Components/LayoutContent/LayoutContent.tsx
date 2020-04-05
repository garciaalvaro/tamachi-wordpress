import { useContext, useRef, useEffect } from "react";
import { getAuthority } from "@wordpress/url";

import { DivRef } from "utils/Components";
import { addPrefix } from "utils/tools";
import { useLoadPage } from "hooks";
import { ContextContent } from "../Context/ContextContent";
import { ContextView } from "../Context/ContextView";

interface Props {
	id: string;
}

export const LayoutContent: React.ComponentType<Props> = props => {
	const { content } = useContext(ContextContent);
	const { is_loading } = useContext(ContextView);
	const { id } = props;
	const content_ref = useRef<HTMLDivElement | null>(null);
	const loadPage = useLoadPage();

	// If the block melonpan-block-post-list is in use,
	// add event listeners to its links to load the posts dynamically.
	useEffect(() => {
		if (!content_ref.current || is_loading) return;

		const links = content_ref.current.querySelectorAll("a");

		[...links].forEach(link =>
			link.addEventListener("click", (e: MouseEvent) => {
				if (e.shiftKey || e.ctrlKey || e.metaKey) return;

				const href = link.getAttribute("href") || "";

				if (
					!getAuthority(href) ||
					getAuthority(window.location.href) === getAuthority(href)
				) {
					e.preventDefault();

					link.classList.add(addPrefix("is_active"));

					loadPage(href, true);
				}
			})
		);
	}, [is_loading]);

	return (
		<DivRef
			id={id}
			ref={content_ref}
			dangerouslySetInnerHTML={{
				// content is already sanitized. See ContextContent setContent.
				__html: content,
			}}
		/>
	);
};
