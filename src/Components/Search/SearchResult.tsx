import { useContext } from "react";

import { Div, Span, A, H3 } from "utils/Components";
import { useLoadPage } from "hooks";
import { ContextSidebar } from "../Context/ContextSidebar";
import { NavigationBreadcrumbs } from "../NavigationBreadcrumbs/NavigationBreadcrumbs";

export const SearchResult: React.ComponentType<SearchResult> = props => {
	const { title, content, title_raw, url, ancestors } = props;
	const { setSearchIsOpen } = useContext(ContextSidebar);
	const loadPage = useLoadPage();

	return (
		<A
			className="post"
			href={url}
			onClick={(e: any) => {
				if (e.shiftKey || e.ctrlKey || e.metaKey) {
					return;
				}

				e.preventDefault();

				// Load the page, push the url and close the search.
				loadPage(url, true);
				setSearchIsOpen(false);
			}}
		>
			<NavigationBreadcrumbs ancestors={ancestors} use_span={true} />
			{title.length ? (
				title.map(({ before, after, result }, i) => (
					<H3 key={i} className="post-title">
						<Span className="post-title-before">{before}</Span>
						<Span className="post-title-query">{result}</Span>
						<Span className="post-title-after">{after}</Span>
					</H3>
				))
			) : (
				<H3 className="post-title">{title_raw}</H3>
			)}
			{content.map(({ before, after, result }, i) => (
				<Div key={i} className="post-content">
					<Span className="post-content-before">{before}</Span>
					<Span className="post-content-query">{result}</Span>
					<Span className="post-content-after">{after}</Span>
				</Div>
			))}
		</A>
	);
};
