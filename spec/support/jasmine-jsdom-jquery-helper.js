var jsdom = require("jsdom");

module.exports = function(jasmine, htmlFile, callback) {
    jsdom.env({
        file: htmlFile,
        done: function (err, window) {
            if (err) {
                console.log('done' + err);
            }

            // prepare jquery instance using the window we have fixed (using jsdom)
            $ = require("../../bower_components/jquery/dist/jquery")(window);
            expect($).toBeDefined();

            // custom implementation to ensure the matchers is loaded using jquery instance we have prepared.
            jasmine.addMatchers(require('./jasmine-jquery-matchers')($));

            callback($, window);
        }
    })
};