import { useEffect, useContext } from "react";
import produce from "immer";
import { forOwn } from "lodash";

import { ContextScripts } from "Components/Context/ContextScripts";
import { appendStyleInDocument } from "utils/tools/appendStyleInDocument";

export const useHandleStyles = () => {
	const { styles, setStyles } = useContext(ContextScripts);

	const updateLoadedStyle = (id: Style["id"]) =>
		setStyles((styles: Styles) =>
			produce(styles, draft_styles => {
				const style = draft_styles[id];

				if (!style) return;

				style.is_loaded = true;
			})
		);

	useEffect(() => {
		forOwn(styles, style => {
			const { id, src, is_loaded } = style;

			if (is_loaded) return;

			// Update loaded style props
			if (!src) {
				updateLoadedStyle(id);
			} else {
				// Load style in the page
				appendStyleInDocument(src)
					// Update loaded style props
					.then(() => updateLoadedStyle(id));
			}
		});
	}, [styles]);
};
