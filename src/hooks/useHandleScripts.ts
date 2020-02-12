import { useEffect, useContext } from "react";
import produce from "immer";
import { forOwn } from "lodash";

import { ContextScripts } from "Components/Context/ContextScripts";
import { appendScriptInDocument } from "utils/tools/appendScriptInDocument";

export const useHandleScripts = () => {
	const { scripts, setScripts } = useContext(ContextScripts);

	const updateLoadedScript = (id: Script["id"]) =>
		setScripts((scripts: Scripts) =>
			produce(scripts, draft_scripts => {
				const script = draft_scripts[id];

				if (!script) return;

				script.is_loading = false;
				script.is_loaded = true;

				forOwn(draft_scripts, script => {
					if (!script.deps.includes(id)) return;

					script.deps_loaded.push(id);
				});
			})
		);

	const updateLoadingScript = (id: Script["id"]) =>
		setScripts((scripts: Scripts) =>
			produce(scripts, draft_scripts => {
				const script = draft_scripts[id];

				if (!script) return;

				script.is_loading = true;
			})
		);

	useEffect(() => {
		forOwn(scripts, script => {
			const {
				id,
				src,
				is_loaded,
				is_loading,
				deps,
				deps_loaded
			} = script;

			if (is_loading || is_loaded || deps_loaded.length !== deps.length)
				return;

			// Update loaded script props
			if (!src) {
				updateLoadedScript(id);
			} else {
				updateLoadingScript(id);

				// Load script in the page
				appendScriptInDocument(src)
					// Update loaded script props
					.then(() => updateLoadedScript(id));
			}
		});
	}, [scripts]);
};
