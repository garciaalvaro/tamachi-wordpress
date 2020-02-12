import { useContext } from "react";
import produce from "immer";
import { forOwn } from "lodash";

import { ContextScripts } from "Components/Context/ContextScripts";

export const useAddStyles = () => {
	const { setStyles } = useContext(ContextScripts);

	const addStyles = (styles_new: StylesRaw, belongs_to_entry_page = false) =>
		setStyles((styles: Styles) =>
			produce(styles, draft_styles => {
				forOwn(styles_new, style_raw => {
					const style_old = draft_styles[style_raw.id];

					if (style_old) return;

					const { id, deps, src } = style_raw;

					draft_styles[id] = {
						id,
						deps,
						src,
						is_loading: true,
						is_loaded: belongs_to_entry_page
					};
				});
			})
		);

	return addStyles;
};
