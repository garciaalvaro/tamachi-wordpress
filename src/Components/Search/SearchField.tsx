import { useEffect, useRef, Fragment } from "react";
import { __ } from "@wordpress/i18n";

import { InputRef, Label } from "utils/Components";
import { addPrefix } from "utils/tools";

interface Props {
	query: string;
	setQuery: Function;
}

export const SearchField: React.ComponentType<Props> = props => {
	const { query, setQuery } = props;
	const input_ref = useRef<HTMLInputElement | null>(null);

	// Focus the input on mount.
	useEffect(() => {
		if (!input_ref.current) {
			return;
		}

		input_ref.current.focus();
	}, []);

	return (
		<Fragment>
			<Label id="search-label" htmlFor={addPrefix("search-input")}>
				{__("Search")}
			</Label>
			<InputRef
				ref={input_ref}
				placeholder={__("Enter your search")}
				id="search-input"
				type="text"
				value={query}
				onChange={(e: any) => {
					const query = e.target.value;

					setQuery(query);
				}}
			/>
		</Fragment>
	);
};
