// autoprefixer configuration based on Bootstrap 4 defaults
var autoprefixerBrowsers = require('bootstrap/package.json').browserslist;

module.exports = {
    plugins: {
        'rucksack-css': {},
        'lost': {},
        'precss': {},
        'autoprefixer': { browsers: autoprefixerBrowsers},
        'cssnano': {}
    }
};