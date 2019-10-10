import { name, version, description, homepage } from "../package.json";
import { BannerPlugin, DefinePlugin, ProvidePlugin } from "webpack";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import nib from "nib";
import path from "path";

export default {
	entry: {
		front: "./src/index-front.ts",
		"front-color": "./src/index-front-color.ts"
	},
	output: {
		path: path.join(__dirname, "../build"),
		filename: `${name}-[name].js`
	},
	resolve: {
		alias: {
			Components: __dirname + "/../src/Components",
			hooks: __dirname + "/../src/hooks",
			utils: __dirname + "/../src/utils"
		}
	},
	externals: {
		tamachi: "tamachi",
		lodash: "lodash",
		"@wordpress/api-fetch": "wp.apiFetch",
		"@wordpress/dom-ready": "wp.domReady",
		"@wordpress/i18n": "wp.i18n",
		"@wordpress/url": "wp.url"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { url: false }
					},
					{
						loader: "stylus-loader",
						options: {
							use: [nib()],
							import: [
								"~nib/index.styl",
								path.join(__dirname, "../src/utils/data/stylus_variables.styl")
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			l: (...args) => console.log(...args)
		}),
		new ProvidePlugin({
			React: "react"
		}),
		new MiniCssExtractPlugin({
			filename: `${name}-[name].css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				`/*! react | https://github.com/facebook/react | Facebook, Inc. and its affiliates | MIT License */`,
				`/*! SimpleBar | https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react | Adrien Denat | MIT License */`,
				`/*! immer | https://github.com/mweststrate/immer | Michel Weststrate | MIT License */`,
				`/*! dompurify | https://github.com/cure53/DOMPurify | Mario Heiderich | MPL-2.0 OR Apache-2.0 */`
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: [
				`${description} | ${version} | ${homepage}`,
				`/*! SimpleBar | https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react | Adrien Denat | MIT License */`
			].join(""),
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};
