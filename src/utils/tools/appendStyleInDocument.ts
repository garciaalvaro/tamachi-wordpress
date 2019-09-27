export const appendStyleInDocument = (src: string) =>
	new Promise((resolve, reject) => {
		const link = document.createElement("link");

		link.media = "all";
		link.rel = "stylesheet";
		link.href = src;

		document.head.appendChild(link);

		link.onload = resolve;
		link.onerror = reject;
	});
