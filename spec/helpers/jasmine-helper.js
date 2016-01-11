module.exports = function(jasmine) {
    var reporters = require('jasmine-reporters');
    var junitReporter = new reporters.JUnitXmlReporter({
        savePath: __dirname
    });
    jasmine.getEnv().addReporter(junitReporter);
};