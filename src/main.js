render = function(json) {
    var placeholder = $('#placeholder').addClass('test-class');
    $('<div id="ph1">' +
        '<div id="sh1">' +
          '<div id="ru1"></div>' +
        '</div></div>').appendTo(placeholder);
    console.log('placeholder appended with data');
};
