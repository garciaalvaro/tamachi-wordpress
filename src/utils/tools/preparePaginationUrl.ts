import { getPath, getQueryString, getFragment } from "@wordpress/url";

export const preparePaginationUrl = (url: string, number = 0) => {
	const path_raw = getPath(url);
	const path = path_raw ? path_raw.replace(/page\/\d+/, "") : "";
	const query_raw = getQueryString(url);
	const query = query_raw ? `?${query_raw}` : "";
	const fragment = getFragment(url) || "";

	if (!number || number === 1) {
		return `/${path}${query}${fragment}`;
	}

	return `/${path}page/${number}${query}${fragment}`;
};
