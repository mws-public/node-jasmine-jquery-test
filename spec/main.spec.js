var jsdom = require("jsdom");
var window, $, document;


describe( 'a set of tests ', function() {
    it( "should probably test some stuff here", function() {
        expect( 1 + 1 ).toEqual( 2 );
    } );
});

describe('a set of test that depend on DOM and jquery', function() {
    var el;

    beforeEach(function(done) {
        jsdom.env(
            "<div id='placeholder'></div>div>",
            ["./bower_components/jquery/dist/jquery.js",
                "./src/main.js"],
            function (err, __window__) {
                window = __window__;
                $ = window.$;
                // this so that UI javascript that do console.log get access to node console.
                window.console = console;
                el = $('#placeholder');
                // invocation of done is significant since otherwise jasmine will not wait for the
                // initializations to complete.
                done();
            }
        );
    });

    // for expectation examples please refer to http://jasmine.github.io/2.0/introduction.html

    it('should have window to be defined', function() {
        expect(window).toBeDefined();
    });

    it('should have jquery to be defined', function() {
        expect($).toBeDefined();
    });

    it('should apply css when render is invoked', function() {
        expect(el.hasClass('test-class')).toBeFalsy();
        window.render();
        expect(el.hasClass('test-class')).toBeTruthy();
    });

    it('should should build the tree when render is invoked', function() {
        expect($("#ph1").length).toEqual(0);
        window.render();
        console.log(window.document.documentElement.outerHTML);
        expect($("#ph1").length).toEqual(1);
    });
});
