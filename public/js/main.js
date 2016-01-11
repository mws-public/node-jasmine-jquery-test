(function () {
    var factory = function factory($) {
        render = function (json) {
            var placeholder = $('#placeholder').addClass('test-class');
            $('<div id="ph1">' +
                '<div id="sh1">' +
                '<div id="ru1"></div>' +
                '</div></div>').appendTo(placeholder);
            console.log('placeholder appended with data');
        };

        return {
            render: render
        }
    };
    if (typeof module === "object") { // for the node environment
        module.exports = factory;
    } else { // for the browser environment.
        this.Main = factory(this.$); // this will be the window.
    }
})();