// console.log shortcut
declare const l: Function;

// As we are using webpack ProvidePlugin to avoid
// explicitly importing react in every file we need to declare it.
declare const React: typeof import("react");

// simplebar-react
declare module "simplebar-react";

interface Object {
	[key: string]: any;
}

type Color = "light" | "dark";

interface PageData {
	template: Template;
	template_data: TemplateData;
	layout: Layout;
}

interface PageDataRaw {
	template: Template;
	template_data: Partial<TemplateData>;
	layout: Layout;
}

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

interface ComponentProps extends Object {
	children?: React.ReactNode;
	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
}

type Layout = "home" | "singular" | "archive";

interface TemplateData {
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
}

interface TemplateDataRaw extends Partial<TemplateData> {}

interface SearchResultRaw {
	id: number;
	title: string;
	url: string;
	content: string;
	ancestors: Item[];
}

interface SearchResult {
	id: number;
	url: string;
	title_raw: string;
	title: { before: string; after: string; result: string }[];
	content: { before: string; after: string; result: string }[];
	ancestors: Item[];
}

type Menu = MenuItem[];

interface Item {
	id: number | string;
	title: string;
	url: string;
}

interface MenuItem {
	id: number;
	title: string;
	ancestor_is_closed: boolean;
	is_open: boolean;
	is_active: boolean;
	has_children: boolean;
	url: string;
	ancestors_id: number[];
	post_id: number;
}

interface MenuItemRaw {
	ID: number;
	title: string;
	menu_item_parent: string;
	type: string;
	url: string;
	object_id: string;
}

type MenuRaw = MenuItemRaw[];

interface Script {
	deps: string[];
	deps_loaded: string[];
	src: string;
	is_reexecutable: boolean;
	is_loaded: boolean;
	is_loading: boolean;
	id: string;
}

interface ScriptRaw {
	deps: string[];
	src: string;
	is_reexecutable: boolean;
	id: string;
}

interface Scripts {
	[id: string]: Script;
}

interface ScriptsRaw {
	[id: string]: ScriptRaw;
}

interface Style {
	deps: string[];
	src: string;
	is_loaded: boolean;
	is_loading: boolean;
	id: string;
}

interface StyleRaw {
	deps: string[];
	src: string;
	id: string;
}

interface Styles {
	[id: string]: Style;
}

interface StylesRaw {
	[id: string]: StyleRaw;
}

interface PaginationItem {
	number: number;
	url: string;
}
