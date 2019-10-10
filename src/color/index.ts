const color_raw = localStorage.getItem("color");
const color: Color =
	color_raw === "light" || color_raw === "dark"
		? color_raw
		: window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";

document.documentElement.classList.add(`tamachi-color-${color}`);
