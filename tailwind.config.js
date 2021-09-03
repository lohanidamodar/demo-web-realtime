module.exports = {
	purge: {
		enable : true,
		content: ['./index.html', './src/**/*.{svelte,js,ts}'],
		options : {
		safelist: [/^w-/, /^bg-[a-z]*-*/]
		},
	  },
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}