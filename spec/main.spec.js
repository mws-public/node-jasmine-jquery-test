describe('a set of tests that depend on DOM and jquery', function() {
    var Main;
    var el;
    var $;

    beforeEach(function(done) {
        require("./support/jasmine-jsdom-jquery-helper")(jasmine, "public/main.html", function(__$__, __window__) {
            // $ is required for use in preparing system under test, window could also be required.
            // $ is also used in tests, If document is required it would be under window.
            $ = __$__;
            Main = require('../public/js/main')($);
            expect(Main).toBeDefined();
            el = $("#placeholder");
            done();
        });
    });

    // for expectation examples please refer to http://jasmine.github.io/2.0/introduction.html

    it('should have jquery to be defined', function() {
        expect($).toBeDefined();
    });

    it('should apply css when render is invoked', function() {
        expect(el).not.toHaveClass('test-class');
        Main.render();
        expect(el).toHaveClass('test-class');
    });

    it('should should build the tree when render is invoked', function() {
        var phEl = $("#ph1");
        expect(phEl).not.toBeInDom();
        Main.render();
        expect(phEl).toBeInDom();
    });
});
