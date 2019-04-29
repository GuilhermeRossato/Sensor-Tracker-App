module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		"angular": "readonly",
		"__dirname": "readonly",
		"process": "readonly",
		"before": "readonly",
		"describe": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"plugins": [
		"eslint-plugin-angular"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-console": "off",
		"no-undef": "off",
	}
};