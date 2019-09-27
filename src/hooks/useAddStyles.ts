import { useContext } from "react";
import produce from "immer";
import { forOwn } from "lodash";

import { ContextScripts } from "Components/Context/ContextScripts";

export const useAddStyles = () => {
	const { setStyles } = useContext(ContextScripts);

	const addStyles = (styles_new: Styles, belongs_to_entry_page = false) =>
		setStyles((styles: Styles) =>
			produce(styles, draft_styles => {
				forOwn(styles_new, style => {
					const style_old = draft_styles[style.id];

					if (style_old) {
						return;
					}

					draft_styles[style.id] = {
						...style,
						is_loaded: belongs_to_entry_page
					};
				});
			})
		);

	return addStyles;
};
