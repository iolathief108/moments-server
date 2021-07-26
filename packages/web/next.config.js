function cssCase(config) {
    const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === 'object')
        .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
            if (
                moduleLoader.loader.includes('css-loader')
                &&
                typeof moduleLoader.options.modules === 'object'
            ) {
                moduleLoader.options = {
                    ...moduleLoader.options,
                    modules: {
                        ...moduleLoader.options.modules,
                        exportLocalsConvention: 'camelCase', // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
                    },
                };
            }
        });
    });
}

module.exports = {
    images: {
        domains: ['www.zola.lk'],
    },
    reactStrictMode: false,
    webpack: (config) => {
        cssCase(config);

        const webpack = require('webpack');
        config.plugins = config.plugins || [];
        config.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }));

        return config;
    },
};