const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './src/**/*.html',
        './src/**/*.svelte'
    ],

    whitelistPatterns: [
        /svelte-/,
        /grid-cols-[1-9]+/,
        /grid-rows-[1-9]+/,
        /max-w-1\/[1-9]+/
    ],

    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const production = !process.env.ROLLUP_WATCH

module.exports = {
    plugins: [
        require('tailwindcss'),
        ...(production ? [purgecss] : [])
    ]
};