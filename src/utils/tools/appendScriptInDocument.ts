export const appendScriptInDocument = (src: string) =>
	new Promise((resolve, reject) => {
		const script = document.createElement("script");

		script.async = true;
		script.src = src;

		document.head.appendChild(script);

		script.onload = resolve;
		script.onerror = reject;
	});
