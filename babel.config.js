module.exports = exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: "last 20 versions",
				useBuiltIns: 'entry',
			},
		],
	]
}