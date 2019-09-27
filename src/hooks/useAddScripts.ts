import { useContext } from "react";
import produce from "immer";
import { forOwn, uniq } from "lodash";

import { ContextScripts } from "Components/Context/ContextScripts";

const entry_page_script_ids = [
	"lodash",
	"tamachi-front",
	"tamachi-front-color",
	"wp-api-fetch",
	"wp-dom-ready",
	"wp-hooks",
	"wp-i18n",
	"wp-polyfill",
	"wp-url"
];

export const useAddScripts = () => {
	const { setScripts } = useContext(ContextScripts);

	const addScripts = (scripts_new: ScriptsRaw) =>
		setScripts((scripts_old: Scripts) =>
			produce(scripts_old, draft_scripts_old => {
				// Loop the new scripts.
				forOwn(scripts_new, script_new => {
					let { id, deps, is_reexecutable } = script_new;
					let is_loaded = entry_page_script_ids.includes(id);
					let is_loading = false;
					const script_old = draft_scripts_old[id];

					// If the script was already registered.
					if (script_old) {
						// Update the new deps with the old ones.
						deps = uniq([...deps, ...script_old.deps]);

						// Unload script.
						is_loaded = script_old.is_reexecutable
							? false
							: script_old.is_loaded;
						is_loading = script_old.is_loading;
					}

					draft_scripts_old[id] = {
						...script_new,
						deps,
						is_loaded,
						is_loading,
						is_reexecutable,
						deps_loaded: []
					};
				});

				forOwn(scripts_new, script_new => {
					const script = draft_scripts_old[script_new.id];

					const deps_loaded = script.deps.filter(dep => {
						const script = draft_scripts_old[dep];

						if (!script || !script.is_loaded) {
							return false;
						}

						return true;
					});

					draft_scripts_old[script.id] = {
						...draft_scripts_old[script.id],
						deps_loaded
					};
				});
			})
		);

	return addScripts;
};
