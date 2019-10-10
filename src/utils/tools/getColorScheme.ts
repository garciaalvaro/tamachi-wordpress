export const getColorScheme = (): Color => {
	const color = localStorage.getItem("color");

	if (color === "light" || color === "dark") {
		return color;
	}

	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
};
