// console.log shortcut
declare const l: Function;

// As we are using webpack ProvidePlugin to avoid
// explicitly importing react in every file we need to declare it.
declare const React: typeof import("react");

interface ComponentProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;
	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
	children?: import("react").ReactNode;
}

type Color = "light" | "dark";

type PageData = {
	template: Template;
	template_data: TemplateData;
	layout: Layout;
};

type PageDataRaw = {
	template: Template;
	template_data: Partial<TemplateData>;
	layout: Layout;
};

type Layout = "home" | "singular" | "archive";

type Template =
	| "home"
	| "search"
	| "author"
	| "post_type"
	| "date"
	| "taxonomy"
	| "error404"
	| "singular"
	| "error404";

type TemplateData = {
	next: { title: string; url: string } | null;
	post_id: number;
	post_type: string;
	ancestors: Item[];
	site_title: string;
	query: string;
	name: string;
	items: Item[];
	page_current: number;
	pages_total: number;
};

type TemplateDataRaw = Partial<TemplateData>;

type SearchResultRaw = {
	id: number;
	title: string;
	url: string;
	content: string;
	ancestors: Item[];
};

type SearchResult = {
	id: number;
	url: string;
	title_raw: string;
	title: { before: string; after: string; result: string }[];
	content: { before: string; after: string; result: string }[];
	ancestors: Item[];
};

type Menu = MenuItem[];

type Item = {
	id: number | string;
	title: string;
	url: string;
};

type MenuItem = {
	id: number;
	title: string;
	ancestor_is_closed: boolean;
	is_open: boolean;
	is_active: boolean;
	has_children: boolean;
	url: string;
	ancestors_id: number[];
	post_id: number;
};

type MenuItemRaw = {
	ID: number;
	title: string;
	menu_item_parent: string;
	type: string;
	url: string;
	object_id: string;
};

type MenuRaw = MenuItemRaw[];

type ScriptRaw = {
	deps: string[];
	src: string;
	is_reexecutable: boolean;
	id: string;
};

type Script = ScriptRaw & {
	deps_loaded: string[];
	is_loaded: boolean;
	is_loading: boolean;
};

type Scripts = Record<string, Script>;

type ScriptsRaw = Record<string, ScriptRaw>;

type StyleRaw = {
	deps: string[];
	src: string;
	id: string;
};

type Style = StyleRaw & {
	is_loaded: boolean;
	is_loading: boolean;
};

type Styles = Record<string, Style>;

type StylesRaw = Record<string, StyleRaw>;

type PaginationItem = {
	number: number;
	url: string;
};
