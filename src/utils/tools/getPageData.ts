export const getPageData = (scripts: HTMLScriptElement[]) => {
	const script = scripts.find(({ src }) =>
		src.match(new RegExp("/tamachi-front.js"))
	);

	if (
		!script ||
		!script.previousElementSibling ||
		!script.previousElementSibling.innerHTML
	) {
		return {
			scripts: [],
			styles: [],
			page_data: {}
		};
	}

	const json = script.previousElementSibling.innerHTML.match(
		new RegExp("{.*:{.*:.*}}", "gm")
	);

	return {
		scripts: json && json[0] ? JSON.parse(json[0]) : [],
		styles: json && json[1] ? JSON.parse(json[1]) : [],
		page_data: json && json[2] ? JSON.parse(json[2]) : {}
	};
};
