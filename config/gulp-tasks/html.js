import versionNumber from "gulp-version-number";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import replace from "gulp-replace";

export const html = () => {
	return app.gulp.src(`${app.path.build.html}*.html`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(
			app.plugins.if(
				app.isWebP,
				webpHtmlNosvg()
			)
		)
		.pipe(versionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to': ['css', 'js', 'img']
			},
			'output': {
				'file': 'config/version.json'
			}
		}))
		.pipe(replace('/app.min.js', 'js/app.min.js'))
		.pipe(replace('/../css/style.css', 'css/style.css'))
		.pipe(app.gulp.dest(app.path.build.html));
}
