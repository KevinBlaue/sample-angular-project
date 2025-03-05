module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false, // Do not clear the output on test failures
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
        },
        reporters: ['dots', 'coverage'], // Use 'dots' to reduce logs in CI
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false, // No file watching
        browsers: ['ChromeHeadlessNoSandbox'], // Custom launcher
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu'], // Required for CI
            },
        },
        singleRun: true, // Exit after tests
        restartOnFileChange: false, // No restart on file changes
    });
};
