import { useContext, useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import { times, last } from "lodash";

import "./NavigationPagination.styl";
import { Div, Span } from "utils/Components";
import { preparePaginationUrl } from "utils/tools";
import { ContextView } from "../Context/ContextView";
import { NavigationPaginationItem } from "./NavigationPaginationItem";

export const NavigationPagination: React.ComponentType = () => {
	const { template_data } = useContext(ContextView);
	const { pages_total, page_current } = template_data;
	// We use an object that stores all the page objects
	const [pages, setPages] = useState<PaginationItem[]>([]);
	// Depending on the current page we store the
	// visible (previously commented) pages in an object.
	const [pages_visible, setPagesVisible] = useState<PaginationItem[]>([]);
	// First and Last page links will display if the first and last page is not shown.
	const [first_page, setFirstPage] = useState<number | null>(null);
	const [last_page, setLastPage] = useState<number | null>(null);

	// Update the pages once the pages_total variable has been loaded.
	useEffect(() => {
		const url = window.location.href;

		setPages(
			times(pages_total, index => ({
				number: index + 1,
				url: preparePaginationUrl(url, index + 1),
			}))
		);
	}, [pages_total]);

	// Update the visible pages once the pages object has been filled.
	useEffect(() => {
		if (!pages.length) return;

		const offset = 3;
		const start = Math.max(0, page_current - offset);
		const end = Math.min(pages_total, page_current + offset - 1);

		setPagesVisible(pages.slice(start, end));
	}, [pages, page_current]);

	// Update the first and last page links based on the current page.
	useEffect(() => {
		if (!pages.length || !pages_visible.length) {
			setFirstPage(null);
			setLastPage(null);

			return;
		}

		const last_page = last(pages);
		const last_visible_page = last(pages_visible);
		const first_visible_page = pages_visible[0];

		setFirstPage(first_visible_page.number !== 1 ? 1 : null);
		setLastPage(
			last_visible_page &&
				last_page &&
				last_visible_page.number !== last_page.number
				? last_page.number
				: null
		);
	}, [pages, page_current, pages_visible]);

	return (
		<Div id="navigation-pagination">
			<Span id="navigation-pagination-label">{__("Page")}</Span>
			<Div id="navigation-pagination-links">
				{first_page && (
					<NavigationPaginationItem
						{...pages[first_page - 1]}
						is_first={true}
					/>
				)}
				{pages_visible.map(item => (
					<NavigationPaginationItem
						key={item.number}
						{...item}
						is_active={page_current === item.number}
					/>
				))}
				{last_page && (
					<NavigationPaginationItem
						{...pages[last_page - 1]}
						is_last={true}
					/>
				)}
			</Div>
		</Div>
	);
};
