import { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import { __ } from "@wordpress/i18n";

import { DivRef, Span } from "utils/Components";
import { useWindowSize } from "utils/hooks";
import { SearchResult } from "./SearchResult";

interface Props {
	results: SearchResult[];
	writing: boolean;
	fetching: boolean;
}

export const SearchResults: React.ComponentType<Props> = props => {
	const { results, writing, fetching } = props;
	const { window_height } = useWindowSize();
	const [height, setHeight] = useState(85);
	const search_ref = useRef<HTMLDivElement | null>(null);

	// When the displayed message or the results change we need to update SimpleBars height.
	useEffect(() => {
		if (!search_ref.current) return;

		const simplebar_content = search_ref.current.querySelector(
			".simplebar-content"
		);

		const height = simplebar_content ? simplebar_content.clientHeight : 0;

		// Set a maximum and a minimum height.
		setHeight(
			Math.max(
				85,
				Math.min(
					window_height - /* top */ 140 - /* bottom */ 30,
					height
				)
			)
		);
	}, [writing, results.map(({ id }) => id).join("")]);

	return (
		<DivRef ref={search_ref} id="search-results">
			<SimpleBar style={{ height }} options={{ autoHide: false }}>
				{!!results.length ? (
					results.map(result => (
						<SearchResult key={result.id} {...result} />
					))
				) : (
					<Span className="search-info">
						{writing || fetching
							? __("Searching...")
							: __("No results.")}
					</Span>
				)}
			</SimpleBar>
		</DivRef>
	);
};
