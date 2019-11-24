import { version } from "../package.json";
import path from "path";

const getReplace = (search, replace) => ({
	loader: "string-replace-loader",
	options: {
		search: search,
		replace: replace,
		flags: "gm"
	}
});

export default {
	entry: path.join(__dirname, "version.entry.js"),
	output: {
		path: path.join(__dirname, ".."),
		filename: "_temp.js"
	},
	module: {
		rules: [
			{
				test: /functions\.php$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					},
					getReplace(/^( \* Version: )\d+\.\d+\.\d+/.source, `$1${version}`),
					getReplace(
						/(define.*?THEME_VERSION.*?)\d+\.\d+\.\d+/.source,
						`$1${version}`
					)
				]
			},
			{
				test: /README\.txt$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					},
					getReplace(/^(Stable tag: )\d+\.\d+\.\d+/.source, `$1${version}`)
				]
			},
			{
				test: /style\.css$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					},
					getReplace(/^(Version: )\d+\.\d+\.\d+/.source, `$1${version}`)
				]
			}
		]
	}
};
