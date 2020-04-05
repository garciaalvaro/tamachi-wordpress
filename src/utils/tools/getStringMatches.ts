import { times } from "lodash";

export const getStringMatches = (
	string: string,
	search_value: string,
	offset = 30
) => {
	const results: SearchResult["content"] = [];
	const string_length = string.length;
	const search_value_length = search_value.length;
	let from_index = 0;

	const string_lowercase = string.toLowerCase();
	const search_value_lowercase = search_value.toLowerCase();

	times(10, () => {
		const index = string_lowercase.indexOf(
			search_value_lowercase,
			from_index
		);

		if (index === -1) {
			return false;
		}

		from_index = index + 1;

		const before_index = Math.max(0, index - offset);
		const after_index = Math.min(
			string_length,
			index + search_value_length + offset
		);

		results.push({
			result: string.substring(index, index + search_value_length),
			before:
				before_index > 0
					? `...${string.substring(before_index, index)}`
					: string.substring(before_index, index),
			after:
				after_index < string_length
					? `${string.substring(
							index + search_value_length,
							after_index
					  )}...`
					: string.substring(
							index + search_value_length,
							after_index
					  ),
		});
	});

	return results;
};
