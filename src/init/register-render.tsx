import ReactDOM from "react-dom";
import domReady from "@wordpress/dom-ready";

import { App } from "Components/App/App";
import { Context } from "Components/Context/Context";

// Wait for the DOM to be ready so other plugins can modify the HTML.
domReady(() => {
	const app = document.getElementById("tamachi-app");

	// Remove all spaces between HTML tags so hydrate works correctly.
	if (app) {
		app.outerHTML = app.outerHTML
			// https://stackoverflow.com/a/40026669 | CC BY-SA 3.0
			.replace(
				/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g,
				"$1$3 "
			)
			.replace(/> </g, "><");
	}

	ReactDOM.hydrate(
		<Context>
			<App />
		</Context>,
		document.getElementById("tamachi-app")
	);
});
