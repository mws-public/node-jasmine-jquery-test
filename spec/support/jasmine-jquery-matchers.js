/**
 * Copied from https://raw.githubusercontent.com/unindented/jasmine-jquery-matchers/master/dist/jasmine-jquery-matchers.js
 * This was required since we require jquery with a prepared window object. Same jquery is expected to be used by
 * the jasmine-jquery-matchers as well.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = function($) { return factory($); }
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);

	var slice = Array.prototype.slice;

	var partial = function partial(func) {
	  var boundArgs = slice.call(arguments, 1);

	  return function () {
	    var args = boundArgs.concat(slice.call(arguments));
	    return func.apply(this, args);
	  };
	};

	var hasProperty = function hasProperty(actual, expected) {
	  return expected === undefined ? actual !== undefined : actual === expected;
	};

	var hasCss = function hasCss(el, css) {
	  var prop;
	  var value;
	  var $el = $(el);

	  for (prop in css) {
	    if (css.hasOwnProperty(prop)) {
	      value = css[prop];
	      if (value === 'auto' && $el.get(0).style[prop] === 'auto') {
	        continue;
	      }
	      if ($el.css(prop) !== value) {
	        return false;
	      }
	    }
	  }
	  return true;
	};

	var passes = function passes(a, b) {
	  return !a ^ !b;
	};

	var compares = function compares(func) {
	  return {
	    compare: partial(func, false),
	    negativeCompare: partial(func, true)
	  };
	};

	module.exports = {
		toHaveColumnedText: function toHaveColumnedText() {
			return compares(function (not, el, expected) {
				//var actual = $.trim($(el).text());
				var actual = $(el).map(function () {
					return $.trim($(this).text());
				}).get().join();
				if (expected && $.isFunction(expected.test)) {
					return {
						pass: passes(expected.test(actual), not),
						message: 'Expected element' + (not ? ' not' : '') + ' to have text (in Columns) matching \'' + expected + '\', but had \'' + actual + '\''
					};
				} else {
					return {
						pass: passes(actual.indexOf(expected) !== -1, not),
						message: 'Expected element' + (not ? ' not' : '') + ' to have text (in Columns) \'' + expected + '\', but had \'' + actual + '\''
					};
				}
			});
		},
	  toExist: function toExist() {
	    return compares(function (not, el) {
	      var actual = $(el).length;
	      return {
	        pass: passes(actual > 0, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to exist'
	      };
	    });
	  },

	  toHaveLength: function toHaveLength() {
	    return compares(function (not, el, expected) {
	      var actual = $(el).length;
	      return {
	        pass: passes(actual === expected, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have length ' + expected + ', but had ' + actual
	      };
	    });
	  },

	  toHaveId: function toHaveId() {
	    return compares(function (not, el, expected) {
	      var actual = $(el).attr('id');
	      return {
	        pass: passes(actual === expected, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have ID \'' + expected + '\', but had \'' + actual + '\''
	      };
	    });
	  },
		toHaveColumnedId: function toHaveColumnedId() {
			return compares(function (not, el, expected) {
				var actual = $(el).map(function () {
					return $(this).attr('id');
				}).get().join();
				return {
					pass: passes(actual === expected, not),
					message: 'Expected Columned element' + (not ? ' not' : '') + ' to have IDs \'' + expected + '\', but had \'' + actual + '\''
				};
			});
		},
	  toHaveClass: function toHaveClass() {
	    return compares(function (not, el, expected) {
	      var actual = $(el).attr('class');
	      return {
	        pass: passes($(el).hasClass(expected), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have class \'' + expected + '\', but had \'' + actual + '\''
	      };
	    });
	  },

	  toHaveTag: function toHaveTag() {
	    return compares(function (not, el, expected) {
	      var actual = $(el).prop('tagName').toLowerCase();
	      expected = expected.toLowerCase();
	      return {
	        pass: passes(actual === expected, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have tag \'' + expected + '\', but had \'' + actual + '\''
	      };
	    });
	  },

	  toHaveAttr: function toHaveAttr() {
	    return compares(function (not, el, attr, expected) {
	      var actual = $(el).attr(attr);
	      var addendum = expected !== undefined ? ' with value \'' + expected + '\'' : '';
	      return {
	        pass: passes(hasProperty(actual, expected), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have attribute \'' + attr + '\'' + addendum + ', but had \'' + actual + '\''
	      };
	    });
	  },

	  toHaveProp: function toHaveProp() {
	    return compares(function (not, el, prop, expected) {
	      var actual = $(el).prop(prop);
	      var addendum = expected !== undefined ? ' with value \'' + expected + '\'' : '';
	      return {
	        pass: passes(hasProperty(actual, expected), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have property \'' + prop + '\'' + addendum + ', but had \'' + actual + '\''
	      };
	    });
	  },

	  toHaveText: function toHaveText() {
	    return compares(function (not, el, expected) {
	      var actual = $.trim($(el).text());
	      if (expected && $.isFunction(expected.test)) {
	        return {
	          pass: passes(expected.test(actual), not),
	          message: 'Expected element' + (not ? ' not' : '') + ' to have text matching \'' + expected + '\', but had \'' + actual + '\''
	        };
	      } else {
	        return {
	          pass: passes(actual.indexOf(expected) !== -1, not),
	          message: 'Expected element' + (not ? ' not' : '') + ' to have text \'' + expected + '\', but had \'' + actual + '\''
	        };
	      }
	    });
	  },

	  toHaveData: function toHaveData() {
	    return compares(function (not, el, data, expected) {
	      var actual = $(el).data(data);
	      var addendum = expected !== undefined ? ' with value \'' + expected + '\'' : '';
	      return {
	        pass: passes(hasProperty(actual, expected), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have data \'' + data + '\'' + addendum + ', but had \'' + actual + '\''
	      };
	    });
	  },

	  toHaveValue: function toHaveValue() {
	    return compares(function (not, el, expected) {
	      var actual = $(el).val();
	      return {
	        pass: passes(actual === expected, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have value \'' + expected + '\', but had \'' + actual + '\''
	      };
	    });
	  },

	  toHaveCss: function toHaveCss() {
	    return compares(function (not, el, expected) {
	      return {
	        pass: passes(hasCss(el, expected), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to have CSS ' + jasmine.pp(expected)
	      };
	    });
	  },

	  toBeChecked: function toBeChecked() {
	    return compares(function (not, el) {
	      return {
	        pass: passes($(el).is(':checked'), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be checked'
	      };
	    });
	  },

	  toBeDisabled: function toBeDisabled() {
	    return compares(function (not, el) {
	      return {
	        pass: passes($(el).is(':disabled'), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be disabled'
	      };
	    });
	  },

	  toBeEmpty: function toBeEmpty() {
	    return compares(function (not, el) {
	      return {
	        pass: passes($(el).is(':empty'), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be empty'
	      };
	    });
	  },

	  toBeHidden: function toBeHidden() {
	    return compares(function (not, el) {
	      return {
	        pass: passes($(el).is(':hidden'), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be hidden'
	      };
	    });
	  },

	  toBeSelected: function toBeSelected() {
	    return compares(function (not, el) {
	      return {
	        pass: passes($(el).is(':selected'), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be selected'
	      };
	    });
	  },

	  toBeVisible: function toBeVisible() {
	    return compares(function (not, el) {
	      return {
	        pass: passes($(el).is(':visible'), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be visible'
	      };
	    });
	  },

	  toBeFocused: function toBeFocused() {
	    return compares(function (not, el) {
	      el = $(el).get(0);
	      return {
	        pass: passes(el === el.ownerDocument.activeElement, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be focused'
	      };
	    });
	  },

	  toBeInDom: function toBeInDom() {
	    return compares(function (not, el) {
	      el = $(el).get(0);
	      return {
	        pass: passes($.contains(document.documentElement, el), not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be attached to the DOM'
	      };
	    });
	  },

	  toBeMatchedBy: function toBeMatchedBy() {
	    return compares(function (not, el, expected) {
	      var actual = $(el).filter(expected).length;
	      return {
	        pass: passes(actual > 0, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to be matched by \'' + expected + '\''
	      };
	    });
	  },

	  toHaveDescendant: function toHaveDescendant() {
	    return compares(function (not, el, selector) {
	      var actual = $(el).find(selector).length;
	      return {
	        pass: passes(actual > 0, not),
	        message: 'Expected element' + (not ? ' not' : '') + ' to contain child \'' + selector + '\''
	      };
	    });
	  },

	  toHaveDescendantWithText: function toHaveDescendantWithText() {
	    return compares(function (not, el, selector, expected) {
	      var actual = $.trim($(el).find(selector).text());
	      if (expected && $.isFunction(expected.test)) {
	        return {
	          pass: passes(expected.test(actual), not),
	          message: 'Expected element' + (not ? ' not' : '') + ' to have descendant \'' + selector + '\' with text matching \'' + expected + '\', but had \'' + actual + '\''
	        };
	      } else {
	        return {
	          pass: passes(actual.indexOf(expected) !== -1, not),
	          message: 'Expected element' + (not ? ' not' : '') + ' to have descendant \'' + selector + '\' with text \'' + expected + '\', but had \'' + actual + '\''
	        };
	      }
	    });
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;