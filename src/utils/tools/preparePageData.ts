import { defaults } from "lodash";

const layout_default = "singular";
const template_default = "error404";
const template_data_default = {
	post_id: 0,
	post_type: "",
	next: null,
	ancestors: [],
	page_current: 1,
	pages_total: 1,
	site_title: "",
	query: "",
	name: "",
	items: [],
};

export const preparePageData = (page_data?: PageDataRaw): PageData => {
	if (!page_data) {
		return {
			layout: layout_default,
			template: template_default,
			template_data: template_data_default,
		};
	}

	const { template, template_data, layout } = page_data;

	return {
		layout: layout || layout_default,
		template: template || template_default,
		template_data: defaults<
			PageDataRaw["template_data"],
			PageData["template_data"]
		>(template_data, template_data_default),
	};
};
