import { useEffect, useState, useRef } from "react";
import { addQueryArgs } from "@wordpress/url";
import apiFetch from "@wordpress/api-fetch";

import "./Search.styl";
import { Div } from "utils/Components";
import { getStringMatches } from "utils/tools";
import { SearchField } from "./SearchField";
import { SearchResults } from "./SearchResults";
import { ButtonSearch } from "../Buttons/ButtonSearch";

export const Search: React.ComponentType = props => {
	// We use a counter to keep track of the fetch order.
	const counter = useRef(0);
	const [query, setQuery] = useState("");
	const [fetching, setFetching] = useState(false);
	const [results, setResults] = useState<SearchResult[]>([]);
	const [writing, setWriting] = useState(true);

	// Set a timer that keeps tracks of when the user is writing.
	// This way we only fetch data when the user is no longer writing.
	useEffect(() => {
		if (query.length < 3) {
			return;
		}

		setWriting(true);

		const timer = setTimeout(() => setWriting(false), 1500);

		return () => {
			if (!timer) {
				return;
			}

			clearTimeout(timer);
		};
	}, [query]);

	// Fetch the search results.
	useEffect(() => {
		if (writing || query.length < 3) {
			return;
		}

		// Update the counter.
		counter.current = counter.current + 1;
		// Assign the local counter the value the counter had before the fetch.
		const counter_before_fetch = counter.current;

		// TODO: Set a timeout in case the request takes too long.
		const fetchResults = async () => {
			setFetching(true);

			const results = await apiFetch<SearchResultRaw[] | null>({
				path: addQueryArgs("/tamachi/v1/search", {
					query
				})
			});

			setFetching(false);

			setResults((results_prev: SearchResult[]) => {
				// If the counter is not the same these are the results from an outdated fetch.
				if (counter_before_fetch !== counter.current) {
					return results_prev;
				}

				if (!results) {
					return [];
				}

				return results
					.map(({ id, title, url, content, ancestors }) => {
						content = content.replace(/(\r\n|\n|\r)/gm, " ");

						return {
							id,
							url,
							title_raw: title,
							title: getStringMatches(title, query),
							content: getStringMatches(content, query),
							ancestors
						};
					})
					.filter(({ title, content }) => {
						return title.length || content.length;
					});
			});
		};

		fetchResults();
	}, [writing]);

	return (
		<Div
			id="search"
			className={[writing ? "writing" : null, fetching ? "fetching" : null]}
		>
			<ButtonSearch />
			<SearchField query={query} setQuery={setQuery} />
			{query.length > 2 && (
				<SearchResults
					results={results}
					writing={writing}
					fetching={fetching}
				/>
			)}
		</Div>
	);
};
