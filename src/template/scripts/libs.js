/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/**
 * jquery.mask.js
 * @version: v1.14.15
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at github.com/igorescobar/jQuery-Mask-Plugin
 *
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {
    'use strict';

    var Mask = function (el, mask, options) {

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', -p.val().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) {}
            },
            setCaret: function(pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        // Firefox, WebKit, etc..
                        if (ctrl.setSelectionRange) {
                            ctrl.setSelectionRange(pos, pos);
                        } else { // IE
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) {}
            },
            events: function() {
                el
                .on('keydown.mask', function(e) {
                    el.data('mask-keycode', e.keyCode || e.which);
                    el.data('mask-previus-value', el.val());
                    el.data('mask-previus-caret-pos', p.getCaret());
                    p.maskDigitPosMapOld = p.maskDigitPosMap;
                })
                .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
                .on('paste.mask drop.mask', function() {
                    setTimeout(function() {
                        el.keydown().keyup();
                    }, 100);
                })
                .on('change.mask', function(){
                    el.data('changed', true);
                })
                .on('blur.mask', function(){
                    if (oldValue !== p.val() && !el.data('changed')) {
                        el.trigger('change');
                    }
                    el.data('changed', false);
                })
                // it's very important that this callback remains in this position
                // otherwhise oldValue it's going to work buggy
                .on('blur.mask', function() {
                    oldValue = p.val();
                })
                // select all text on focus
                .on('focus.mask', function (e) {
                    if (options.selectOnFocus === true) {
                        $(e.target).select();
                    }
                })
                // clear the value if it not complete the mask
                .on('focusout.mask', function() {
                    if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                       p.val('');
                   }
                });
            },
            getRegexMask: function() {
                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < mask.length; i++) {
                    translation = jMask.translation[mask.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskChunks.push(mask.charAt(i));
                            oRecursive = {digit: mask.charAt(i), pattern: pattern};
                        } else {
                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                         .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function() {
                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
            },
            val: function(v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            calculateCaretPosition: function() {
                var oldVal = el.data('mask-previus-value') || '',
                    newVal = p.getMasked(),
                    caretPosNew = p.getCaret();
                if (oldVal !== newVal) {
                    var caretPosOld = el.data('mask-previus-caret-pos') || 0,
                        newValL = newVal.length,
                        oldValL = oldVal.length,
                        maskDigitsBeforeCaret = 0,
                        maskDigitsAfterCaret = 0,
                        maskDigitsBeforeCaretAll = 0,
                        maskDigitsBeforeCaretAllOld = 0,
                        i = 0;

                    for (i = caretPosNew; i < newValL; i++) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsAfterCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsBeforeCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (p.maskDigitPosMap[i]) {
                            maskDigitsBeforeCaretAll++;
                        }
                    }

                    for (i = caretPosOld - 1; i >= 0; i--) {
                        if (p.maskDigitPosMapOld[i]) {
                            maskDigitsBeforeCaretAllOld++;
                        }
                    }

                    // if the cursor is at the end keep it there
                    if (caretPosNew > oldValL) {
                      caretPosNew = newValL * 10;
                    } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
                        if (!p.maskDigitPosMapOld[caretPosNew])  {
                          var caretPos = caretPosNew;
                          caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
                          caretPosNew -= maskDigitsBeforeCaret;
                          if (p.maskDigitPosMap[caretPosNew])  {
                            caretPosNew = caretPos;
                          }
                        }
                    }
                    else if (caretPosNew > caretPosOld) {
                        caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
                        caretPosNew += maskDigitsAfterCaret;
                    }
                }
                return caretPosNew;
            },
            behaviour: function(e) {
                e = e || window.event;
                p.invalid = [];

                var keyCode = el.data('mask-keycode');

                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
                    var newVal = p.getMasked(),
                        caretPos = p.getCaret();

                    // this is a compensation to devices/browsers that don't compensate
                    // caret positioning the right way
                    setTimeout(function() {
                      p.setCaret(p.calculateCaretPosition());
                    }, $.jMaskGlobals.keyStrokeCompensation);

                    p.val(newVal);
                    p.setCaret(caretPos);
                    return p.callbacks(e);
                }
            },
            getMasked: function(skipMaskChars, val) {
                var buf = [],
                    value = val === undefined ? p.val() : val + '',
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    maskDigitCount = 0,
                    maskDigitPosArr = [],
                    lastMaskChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskChar = 0;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskChar = maskLen - 1;
                    check = function () {
                        return m < maskLen && v < valLen;
                    };
                }

                var lastUntranslatedMaskChar;
                while (check()) {
                    var maskDigit = mask.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMask.translation[maskDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                             if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskChar && m !== resetPos) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (valDigit === lastUntranslatedMaskChar) {
                            // matched the last untranslated (raw) mask character that we encountered
                            // likely an insert offset the mask character from the last entry; fall
                            // through and only increment v
                            maskDigitCount--;
                            lastUntranslatedMaskChar = undefined;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                          p.invalid.push({p: v, v: valDigit, e: translation.pattern});
                        }
                        v += offset;
                    } else {
                        if (!skipMaskChars) {
                            buf[addMethod](maskDigit);
                        }

                        if (valDigit === maskDigit) {
                            maskDigitPosArr.push(v);
                            v += offset;
                        } else {
                            lastUntranslatedMaskChar = maskDigit;
                            maskDigitPosArr.push(v + maskDigitCount);
                            maskDigitCount++;
                        }

                        m += offset;
                    }
                }

                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
                    buf.push(lastMaskCharDigit);
                }

                var newVal = buf.join('');
                p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
                return newVal;
            },
            mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
              var maskDiff = options.reverse ? newVal.length - valLen : 0;
              p.maskDigitPosMap = {};
              for (var i = 0; i < maskDigitPosArr.length; i++) {
                p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
              }
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function(name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === mask.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };

        el = $(el);
        var jMask = this, oldValue = p.val(), regexMask;

        mask = typeof mask === 'function' ? mask(p.val(), undefined, el,  options) : mask;

        // public methods
        jMask.mask = mask;
        jMask.options = options;
        jMask.remove = function() {
            var caret = p.getCaret();
            if (jMask.options.placeholder) {
                el.removeAttr('placeholder');
            }
            if (el.data('mask-maxlength')) {
                el.removeAttr('maxlength');
            }
            p.destroyEvents();
            p.val(jMask.getCleanVal());
            p.setCaret(caret);
            return el;
        };

        // get value without mask
        jMask.getCleanVal = function() {
           return p.getMasked(true);
        };

        // get masked value without the value being in the input or element
        jMask.getMaskedVal = function(val) {
           return p.getMasked(false, val);
        };

       jMask.init = function(onlyMask) {
            onlyMask = onlyMask || false;
            options = options || {};

            jMask.clearIfNotMatch  = $.jMaskGlobals.clearIfNotMatch;
            jMask.byPassKeys       = $.jMaskGlobals.byPassKeys;
            jMask.translation      = $.extend({}, $.jMaskGlobals.translation, options.translation);

            jMask = $.extend(true, {}, jMask, options);

            regexMask = p.getRegexMask();

            if (onlyMask) {
                p.events();
                p.val(p.getMasked());
            } else {
                if (options.placeholder) {
                    el.attr('placeholder' , options.placeholder);
                }

                // this is necessary, otherwise if the user submit the form
                // and then press the "back" button, the autocomplete will erase
                // the data. Works fine on IE9+, FF, Opera, Safari.
                if (el.data('mask')) {
                  el.attr('autocomplete', 'off');
                }

                // detect if is necessary let the user type freely.
                // for is a lot faster than forEach.
                for (var i = 0, maxlength = true; i < mask.length; i++) {
                    var translation = jMask.translation[mask.charAt(i)];
                    if (translation && translation.recursive) {
                        maxlength = false;
                        break;
                    }
                }

                if (maxlength) {
                    el.attr('maxlength', mask.length).data('mask-maxlength', true);
                }

                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMasked());
                p.setCaret(caret);
            }
        };

        jMask.init(!el.is('input'));
    };

    $.maskWatchers = {};
    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            prefix = 'data-mask-',
            mask = input.attr('data-mask');

        if (input.attr(prefix + 'reverse')) {
            options.reverse = true;
        }

        if (input.attr(prefix + 'clearifnotmatch')) {
            options.clearIfNotMatch = true;
        }

        if (input.attr(prefix + 'selectonfocus') === 'true') {
           options.selectOnFocus = true;
        }

        if (notSameMaskObject(input, mask, options)) {
            return input.data('mask', new Mask(this, mask, options));
        }
    },
    notSameMaskObject = function(field, mask, options) {
        options = options || {};
        var maskObject = $(field).data('mask'),
            stringify = JSON.stringify,
            value = $(field).val() || $(field).text();
        try {
            if (typeof mask === 'function') {
                mask = mask(value);
            }
            return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
        } catch (e) {}
    },
    eventSupported = function(eventName) {
        var el = document.createElement('div'), isSupported;

        eventName = 'on' + eventName;
        isSupported = (eventName in el);

        if ( !isSupported ) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] === 'function';
        }
        el = null;

        return isSupported;
    };

    $.fn.mask = function(mask, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskGlobals,
            interval = globals.watchInterval,
            watchInputs = options.watchInputs || globals.watchInputs,
            maskFunction = function() {
                if (notSameMaskObject(this, mask, options)) {
                    return $(this).data('mask', new Mask(this, mask, options));
                }
            };

        $(this).each(maskFunction);

        if (selector && selector !== '' && watchInputs) {
            clearInterval($.maskWatchers[selector]);
            $.maskWatchers[selector] = setInterval(function(){
                $(document).find(selector).each(maskFunction);
            }, interval);
        }
        return this;
    };

    $.fn.masked = function(val) {
        return this.data('mask').getMaskedVal(val);
    };

    $.fn.unmask = function() {
        clearInterval($.maskWatchers[this.selector]);
        delete $.maskWatchers[this.selector];
        return this.each(function() {
            var dataMask = $(this).data('mask');
            if (dataMask) {
                dataMask.remove().removeData('mask');
            }
        });
    };

    $.fn.cleanVal = function() {
        return this.data('mask').getCleanVal();
    };

    $.applyDataMask = function(selector) {
        selector = selector || $.jMaskGlobals.maskElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };

    var globals = {
        maskElements: 'input,td,span,div',
        dataMaskAttr: '*[data-mask]',
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        keyStrokeCompensation: 10,
        // old versions of chrome dont work great with input event
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    };

    $.jMaskGlobals = $.jMaskGlobals || {};
    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

    // looking for inputs with data-mask attribute
    if (globals.dataMask) {
        $.applyDataMask();
    }

    setInterval(function() {
        if ($.jMaskGlobals.watchDataMask) {
            $.applyDataMask();
        }
    }, globals.watchInterval);
}, window.jQuery, window.Zepto));

// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
(function(window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function(stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is already initialized
  // ========================================

  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");

    return;
  }

  // Private default settings
  // ========================

  var defaults = {
    // Enable infinite gallery navigation
    loop: false,

    // Horizontal space between slides
    gutter: 50,

    // Enable keyboard navigation
    keyboard: true,

    // Should display navigation arrows at the screen edges
    arrows: true,

    // Should display counter at the top left corner
    infobar: true,

    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",

    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      "zoom",
      //"share",
      //"slideShow",
      //"fullScreen",
      //"download",
      "thumbs",
      "close"
    ],

    // Detect "idle" time in seconds
    idleTime: 3,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    iframe: {
      // Iframe template
      tpl:
        '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,

      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},

      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },

    // Default content type if cannot be detected automatically
    defaultType: "image",

    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 366,

    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",

    // Duration in ms for transition animation
    transitionDuration: 366,

    // Custom CSS class for slide element
    slideClass: "",

    // Custom CSS class for layout
    baseClass: "",

    // Base template for layout
    baseTpl:
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar">' +
      "<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
      "</div>" +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"></div>' +
      "</div>" +
      "</div>",

    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',

    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    btnTpl: {
      download:
        '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" />' +
        "</svg>" +
        "</a>",

      zoom:
        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" />' +
        "</svg>" +
        "</button>",

      close:
        '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,10 L30,30 M30,10 L10,30" />' +
        "</svg>" +
        "</button>",

      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn:
        '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',

      // Arrows
      arrowLeft:
        '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path>' +
        "</svg>" +
        "</a>",

      arrowRight:
        '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path>' +
        "</svg>" +
        "</a>"
    },

    // Container is injected into this element
    parentEl: "body",

    // Focus handling
    // ==============

    // Try to focus on the first focusable element after opening
    autoFocus: false,

    // Put focus back to active element after closing
    backFocus: true,

    // Do not let user to focus on element outside modal content
    trapFocus: true,

    // Module specific options
    // =======================

    fullScreen: {
      autoStart: false
    },

    // Set `touch: false` to disable dragging/swiping
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning
    },

    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,

    // Customize or add new media types
    // Example:
    /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
    media: {},

    slideShow: {
      autoStart: false,
      speed: 4000
    },

    thumbs: {
      autoStart: false, // Display thumbnails on opening
      hideOnClose: true, // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container", // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",

    // Callbacks
    //==========

    // See Documentation/API/Events for more information
    // Example:
    /*
		afterShow: function( instance, current ) {
			console.info( 'Clicked element:' );
			console.info( current.opts.$orig );
		}
	*/

    onInit: $.noop, // When instance has been initialized

    beforeLoad: $.noop, // Before the content of a slide is being loaded
    afterLoad: $.noop, // When the content of a slide is done loading

    beforeShow: $.noop, // Before open animation starts
    afterShow: $.noop, // When content is done loading and animating

    beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop, // After instance has been closed

    onActivate: $.noop, // When instance is brought to front
    onDeactivate: $.noop, // When other instance has been activated

    // Interaction
    // ===========

    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing

    // Clicked on the content
    clickContent: function(current, event) {
      return current.type === "image" ? "zoom" : false;
    },

    // Clicked on the slide
    clickSlide: "close",

    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",

    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,

    // Custom options when mobile device is detected
    // =============================================

    mobile: {
      idleTime: false,
      clickContent: function(current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function(current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },

    // Internationalization
    // ====================

    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schliessen",
        NEXT: "Weiter",
        PREV: "Zurück",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Maßstab"
      }
    }
  };

  // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);

  var called = 0;

  // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================
  var isQuery = function(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  };

  // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================
  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Detect the supported transition-end event property name
  // =======================================================
  var transitionEnd = (function() {
    var el = document.createElement("fakeelement"),
      t;

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  })();

  // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================
  var forceRedraw = function($el) {
    return $el && $el.length && $el[0].offsetHeight;
  };

  // Exclude array (`buttons`) options from deep merging
  // ===================================================
  var mergeOpts = function(opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);

    $.each(opts2, function(key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });

    return rez;
  };

  // Class definition
  // ================

  var FancyBox = function(content, opts, index) {
    var self = this;

    self.opts = mergeOpts({index: index}, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;

    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;

    self.prevPos = null;
    self.currPos = 0;

    self.firstRun = true;

    // All group items
    self.group = [];

    // Existing slides (for current, next and previous gallery items)
    self.slides = {};

    // Create group elements
    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    // Save last active element
    self.$lastFocus = $(document.activeElement).trigger("blur");

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================

    init: function() {
      var self = this,
        firstItem = self.group[self.currIndex],
        firstItemOpts = firstItem.opts,
        scrollbarWidth = $.fancybox.scrollbarWidth,
        $scrollDiv,
        $container,
        buttonStr;

      // Hide scrollbars
      // ===============

      if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false) {
        $("body").addClass("fancybox-active");

        if (!$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
          if (scrollbarWidth === undefined) {
            $scrollDiv = $('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body");

            scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;

            $scrollDiv.remove();
          }

          $("head").append(
            '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
              scrollbarWidth +
              "px; }</style>"
          );

          $("body").addClass("compensate-for-scrollbar");
        }
      }

      // Build html markup and set references
      // ====================================

      // Build html code for buttons and insert into main template
      buttonStr = "";

      $.each(firstItemOpts.buttons, function(index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      });

      // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete
      $container = $(
        self.translate(
          self,
          firstItemOpts.baseTpl
            .replace("{{buttons}}", buttonStr)
            .replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
        )
      )
        .attr("id", "fancybox-container-" + self.id)
        .addClass("fancybox-is-hidden")
        .addClass(firstItemOpts.baseClass)
        .data("FancyBox", self)
        .appendTo(firstItemOpts.parentEl);

      // Create object holding references to jQuery wrapped nodes
      self.$refs = {
        container: $container
      };

      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });

      self.trigger("onInit");

      // Enable events, deactive previous instances
      self.activate();

      // Build slides, load and reveal content
      self.jumpTo(self.currIndex);
    },

    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================

    translate: function(obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang];

      return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
        var value = arr[n];

        if (value === undefined) {
          return match;
        }

        return value;
      });
    },

    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================

    addContent: function(content) {
      var self = this,
        items = $.makeArray(content),
        thumbs;

      $.each(items, function(i, item) {
        var obj = {},
          opts = {},
          $item,
          type,
          found,
          src,
          srcParts;

        // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item);

          // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options);

          // Here we store clicked element
          opts.$orig = $item;

          obj.src = self.opts.src || opts.src || $item.attr("href");

          // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`
          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        }

        // Each gallery object has full collection of options
        obj.opts = $.extend(true, {}, self.opts, opts);

        // Do not merge buttons array
        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================

        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if ((found = src.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))) {
            type = "video";

            if (!obj.opts.videoFormat) {
              obj.opts.videoFormat = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        }

        // Step 3 - Some adjustments
        // =========================

        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        }

        // Find thumbnail image
        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.opts.$thumb = obj.opts.$trigger.find("img:first");
        }

        if ((!obj.opts.$thumb || !obj.opts.$thumb.length) && obj.opts.$orig) {
          obj.opts.$thumb = obj.opts.$orig.find("img:first");
        }

        // "caption" is a "special" option, it can be used to customize caption per gallery item ..
        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        }

        // Make sure we have caption as a string or jQuery object
        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        }

        // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"
        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();

            obj.opts.filter = srcParts.shift();
          }
        }

        // Hide all buttons and disable interactivity for modal items
        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            // Remove buttons
            infobar: 0,
            toolbar: 0,

            smallBtn: 0,

            // Disable keyboard navigation
            keyboard: 0,

            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,

            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        }

        // Step 4 - Add processed object to group
        // ======================================

        self.group.push(obj);
      });

      // Update controls if gallery is already opened
      if (Object.keys(self.slides).length) {
        self.updateControls();

        // Update thumbnails, if needed
        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();

          thumbs.focus();
        }
      }
    },

    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detect idle
    // ======================================

    addEvents: function() {
      var self = this;

      self.removeEvents();

      // Make navigation elements clickable
      self.$refs.container
        .on("click.fb-close", "[data-fancybox-close]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.close(e);
        })
        .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.previous();
        })
        .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.next();
        })
        .on("click.fb", "[data-fancybox-zoom]", function(e) {
          // Click handler for zoom button
          self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
        });

      // Handle page scrolling and browser resizing
      $W.on("orientationchange.fb resize.fb", function(e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          requestAFrame(function() {
            self.update();
          });
        } else {
          self.$refs.stage.hide();

          setTimeout(function() {
            self.$refs.stage.show();

            self.update();
          }, $.fancybox.isMobile ? 600 : 250);
        }
      });

      // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
      // (a.k.a. "escaping the modal")
      $D.on("focusin.fb", function(e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null;

        if (
          instance.isClosing ||
          !instance.current ||
          !instance.current.opts.trapFocus ||
          $(e.target).hasClass("fancybox-container") ||
          $(e.target).is(document)
        ) {
          return;
        }

        if (instance && $(e.target).css("position") !== "fixed" && !instance.$refs.container.has(e.target).length) {
          e.stopPropagation();

          instance.focus();
        }
      });

      // Enable keyboard navigation
      $D.on("keydown.fb", function(e) {
        var current = self.current,
          keycode = e.keyCode || e.which;

        if (!current || !current.opts.keyboard) {
          return;
        }

        if (e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input") || $(e.target).is("textarea")) {
          return;
        }

        // Backspace and Esc keys
        if (keycode === 8 || keycode === 27) {
          e.preventDefault();

          self.close(e);

          return;
        }

        // Left arrow and Up arrow
        if (keycode === 37 || keycode === 38) {
          e.preventDefault();

          self.previous();

          return;
        }

        // Righ arrow and Down arrow
        if (keycode === 39 || keycode === 40) {
          e.preventDefault();

          self.next();

          return;
        }

        self.trigger("afterKeydown", e, keycode);
      });

      // Hide controls after some inactivity period
      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;

        $D.on(
          "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
          function(e) {
            self.idleSecondsCounter = 0;

            if (self.isIdle) {
              self.showControls();
            }

            self.isIdle = false;
          }
        );

        self.idleInterval = window.setInterval(function() {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;

            self.hideControls();
          }
        }, 1000);
      }
    },

    // Remove events added by the core
    // ===============================

    removeEvents: function() {
      var self = this;

      $W.off("orientationchange.fb resize.fb");
      $D.off("focusin.fb keydown.fb .fb-idle");

      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);

        self.idleInterval = null;
      }
    },

    // Change to previous gallery item
    // ===============================

    previous: function(duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },

    // Change to next gallery item
    // ===========================

    next: function(duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },

    // Switch to selected gallery item
    // ===============================

    jumpTo: function(pos, duration) {
      var self = this,
        groupLen = self.group.length,
        firstRun,
        loop,
        current,
        previous,
        canvasWidth,
        currentPos,
        transitionProps;

      if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
        return;
      }

      pos = parseInt(pos, 10);

      // Should loop?
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      firstRun = self.firstRun = !Object.keys(self.slides).length;

      if (groupLen < 2 && !firstRun && !!self.isDragging) {
        return;
      }

      previous = self.current;

      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;

      // Create slides
      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }

        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;

      self.trigger("beforeShow", firstRun);

      self.updateControls();

      currentPos = $.fancybox.getTranslate(current.$slide);

      current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass("fancybox-animated");

      // Validate duration length
      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10);

      // Fresh start - reveal container, current slide and start loading content
      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.removeClass("fancybox-is-hidden");

        forceRedraw(self.$refs.container);

        self.$refs.container.addClass("fancybox-is-open");

        forceRedraw(self.$refs.container);

        // Make current slide visible
        current.$slide.addClass("fancybox-slide--previous");

        // Attempt to load content into slide;
        // at this point image would start loading, but inline/html content would load immediately
        self.loadSlide(current);

        current.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current");

        self.preload("image");

        return;
      }

      // Clean up
      $.each(self.slides, function(index, slide) {
        $.fancybox.stop(slide.$slide);
      });

      // Make current that slide is visible even if content is still loading
      current.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current");

      // If slides have been dragged, animate them to correct position
      if (current.isMoved) {
        canvasWidth = Math.round(current.$slide.width());

        $.each(self.slides, function(index, slide) {
          var pos = slide.pos - current.pos;

          $.fancybox.animate(
            slide.$slide,
            {
              top: 0,
              left: pos * canvasWidth + pos * slide.opts.gutter
            },
            duration,
            function() {
              slide.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous");

              if (slide.pos === self.currPos) {
                current.isMoved = false;

                self.complete();
              }
            }
          );
        });
      } else {
        self.$refs.stage.children().removeAttr("style");
      }

      // Start transition that reveals current content
      // or wait when it will be loaded

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");

      if (previous.pos === current.pos) {
        return;
      }

      // Handle previous slide
      // =====================

      transitionProps = "fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous");

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous");

      previous.isComplete = false;

      if (!duration || (!current.isMoved && !current.opts.transitionEffect)) {
        return;
      }

      if (current.isMoved) {
        previous.$slide.addClass(transitionProps);
      } else {
        transitionProps = "fancybox-animated " + transitionProps + " fancybox-fx-" + current.opts.transitionEffect;

        $.fancybox.animate(previous.$slide, transitionProps, duration, function() {
          previous.$slide.removeClass(transitionProps).removeAttr("style");
        });
      }
    },

    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================

    createSlide: function(pos) {
      var self = this,
        $slide,
        index;

      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });

        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },

    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================

    scaleToActual: function(x, y, duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        canvasWidth = $.fancybox.getTranslate(current.$slide).width,
        canvasHeight = $.fancybox.getTranslate(current.$slide).height,
        newImgWidth = current.width,
        newImgHeight = current.height,
        imgPos,
        posX,
        posY,
        scaleX,
        scaleY;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;

      imgPos = $.fancybox.getTranslate($content);

      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;

      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height;

      // Get center position for original image
      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5;

      // Make sure image does not move away from edges
      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);

      $.fancybox.animate(
        $content,
        {
          top: posY,
          left: posX,
          scaleX: scaleX,
          scaleY: scaleY
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );

      // Stop slideshow
      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },

    // Scale image to fit inside parent element
    // ========================================

    scaleToFit: function(duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        end;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      end = self.getFitPos(current);

      self.updateCursor(end.width, end.height);

      $.fancybox.animate(
        $content,
        {
          top: end.top,
          left: end.left,
          scaleX: end.width / $content.width(),
          scaleY: end.height / $content.height()
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );
    },

    // Calculate image size to fit inside viewport
    // ===========================================

    getFitPos: function(slide) {
      var self = this,
        $content = slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        maxWidth,
        maxHeight,
        minRatio,
        margin,
        aspectRatio,
        rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      margin = {
        top: parseInt(slide.$slide.css("paddingTop"), 10),
        right: parseInt(slide.$slide.css("paddingRight"), 10),
        bottom: parseInt(slide.$slide.css("paddingBottom"), 10),
        left: parseInt(slide.$slide.css("paddingLeft"), 10)
      };

      // We can not use $slide width here, because it can have different diemensions while in transiton
      maxWidth = parseInt(self.$refs.stage.width(), 10) - (margin.left + margin.right);
      maxHeight = parseInt(self.$refs.stage.height(), 10) - (margin.top + margin.bottom);

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);

      // Use floor rounding to make sure it really fits
      width = Math.floor(minRatio * width);
      height = Math.floor(minRatio * height);

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + margin.top;
        rez.left = Math.floor((maxWidth - width) * 0.5) + margin.left;
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;

      return rez;
    },

    // Update content size and position for all slides
    // ==============================================

    update: function() {
      var self = this;

      $.each(self.slides, function(key, slide) {
        self.updateSlide(slide);
      });
    },

    // Update slide content position and size
    // ======================================

    updateSlide: function(slide, duration) {
      var self = this,
        $content = slide && slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height;

      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);

        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;

          self.updateCursor();
        }
      }

      slide.$slide.trigger("refresh");

      self.$refs.toolbar.toggleClass("compensate-for-scrollbar", slide.$slide.get(0).scrollHeight > slide.$slide.get(0).clientHeight);

      self.trigger("onUpdate", slide);
    },

    // Horizontally center slide
    // =========================

    centerSlide: function(slide, duration) {
      var self = this,
        canvasWidth,
        pos;

      if (self.current) {
        canvasWidth = Math.round(slide.$slide.width());
        pos = slide.pos - self.current.pos;

        $.fancybox.animate(
          slide.$slide,
          {
            top: 0,
            left: pos * canvasWidth + pos * slide.opts.gutter,
            opacity: 1
          },
          duration === undefined ? 0 : duration,
          null,
          false
        );
      }
    },

    // Update cursor style depending if content can be zoomed
    // ======================================================

    updateCursor: function(nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        $container = self.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"),
        isZoomable;

      if (!current || self.isClosing) {
        return;
      }

      isZoomable = self.isZoomable();

      $container.toggleClass("fancybox-is-zoomable", isZoomable);

      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      // Set cursor to zoom in/out if click event is 'zoom'
      if (
        isZoomable &&
        (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom"))
      ) {
        if (self.isScaledDown(nextWidth, nextHeight)) {
          // If image is scaled down, then, obviously, it can be zoomed to full size
          $container.addClass("fancybox-can-zoomIn");
        } else {
          if (current.opts.touch) {
            // If image size ir largen than available available and touch module is not disable,
            // then user can do panning
            $container.addClass("fancybox-can-drag");
          } else {
            $container.addClass("fancybox-can-zoomOut");
          }
        }
      } else if (current.opts.touch && current.contentType !== "video") {
        $container.addClass("fancybox-can-drag");
      }
    },

    // Check if current slide is zoomable
    // ==================================

    isZoomable: function() {
      var self = this,
        current = self.current,
        fitPos;

      // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area
      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (current.width > fitPos.width || current.height > fitPos.height) {
          return true;
        }
      }

      return false;
    },

    // Check if current image dimensions are smaller than actual
    // =========================================================

    isScaledDown: function(nextWidth, nextHeight) {
      var self = this,
        rez = false,
        current = self.current,
        $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },

    // Check if image dimensions exceed parent element
    // ===============================================

    canPan: function() {
      var self = this,
        rez = false,
        current = self.current,
        $content;

      if (current.type === "image" && ($content = current.$content) && !current.hasError) {
        rez = self.getFitPos(current);
        rez = Math.abs($content.width() - rez.width) > 1 || Math.abs($content.height() - rez.height) > 1;
      }

      return rez;
    },

    // Load content into the slide
    // ===========================

    loadSlide: function(slide) {
      var self = this,
        type,
        $slide,
        ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      self.trigger("beforeLoad", slide);

      type = slide.type;
      $slide = slide.$slide;

      $slide
        .off("refresh")
        .trigger("onReset")
        .addClass(slide.opts.slideClass);

      // Create content depending on the type
      switch (type) {
        case "image":
          self.setImage(slide);

          break;

        case "iframe":
          self.setIframe(slide);

          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);

          break;

        case "video":
          self.setContent(
            slide,
            '<video class="fancybox-video" controls controlsList="nodownload">' +
              '<source src="' +
              slide.src +
              '" type="' +
              slide.opts.videoFormat +
              '">' +
              "Your browser doesn't support HTML5 video" +
              "</video"
          );

          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);

          ajaxLoad = $.ajax(
            $.extend({}, slide.opts.ajax.settings, {
              url: slide.src,
              success: function(data, textStatus) {
                if (textStatus === "success") {
                  self.setContent(slide, data);
                }
              },
              error: function(jqXHR, textStatus) {
                if (jqXHR && textStatus !== "abort") {
                  self.setError(slide);
                }
              }
            })
          );

          $slide.one("onReset", function() {
            ajaxLoad.abort();
          });

          break;

        default:
          self.setError(slide);

          break;
      }

      return true;
    },

    // Use thumbnail image, if possible
    // ================================

    setImage: function(slide) {
      var self = this,
        srcset = slide.opts.srcset || slide.opts.image.srcset,
        thumbSrc,
        found,
        temp,
        pxRatio,
        windowWidth;

      // Check if need to show loading icon
      slide.timouts = setTimeout(function() {
        var $img = slide.$image;

        if (slide.isLoading && (!$img || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 350);

      // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.
      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;

        temp = srcset.split(",").map(function(el) {
          var ret = {};

          el
            .trim()
            .split(/\s+/)
            .forEach(function(el, i) {
              var value = parseInt(el.substring(0, el.length - 1), 10);

              if (i === 0) {
                return (ret.url = el);
              }

              if (value) {
                ret.value = value;
                ret.postfix = el[el.length - 1];
              }
            });

          return ret;
        });

        // Sort by value
        temp.sort(function(a, b) {
          return a.value - b.value;
        });

        // Ok, now we have an array of all srcset values
        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
            found = el;
            break;
          }
        }

        // If not found, take the last one
        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url;

          // If we have default width/height values, we can calculate height for matching source
          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = slide.width / slide.height * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }

      // This will be wrapper containing both ghost and actual image
      slide.$content = $('<div class="fancybox-content"></div>')
        .addClass("fancybox-is-hidden")
        .appendTo(slide.$slide.addClass("fancybox-slide--image"));

      // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually
      thumbSrc = slide.opts.thumb || (slide.opts.$thumb && slide.opts.$thumb.length ? slide.opts.$thumb.attr("src") : false);

      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && thumbSrc) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;

        slide.$ghost = $("<img />")
          .one("error", function() {
            $(this).remove();

            slide.$ghost = null;
          })
          .one("load", function() {
            self.afterLoad(slide);
          })
          .addClass("fancybox-image")
          .appendTo(slide.$content)
          .attr("src", thumbSrc);
      }

      // Start loading actual image
      self.setBigImage(slide);
    },

    // Create full-size image
    // ======================

    setBigImage: function(slide) {
      var self = this,
        $img = $("<img />");

      slide.$image = $img
        .one("error", function() {
          self.setError(slide);
        })
        .one("load", function() {
          var sizes;

          if (!slide.$ghost) {
            self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);

            self.afterLoad(slide);
          }

          // Clear timeout that checks if loading icon needs to be displayed
          if (slide.timouts) {
            clearTimeout(slide.timouts);
            slide.timouts = null;
          }

          if (self.isClosing) {
            return;
          }

          if (slide.opts.srcset) {
            sizes = slide.opts.sizes;

            if (!sizes || sizes === "auto") {
              sizes =
                (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) +
                "vw";
            }

            $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
          }

          // Hide temporary image after some delay
          if (slide.$ghost) {
            setTimeout(function() {
              if (slide.$ghost && !self.isClosing) {
                slide.$ghost.hide();
              }
            }, Math.min(300, Math.max(1000, slide.height / 1600)));
          }

          self.hideLoading(slide);
        })
        .addClass("fancybox-image")
        .attr("src", slide.src)
        .appendTo(slide.$content);

      if (($img[0].complete || $img[0].readyState == "complete") && $img[0].naturalWidth && $img[0].naturalHeight) {
        $img.trigger("load");
      } else if ($img[0].error) {
        $img.trigger("error");
      }
    },

    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================

    resolveImageSlideSize: function(slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
        maxHeight = parseInt(slide.opts.height, 10);

      // Sets the default values from the image
      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor(maxWidth * imgHeight / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor(maxHeight * imgWidth / imgHeight);
        slide.height = maxHeight;
      }
    },

    // Create iframe wrapper, iframe and bindings
    // ==========================================

    setIframe: function(slide) {
      var self = this,
        opts = slide.opts.iframe,
        $slide = slide.$slide,
        $iframe;

      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
        .css(opts.css)
        .appendTo($slide);

      $slide.addClass("fancybox-slide--" + slide.contentType);

      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
        .attr(opts.attr)
        .appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide);

        // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function(e) {
          this.isReady = 1;

          slide.$slide.trigger("refresh");

          self.afterLoad(slide);
        });

        // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function() {
          var $content = slide.$content,
            frameWidth = opts.css.width,
            frameHeight = opts.css.height,
            $contents,
            $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {}

          // Calculate contnet dimensions if it is accessible
          if ($body && $body.length && $body.children().length) {
            $content.css({
              width: "",
              height: ""
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            if (frameWidth) {
              $content.width(frameWidth);
            }

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            if (frameHeight) {
              $content.height(frameHeight);
            }
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        this.afterLoad(slide);
      }

      $iframe.attr("src", slide.src);

      // Remove iframe if closing or changing gallery item
      $slide.one("onReset", function() {
        // This helps IE not to throw errors when closing
        try {
          $(this)
            .find("iframe")
            .hide()
            .unbind()
            .attr("src", "//about:blank");
        } catch (ignore) {}

        $(this)
          .off("refresh.fb")
          .empty();

        slide.isLoaded = false;
      });
    },

    // Wrap and append content to the slide
    // ======================================

    setContent: function(slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty();

      // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.
      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        content
          .parent()
          .parent(".fancybox-slide--inline")
          .trigger("onReset");

        // Create temporary element marking original place of the content
        slide.$placeholder = $("<div>")
          .hide()
          .insertAfter(content);

        // Make sure content is visible
        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>")
            .append($.trim(content))
            .contents();

          // If we have text node, then add wrapping element to make vertical alignment work
          if (content[0].nodeType === 3) {
            content = $("<div>").html(content);
          }
        }

        // If "filter" option is provided, then filter content
        if (slide.opts.filter) {
          content = $("<div>")
            .html(content)
            .find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function() {
        // Pause all html5 video/audio
        $(this)
          .find("video,audio")
          .trigger("pause");

        // Put content back
        if (slide.$placeholder) {
          slide.$placeholder.after(content.hide()).remove();

          slide.$placeholder = null;
        }

        // Remove custom close button
        if (slide.$smallBtn) {
          slide.$smallBtn.remove();

          slide.$smallBtn = null;
        }

        // Remove content and mark slide as not loaded
        if (!slide.hasError) {
          $(this).empty();

          slide.isLoaded = false;
        }
      });

      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");

        $(content).wrap("<div></div>");

        slide.contentType = "video";

        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide
        .children()
        .filter("div,form,main,video,audio")
        .first()
        .addClass("fancybox-content");

      slide.$slide.addClass("fancybox-slide--" + slide.contentType);

      this.afterLoad(slide);
    },

    // Display error message
    // =====================

    setError: function(slide) {
      slide.hasError = true;

      slide.$slide
        .trigger("onReset")
        .removeClass("fancybox-slide--" + slide.contentType)
        .addClass("fancybox-slide--error");

      slide.contentType = "html";

      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },

    // Show loading icon inside the slide
    // ==================================

    showLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide);
      }
    },

    // Remove loading icon from the slide
    // ==================================

    hideLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.remove();

        delete slide.$spinner;
      }
    },

    // Adjustments after slide content has been loaded
    // ===============================================

    afterLoad: function(slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;

      self.trigger("afterLoad", slide);

      self.hideLoading(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).prependTo(slide.$content);
      }

      if (slide.opts.protect && slide.$content && !slide.hasError) {
        // Disable right click
        slide.$content.on("contextmenu.fb", function(e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        });

        // Add fake element on top of the image
        // This makes a bit harder for user to select image
        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.revealContent(slide);
    },

    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================

    revealContent: function(slide) {
      var self = this,
        $slide = slide.$slide,
        end = false,
        start = false,
        effect,
        effectClassName,
        duration,
        opacity;

      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];

      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

      // Do not animate if revealing the same slide
      if (slide.pos === self.currPos) {
        if (slide.isComplete) {
          effect = false;
        } else {
          self.isAnimating = true;
        }
      }

      if (slide.isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      }

      // Check if can zoom
      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      }

      // Zoom animation
      // ==============
      if (effect === "zoom") {
        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height;

        // Check if we need to animate opacity
        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        }

        // Draw image at start position
        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);

        forceRedraw(slide.$content);

        // Start animation
        $.fancybox.animate(slide.$content, end, duration, function() {
          self.isAnimating = false;

          self.complete();
        });

        return;
      }

      self.updateSlide(slide);

      // Simply show content
      // ===================

      if (!effect) {
        forceRedraw($slide);

        slide.$content.removeClass("fancybox-is-hidden");

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      $.fancybox.stop($slide);

      effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;

      $slide
        .removeAttr("style")
        .removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous")
        .addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden");

      // Force reflow for CSS3 transitions
      forceRedraw($slide);

      $.fancybox.animate(
        $slide,
        "fancybox-slide--current",
        duration,
        function(e) {
          $slide.removeClass(effectClassName).removeAttr("style");

          if (slide.pos === self.currPos) {
            self.complete();
          }
        },
        true
      );
    },

    // Check if we can and have to zoom from thumbnail
    //================================================

    getThumbPos: function(slide) {
      var self = this,
        rez = false,
        $thumb = slide.opts.$thumb,
        thumbPos = $thumb && $thumb.length && $thumb[0].ownerDocument === document ? $thumb.offset() : 0,
        slidePos;

      // Check if element is inside the viewport by at least 1 pixel
      var isElementVisible = function($el) {
        var element = $el[0],
          elementRect = element.getBoundingClientRect(),
          parentRects = [],
          visibleInAllParents;

        while (element.parentElement !== null) {
          if ($(element.parentElement).css("overflow") === "hidden" || $(element.parentElement).css("overflow") === "auto") {
            parentRects.push(element.parentElement.getBoundingClientRect());
          }

          element = element.parentElement;
        }

        visibleInAllParents = parentRects.every(function(parentRect) {
          var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
          var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);

          return visiblePixelX > 0 && visiblePixelY > 0;
        });

        return (
          visibleInAllParents &&
          elementRect.bottom > 0 &&
          elementRect.right > 0 &&
          elementRect.left < $(window).width() &&
          elementRect.top < $(window).height()
        );
      };

      if (thumbPos && isElementVisible($thumb)) {
        slidePos = self.$refs.stage.offset();

        rez = {
          top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
          left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
          width: $thumb.width(),
          height: $thumb.height(),
          scaleX: 1,
          scaleY: 1
        };
      }

      return rez;
    },

    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================

    complete: function() {
      var self = this,
        current = self.current,
        slides = {};

      if (current.isMoved || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;

        current.$slide.siblings().trigger("onReset");

        self.preload("inline");

        // Trigger any CSS3 transiton inside the slide
        forceRedraw(current.$slide);

        current.$slide.addClass("fancybox-slide--complete");

        // Remove unnecessary slides
        $.each(self.slides, function(key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);

            slide.$slide.off().remove();
          }
        });

        self.slides = slides;
      }

      self.isAnimating = false;

      self.updateCursor();

      self.trigger("afterShow");

      // Play first html5 video/audio
      current.$slide
        .find("video,audio")
        .filter(":visible:first")
        .trigger("play");

      // Try to focus on the first focusable element
      if (
        $(document.activeElement).is("[disabled]") ||
        (current.opts.autoFocus && !(current.type == "image" || current.type === "iframe"))
      ) {
        self.focus();
      }
    },

    // Preload next and previous slides
    // ================================

    preload: function(type) {
      var self = this,
        next = self.slides[self.currPos + 1],
        prev = self.slides[self.currPos - 1];

      if (next && next.type === type) {
        self.loadSlide(next);
      }

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }
    },

    // Try to find and focus on the first focusable element
    // ====================================================

    focus: function() {
      var current = this.current,
        $el;

      if (this.isClosing) {
        return;
      }

      if (current && current.isComplete && current.$content) {
        // Look for first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if (!$el.length) {
          $el = current.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first");
        }

        $el = $el && $el.length ? $el : current.$content;

        $el.trigger("focus");
      }
    },

    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================

    activate: function() {
      var self = this;

      // Deactivate all instances
      $(".fancybox-container").each(function() {
        var instance = $(this).data("FancyBox");

        // Skip self and closing instances
        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");

          instance.removeEvents();

          instance.isVisible = false;
        }
      });

      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();

        self.updateControls();
      }

      self.trigger("onActivate");

      self.addEvents();
    },

    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================

    close: function(e, d) {
      var self = this,
        current = self.current,
        effect,
        duration,
        $content,
        domRect,
        opacity,
        start,
        end;

      var done = function() {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true;

      // If beforeClose callback prevents closing, make sure content is centered
      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;

        requestAFrame(function() {
          self.update();
        });

        return false;
      }

      // Remove all events
      // If there are multiple instances, they will be set again by "activate" method
      self.removeEvents();

      if (current.timouts) {
        clearTimeout(current.timouts);
      }

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

      // Remove other slides
      current.$slide
        .off(transitionEnd)
        .removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      current.$slide
        .siblings()
        .trigger("onReset")
        .remove();

      // Trigger animations
      if (duration) {
        self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing");
      }

      // Clean up
      self.hideLoading(current);

      self.hideControls();

      self.updateCursor();

      // Check if possible to zoom-out
      if (
        effect === "zoom" &&
        !(e !== true && $content && duration && current.type === "image" && !current.hasError && (end = self.getThumbPos(current)))
      ) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);

        domRect = $.fancybox.getTranslate($content);

        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        };

        // Check if we need to animate opacity
        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);

        forceRedraw($content);

        $.fancybox.animate($content, end, duration, done);

        return true;
      }

      if (effect && duration) {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          $.fancybox.animate(
            current.$slide.removeClass("fancybox-slide--current"),
            "fancybox-animated fancybox-slide--previous fancybox-fx-" + effect,
            duration,
            done
          );
        }
      } else {
        done();
      }

      return true;
    },

    // Final adjustments after removing the instance
    // =============================================

    cleanUp: function(e) {
      var self = this,
        $body = $("body"),
        instance,
        scrollTop;

      self.current.$slide.trigger("onReset");

      self.$refs.container.empty().remove();

      self.trigger("afterClose", e);

      // Place back focus
      if (self.$lastFocus && !!self.current.opts.backFocus) {
        self.$lastFocus.trigger("focus");
      }

      self.current = null;

      // Check if there are other instances
      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $body.removeClass("fancybox-active compensate-for-scrollbar");

        $("#fancybox-style-noscroll").remove();
      }
    },

    // Call callback and trigger an event
    // ==================================

    trigger: function(name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        obj = slide && slide.opts ? slide : self.current,
        rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },

    // Update infobar values, navigation button states and reveal caption
    // ==================================================================

    updateControls: function(force) {
      var self = this,
        current = self.current,
        index = current.index,
        caption = current.opts.caption,
        $container = self.$refs.container,
        $caption = self.$refs.caption;

      // Recalculate content dimensions
      current.$slide.trigger("refresh");

      self.$caption = caption && caption.length ? $caption.html(caption) : null;

      if (!self.isHiddenControls && !self.isIdle) {
        self.showControls();
      }

      // Update info and navigation elements
      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);

      $container.find("[data-fancybox-prev]").toggleClass("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").toggleClass("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container
          .find("[data-fancybox-zoom]")
          .show()
          .end()
          .find("[data-fancybox-download]")
          .attr("href", current.opts.image.src || current.src)
          .show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }
    },

    // Hide toolbar and caption
    // ========================

    hideControls: function() {
      this.isHiddenControls = true;

      this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
    },

    showControls: function() {
      var self = this,
        opts = self.current ? self.current.opts : self.opts,
        $container = self.$refs.container;

      self.isHiddenControls = false;
      self.idleSecondsCounter = 0;

      $container
        .toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
        .toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
        .toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
        .toggleClass("fancybox-is-modal", !!opts.modal);

      if (self.$caption) {
        $container.addClass("fancybox-show-caption ");
      } else {
        $container.removeClass("fancybox-show-caption");
      }
    },

    // Toggle toolbar and caption
    // ==========================

    toggleControls: function() {
      if (this.isHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });

  $.fancybox = {
    version: "3.3.5",
    defaults: defaults,

    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================

    getInstance: function(command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
        args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },

    // Create new instance
    // ===================

    open: function(items, opts, index) {
      return new FancyBox(items, opts, index);
    },

    // Close current or all instances
    // ==============================

    close: function(all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close();

        // Try to find and close next instance

        if (all === true) {
          this.close();
        }
      }
    },

    // Close all instances and unbind all events
    // =========================================

    destroy: function() {
      this.close(true);

      $D.add("body").off("click.fb-start", "**");
    },

    // Try to detect mobile devices
    // ============================

    isMobile:
      document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    // Detect if 'translate3d' support is available
    // ============================================

    use3d: (function() {
      var div = document.createElement("div");

      return (
        window.getComputedStyle &&
        window.getComputedStyle(div) &&
        window.getComputedStyle(div).getPropertyValue("transform") &&
        !(document.documentMode && document.documentMode < 11)
      );
    })(),

    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================

    getTranslate: function($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();

      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },

    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================

    setTranslate: function($el, props) {
      var str = "",
        css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str =
          (props.left === undefined ? $el.position().left : props.left) +
          "px, " +
          (props.top === undefined ? $el.position().top : props.top) +
          "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str = (str.length ? str + " " : "") + "scale(" + props.scaleX + ", " + props.scaleY + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },

    // Simple CSS transition handler
    // =============================

    animate: function($el, to, duration, callback, leaveAnimationName) {
      var final = false;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      if (!$.isPlainObject(to)) {
        $el.removeAttr("style");
      }

      $.fancybox.stop($el);

      $el.on(transitionEnd, function(e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        $.fancybox.stop($el);

        if (final) {
          $.fancybox.setTranslate($el, final);
        }

        if ($.isPlainObject(to)) {
          if (leaveAnimationName === false) {
            $el.removeAttr("style");
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      }

      // Start animation by changing CSS properties or class name
      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          final = $.extend({}, to, {
            width: $el.width() * to.scaleX,
            height: $el.height() * to.scaleY,
            scaleX: 1,
            scaleY: 1
          });

          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      }

      // Make sure that `transitionend` callback gets fired
      $el.data(
        "timer",
        setTimeout(function() {
          $el.trigger("transitionend");
        }, duration + 16)
      );
    },

    stop: function($el) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        $el.off("transitionend").css("transition-duration", "");

        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  };

  // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
      index = 0,
      $target,
      value;

    // Avoid opening multiple times
    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    opts = e && e.data ? e.data.options : opts || {};

    $target = opts.$target || $(e.currentTarget);
    value = $target.attr("data-fancybox") || "";

    // Get all related items and find index for clicked one
    if (value) {
      items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [];
      items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');

      index = items.index($target);

      // Sometimes current item can not be found (for example, if some script clones items)
      if (index < 0) {
        index = 0;
      }
    } else {
      items = [$target];
    }

    $.fancybox.open(items, opts, index);
  }

  // Create a jQuery plugin
  // ======================

  $.fn.fancybox = function(options) {
    var selector;

    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body")
        .off("click.fb-start", selector)
        .on("click.fb-start", selector, {options: options}, _run);
    } else {
      this.off("click.fb-start").on(
        "click.fb-start",
        {
          items: this,
          options: options
        },
        _run
      );
    }

    return this;
  };

  // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================

  $D.on("click.fb-start", "[data-fancybox]", _run);

  // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-trigger]", function(e) {
    _run(e, {
      $target: $('[data-fancybox="' + $(e.currentTarget).attr("data-trigger") + '"]').eq($(e.currentTarget).attr("data-index") || 0),
      $trigger: $(this)
    });
  });
})(window, document, window.jQuery || jQuery);

// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function($) {
  "use strict";

  // Formats matching url to final form

  var format = function(url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function(key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  };

  // Object containing properties for each media type

  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },

    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1,
        api: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },

    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },

    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function(rez) {
        return (
          "//maps.google." +
          rez[2] +
          "/?ll=" +
          (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
          "&output=" +
          (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        );
      }
    },

    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function(rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  };

  $(document).on("objectNeedsType.fb", function(e, instance, item) {
    var url = item.src || "",
      type = false,
      media,
      thumb,
      rez,
      params,
      urlParams,
      paramObj,
      provider;

    media = $.extend(true, {}, defaults, item.opts.media);

    // Look for any matching media type
    $.each(media, function(providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);

      url =
        $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);

      thumb =
        $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function(match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    });

    // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  });
})(window.jQuery || jQuery);

// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function(window, document, $) {
  "use strict";

  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function() {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function(id) {
        window.clearTimeout(id);
      }
    );
  })();

  var getPointerXY = function(e) {
    var result = [];

    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function(point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function($el) {
    if (
      $el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') ||
      $.isFunction($el.get(0).onclick) ||
      $el.data("selectable")
    ) {
      return true;
    }

    // Check for attributes like data-fancybox-next or data-fancybox-close
    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function(el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
      overflowX = window.getComputedStyle(el)["overflow-x"],
      vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
      horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;

    return vertical || horizontal;
  };

  var isScrollable = function($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function(instance) {
    var self = this;

    self.instance = instance;

    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;

    self.destroy();

    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function() {
    this.$container.off(".fb.touch");
  };

  Guestures.prototype.ontouchstart = function(e) {
    var self = this,
      $target = $(e.target),
      instance = self.instance,
      current = instance.current,
      $content = current.$content,
      isTouchDevice = e.type == "touchstart";

    // Do not respond to both (touch and mouse) events
    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    }

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Ignore taping on links, buttons, input elements
    if (!$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    }

    // Ignore clicks on the scrollbar
    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Ignore clicks while zooming or closing
    if (!current || instance.isAnimating || instance.isClosing) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    }

    e.stopPropagation();

    self.startEvent = e;

    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;

    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;

    self.canvasWidth = Math.round(current.$slide[0].clientWidth);
    self.canvasHeight = Math.round(current.$slide[0].clientHeight);

    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {top: 0, left: 0};
    self.sliderStartPos = self.sliderLastPos || $.fancybox.getTranslate(current.$slide);

    // Since position will be absolute, but we need to make it relative to the stage
    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);

    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;

    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;

    $(document)
      .off(".fb.touch")
      .on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend"))
      .on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    }

    if (!(self.opts || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      return;
    }

    if (!($.fancybox.isMobile && (isScrollable($target) || isScrollable($target.parent())))) {
      e.preventDefault();
    }

    if (self.startPoints.length === 1 || current.hasError) {
      if (self.instance.canPan()) {
        $.fancybox.stop(self.$content);

        self.$content.css("transition-duration", "");

        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-controls--isGrabbing");
    }

    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;

      self.isZooming = true;

      $.fancybox.stop(self.$content);

      self.$content.css("transition-duration", "");

      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();

      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;

      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function(e) {
    var self = this;

    self.isScrolling = true;

    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function(e) {
    var self = this,
      $target = $(e.target);

    // Make sure user has not released over iframe or disabled element
    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      self.canTap = false;

      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.instance.canPan()) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");

    self.distance = distance(self.newPoints[0], self.startPoints[0]);

    // Skip false ontouchmove events (Chrome)
    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function(e) {
    var self = this,
      swiping = self.isSwiping,
      left = self.sliderStartPos.left || 0,
      angle;

    // If direction is not yet determined
    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (self.instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (self.instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);

          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        self.canTap = false;

        if (self.isSwiping === "y" && $.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
          self.isScrolling = true;

          return;
        }

        self.instance.isDragging = self.isSwiping;

        // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
        self.startPoints = self.newPoints;

        $.each(self.instance.slides, function(index, slide) {
          $.fancybox.stop(slide.$slide);

          slide.$slide.css("transition-duration", "");

          slide.inTransition = false;

          if (slide.pos === self.instance.current.pos) {
            self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left - $.fancybox.getTranslate(self.instance.$refs.stage).left;
          }
        });

        // Stop slideshow
        if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
          self.instance.SlideShow.stop();
        }
      }

      return;
    }

    // Sticky edges
    if (swiping == "x") {
      if (
        self.distanceX > 0 &&
        (self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))
      ) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (
        self.distanceX < 0 &&
        (self.instance.group.length < 2 ||
          (self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))
      ) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function(index, slide) {
          var pos = slide.pos - self.instance.currPos;

          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });

        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function() {
    var self = this;

    // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;

    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  // Make panning sticky to the edges
  Guestures.prototype.limitMovement = function() {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    var distanceX = self.distanceX;
    var distanceY = self.distanceY;

    var contentStartPos = self.contentStartPos;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY;

    // Slow down proportionally to traveled distance
    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);

    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5);

    //   ->
    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    }

    //    <-
    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    }

    //   \/
    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    }

    //   /\
    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function(newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function() {
    var self = this;

    // Calculate current distance between points to get pinch ratio and new width and height
    var contentStartPos = self.contentStartPos;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);

    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio);

    // This is the translation due to pinch-zooming
    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

    // Point between the two touches
    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();

    // And this is the translation due to translation of the centerpoint
    // between the two fingers
    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

    // The new offset is the old/current one plus the total translation
    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);

    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };

    self.canTap = false;

    self.newWidth = newWidth;
    self.newHeight = newHeight;

    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function(e) {
    var self = this;
    var dMs = Math.max(new Date().getTime() - self.startTime, 1);

    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;

    self.endPoints = getPointerXY(e);

    self.$container.removeClass("fancybox-controls--isGrabbing");

    $(document).off(".fb.touch");

    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 366;

    // Speed in px/ms
    self.velocityX = self.distanceX / dMs * 0.5;
    self.velocityY = self.distanceY / dMs * 0.5;

    self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function(swiping, scrolling) {
    var self = this,
      ret = false,
      len = self.instance.group.length;

    self.sliderLastPos = null;

    // Close if swiped vertically / navigate if horizontally
    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(
        self.instance.current.$slide,
        {
          top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
          opacity: 0
        },
        200
      );

      ret = self.instance.close(true, 200);
    } else if (swiping == "x" && self.distanceX > 50 && len > 1) {
      ret = self.instance.previous(self.speedX);
    } else if (swiping == "x" && self.distanceX < -50 && len > 1) {
      ret = self.instance.next(self.speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      if (scrolling || len < 2) {
        self.instance.centerSlide(self.instance.current, 150);
      } else {
        self.instance.jumpTo(self.instance.current.index);
      }
    }

    self.$container.removeClass("fancybox-is-sliding");
  };

  // Limit panning from edges
  // ========================
  Guestures.prototype.endPanning = function() {
    var self = this;
    var newOffsetX, newOffsetY, newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
      newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;

    $.fancybox.animate(self.$content, newPos, 330);
  };

  Guestures.prototype.endZooming = function() {
    var self = this;

    var current = self.instance.current;

    var newOffsetX, newOffsetY, newPos, reset;

    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;

    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    };

    // Reset scalex/scaleY values; this helps for perfomance and does not break animation
    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);

      // Switch from scale() to width/height or animation will not work correctly
      $.fancybox.setTranslate(self.$content, $.fancybox.getTranslate(self.$content));

      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function(e) {
    var self = this;
    var $target = $(e.target);

    var instance = self.instance;
    var current = instance.current;

    var endPoints = (e && getPointerXY(e)) || self.startPoints;

    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;

    var where;

    var process = function(prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);

          break;

        case "toggleControls":
          instance.toggleControls(true);

          break;

        case "next":
          instance.next();

          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    };

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Skip if clicked on the scrollbar
    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Check where is clicked
    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (
      instance.current.$content &&
      instance.current.$content
        .find($target)
        .addBack()
        .filter($target).length
    ) {
      where = "Content";
    } else {
      return;
    }

    // Check if this is a double tap
    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null;

      // Skip if distance between taps is too big
      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      }

      // OK, now we assume that this is a double-tap
      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function() {
          self.tapped = null;

          process("click" + where);
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document).on("onActivate.fb", function(e, instance) {
    if (instance && !instance.Guestures) {
      instance.Guestures = new Guestures(instance);
    }
  });
})(window, document, window.jQuery || jQuery);

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow:
        '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,12 L27,20 L13,27 Z" />' +
        '<path d="M15,10 v19 M23,10 v19" />' +
        "</svg>" +
        "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000
    }
  });

  var SlideShow = function(instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,

    init: function() {
      var self = this;

      self.$button = self.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
        self.toggle();
      });

      if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
        self.$button.hide();
      }
    },

    set: function(force) {
      var self = this;

      // Check if reached last element
      if (
        self.instance &&
        self.instance.current &&
        (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)
      ) {
        self.timer = setTimeout(function() {
          if (self.isActive) {
            self.instance.jumpTo((self.instance.currIndex + 1) % self.instance.group.length);
          }
        }, self.instance.current.opts.slideShow.speed);
      } else {
        self.stop();
        self.instance.idleSecondsCounter = 0;
        self.instance.showControls();
      }
    },

    clear: function() {
      var self = this;

      clearTimeout(self.timer);

      self.timer = null;
    },

    start: function() {
      var self = this;
      var current = self.instance.current;

      if (current) {
        self.isActive = true;

        self.$button
          .attr("title", current.opts.i18n[current.opts.lang].PLAY_STOP)
          .removeClass("fancybox-button--play")
          .addClass("fancybox-button--pause");

        self.set(true);
      }
    },

    stop: function() {
      var self = this;
      var current = self.instance.current;

      self.clear();

      self.$button
        .attr("title", current.opts.i18n[current.opts.lang].PLAY_START)
        .removeClass("fancybox-button--pause")
        .addClass("fancybox-button--play");

      self.isActive = false;
    },

    toggle: function() {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },

    "beforeShow.fb": function(e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },

    "afterShow.fb": function(e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow;

      // "P" or Spacebar
      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();

        SlideShow.toggle();
      }
    },

    "beforeClose.fb onDeactivate.fb": function(e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  });

  // Page Visibility API to pause slideshow when window is not active
  $(document).on("visibilitychange", function() {
    var instance = $.fancybox.getInstance();
    var SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, window.jQuery || jQuery);

// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function(document, $) {
  "use strict";

  // Collection of methods supported by user browser
  var fn = (function() {
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      // new WebKit
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      // old WebKit (Safari 5.1)
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];

    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  })();

  // If browser does not have Full Screen API, then simply unset default button template and stop
  if (!fn) {
    if ($ && $.fancybox) {
      $.fancybox.defaults.btnTpl.fullScreen = false;
    }

    return;
  }

  var FullScreen = {
    request: function(elem) {
      elem = elem || document.documentElement;

      elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function() {
      document[fn.exitFullscreen]();
    },
    toggle: function(elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function() {
      return Boolean(document[fn.fullscreenElement]);
    },
    enabled: function() {
      return Boolean(document[fn.fullscreenEnabled]);
    }
  };

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      fullScreen:
        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M9,12 v16 h22 v-16 h-22 v8" />' +
        "</svg>" +
        "</button>"
    },
    fullScreen: {
      autoStart: false
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var $container;

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;

        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        }

        // Expose API
        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();

        instance.FullScreen.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });

  $(document).on(fn.fullscreenchange, function() {
    var isFullscreen = FullScreen.isFullscreen(),
      instance = $.fancybox.getInstance();

    if (instance) {
      // If image is zooming, then force to stop and reposition properly
      if (instance.current && instance.current.type === "image" && instance.isAnimating) {
        instance.current.$content.css("transition", "none");

        instance.isAnimating = false;

        instance.update(true, true, 0);
      }

      instance.trigger("onFullscreenChange", isFullscreen);

      instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
    }
  });
})(document, window.jQuery || jQuery);

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var CLASS = "fancybox-thumbs",
    CLASS_ACTIVE = CLASS + "-active",
    CLASS_LOAD = CLASS + "-loading";

  // Make sure there are default values
  $.fancybox.defaults = $.extend(
    true,
    {
      btnTpl: {
        thumbs:
          '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
          '<svg viewBox="0 0 120 120">' +
          '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' +
          "</svg>" +
          "</button>"
      },
      thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
      }
    },
    $.fancybox.defaults
  );

  var FancyThumbs = function(instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,

    init: function(instance) {
      var self = this,
        first,
        second;

      self.instance = instance;

      instance.Thumbs = self;

      self.opts = instance.group[instance.currIndex].opts.thumbs;

      // Enable thumbs if at least two group items have thumbnails
      first = instance.group[0];
      first = first.opts.thumb || (first.opts.$thumb && first.opts.$thumb.length ? first.opts.$thumb.attr("src") : false);

      if (instance.group.length > 1) {
        second = instance.group[1];
        second = second.opts.thumb || (second.opts.$thumb && second.opts.$thumb.length ? second.opts.$thumb.attr("src") : false);
      }

      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");

      if (self.opts && first && second && first && second) {
        self.$button.show().on("click", function() {
          self.toggle();
        });

        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },

    create: function() {
      var self = this,
        instance = self.instance,
        parentEl = self.opts.parentEl,
        list = [],
        src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(
          instance.$refs.container
            .find(parentEl)
            .addBack()
            .filter(parentEl)
        );

        // Add "click" event that performs gallery navigation
        self.$grid.on("click", "li", function() {
          instance.jumpTo($(this).attr("data-index"));
        });
      }

      // Build the list
      if (!self.$list) {
        self.$list = $("<ul>").appendTo(self.$grid);
      }

      $.each(instance.group, function(i, item) {
        src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr("src") : null);

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push(
          '<li data-index="' +
            i +
            '" tabindex="0" class="' +
            CLASS_LOAD +
            '"' +
            (src && src.length ? ' style="background-image:url(' + src + ')" />' : "") +
            "></li>"
        );
      });

      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(
          parseInt(self.$grid.css("padding-right"), 10) +
            instance.group.length *
              self.$list
                .children()
                .eq(0)
                .outerWidth(true)
        );
      }
    },

    focus: function(duration) {
      var self = this,
        $list = self.$list,
        $grid = self.$grid,
        thumb,
        thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list
        .children()
        .removeClass(CLASS_ACTIVE)
        .filter('[data-index="' + self.instance.current.index + '"]')
        .addClass(CLASS_ACTIVE);

      thumbPos = thumb.position();

      // Check if need to scroll to make current thumb visible
      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate(
          {
            scrollTop: $list.scrollTop() + thumbPos.top
          },
          duration
        );
      } else if (
        self.opts.axis === "x" &&
        (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))
      ) {
        $list
          .parent()
          .stop()
          .animate(
            {
              scrollLeft: thumbPos.left
            },
            duration
          );
      }
    },

    update: function() {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");

        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      }

      // Update content position
      that.instance.update();
    },

    hide: function() {
      this.isVisible = false;
      this.update();
    },

    show: function() {
      this.isVisible = true;
      this.update();
    },

    toggle: function() {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },

    "beforeShow.fb": function(e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs;

      // "G"
      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();

        Thumbs.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, window.jQuery || jQuery);

//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share:
        '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' +
        "</svg>" +
        "</button>"
    },
    share: {
      url: function(instance, item) {
        return (
          (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
        );
      },
      tpl:
        '<div class="fancybox-share">' +
        "<h1>{{SHARE}}</h1>" +
        "<p>" +
        '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
        "<span>Facebook</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
        "<span>Twitter</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
        "<span>Pinterest</span>" +
        "</a>" +
        "</p>" +
        '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p>' +
        "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };

    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function() {
    var instance = $.fancybox.getInstance(),
      current = instance.current || null,
      url,
      tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl
      .replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
      .replace(/\{\{url\}\}/g, encodeURIComponent(url))
      .replace(/\{\{url_raw\}\}/g, escapeHtml(url))
      .replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");

    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        animationEffect: false,
        afterLoad: function(shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function() {
            shareInstance.close(null, 0);
          });

          // Opening links in a popup window
          shareCurrent.$content.find(".fancybox-share__links a").click(function() {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        }
      }
    });
  });
})(document, window.jQuery || jQuery);

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function(document, window, $) {
  "use strict";

  // Simple $.escapeSelector polyfill (for jQuery prior v3)
  if (!$.escapeSelector) {
    $.escapeSelector = function(sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      var fcssescape = function(ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          }

          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }

        // Other potentially-special ASCII characters get backslash-escaped
        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  }

  // Get info about gallery name and current index from url
  function parseUrl() {
    var hash = window.location.hash.substr(1),
      rez = hash.split("-"),
      index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
      gallery = rez.join("-");

    return {
      hash: hash,
      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  }

  // Trigger click evnt on links to open new fancyBox instance
  function triggerFromUrl(url) {
    var $el;

    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute, then trigger click event for that.
      // It should start fancyBox
      $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']")
        .eq(url.index - 1)
        .trigger("click.fb-start");
    }
  }

  // Get gallery name from current instance
  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") : "");

    return ret === "" ? false : ret;
  }

  // Start when DOM becomes ready
  $(function() {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    }

    // Update hash when opening/closing fancyBox
    $(document).on({
      "onInit.fb": function(e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance);

        // Make sure gallery start index matches index from hash
        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },

      "beforeShow.fb": function(e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        }

        // Check if need to update window hash
        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        }

        // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected
        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");

        // If current hash is the same (this instance most likely is opened by hashchange), then do nothing
        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (!instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        }

        // Update hash
        instance.hashTimer = setTimeout(function() {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"](
              {},
              document.title,
              window.location.pathname + window.location.search + "#" + instance.currentHash
            );

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },

      "beforeClose.fb": function(e, instance, current) {
        var gallery;

        if (current.opts.hash === false) {
          return;
        }

        gallery = getGalleryID(instance);

        // Goto previous history entry
        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;

        clearTimeout(instance.hashTimer);
      }
    });

    // Check if need to start/close after url has changed
    $(window).on("hashchange.fb", function() {
      var url = parseUrl(),
        fb;

      // Find last fancyBox instance that has "hash"
      $.each(
        $(".fancybox-container")
          .get()
          .reverse(),
        function(index, value) {
          var tmp = $(value).data("FancyBox");
          //isClosing
          if (tmp.currentHash) {
            fb = tmp;
            return false;
          }
        }
      );

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash && fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;

          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    });

    // Check current hash and trigger click event on matching element to start fancyBox, if needed
    setTimeout(function() {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(document, window, window.jQuery || jQuery);

// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var prevTime = new Date().getTime();

  $(document).on({
    "onInit.fb": function(e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
        var current = instance.current,
          currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;

        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, window.jQuery || jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

/*!
 * jQVMap Version 1.0
 *
 * http://jqvmap.com
 *
 * Copyright 2012, Peter Schmalfeldt <manifestinteractive@gmail.com>
 * Copyright 2011-2012, Kirill Lebedev
 * Licensed under the MIT license.
 *
 * Fork Me @ https://github.com/manifestinteractive/jqvmap
 */
(function ($) {

  var apiParams = {
    colors: 1,
    values: 1,
    backgroundColor: 1,
    scaleColors: 1,
    normalizeFunction: 1,
    enableZoom: 1,
    showTooltip: 1,
    borderColor: 1,
    borderWidth: 1,
    borderOpacity: 1,
    selectedRegions: 1,
    multiSelectRegion: 1
  };

  var apiEvents = {
    onLabelShow: 'labelShow',
    onRegionOver: 'regionMouseOver',
    onRegionOut: 'regionMouseOut',
    onRegionClick: 'regionClick',
    onRegionSelect: 'regionSelect',
    onRegionDeselect: 'regionDeselect'
  };

  $.fn.vectorMap = function (options) {

    var defaultParams = {
      map: 'world_en',
      backgroundColor: '#a5bfdd',
      color: '#f4f3f0',
      hoverColor: '#c9dfaf',
      selectedColor: '#c9dfaf',
      scaleColors: ['#b6d6ff', '#005ace'],
      normalizeFunction: 'linear',
      enableZoom: true,
      showTooltip: true,
      borderColor: '#818181',
      borderWidth: 1,
      borderOpacity: 0.25,
      selectedRegions: null,
      multiSelectRegion: false
    }, map = this.data('mapObject');

    if (options === 'addMap') {
      WorldMap.maps[arguments[1]] = arguments[2];
    } else if (options === 'set' && apiParams[arguments[1]]) {
      map['set' + arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)].apply(map, Array.prototype.slice.call(arguments, 2));
    } else if (typeof options === 'string' &&
               typeof map[options] === 'function') {
      return map[options].apply(map, Array.prototype.slice.call(arguments, 1));
    } else {
      $.extend(defaultParams, options);
      defaultParams.container = this;
      this.css({ position: 'relative', overflow: 'hidden' });

      map = new WorldMap(defaultParams);

      this.data('mapObject', map);

      for (var e in apiEvents) {
        if (defaultParams[e]) {
          this.bind(apiEvents[e] + '.jqvmap', defaultParams[e]);
        }
      }
    }
  };

  var VectorCanvas = function (width, height, params) {
    this.mode = window.SVGAngle ? 'svg' : 'vml';
    this.params = params;

    if (this.mode == 'svg') {
      this.createSvgNode = function (nodeName) {
        return document.createElementNS(this.svgns, nodeName);
      };
    } else {
      try {
        if (!document.namespaces.rvml) {
          document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
        }
        this.createVmlNode = function (tagName) {
          return document.createElement('<rvml:' + tagName + ' class="rvml">');
        };
      } catch (e) {
        this.createVmlNode = function (tagName) {
          return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
        };
      }

      document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    }

    if (this.mode == 'svg') {
      this.canvas = this.createSvgNode('svg');
    } else {
      this.canvas = this.createVmlNode('group');
      this.canvas.style.position = 'absolute';
    }

    this.setSize(width, height);
  };

  VectorCanvas.prototype = {
    svgns: "http://www.w3.org/2000/svg",
    mode: 'svg',
    width: 0,
    height: 0,
    canvas: null,

    setSize: function (width, height) {
      if (this.mode == 'svg') {
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
      } else {
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.coordsize = width + ' ' + height;
        this.canvas.coordorigin = "0 0";
        if (this.rootGroup) {
          var pathes = this.rootGroup.getElementsByTagName('shape');
          for (var i = 0, l = pathes.length; i < l; i++) {
            pathes[i].coordsize = width + ' ' + height;
            pathes[i].style.width = width + 'px';
            pathes[i].style.height = height + 'px';
          }
          this.rootGroup.coordsize = width + ' ' + height;
          this.rootGroup.style.width = width + 'px';
          this.rootGroup.style.height = height + 'px';
        }
      }
      this.width = width;
      this.height = height;
    },

    createPath: function (config) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('path');
        node.setAttribute('d', config.path);

        if (this.params.borderColor !== null) {
          node.setAttribute('stroke', this.params.borderColor);
        }
        if (this.params.borderWidth > 0) {
          node.setAttribute('stroke-width', this.params.borderWidth);
          node.setAttribute('stroke-linecap', 'round');
          node.setAttribute('stroke-linejoin', 'round');
        }
        if (this.params.borderOpacity > 0) {
          node.setAttribute('stroke-opacity', this.params.borderOpacity);
        }

        node.setFill = function (color) {
          this.setAttribute("fill", color);
          if (this.getAttribute("original") === null) {
            this.setAttribute("original", color);
          }
        };

        node.getFill = function (color) {
          return this.getAttribute("fill");
        };

        node.getOriginalFill = function () {
          return this.getAttribute("original");
        };

        node.setOpacity = function (opacity) {
          this.setAttribute('fill-opacity', opacity);
        };
      } else {
        node = this.createVmlNode('shape');
        node.coordorigin = "0 0";
        node.coordsize = this.width + ' ' + this.height;
        node.style.width = this.width + 'px';
        node.style.height = this.height + 'px';
        node.fillcolor = WorldMap.defaultFillColor;
        node.stroked = false;
        node.path = VectorCanvas.pathSvgToVml(config.path);

        var scale = this.createVmlNode('skew');
        scale.on = true;
        scale.matrix = '0.01,0,0,0.01,0,0';
        scale.offset = '0,0';

        node.appendChild(scale);

        var fill = this.createVmlNode('fill');
        node.appendChild(fill);

        node.setFill = function (color) {
          this.getElementsByTagName('fill')[0].color = color;
          if (this.getAttribute("original") === null) {
            this.setAttribute("original", color);
          }
        };

        node.getFill = function (color) {
          return this.getElementsByTagName('fill')[0].color;
        };
        node.getOriginalFill = function () {
          return this.getAttribute("original");
        };
        node.setOpacity = function (opacity) {
          this.getElementsByTagName('fill')[0].opacity = parseInt(opacity * 100, 10) + '%';
        };
      }
      return node;
    },

    createGroup: function (isRoot) {
      var node;
      if (this.mode == 'svg') {
        node = this.createSvgNode('g');
      } else {
        node = this.createVmlNode('group');
        node.style.width = this.width + 'px';
        node.style.height = this.height + 'px';
        node.style.left = '0px';
        node.style.top = '0px';
        node.coordorigin = "0 0";
        node.coordsize = this.width + ' ' + this.height;
      }

      if (isRoot) {
        this.rootGroup = node;
      }
      return node;
    },

    applyTransformParams: function (scale, transX, transY) {
      if (this.mode == 'svg') {
        this.rootGroup.setAttribute('transform', 'scale(' + scale + ') translate(' + transX + ', ' + transY + ')');
      } else {
        this.rootGroup.coordorigin = (this.width - transX) + ',' + (this.height - transY);
        this.rootGroup.coordsize = this.width / scale + ',' + this.height / scale;
      }
    }
  };

  VectorCanvas.pathSvgToVml = function (path) {
    var result = '';
    var cx = 0, cy = 0, ctrlx, ctrly;

    return path.replace(/([MmLlHhVvCcSs])((?:-?(?:\d+)?(?:\.\d+)?,?\s?)+)/g, function (segment, letter, coords, index) {
      coords = coords.replace(/(\d)-/g, '$1,-').replace(/\s+/g, ',').split(',');
      if (!coords[0]) {
        coords.shift();
      }

      for (var i = 0, l = coords.length; i < l; i++) {
        coords[i] = Math.round(100 * coords[i]);
      }

      switch (letter) {
      case 'm':
        cx += coords[0];
        cy += coords[1];
        return 't' + coords.join(',');
        break;

      case 'M':
        cx = coords[0];
        cy = coords[1];
        return 'm' + coords.join(',');
        break;

      case 'l':
        cx += coords[0];
        cy += coords[1];
        return 'r' + coords.join(',');
        break;

      case 'L':
        cx = coords[0];
        cy = coords[1];
        return 'l' + coords.join(',');
        break;

      case 'h':
        cx += coords[0];
        return 'r' + coords[0] + ',0';
        break;

      case 'H':
        cx = coords[0];
        return 'l' + cx + ',' + cy;
        break;

      case 'v':
        cy += coords[0];
        return 'r0,' + coords[0];
        break;

      case 'V':
        cy = coords[0];
        return 'l' + cx + ',' + cy;
        break;

      case 'c':
        ctrlx = cx + coords[coords.length - 4];
        ctrly = cy + coords[coords.length - 3];
        cx += coords[coords.length - 2];
        cy += coords[coords.length - 1];
        return 'v' + coords.join(',');
        break;

      case 'C':
        ctrlx = coords[coords.length - 4];
        ctrly = coords[coords.length - 3];
        cx = coords[coords.length - 2];
        cy = coords[coords.length - 1];
        return 'c' + coords.join(',');
        break;

      case 's':
        coords.unshift(cy - ctrly);
        coords.unshift(cx - ctrlx);
        ctrlx = cx + coords[coords.length - 4];
        ctrly = cy + coords[coords.length - 3];
        cx += coords[coords.length - 2];
        cy += coords[coords.length - 1];
        return 'v' + coords.join(',');
        break;

      case 'S':
        coords.unshift(cy + cy - ctrly);
        coords.unshift(cx + cx - ctrlx);
        ctrlx = coords[coords.length - 4];
        ctrly = coords[coords.length - 3];
        cx = coords[coords.length - 2];
        cy = coords[coords.length - 1];
        return 'c' + coords.join(',');
        break;

      default:
        return false;
        break;
      }

      return '';

    }).replace(/z/g, '');
  };

  var WorldMap = function (params) {
    params = params || {};
    var map = this;
    var mapData = WorldMap.maps[params.map];

    this.selectedRegions = [];
    this.multiSelectRegion = params.multiSelectRegion;

    this.container = params.container;

    this.defaultWidth = mapData.width;
    this.defaultHeight = mapData.height;

    this.color = params.color;
    this.selectedColor = params.selectedColor;
    this.hoverColor = params.hoverColor;
    this.hoverOpacity = params.hoverOpacity;
    this.setBackgroundColor(params.backgroundColor);

    this.width = params.container.width();
    this.height = params.container.height();

    this.resize();

    jQuery(window).resize(function () {
      map.width = params.container.width();
      map.height = params.container.height();
      map.resize();
      map.canvas.setSize(map.width, map.height);
      map.applyTransform();
    });

    this.canvas = new VectorCanvas(this.width, this.height, params);
    params.container.append(this.canvas.canvas);

    this.makeDraggable();

    this.rootGroup = this.canvas.createGroup(true);

    this.index = WorldMap.mapIndex;
    this.label = jQuery('<div/>').addClass('jqvmap-label').appendTo(jQuery('body')).hide();

    if (params.enableZoom) {
      jQuery('<div/>').addClass('jqvmap-zoomin').text('+').appendTo(params.container);
      jQuery('<div/>').addClass('jqvmap-zoomout').html('&#x2212;').appendTo(params.container);
    }

    map.countries = [];

    for (var key in mapData.pathes) {
      var path = this.canvas.createPath({
        path: mapData.pathes[key].path
      });

      path.setFill(this.color);
      path.id = map.getCountryId(key);
      map.countries[key] = path;

      if (this.canvas.mode == 'svg') {
        path.setAttribute('class', 'jvectormap-region');
      } else {
        jQuery(path).addClass('jvectormap-region');
      }

      jQuery(this.rootGroup).append(path);
    }

    jQuery(params.container).delegate(this.canvas.mode == 'svg' ? 'path' : 'shape', 'mouseover mouseout', function (e) {
      var path = e.target,
      code = e.target.id.split('_').pop(),
      labelShowEvent = $.Event('labelShow.jqvmap'),
      regionMouseOverEvent = $.Event('regionMouseOver.jqvmap');

      if (e.type == 'mouseover') {
        jQuery(params.container).trigger(regionMouseOverEvent, [code, mapData.pathes[code].name]);
        if (!regionMouseOverEvent.isDefaultPrevented()) {
          map.highlight(code, path);
        }
        if (params.showTooltip) {
          map.label.text(mapData.pathes[code].name);
          jQuery(params.container).trigger(labelShowEvent, [map.label, code]);

          if (!labelShowEvent.isDefaultPrevented()) {
            map.label.show();
            map.labelWidth = map.label.width();
            map.labelHeight = map.label.height();
          }
        }
      } else {
        map.unhighlight(code, path);

        map.label.hide();
        jQuery(params.container).trigger('regionMouseOut.jqvmap', [code, mapData.pathes[code].name]);
      }
    });

    jQuery(params.container).delegate(this.canvas.mode == 'svg' ? 'path' : 'shape', 'click', function (e) {
      if (!params.multiSelectRegion) {
        for (var key in mapData.pathes) {
          map.countries[key].currentFillColor = map.countries[key].getOriginalFill();
          map.countries[key].setFill(map.countries[key].getOriginalFill());
        }
      }

      var path = e.target;
      var code = e.target.id.split('_').pop();

      jQuery(params.container).trigger('regionClick.jqvmap', [code, mapData.pathes[code].name]);
      if (!regionClickEvent.isDefaultPrevented()) {
        if (map.selectedRegions.indexOf(code) !== -1) {
          map.deselect(code, path);
        } else {
          map.select(code, path);
        }
      }

      //console.log(selectedRegions);

    });

    if (params.showTooltip) {
      params.container.mousemove(function (e) {
        if (map.label.is(':visible')) {
            var left = e.pageX - 15 - map.labelWidth;
            var top = e.pageY - 15 - map.labelHeight;
            
            if(left < 0)
               left = e.pageX + 15;
            if(top < 0)
                top = e.pageY + 15;
            
            map.label.css({
                left: left,
                top: top
          });
        }
      });
    }

    this.setColors(params.colors);

    this.canvas.canvas.appendChild(this.rootGroup);

    this.applyTransform();

    this.colorScale = new ColorScale(params.scaleColors, params.normalizeFunction, params.valueMin, params.valueMax);

    if (params.values) {
      this.values = params.values;
      this.setValues(params.values);
    }

    if (params.selectedRegions) {
      if (params.selectedRegions instanceof Array) {
        for(var k in params.selectedRegions) {
          this.select(params.selectedRegions[k].toLowerCase());
        }
      } else {
        this.select(params.selectedRegions.toLowerCase());
      }
    }

    this.bindZoomButtons();
    
    if(params.pins) {
      /*if(params.pinMode) {
          if(params.pinMode != "id" && params.pinMode != "content") {
              params.pinMode = "content";
          }
      } else {
          params.pinMode = "content";
      }*/
      this.pinHandlers = false;
      this.placePins(params.pins, params.pinMode);
    }

    WorldMap.mapIndex++;
  };

  WorldMap.prototype = {
    transX: 0,
    transY: 0,
    scale: 1,
    baseTransX: 0,
    baseTransY: 0,
    baseScale: 1,
    width: 0,
    height: 0,
    countries: {},
    countriesColors: {},
    countriesData: {},
    zoomStep: 1.4,
    zoomMaxStep: 4,
    zoomCurStep: 1,

    setColors: function (key, color) {
      if (typeof key == 'string') {
        this.countries[key].setFill(color);
        this.countries[key].setAttribute("original", color);
      } else {
        var colors = key;

        for (var code in colors) {
          if (this.countries[code]) {
            this.countries[code].setFill(colors[code]);
            this.countries[code].setAttribute("original", colors[code]);
          }
        }
      }
    },

    setValues: function (values) {
      var max = 0,
      min = Number.MAX_VALUE,
      val;

      for (var cc in values) {
        val = parseFloat(values[cc]);
        if (val > max) {
          max = values[cc];
        }
        if (val && val < min) {
          min = val;
        }
      }

      this.colorScale.setMin(min);
      this.colorScale.setMax(max);

      var colors = {};
      for (cc in values) {
        val = parseFloat(values[cc]);
        if (val) {
          colors[cc] = this.colorScale.getColor(val);
        } else {
          colors[cc] = this.color;
        }
      }
      this.setColors(colors);
      this.values = values;
    },

    setBackgroundColor: function (backgroundColor) {
      this.container.css('background-color', backgroundColor);
    },

    setScaleColors: function (colors) {
      this.colorScale.setColors(colors);

      if (this.values) {
        this.setValues(this.values);
      }
    },

    setNormalizeFunction: function (f) {
      this.colorScale.setNormalizeFunction(f);

      if (this.values) {
        this.setValues(this.values);
      }
    },

    highlight: function (cc, path) {
      path = path || $('#' + this.getCountryId(cc))[0];
      if (this.hoverOpacity) {
        path.setOpacity(this.hoverOpacity);
      } else if (this.hoverColor) {
        path.currentFillColor = path.getFill() + '';
        path.setFill(this.hoverColor);
      }
    },

    unhighlight: function (cc, path) {
      path = path || $('#' + this.getCountryId(cc))[0];
      path.setOpacity(1);
      if (path.currentFillColor) {
        path.setFill(path.currentFillColor);
      }
    },

    select: function (cc, path) {
      path = path || $('#' + this.getCountryId(cc))[0];
      if(this.selectedRegions.indexOf(cc) < 0) {
        if (this.multiSelectRegion) {
          this.selectedRegions.push(cc);
        } else {
          this.selectedRegions = [cc];
        }
        // MUST BE after the change of selectedRegions
        // Otherwise, we might loop
        $(this.container).trigger('regionSelect.jqvmap', [cc]);
        if (this.selectedColor) {
          path.currentFillColor = this.selectedColor;
          path.setFill(this.selectedColor);
        }
      }
    },

    deselect: function (cc, path) {
      path = path || $('#' + this.getCountryId(cc))[0];
      if(this.selectedRegions.indexOf(cc) >= 0) {
        this.selectedRegions.splice(this.selectedRegions.indexOf(cc), 1);
        // MUST BE after the change of selectedRegions
        // Otherwise, we might loop
        $(this.container).trigger('regionDeselect.jqvmap', [cc]);
        path.currentFillColor = path.getOriginalFill();
        path.setFill(path.getOriginalFill());
      }
    },

    isSelected: function(cc) {
      return this.selectedRegions.indexOf(cc) >= 0;
    },

    resize: function () {
      var curBaseScale = this.baseScale;
      if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
        this.baseScale = this.height / this.defaultHeight;
        this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale);
      } else {
        this.baseScale = this.width / this.defaultWidth;
        this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale);
      }
      this.scale *= this.baseScale / curBaseScale;
      this.transX *= this.baseScale / curBaseScale;
      this.transY *= this.baseScale / curBaseScale;
    },

    reset: function () {
      this.countryTitle.reset();
      for (var key in this.countries) {
        this.countries[key].setFill(WorldMap.defaultColor);
      }
      this.scale = this.baseScale;
      this.transX = this.baseTransX;
      this.transY = this.baseTransY;
      this.applyTransform();
    },

    applyTransform: function () {
      var maxTransX, maxTransY, minTransX, minTransY;
      if (this.defaultWidth * this.scale <= this.width) {
        maxTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
        minTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
      } else {
        maxTransX = 0;
        minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
      }

      if (this.defaultHeight * this.scale <= this.height) {
        maxTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
        minTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
      } else {
        maxTransY = 0;
        minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
      }

      if (this.transY > maxTransY) {
        this.transY = maxTransY;
      }
      else if (this.transY < minTransY) {
        this.transY = minTransY;
      }
      if (this.transX > maxTransX) {
        this.transX = maxTransX;
      }
      else if (this.transX < minTransX) {
        this.transX = minTransX;
      }

      this.canvas.applyTransformParams(this.scale, this.transX, this.transY);
    },

    makeDraggable: function () {
      var mouseDown = false;
      var oldPageX, oldPageY;
      var self = this;

      self.isMoving = false;
      self.isMovingTimeout = false;

      this.container.mousemove(function (e) {

        if (mouseDown) {
          var curTransX = self.transX;
          var curTransY = self.transY;

          self.transX -= (oldPageX - e.pageX) / self.scale;
          self.transY -= (oldPageY - e.pageY) / self.scale;

          self.applyTransform();

          oldPageX = e.pageX;
          oldPageY = e.pageY;

          self.isMoving = true;
          if (self.isMovingTimeout) {
            clearTimeout(self.isMovingTimeout);
          }

          self.container.trigger('drag');
        }

        return false;

      }).mousedown(function (e) {

        mouseDown = true;
        oldPageX = e.pageX;
        oldPageY = e.pageY;

        return false;

      }).mouseup(function () {

        mouseDown = false;

        self.isMovingTimeout = setTimeout(function () {
          self.isMoving = false;
        }, 100);

        return false;

      });
    },

    bindZoomButtons: function () {
      var map = this;
      this.container.find('.jqvmap-zoomin').click(function(){
        map.zoomIn();
      });
      this.container.find('.jqvmap-zoomout').click(function(){
        map.zoomOut();
      });
    },
    
    zoomIn: function () {
      var map = this;
      var sliderDelta = (jQuery('#zoom').innerHeight() - 6 * 2 - 15 * 2 - 3 * 2 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);

      if (map.zoomCurStep < map.zoomMaxStep) {
        var curTransX = map.transX;
        var curTransY = map.transY;
        var curScale = map.scale;

        map.transX -= (map.width / map.scale - map.width / (map.scale * map.zoomStep)) / 2;
        map.transY -= (map.height / map.scale - map.height / (map.scale * map.zoomStep)) / 2;
        map.setScale(map.scale * map.zoomStep);
        map.zoomCurStep++;

        jQuery('#zoomSlider').css('top', parseInt(jQuery('#zoomSlider').css('top'), 10) - sliderDelta);
        
        map.container.trigger("zoomIn");
      }
    },
    
    zoomOut: function () {
      var map = this;
      var sliderDelta = (jQuery('#zoom').innerHeight() - 6 * 2 - 15 * 2 - 3 * 2 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);

      if (map.zoomCurStep > 1) {
        var curTransX = map.transX;
        var curTransY = map.transY;
        var curScale = map.scale;

        map.transX += (map.width / (map.scale / map.zoomStep) - map.width / map.scale) / 2;
        map.transY += (map.height / (map.scale / map.zoomStep) - map.height / map.scale) / 2;
        map.setScale(map.scale / map.zoomStep);
        map.zoomCurStep--;

        jQuery('#zoomSlider').css('top', parseInt(jQuery('#zoomSlider').css('top'), 10) + sliderDelta);
        
        map.container.trigger("zoomOut");
      }
    },

    setScale: function (scale) {
      this.scale = scale;
      this.applyTransform();
    },

    getCountryId: function (cc) {
      return 'jqvmap' + this.index + '_' + cc;
    },

    getPinId: function (cc) {
      return this.getCountryId(cc)+'_pin';
    },
    
    placePins: function(pins, pinMode){
      var map = this;

      if(!pinMode || (pinMode != "content" && pinMode != "id")) {
        pinMode = "content";
      }

      if(pinMode == "content") {//treat pin as content
        jQuery.each(pins, function(index, pin){
          if(jQuery('#'+map.getCountryId(index)).length == 0){
              return;
          }
          //mapData.pathes[code].name
          var pinIndex = map.getPinId(index);
          if(jQuery('#'+pinIndex).length > 0){
            jQuery('#'+pinIndex).remove();
          }
          map.container.append('<div id="' + pinIndex + '" for="'+index+'" class="jqvmap_pin" style="position:absolute">' + pin + '</div>');
        });
      } else { //treat pin as id of an html content
        jQuery.each(pins, function(index, pin){
          if(jQuery('#'+map.getCountryId(index)).length == 0){
              return;
          }
          var pinIndex = map.getPinId(index);
          if(jQuery('#'+pinIndex).length > 0){
            jQuery('#'+pinIndex).remove();
          }
          map.container.append('<div id="' + pinIndex + '" for="'+index+'" class="jqvmap_pin" style="position:absolute"></div>');
          jQuery('#'+pinIndex).append(jQuery('#'+pin));
        });
      }

      this.positionPins();
      if(!this.pinHandlers){
        this.pinHandlers = true;//do only once
        var positionFix = function(){
          map.positionPins();
        };
        this.container.bind('zoomIn', positionFix)
        .bind('zoomOut', positionFix)
        .bind('drag', positionFix);
      }
    },

    positionPins: function(){
      var map = this;
      var pins = this.container.find('.jqvmap_pin');
      jQuery.each(pins, function(index, pinObj){
        pinObj = jQuery(pinObj);
        var countryId = map.getCountryId(pinObj.attr('for'));
        var countryObj = jQuery('#' + countryId);

        var bbox = document.getElementById(countryId).getBBox();
        var position = countryObj.position();

        var scale = map.scale;

        var left = position.left + (bbox.width / 2) * scale - pinObj.width() / 2,
        top = position.top + (bbox.height / 2) * scale - pinObj.height() / 2;

        pinObj.css('left',left).css('top',top);
      });
     },

     getPin: function(cc){
       var pinObj = jQuery('#'+this.getPinId(cc));
       return pinObj.html();
     },

     getPins: function(){
       var pins = this.container.find('.jqvmap_pin');
       var ret = new Object();
       jQuery.each(pins, function(index, pinObj){
         pinObj = jQuery(pinObj);
         var cc = pinObj.attr('for');
         var pinContent = pinObj.html();
         eval("ret." + cc + "=pinContent");
       });
       return JSON.stringify(ret);
     },

     removePin: function(cc) {
       jQuery('#'+this.getPinId(cc)).remove();
     },

     removePins: function(){
       this.container.find('.jqvmap_pin').remove();
     }
  };

  WorldMap.xlink = "http://www.w3.org/1999/xlink";
  WorldMap.mapIndex = 1;
  WorldMap.maps = {};

  var ColorScale = function (colors, normalizeFunction, minValue, maxValue) {
    if (colors) {
      this.setColors(colors);
    }
    if (normalizeFunction) {
      this.setNormalizeFunction(normalizeFunction);
    }
    if (minValue) {
      this.setMin(minValue);
    }
    if (minValue) {
      this.setMax(maxValue);
    }
  };

  ColorScale.prototype = {
    colors: [],

    setMin: function (min) {
      this.clearMinValue = min;

      if (typeof this.normalize === 'function') {
        this.minValue = this.normalize(min);
      } else {
        this.minValue = min;
      }
    },

    setMax: function (max) {
      this.clearMaxValue = max;
      if (typeof this.normalize === 'function') {
        this.maxValue = this.normalize(max);
      } else {
        this.maxValue = max;
      }
    },

    setColors: function (colors) {
      for (var i = 0; i < colors.length; i++) {
        colors[i] = ColorScale.rgbToArray(colors[i]);
      }
      this.colors = colors;
    },

    setNormalizeFunction: function (f) {
      if (f === 'polynomial') {
        this.normalize = function (value) {
          return Math.pow(value, 0.2);
        };
      }
      else if (f === 'linear') {
        delete this.normalize;
      } else {
        this.normalize = f;
      }
      this.setMin(this.clearMinValue);
      this.setMax(this.clearMaxValue);
    },

    getColor: function (value) {
      if (typeof this.normalize === 'function') {
        value = this.normalize(value);
      }

      var lengthes = [];
      var fullLength = 0;
      var l;

      for (var i = 0; i < this.colors.length - 1; i++) {
        l = this.vectorLength(this.vectorSubtract(this.colors[i + 1], this.colors[i]));
        lengthes.push(l);
        fullLength += l;
      }

      var c = (this.maxValue - this.minValue) / fullLength;

      for (i = 0; i < lengthes.length; i++) {
        lengthes[i] *= c;
      }

      i = 0;
      value -= this.minValue;

      while (value - lengthes[i] >= 0) {
        value -= lengthes[i];
        i++;
      }

      var color;
      if (i == this.colors.length - 1) {
        color = this.vectorToNum(this.colors[i]).toString(16);
      } else {
        color = (this.vectorToNum(this.vectorAdd(this.colors[i], this.vectorMult(this.vectorSubtract(this.colors[i + 1], this.colors[i]), (value) / (lengthes[i]))))).toString(16);
      }

      while (color.length < 6) {
        color = '0' + color;
      }
      return '#' + color;
    },

    vectorToNum: function (vector) {
      var num = 0;
      for (var i = 0; i < vector.length; i++) {
        num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1);
      }
      return num;
    },

    vectorSubtract: function (vector1, vector2) {
      var vector = [];
      for (var i = 0; i < vector1.length; i++) {
        vector[i] = vector1[i] - vector2[i];
      }
      return vector;
    },

    vectorAdd: function (vector1, vector2) {
      var vector = [];
      for (var i = 0; i < vector1.length; i++) {
        vector[i] = vector1[i] + vector2[i];
      }
      return vector;
    },

    vectorMult: function (vector, num) {
      var result = [];
      for (var i = 0; i < vector.length; i++) {
        result[i] = vector[i] * num;
      }
      return result;
    },

    vectorLength: function (vector) {
      var result = 0;
      for (var i = 0; i < vector.length; i++) {
        result += vector[i] * vector[i];
      }
      return Math.sqrt(result);
    }
  };

  ColorScale.arrayToRgb = function (ar) {
    var rgb = '#';
    var d;
    for (var i = 0; i < ar.length; i++) {
      d = ar[i].toString(16);
      rgb += d.length == 1 ? '0' + d : d;
    }
    return rgb;
  };

  ColorScale.rgbToArray = function (rgb) {
    rgb = rgb.substr(1);
    return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
  };

})(jQuery);

/** Add Russia Map Data Points */
jQuery.fn.vectorMap('addMap', 'russia', {
    "width": 990,
    "height": 593,
    "pathes": {
        "da": {
            "path": "m64.939,403.74,2.6516,1.2627,3.6618,0.50507,1.7678-2.0203,2.1466,2.0203,2.3991-1.6415,0.25254-1.7678,1.6415-2.1466,3.0305,0.50508,3.7881-2.9042-0.50508-1.894-4.7982-0.50508,0.75762-3.1567-1.0102-0.63134,0.63135-2.2728-3.1567-2.7779,1.5152-0.50508,3.9143,0.88388,0-1.389-1.0102-1.2627,8.3338-0.25254,4.9245,5.4296,1.2627,1.894-0.37881,2.2728-5.3033-0.3788,0.50508,2.5254,1.5152,3.0304-1.0102,3.5355-2.3991,2.7779-1.2627,0.25254,4.5457,0.75761-5.5558,2.1466-0.50508,2.0203-0.75762,0.50508-3.0305,0.50507-0.25254,4.7982-1.2627,0.88388-1.1364,13.132-9.0914-0.12627-3.6618-2.2728-1.389-0.88388,0-11.617-3.283-5.9346,0.37881-2.9042,1.2627-0.37881z",
            "name": "Республика Дагестан"
        },
        "cr": {
            "name": "Республика Крым",
            "path": "m7.63 300.28 3.08 -4.47 -2.39 -5.96 -2.32 -1.30 -0.26 -1.56 5.37 0.27 5.62 1.13 3.78 3.17 -0.68 -4.60 2.99 3.45 0.38 1.58 3.51 3.18 1.69 4.34 -1.36 3.53 -0.62 6.67 2.20 0.60 1.62 -0.23 0.49 2.00 2.15 0.47 2.86 3.79 -3.47 0.05 -1.26 2.11 -4.89 -4.06 -1.13 -2.79 -2.69 -0.25 -5.54 -2.16 -3.75 -1.18 -4.89 0.14z"
        },
        "sa": {
            "path": "M701.25,126.75l-1.44,1.06-1.25,1.63s1.44,0.87,2.16,0.87c0.71,0,2.69-1.97,2.69-1.97l-2.16-1.59zm18.47,12.09c-0.18-0.01-0.4,0.02-0.63,0.07-1.78,0.35-4.81,1.93-4.81,1.93s-1.41,1.1-2.12,1.1c-0.72,0-2.35-0.38-2.35-0.38-0.71,0-2.5,1.25-2.5,1.25l-1.4,1.78s-1.1-0.51-1.1,0.38-0.35,1.96,0.72,2.5c1.07,0.53,1.61,1.06,2.5,1.06s3.22-0.72,3.22-0.72l1.97-0.87,1.97,1.06s0.51-0.9,1.4-1.44c0.9-0.53,3.4-2.31,3.75-3.03,0.36-0.71,0.72-3.22,0.72-3.22s-0.11-1.36-1.34-1.47zm-19.81,7.1c-0.15,0.01-0.29,0.05-0.44,0.09-1.25,0.36-2.85,0.19-3.56,0.19-0.72,0-0.91,0.19-0.91,0.19s-0.88,1.58-1.59,1.93c-0.72,0.36-1.99,0.74-3.07,0.57-1.07-0.18-3.75-1.25-3.75-1.25s-1.93-0.02-1.93,1.59,3.03,3.41,3.03,3.41l1.06,1.4s-2.51,0.73-3.41,0.38c-0.89-0.36-2.65-2.16-2.65-2.16l-3.22-0.72s-2.88,0.2-2.88,1.1c0,0.89-0.68,2.67-0.68,3.56s-0.9,3.04,0.53,3.94c1.43,0.89,1.79,3.03,1.97,3.75,0.17,0.71,0.7,1.77,2.84,2.31,2.14,0.53,4.29,0.53,5,1.06,0.71,0.54,1.77,1.07,2.84,0.53,1.08-0.53,1.82-2.65,1.82-2.65l2.12-1.97s1.61-1.44,2.5-2.16c0.89-0.71,2.7-0.54,4.13-1.44,1.42-0.89,2.31-3.75,2.31-3.75v-5l-0.38-4.43s-0.68-0.58-1.68-0.47zm106.25,5.62c-0.45,0.09-0.75,4.1-0.75,4.1l-7.32,1.65-3.28,0.63-4.53-6.06-7.84-0.13-0.38,0.87-5.68,1.66-1.76,2.13-6.06,6.31v2.78l-2.15,1.91-3.29,5.03-4.93-2.38-3.41-0.37-1.75,2h-4.56l-3.41,1.78-1.75-1.53,4.28-2.91-2.28-1.62-3.03-0.13-8.84,4.03,1.9,5.44-0.87,4.78-2.66,2.91-1.65-2.13,3.03-7.47-1.75-0.37-2.66,4.03-3.03,2.03-1-0.75,1-3.16,2.28-0.74,2.91-2.66-7.1,1.75-9.22,5.31-6.68,0.25,3.65,3.66-3.65,3.4-0.5,3.03,0.37,1.16,3.91-1.78-1,4.03,4.81,2.91-0.91,2.9-2-1.37-3.68,1,1.28,3.41,2.4-0.26-1.03,2.66-3.9-0.5-4.28-1.66-3.53,0.26-2.41,3.15-0.63,4.06h-6.46l-1.76-1.53-2.4-2-0.5,4.41,0.87,0.87-0.12,1.41,1.65,0.87-0.9,2.54,1.66,6.18-3.29-1.4-1,1.15-9.87-5.31v-4.94l-2.25,0.13-1.78,2.41-2-3.41,3.65-0.63-0.5-2.9-4.43-1.66,0.75-0.87,0.12-2.53-5.28-4.04-5.31-2.53-1,3.66-7.35,0.65-2.37-1.65-4.19,2.15v2.13l4.19,4.69-10.94,5.31-10.28-1.16,0.44-4.4-12.07,0.19-3.96,3.78h-2.85l-1.09,1.09,2.66,2.87h-2.13l-2.91-2.06,1.19-2.09-0.87-1.38-1.54-1.78,0.07,2.28-1.5,1.07-3.85-1.32s-2.9,3.53-2.84,3.78c0.06,0.26,2.66,3.29,2.66,3.29l-1.41,3.34,1.59,2.09,0.19,2.78,7.38,5.82-0.32,5.47,2.53,1.9,1.63,2.53-2.53,2.72-4.41,3.03-0.69,2.63-4.81,2.78,0.25,6.12-2.25,1.1-2.97-1.28-5.65,4.75-4.44,0.09,0.06,1.97,5.38,6.59,1.78,20.1-6.35,1.97,4.19,3.4-1.78,4.19v1.25l7.16,8.84-4.57,6.69,0.97,1.6-2.4,1.87,0.09,2.25,5.63,0.34,0.71,0.72,9.1,0.19,3.31,3.31-0.53,1.6-3.31,0.34,0.19,3.94,4.03-1.06,5.06,6.59-0.53,5.53,3.84,5.19-1.97,3.4,0.53,2.13,7.69,6.53v4.37l-3.75,6.44,0.28,10.78,3.85,4.13,3.37-3.94,3.75,0.09,1.88-1.34,2.68-0.62,2.41-2.07,3.56,3.85,0.38,2.31,4-5.06,0.09-4.13,5.38-2.75-0.29-6.25,2.32-4.12,3.84-1.5,4.91,1.06,6.15,4.91,0.57,3.84,1.31,0.87,4.03-1.4,2.5-2.06,2.69,1.06,0.87,4.47,3.13,4.56,2.15,1.78v3.03l2.32,1.35,0.71,4.71,3.94,0.19,0.97,1.35,1.53,4.09,8.38-0.25,3.31-1.97,5.53,1.16,3.56,1.97,11-0.72,5.54,3.75,2.21,0.53,5.19-2.6h2.6l3.03,2.26,2.78-0.19,3.22-3.94,5.68-0.06,2.5-1.97h7.88l0.19-3.75,10.68-5.09,0.82-3.04-4.28-4.12,2.31-1.69,0.62-4.03-1.34-1.69-2.41,0.38-2.03-1.44,2.75-4.03-2.84-1.6,0.25-1.87,1.53-1.97-1.44-1.44-3.47-1.15-0.53-1.6,3.38-1.43-1.88-0.91-0.19-5.25-0.87-0.62-0.19-1.88,2.78-1.25-1.62-1.25v-2.94l5.47-1.97,3.12,0.16,0.25-1.78,6.53,0.09v-2.75l-1.25-1.53,1.16-1.25,3.47-0.62,3.31-2.22,1.34-6,5-0.44,0.1-2.06s-5.29-4.9-5.47-5.25c-0.18-0.36-0.88-3.94-0.88-3.94l-3.56-2.59v-5.97l2.94-7.16-1.69-9.19,0.78-3.12,13.5,0.72,0.25-5.28,5.19-1.16,3.47,1.87,0.81-2.31-2.41-3.69,1.69-0.62,0.19-2.75-7.16-8.5,0.1-4.37-3.13-1.5-0.09-4.04-1.78-1.15,1.09-2.13,3.81-0.47,1.35-1.78,4.28,0.38,0.09-2.44-3.37-1.5,0.15-3.31,5.47-0.53v-3.57l5.63,0.44,5.62-8.03,0.44-2.5-6.06-6.06-0.19-1.88,2.31-3.4-0.97-1.79-3.31,0.19-1.5-2.34,4.72-1.41-0.09-1.53-2.07-0.97-0.25-1.34,2.13-3.75,5.72-1.97-0.78-3.56,5.15,0.68-0.62-5.43,1.34,0.28,0.19-3.59-2.69-0.63-2.94-4.53-7.59-0.28-4.19-1.88,0.72-3.47h-3.12l-0.19-1.62,8.12-10.44,1.07-7.84s-9.81-5.72-10.25-5.63zm-135.1,8.56c-0.12,0.03-0.23,0.08-0.34,0.19-0.89,0.9-1.07,1.79-0.53,2.5,0.53,0.72,1.06,1.63,1.78,2.35,0.71,0.71,2.31,1.25,2.31,1.25s0.71-1.1,0.53-1.82c-0.18-0.71-1.97-2.84-1.97-2.84s-0.94-1.78-1.78-1.63zm28.94,7.35l-2.31,0.34s-1.07,0.91-1.25,1.63c-0.18,0.71-0.9,1.24,0,1.78,0.89,0.53,3.75,1.25,3.75,1.25s1.6-0.02,1.78,0.87c0.18,0.9,0.18,1.8,0,2.69s-0.53,1.78-0.53,1.78l0.72,0.72,1.93-0.53s0.74-0.72,1.82-0.72h2.65s1.44-0.53,1.97-1.25c0.54-0.71,1.97-1.25,1.97-1.25h2.69s1.41-0.52,0.87-1.59c-0.53-1.07-1.76-1.62-2.65-2.16-0.9-0.53-3.22-2.31-3.22-2.31h-2.5l-3.6,0.34-2.84,0.38-1.25-1.97zm-17,10.15c-0.12,0-0.22,0.01-0.31,0.04-0.72,0.17-1.44,1.4-1.44,1.4s0.37,1.78,2.16,1.78c1.78,0,2.3,0.55,2.65-0.34,0.36-0.89-0.87-2.31-0.87-2.31s-1.37-0.55-2.19-0.57z",
            "name": "Республика Саха (Якутия)"
        },
        "so": {
            "path": "m75.583,387.43-2.2728,2.6516-4.1669-2.6516-2.0203,1.1364-0.37881,5.8084-1.1364,1.389-2.2728-0.12627-5.9346-2.6516-3.0305-3.283,0.12627-4.9245,4.672,0.75761,0.37881-0.88388,2.5254-0.12627,3.283,1.5152,4.0406-1.894s-0.12627-3.5355,0.75761-2.7779c0.88388,0.75762,1.389,1.2627,1.389,1.2627l0.25254,3.5355z",
            "name": "Республика Северная Осетия"
        },
        "kb": {
            "path": "m50.982,375.86c0.26786,0.35715,2.5893,4.7322,2.5893,4.7322l0.98214,3.9286,4.6429,1.1607,2.8571-1.0714,3.2143,1.5179,4.375-1.875,0.26786-3.125-5.9821-2.3214-1.875-5.0893-2.2321-1.1607-4.375,0.71429z",
            "name": "Республика Кабардино-Балкария"
        },
        "kc": {
            "path": "m43.482,361.39,2.2321,8.4821,5.0893,6.25,4.375-2.6786,5.3571-0.89286,0.08929-3.3928,3.75-1.0714-6.6964-7.2321-2.2321,2.4107-2.8571,0.26786-1.6071-4.5536,0.44643-2.1429z",
            "name": "Карачаево-Черкесия"
        },
        "st": {
            "path": "m63.929,367.73-3.4821,0.98215,0.17857,3.75,1.5179,1.25,1.7857,4.6428,6.5179,3.0357,1.3393,1.3393,0.08929,3.0357,3.8393,1.7857,1.6071,2.5893,3.2143,0.625,0.71429-1.4286-2.8571-3.125,1.5179-0.53572,3.5714,0.80357,0.17857-1.1607-0.98214-1.3393,7.7679-0.0893,1.6964-1.5179,0.26786-3.5714-5.2679-7.5-0.17857-9.4643-3.4821-6.0714-4.9107-0.98214-1.5179-2.7679-5.0893-5.7143-0.98214-0.625-1.5179,1.3393-2.7679-2.0536-1.4286,0.80357-0.80357,1.0714-0.08929,1.6071,0.35714,1.3393,0.35714,1.1607-0.71429,1.6071-0.98214,1.4286-1.9643,2.2322-1.875,1.0714-0.71428,0.98214-0.98214,2.3214z",
            "name": "Ставропольский край"
        },
        "ks": {
            "path": "m51.607,356.48-0.08929,2.0536,0.98214,3.8393,0.35714,0.80357,2.2321,0.0893,3.75-4.5536,1.4286-1.9643,1.9643-1.0714,2.6786-4.0178-0.26786-3.3929,0.17857-1.6964,0.89286-1.5179,1.3393,0,1.7857,1.5179,1.3393,0,2.5893-3.0357,0.08929-1.9643-0.89286-0.98214-2.2321-1.3393,0.17857-2.9464,2.8571-3.125,0.08929-1.4286-2.7679-2.9464-3.75-0.71428-0.80357-0.89286,1.6071-1.25,0.17857-2.4107-2.1429-1.6072-2.5893-0.80357-1.6071-1.6964-1.25-0.98214-0.89286-0.0893-1.3393,2.2322-0.625,0.98214,1.0714,1.4286-0.35714,1.5179-0.80357,0.625-2.7679-0.26786-0.89286-0.89286-1.9643,0.0893-1.875,0.71429-3.0357,1.7857-1.6964,0-1.3393-1.4286-1.6071-0.625-1.1607-1.4286,0-2.6786-2.2321-0.26786-1.25,0.625-0.35714,2.9464-0.089286,13.214,0.71429,5.8929,0.98214,3.6607-0.089286,2.3214-0.625,2.7679-0.089286,2.4107,0.17857,2.0536,1.5179,0.89285,0.71429,0.625,1.6071,1.5179,0.89286,1.0714,0.89286,0.89286l7.947-4.27-0.804-1.25-0.357-1.43-5.089,2.68h-1.875l-1.25-1.875,0.35714-3.5714,6.25-1.4286,2.7679-2.3214,0.71429-2.5893-1.3393-0.80357-1.9643,0.44642-1.1607-1.5178-0.71429-2.6786-1.3393-1.7857-0.17857-1.25,0.08929-1.1607,1.3393-0.80357,1.3393,0.625,1.0714,1.3393,1.0714,1.9643,1.3393,1.7857,2.3214,1.3393,1.6964,0.89285s0.625,0.26786,0.71429,0.625c0.08929,0.35715,0.89286,2.6786,0.89286,2.6786v4.0178l-0.08929,1.3393-1.0714,1.0714-1.875,1.5178-1.6071,1.4286z",
            "name": "Краснодарский край"
        },
        "ro": {
            "path": "m67.5,323.45,2.0536,0.98214,1.4286-0.17857,0.625-0.89286-0.44643-1.1607-1.25-0.89286-1.9643-1.3393-0.89286-1.1607-0.35714-0.71428,1.0714-1.4286l2.231-1.08,1.6071-0.26786,1.0714,0.35714,1.4286,1.3393,1.5179,0.35714,1.6964-0.89286,0.89286,0.44643,1.072,1.06,1.339,1.79,0.268,1.33,1.607-0.08,1.3393-0.80358,1.6964-0.0893,1.3393-0.0893,0.35714-1.5178,0.53571-1.4286,1.25-1.6071,1.3393-1.0714,1.6964,1.0714,0.71429,0.35714,0.89286-1.875,0.44643-0.71428,2.6786-0.26786,1.875-1.6964,2.3214-0.17857,2.0536,1.1607,2.1429,1.25,0.98214,0.53571,3.9286,0.0893h2.2321l1.5179-0.98215h1.3393l0.71429,0.625,0.26786,1.6964-0.08929,1.9643v1.875l-0.08929,1.0714-0.981,1.34-1.25,0.98214-1.25,0.71429-0.80357,0.35714-0.35714,1.25-0.44643,1.6072-0.08929,1.4286-0.44643,1.1607-0.625,1.4286-1.4286,1.5179-1.6964,0.53571h-3.125l-1.608-0.36-1.518,0.53-0.625,1.97-0.982,0.62-0.80357,0.53572,0.17857,0.89285,1.3393,1.4286,0.71429,1.4286-1.1607,1.4286-1.3393,0.89285-0.80357,1.7857-0.08929,0.80357,0.98214,0.53571,1.1607,1.1607,0.625,1.0714,0.80357,0.80357,0.71429,1.3393v1.0714l-0.71429,0.80357,0.53572,0.625,1.4286,0.35715,0.625-0.53572,0.71429-0.0893,0.35714,0.98214v1.4286l-1.3393,1.3393-2.1429,1.0714-2.0536,1.1607-3.3929,0.0893-0.80357,0.80357-1.3393,0.80357-1.696,0.46-1.429-0.71-1.696-0.71-0.893-0.9-0.178-2.23-0.179-1.52-1.696-2.14-1.1607-0.80357-0.17857-1.25-0.80357-0.89286-1.7857-0.0893h-2.7679l-2.8571-0.0893-1.3393-0.17857-1.6071-1.7857-0.98214-0.71429v-0.89286l1.3393-1.5178v-1.5179l-0.625-1.25-1.875-1.4286-0.71429-0.625,0.26786-2.2322,2.7679-3.2143,0.08928-1.6071-1.9643-2.2322-1.3393-0.89285-2.411-0.55-1.0714-0.35714-0.08929-0.71429,1.0714-1.0714,0.26786-1.1607z",
            "name": "Ростовская область"
        },
        "kk": {
            "path": "m74.554,348.71,0.98214,1.6071,1.1607,1.0714,1.1607,1.6964,0.80357,1.1607,1.1607,0.71429,2.5893,0.44643,1.3393,0.625,0.98214,1.6071s0.98214,1.7857,1.25,2.2321c0.26786,0.44643,0.98214,2.4107,0.98214,2.4107l0.17857,4.9107v3.2143l0.89286,2.2321,3.3036,4.1964,1.25,2.0536-0.17857,2.5893-1.4286,1.875,0.89286,1.3393,4.375,4.7321,0.53571,1.25,0.35714,0.98215,0.89286,0.53571,1.4286,0.0893,1.6071-0.26786,1.7857-0.53572,2.2321-0.89285,2.3214-0.26786,0.713-0.71,0.625-2.15-0.268-1.16-2.232-1.34-0.982-0.71,0.08928-1.3393,1.0714-0.625,1.7857,0.0893,1.4286-1.25-0.53572-0.71428-0.71428-2.0536-0.268-1.7-0.179-1.16h1.0714l1.6964,1.25,1.7857,0.80357,2.6786-0.17857h0.89286l0.53571-1.1607-0.17857-2.4107-0.08929-3.8393v-6.3393-0.98214l-0.08929-2.2321,2.9464-2.8572,0.17857-1.3393-1.4286-0.625v-3.2143l-1.0714-1.1607-1.1607-0.35715-2.5-0.17857-0.625-1.4286-0.17857-0.80357-1.25,0.26786-0.625,1.0714h-1.3393l-1.25-0.0893-1.071-0.98-0.804-0.71-2.321-0.27-0.98214,0.35715-0.71429,0.80357-0.71429,0.35714-0.26786,1.1607-0.35714,0.80357,0.35714,0.625,1.0714,0.35714,1.0714-0.44643,0.89286,0.35714,0.08929,0.98215-0.44643,1.5178-5,3.125-3.3929,0.26786-2.3214,1.3393-1.5179,0.53571-3.8393-1.7857-0.53571-0.35715-0.08929-3.3928-0.71429-1.4286-2.3214-2.2322-0.625-1.25-1.9643-0.80357h-3.5714z",
            "name": "Республика Калмыкия"
        },
        "as": {
            "path": "m116.873,350.94,1.6415-1.389,1.1364-0.63135,1.7678,1.2627,2.0203,0.63135,2.2728,0.50508,0.88388,1.0102,2.1466,0.88388,0.75761,1.1364,0.63134,1.1364,0,1.389,0,0.88389-1.5152,0.3788-1.1364,1.389-0.12627,1.0102,0.63134,1.389,1.0102,1.1364-0.37881,2.1466-0.75762,1.0102-1.7678,0.88389-0.25254,1.1364,0.50508,0.88388,1.7678,1.1364,2.2728,1.5152,1.389,1.6415,0.63134,1.0102,0,1.5152-1.0102,1.1364-0.25254,2.0203-1.0102,1.0102,0,2.2728,0,2.7779-0.75761,0.3788-1.7678-0.3788-1.894-0.75762-0.63134,0.37881-0.37881,2.1466,1.6415,2.1466,1.1364,1.2627,0.88388,1.0102,0.50508,0.63134,0.12627,1.2627-3.9143,0.25253-3.0305,0.63135-2.1466,0-1.894-1.2627-2.0203-1.5152-5.4296,0-1.0102-0.37881-1.1364-1.1364,0.37881-2.9042-0.88388-1.0102-2.2728-1.6415,0-1.6415,1.0102-0.3788,1.5152,0,1.389-1.0102-0.63134-1.389-0.75761-4.0406,0.63134-0.3788,1.2627,0.75761,2.9042,1.389,2.0203-0.25254,1.2627-0.12627,0.50508-1.6415-0.25254-5.4296,0.12627-5.0508-0.25254-4.2931,2.1466-2.2728,1.0102-1.1364,0.12627-1.389-1.2627-0.50508-0.25254-2.1466z",
            "name": "Астраханская область"
        },
        "ad": {
            "path": "m51.786,356.21,2.4107-1.4286,2.5-2.6786,0.35714-2.1428-0.26786-3.9286-1.0714-2.7679-2.9464-0.98214l-2.412-1.78-2.232-3.75-1.5179-1.1607-1.3393,0.71428-0.17857,2.1429,1.6071,1.875,0.80357,2.5893,1.1607,1.6964,1.6071-0.35714,1.5179,0.44643-0.44643,2.9464-2.9464,2.3214-3.394,0.71-2.8571,0.35715-0.17857,3.8393,1.0714,1.7857h1.7857l5.3571-2.9464,0.35714,1.7857z",
            "name": "Республика Адыгея"
        },
        "vl": {
            "path": "m115.893,313.18,1.5179-0.98214,1.875-0.0893,1.1607-1.0714,1.1607-1.6072,0-1.25,1.1607-0.98214,1.9643,1.25,2.5,1.9643,3.3036,2.1428,3.9286,1.5179,1.4286,1.5179,0.625,2.1428,0.44643,1.4286,2.8571,0.35714,0.44643,1.4286,2.5893,0.80357,1.7857,1.7857,1.6964,1.6964,0.17857,2.2322-1.5179,1.25-1.6071,2.2321-1.4286,1.3393-0.26786,1.25,0.89286,2.2321,2.9464,1.875,1.6964,1.875,1.7857,1.1607,1.25,3.3036,1.0714,1.875,0.0893,1.25-0.71428,0.53572-1.3393,0.44643-0.71429,0.53571-2.8571,0.26786-4.6429-0.0893-1.6964,0.26786-0.71429,1.6071,0,2.8572-0.17857,1.1607-1.6964,1.25-1.3393,0.98214-4.0178-0.0893-1.0714-0.0893-1.3393-3.0357-1.4286-1.0714-1.875-1.0714-1.0714-0.625l-2.256-0.46-2.054-1.25-1.071-0.18-1.1607,0.625-0.98214,0.71429-1.25,0.26785-2.1429-0.0893-0.89286-1.1607-0.35714-1.25-1.4286,0.26786-0.89286,1.1607h-1.25l-1.875-0.71428-1.25-0.80357-1.3393-0.35715-1.4286,0.17858-1.4286,1.25h-0.89286l-1.4286-2.5-1.25-1.4286-1.0714-0.71428,0.448-1.44,0.893-1.52,1.607-1.43,0.179-0.89-1.6964-2.1429-0.44643-1.0714,1.4286-0.80358,0.625-1.875,0.625-0.53571,1.25-0.35714,1.6071,0.0893h3.0357l1.7857-0.625,1.9643-2.5893,0.89286-4.0179,0.625-1.4286,2.8571-2.0536,1.1607-1.6964,0.35714-3.3036v-2.2322z",
            "name": "Волгоградская область"
        },
        "vn": {
            "path": "m100.089,310.77,0-6.0714,0.08929-1.1607,3.75-3.2143,2.5-3.6607,1.3393-1.4286,0.35714-1.875,2.4107-0.71428,0.35714-2.5893,0.625-1.7857,1.0714-0.35714,0.625-2.0536,1.3393-1.7857,1.1607-1.0714,0.98214-0.53571,0.89286,1.1607,0.44643,0,0.71429-1.0714,0.53571-0.71428,1.1607-0.17857,0.89286,0.89285,1.25,1.1607,1.4286,1.4286,1.1607,1.5179,0.80357,0.89285-0.26786,2.1429,0,1.6071,1.875,1.0714,2.3214,1.3393,0.80357,1.3393-0.0893,1.7857-0.89285,1.5178-0.44643,0.98215,1.5179,1.25,1.875,1.7857,1.9643,2.2321,1.3393,1.6964,1.1607,1.9643-0.26786,2.3214,0,2.0536-2.1429,1.0714-0.71428,0.17857-4.2857-1.875-2.6786-1.7857-2.1429-1.4286-1.6964-1.1607-0.53571-0.17857-0.71429,0.80357-0.44643,1.25-1.4286,1.9643-1.6964,0.44643-2.8571,0.80357-3.5714,1.1607-3.2143,0.0893-2.5-0.17857-2.3214-1.25-2.3214-1.0714z",
            "name": "Воронежская область"
        },
        "bl": {
            "path": "m93.304,272.29-5.4464,3.3036,0.08928,2.6786,1.6964,1.875,0.08929,3.125,0.44643,1.6964,2.8571,1.6071,2.8571,0.44643l1.608,2.23-2.5,3.3036-0.35714,2.1429,1.0714,1.6071,2.3214,1.5179,0.17857,2.9464,1.1607,1.5179,0.71428,0.89285,4.7321-4.375,3.75-5.4464,2.0536-0.89285,0.80357-4.1072,1.0714-0.89285,0.53571-1.3393-2.5-2.8571-3.5714-4.1071-2.7679-0.26786-2.9464-1.1607-2.6786-1.6964-2.5893-1.6072-1.9643-1.6071z",
            "name": "Белгородская область"
        },
        "ky": {
            "path": "m93.482,271.84,0-4.6429l-0.357-1.61-1.786-1.97-0.714-1.07,1.3393-1.0714,3.75-1.3393,2.7679-1.3393,2.6786,0.0893,0.53571,1.0714,1.25-0.0893,1.7857-1.1607h0.80357l0.98214,0.44643,1.4286,1.6071,0.53571,0.80357,0.08929,1.6964,1.0714,0.89286,1.0714,0.71428h0.89286l1.0714,1.25,0.17857,3.2143v2.4107l-0.89286,0.98214v1.5179,1.1607l1.0714,1.25,1.1607,0.98214,0.89286,0.17857,1.5179,0.53571,1.0714,1.6072,1.6071,1.5178-0.71429,1.1607-0.80357,0.89286-0.89286-0.80358-1.9643,1.25-1.4286,1.1607-0.53571,0.80357-3.4821-4.1071-2.2321-2.3214-0.98214-0.53572-3.3036-0.625-2.8571-1.5178-3.6607-2.1429-2.4107-1.9643z",
            "name": "Курская область"
        },
        "or": {
            "path": "m104.732,258.27,1.0714-1.875,2.2321-0.26786,0.89286-1.6071,0.89286-0.53572,1.9643,0.89286,1.6964-0.0893,1.6071-0.71429,1.0714-1.5179,0.89286-0.53571,0.98214,0.17857,1.3393,0.98214,1.9643,0.89286,1.1607,0.89286,0.35714,0.89285,0.71429,1.3393,0.17857,2.0536,0,3.6607,0.98214,1.7857,1.4286,1.875,0.80357,1.25,0.71429,1.7857-0.26786,1.5179-3.9286,1.875-1.9643,0.98214-1.0714,2.1429-1.875,1.0714-1.875,1.0714-2.4107-0.89286-1.9643-1.6071-0.44643-1.6964,0.44643-1.9643,0.44643-0.89285,0.08928-4.4643-0.89286-1.6964-1.7857-0.53571-1.7857-1.4286-0.08929-1.6072-1.3393-1.5178-1.6071-1.6964z",
            "name": "Орловская область"
        },
        "lp": {
            "path": "m116.875,278.45,1.5179,1.875,1.0714,0.89286,1.1607,0.71428,1.1607,1.0714,2.5,2.2321,1.25,1.5179,0.625,1.4286-0.44643,2.5893,0.53572,0.625,2.5,1.3393,1.875,1.7857,1.0714-0.17857,1.0714-0.625,0.44643-0.80357,0.0893-5.8036,0.35714-0.71428,1.4286-0.80357,2.3214-0.17857,2.0536-1.1607,1.3393-0.44643,0.17857-1.6964,0.625-1.3393,1.25-1.5179-0.80357-1.1607-2.6786-0.98215-0.53571-0.53571-0.17858-0.71429,1.0714-1.3393,0-1.6071-2.1428-0.35715-1.0714,0.44643-1.6072,0.80357-0.98214,0.89286-1.1607,0.625-1.4286,0.0893-1.3393-1.5179-1.6964-1.6964-0.80357-0.98214-2.4107,0.89285-3.125,1.6964-1.1607,1.6072-1.6071,1.4286z",
            "name": "Липецкая область"
        },
        "tl": {
            "path": "m123.482,256.3,3.2143-2.0536,0.98214-0.17857,1.6071,0.80357,0.98215-0.80357,0.71428-1.0714,3.125,0,1.6072,0.625,2.0536,0.35714,1.4286,0.80358,2.4107,0.35714,1.4286,0.71428,0.53572,1.0714,0.98214,1.0714,1.25,1.4286,0.71429,1.6072-0.35715,1.6964-0.98214,1.1607-0.71428,1.6964-1.3393,1.9643-1.6964,2.0536-1.0714,1.875-0.71428,0.98215-0.53572,0.35714-1.7857,0-2.5,0.89286-1.5179,1.0714-1.3393,0.26785-2.0536-1.3393-2.0536-2.5893-0.26786-2.0536-0.53571-1.4286-1.6071-2.5l-1.413-2.14-0.179-2.23z",
            "name": "Тульская область"
        },
        "bn": {
            "path": "m97.679,258.62,0.26786-1.7857,2.3214-1.5179,0.44643-1.1607,0-1.4286-1.6071-1.9643-1.7857-2.1429-1.6964-1.9643-2.3214-1.875-1.5179-0.89286-1.6964-0.26786-0.89286-1.1607,0.17857-2.3214,1.3393-1.6071,3.125-2.1429,2.6786-1.875,0.89286-1.7857,0.98214-0.71428,1.6964,0.26786,0.625,1.25,0.625,1.5178,1.0714,2.2322,1.1607,0.80357,5.8929,0.26785,2.1429-0.35714,1.4286,0.53572,3.125,0.89285,2.3214,0,0.71429,1.9643,0,2.2321-0.17857,1.1607-0.98214,1.5178-0.71429,0.53572-0.26786,1.4286,0.26786,1.5179,0,1.25-0.80357,1.4286-1.4286,1.5178-1.7857,0.71429-1.6964,0.17857-1.7857-0.71428-1.4286,0.71428-0.26786,0.89286-2.4107,0.80357-1.0714,1.4286-1.3393,1.25-1.4286,0.17857-1.4286-0.71428z",
            "name": "Брянская область"
        },
        "kj": {
            "path": "m119.196,239.61,1.6071-1.25,1.6071-1.3393l1.161-0.27,1.429,0.63,0.80357,1.4286,1.0714,1.25,1.7857,0.80357,1.7857,0.35715,3.125,0.0893,1.875-0.0893,1.6071-1.0714,2.4107-0.0893,1.4286,0.44643,0.98214,2.0536,0.26786,1.4286,1.25,0.625,1.6071,0.98215,0.98214,0.80357,0.53572,1.25-0.53572,2.0536-1.0714,1.7857-1.4286,1.9643-1.1607,1.25-0.89286,0.44643-3.75-1.25-2.6786-1.0714-2.6786,0.0893-1.875,0.44642-1.0714,1.25-1.5179-0.44642-1.0714,0.0893-1.0714,0.80357-2.0536,1.0714-0.89286-0.89286-1.0714-0.80357-1.9643-1.25-1.5179-0.89285-0.89286-0.44643v-1.0714-2.4107l-0.08929-0.625,1.1607-1.6964,1.0714-1.875v-1.7857l-0.26786-1.6071z",
            "name": "Калужская область"
        },
        "sm": {
            "path": "M109.375,237.55,110,235.95,110.179,234.52,109.732,233l-0.08928-1.4286,1.5179-1.3393,0.71429-1.6071,0.08929-3.125,0.35714-1.875,2.4107-2.5,2.5-1.9643,1.875-1.7857s1.875-1.3393,2.2321-1.5179c0.35714-0.17857,2.5-1.5178,2.5-1.5178l2.5,0.0893,3.0357,3.4822,1.875,3.4821,2.5,3.6607,1.4286,0.89286,2.7679,0.53571h2.0536l0.80357,0.71429,1.1607,1.875,1.1607,1.3393,1.25,1.6071,1.0714,1.4286,0.17857,1.3393-0.98214,1.25-1.875,0.89285-1.875,0.53572-0.89286,1.25-0.44643,0.89285-1.875,0.44643-1.7857,0.625-1.6072,0.35715h-3.0357l-3.75-0.80358-1.7857-1.7857-1.4286-1.3393-1.1607-0.26785-1.1607,0.71428-2.2321,1.5179-1.1607,0.44643-1.7857-0.44643-4.1071-0.98214-2.4107-0.35715z",
            "name": "Смоленская область"
        },
        "mc": {
            "path": "m146.07,234.16,3.5714,0.26785,2.3214-0.89285,1.4286-0.44643,0.53571,0.625,0.0893,1.7857,0,1.1607-0.17857,1.3393,1.5178,0.89286,2.9464,0.44643,1.7857,0.89285,2.0536,0.89286,2.7678,0.89286,1.7857,0.26786,1.25,0.53571,0.26786,1.6071-0.0893,1.5179-0.44643,1.6964-1.5179,0.625-2.1428,1.1607-1.6072,1.3393-0.0893,1.25-0.625,1.7857-1.1607,1.5179-0.35714,1.6071,0.17857,1.6072,0.0893,0.89285,1.1607,1.0714,1.0714,0.625,1.1607-1.0714,0.625,0.44643,0,1.5179-0.0893,3.2143-0.44643,1.1607-1.3393-0.44643-1.875-0.17857-1.6072,0.17857-0.80357,0.89286-2.0536,0.0893-1.6071-0.35714-1.25-0.71429-1.0714-1.1607-1.6071-0.625-1.6964,0-0.44643,0.80357-0.17857,1.1607-1.0714,0.53571-1.4286,0.0893-0.80357-0.80358-0.17858-0.625,1.1607-2.4107,0.26786-1.9643-0.53572-1.6964-1.1607-1.5179-1.1607-1.5179-1.0714-0.89286,0.625-1.25,2.5-2.9464,1.1607-2.6786-0.71429-1.7857-1.6071-1.6071-1.6071-0.98215-0.53572-0.35714-0.625-1.875-0.80357-1.25-0.80357-0.80357,0.625-1.5179,2.5893-1.3393z",
            "name": "Москва и Московская область"
        },
        "rz": {
            "path": "m144.55,265.59-1.9643,2.6786-2.1429,3.125-0.625,2.7679-0.80357,1.7857,0.17857,0.80357,1.6964,0.71429,1.9643,1.3393,0.44643,1.5179-0.26786,0.89286,1.4286,1.1607,1.9643,0,1.1607,0.71429,0.0893,1.875,0.44643,1.1607,1.25,0.44643,1.5179-0.625,1.9643,0,1.5179,0.98214,0.625,1.7857,1.0714,1.1607,2.6786-0.17857,3.125,0,2.9464-2.0536,3.0357-2.9464,1.5179-2.2321,1.0714-1.7857-0.98214-2.2321-0.53572-3.125-2.0536-2.0536-1.25-1.6964-0.44643-2.8571-0.53571-1.6072-0.35715-0.98214-2.1428-0.35714-3.4822,0.26786-0.625,0.80357-2.1428-0.17857-1.875-0.71429-1.875-1.0714-1.9643-0.89286-1.0714,0.35715-0.80357,1.4286-1.4286,0.89286-1.6071-0.44643z",
            "name": "Рязанская область"
        },
        "tb": {
            "path": "m142.77,279.43-1.6964,2.1429-0.35714,1.7857-0.80358,0.89286-2.6786,0.98214-1.875,0.44643-1.5178,0.71429-0.71429,1.4286,0,2.1429,0.26786,2.3214-0.71429,1.875-1.5179,0.53571-0.44642,1.4286-0.44643,1.6964-0.625,1.1607,0.08928,0.625,2.3214,2.1429,2.2321,2.1429,1.6072,2.2321,1.4286,2.0536,0.98214,0,2.1429,0,1.9643-1.25,2.5-1.25,1.6964-1.0714,4.0179-0.26785,1.0714-0.98215v-3.6607c0-0.35714,0.0893-2.3214,0.0893-2.3214l1.5179-1.1607s0.71429-0.71429,0.80357-1.0714c0.0893-0.35714-0.26785-4.6429-0.26785-4.6429l1.4286-1.0714-0.80357-2.1428-1.7857-1.4286-2.3214,0.26786-0.89285,0.625-1.1607-0.80357-0.89286-1.3393v-1.3393l-1.875-0.80357h-1.3393l-0.89286-1.0714-0.26786-1.3393z",
            "name": "Тамбовская область"
        },
        "kn": {
            "path": "m74.107,152.55,0,2.2322,0.53571,2.5,2.0536,5.1786,1.4286,3.4821,1.9643,3.6607,2.5,1.0714,3.75-0.44642,1.9643-1.3393,0.625-1.7857-0.44643-4.2857-0.89286-2.8571-1.5179-1.6071-2.4107-0.53572-0.98214-0.71428,0-3.0357-0.80357-1.4286-1.6964-1.6071-1.6071-0.26786-0.35714,1.25-0.625,1.3393-0.625,0.89285-1.4286-0.35714z",
            "name": "Калининградская область"
        },
        "ps": {
            "path": "m125.268,213.98,0.35714-2.1428-0.26786-2.1429-1.4286-1.875-1.3393-1.4286-0.08929-1.6964,0.98214-0.71429,0.17857-1.6964-0.89286-0.98215-1.25-1.875,0-4.1964,1.5179-0.89285,3.75-2.2322,0.80357-2.4107,0.53572-1.7857,1.875-1.25,2.4107-0.0893,1.3393-1.6071,0.98214-1.6964s1.25-0.625,1.6072-0.80357c0.35714-0.17857,2.8571-0.71429,2.8571-0.71429l1.5179-0.0893,1.0714,0.53571-0.625,1.5179-0.71428,0.89285-0.17857,0.98215,1.6071,0.26785,1.25-1.7857,0.98214-2.0536,1.1607-1.5179,1.6071-0.71428h1.6071l1.5179-1.5179,1.1607-0.625h1.4286l0.98214,0.98214,0.625,1.5179,0.98214,1.6071-0.26786,1.6964-0.89285,0.98214-0.35715,1.3393-0.80357,1.6071-0.17857,1.1607h-1.4286-0.80357l-0.71429-0.53572-0.80357,0.53572-0.625,0.80357-0.53571,1.5178-0.53572,2.1429-0.0893,2.5-0.35715,1.875-1.1607,1.25-1.3393,0.98214h-1.7857l-1.5179,1.3393-0.53571,1.7857-1.3393,0.53572-0.44643,1.0714-0.17857,1.4286-1.7857,0.89286-1.7857,0.80357-0.625,1.6964,0.625,1.5178,0.625,0.625-0.26785,1.4286s-0.0893,0.44643-0.44643,0.80358c-0.35714,0.35714-1.1607,1.3393-1.1607,1.3393l-1.4286,0.80357-2.3214,0.89286-1.0714,0.0893-1.1607-0.89286-0.89286-0.89286z",
            "name": "Псковская область"
        },
        "no": {
            "path": "m153.12,188.27,1.5179,1.25,2.1428,0.35714,2.1429,0.17857,1.25,1.1607,2.5,0.53571,2.3214-0.0893,1.0714-0.89286,0.44643,0.625,0.0893,1.7857,2.1429-0.53571,2.3214,0.0893,0.80357,0.80358,0.17857,2.5,0.17857,2.5,0.53572,1.0714,1.3393,0.17858,1.3393,0.44642,0.26785,2.1429,0.71429,1.6964,0.98214,0.80357,0.44643,2.9464,0.0893,2.2321,0.89285,1.4286-0.53571,0.98215-0.71429,0.53571,0,1.6071,0.17858,1.5179,1.4286,1.3393,0.625,0.53571,0.0893,1.9643,0,1.9643-0.17857,1.3393-1.25,0.53571-0.71428-0.26785-0.625-0.80358-0.71429-0.80357-0.17857-1.1607-0.98214-0.80357-0.80358-0.625-2.0536,0-1.5178-0.53572-0.53572-0.35714-1.5178-0.53571-0.71429-0.26786,0-0.44643s-0.26786-1.25-0.26786-1.6964c0-0.44643-0.0893-2.0536-0.0893-2.0536l-0.625-0.98214h-1.7857l-0.89285-0.44643-0.44643-0.98214-0.98215-0.625-0.53571,0.625-0.89286,1.0714-1.6964,1.4286h-2.1428c-0.35715,0-1.5179,0.0893-1.5179,0.0893l-0.71429-1.0714-1.0714-0.71428-2.3214-0.17857-2.6786-0.0893-1.5179-0.44643-1.3393-0.98214-2.3214-0.44643h-2.1428l-0.89286-1.1607-1.25-1.0714-0.53571-0.71429-1.1607-0.71428,0.98214-2.7679,0.71429-0.44643,1.1607-1.5179,1.0714-1.0714,2.0536-0.625,2.5-1.9643,0.625-1.9643,0.0893-3.5714,0.98214-2.5893,1.0714-1.25,1.1607,0.26786z",
            "name": "Новгородская область"
        },
        "tr": {
            "path": "m128.661,216.66,3.2143-0.625,2.2321-1.6072,1.3393-1.6071,0.17857-1.4286-0.80357-1.4286-0.26786-1.3393,0.35714-0.89286,1.4286-0.89285,1.6964-0.625,1.1607,0.44643,1.5179,1.5178,1.0714,0.98215,0.98215,0.53571,1.6964,0.17857,2.4107,0.35714,1.3393,0.98215,1.3393,0.26785,3.2143,0.44643,1.5178,0,1.25,0.71429,0.80358,0.71428,1.875,0.35715,1.7857-0.17857,1.875-1.6072,1.25-1.25,0.71429,0.44643,0.625,0.80357,1.4286,0.44643,1.4286,0.17857,0.53571,1.5179,0.17857,2.4107,0.35715,0.80358,1.1607,0.71428,1.4286,0.80357,1.0714,0.26786,1.875,0.35714,0.98214,0.26786,1.25,1.0714,0.44643,1.3393,0.98214,1.0714,0.80358,0.53572,1.7857-0.35715,1.3393,0.0893,1.25,0.71429,1.6071,0.89285,0,1.5179-0.625,1.6964-1.25,1.6071-1.6071,0.44643-1.25,0.98214-1.5179,1.3393-0.89286,1.0714-0.44643,0.71428-0.26785,1.5179-0.44643,1.0714-1.25,1.4286-0.53572,1.4286-0.35714,2.0536-2.0536,1.9643-2.0536,1.3393-1.0714,0.17858-0.53571-0.71429-0.26786-1.7857-1.6964-0.71429-3.8393-0.89286-3.8393-1.6071-3.0357-0.80357-1.5178-1.0714-0.0893-3.0357-0.35714-1.6964-3.3036,0.80357-3.4822,0.26786-1.3393-0.89286-3.4821-4.4643-1.5179-2.0536-3.3036-0.625-2.7679-0.53571-1.4286-1.7857z",
            "name": "Тверская область"
        },
        "vm": {
            "path": "m167.41,247.73,1.6072,1.7857,2.0536,1.25,1.1607,1.0714,1.3393,0.35714,0.80357,0.89286,0.0893,1.5178-0.89285,1.7857-0.35715,1.0714,1.25,0.625,1.7857,0.26785,1.0714,1.1607,0.17857,1.9643,0.98214,1.875,1.0714,1.25,1.3393,1.25,1.3393,1.3393,1.3393,1.1607,1.7857,1.875,0.89286,1.3393-0.17857,0.98214-0.89286,0.71429l-0.18,0.98,0.53571,0.71429,0.44643,0.71428,0.0893,1.6072-1.7857,0.53571-2.2321-0.0893-1.1607-1.0714-4.4643-0.0893h-5.1786l-1.7857,0.53571-0.71429-1.6964-1.6964-1.9643-1.6071-2.6786-0.80357-4.1964-0.0893-4.1071-0.17857-2.0536-0.44643-0.44643-0.71428,0.44643-1.1607,0.26785-1.4286-1.25-0.26786-2.5893,0.71429-2.0536,1.1607-2.0536,0.44643-1.7857,1.3393-1.0714z",
            "name": "Владимирская область"
        },
        "pz": {
            "path": "m157.05,289.96,1.6964,1.7857,2.0536,1.5179,1.25,0.98214,1.6964,0.625,1.25,1.875,0.71429,1.6071,0.26785,1.9643,0.98215,0.98214,1.0714,1.0714,2.6786,0.17857,1.6964,0.0893,0.625,2.1429,0.89286,1.7857,1.6964,0.71429,2.1429,0.26785,1.4286,1.0714,0.625,1.0714-1.5179,0.89286-0.89286,0.98214,0.0893,4.1071-0.26786,3.4822-2.7679,1.25-1.0714-0.0893-0.89286,1.6071-1.9643,0.98215-1.1607-1.7857-0.98214-0.98214-5.9822-0.0893-1.1607-1.875-0.89286-0.89285-3.125-0.71429-0.98214-1.6071-1.25-1.6964-2.1429-0.71429-2.4107-1.3393-1.6071-1.0714-2.5,0.0893-0.71429-1.875,0.26786-2.5,1.1607-0.89285,3.8393-0.80357,0.89285-2.4107,0-3.4821,1.3393-1.6964,1.3393-1.6071-0.26786-2.5893,0-1.9643,1.1607-0.89286z",
            "name": "Пензенская область"
        },
        "sr": {
            "path": "m137.23,308.27-0.17857,3.0357-0.26786,1.25-2.2321,1.1607,1.4286,1.6964,1.0714,3.2143,2.2321,0.71429,0.98215,0.80357,0.89285,1.0714,1.7857,0.625,2.5893,2.5,0.89286,1.0714,0,1.875-1.5179,2.0536-2.4107,2.8571-0.44643,1.25,0.44643,1.6964,0.71429,0.89286,2.1428,1.1607,4.0179,3.9286,1.7857,4.5536,1.25,1.4286,1.25,1.3393,0.26786,1.9643-0.71428,2.5-0.53572,2.4107,0.26786,1.7857,0.89286,1.0714,1.6071,0.44643,1.6964,0,1.6964-1.1607,1.25-1.0714,0.44642-2.6786,0.0893-1.875,2.2321-0.625,3.3036,1.25,1.6964,0.35714,1.6072,0,1.3393-1.5179,0.44643-0.53571,1.6071,0.35714,1.3393,1.0714,1.5178,0.89286,4.6429,0,1.1607-1.1607,1.3393,0.17857,0.89286,0.80358,1.6071-0.53572,0-1.7857-0.89286-1.9643-0.35714-1.3393-0.17857-3.9286-0.0893-2.0536-0.71428-1.25,0.0893-2.8571-0.35714-1.6071,0-2.5-0.80357-1.3393-1.1607-1.6071-2.5-1.0714-1.6072-2.0536-2.5893-0.0893-1.0714-0.35714-1.7857-1.6964-0.625-1.25-0.44642-0.89286-1.7857-2.4107-5.625-0.26786-0.53571-0.17857-1.9643-2.5893-3.125-0.89286-2.2321-2.9464-6.1607-3.3036-2.3214,0-1.0714-1.6964,0.44643-2.5-0.80357-0.35714-3.8393,2.1428-1.5179,0.35715z",
            "name": "Саратовская область"
        },
        "mr": {
            "path": "m157.59,290.05,1.875,2.1429,2.6786,1.7857,1.7857,1.1607,1.7857,2.7679,0.44642,2.4107,2.0536,2.1429,2.5893,0.0893,1.6071,0.26786,0.89286,2.2321,0.71429,1.4286,2.0536,0.89286,1.7857,0.35714,1.25,0.625,0.53572,0.80358,5.8928,0.17857,2.6786-3.5714,0.35715-0.53572,0.71428-1.3393,0.0893-2.1429-0.0893-1.9643-1.7857-0.98215-0.35714-2.5-0.0893-0.80357-1.6964,0,0,0.17857-0.80357,0.89286-1.3393,0.80357-5.2678,0-2.5893-2.3214,0.17857-3.5714-1.1607-1.0714-0.17857-0.80358,1.0714-1.0714,0-1.6072-2.5893-0.53571-1.7857-0.0893-0.80357-1.25-0.71429-1.6964-1.25,1.1607-2.1429,2.3214-2.4107,1.5178-1.5179,0.98215-2.9464,0.26785z",
            "name": "Республика Мордовия"
        },
        "cu": {
            "path": "m189.11,299.07,1.3393-0.89286,2.9464,0.44643,1.3393,0.44643,1.0714-1.3393,0.26786-1.7857,2.2321-1.1607,2.2321-2.2322,3.125,0.0893,2.6786,0,1.25,1.5179,0.35715,2.9464-0.17857,1.5179,0.35714,1.25,0.71428,1.1607-0.0893,0.71428-1.3393,0.625-4.1071-0.0893-1.3393,0.53571-0.80357,0.80357,0,0.89286,1.1607,0.71428-0.17857,0.89286-1.3393,1.1607-1.7857,1.25-2.1429,0.98214-1.3393,0.44643-1.3393-1.3393-2.5-0.44643-0.98215-0.625-0.98214-1.3393-0.80357-0.80357,0.80357-3.5714z",
            "name": "Чувашская Республика"
        },
        "ul": {
            "path": "m188.57,305.32-1.875,2.6786-0.98215,1.4286-4.8214-0.26785-0.80358,0.26785-1.7857,1.4286-0.80357,1.1607,0,2.3214,0,2.5893,0,1.6964-1.7857,1.4286-1.0714,0.26786-0.89286,0-1.25,1.25-1.25,1.0714-0.625,0.26786,0.89286,1.9643,1.6071,1.6071,2.3214,0.44643,1.5178,0.17857,1.25,1.6072,1.5179,0.80357,2.1429,0.17857,0.89286-0.625,0.0893-1.875,0.17857-1.6964,1.0714-1.6964,0.35714-1.3393,1.3393-0.26786,0.80357,0.53571,1.3393,0.625,1.875-0.17857,1.3393-0.98214,1.0714,0.17857,1.6964,1.4286,2.0536,1.875,1.5179,1.6072,0.80357,1.4286,2.3214,0.17857,1.1607-1.5179,2.8572-2.0536,2.0536-1.1607,0.26785-2.3214,0-3.5714-1.875-1.1607-3.6607-0.0893-2.0536-1.4286-0.98214-1.1607-2.5-0.26785-0.98215-1.5179-3.0357-1.5179-0.80357-1.5179-0.625-2.0536z",
            "name": "Ульяновская область"
        },
        "ss": {
            "path": "m180.98,329.96,1.3393,2.1428,0.71428,2.8572,0.44643,2.8571,0,2.1429,0.625,2.3214-0.0893,2.8571,0.35714,2.4107,0.53571,2.1429,0.625,1.9643,0.71429,0.98214,5.8929,0.0893,3.0357-1.6071,1.25-1.9643,1.9643-0.35715,1.6964-0.0893,2.1429-1.4286,1.4286-0.89286,1.25-0.17857,1.6072,0.625,1.7857-0.17857,0.80357-1.875,1.0714-2.3214,4.375-2.5893,1.7857-1.4286,1.1607-2.0536-0.625-1.5179-0.80357-1.7857-0.35715-2.5-1.1607-1.25-0.71429-2.4107-3.6607-0.26785-2.3214-1.6964-1.4286-0.80357-3.5714,2.3214-1.9643,2.2322-2.4107,0.0893-0.98214-0.98214-2.2321-2.4107-2.4107-1.875-1.0714-1.0714-0.89285,0.26785-1.6072,0.71429-1.6964-0.0893-1.5178-0.80357-1.0714,0-0.625,0.98215-0.53572,1.0714-0.80357,1.5179-0.17857,1.3393,0,0.98214-0.0893,0.71429z",
            "name": "Самарская область"
        },
        "ob": {
            "path": "m185.89,352.82,0.53571,1.4286,0.71429,1.6071-1.0714,1.6072,1.0714,1.4286,3.0357,0.17857,1.9643-0.35714,2.5,0,0.17857,2.3214-0.89286,2.6786,0.35714,1.0714,3.5714,1.6071,2.1429,1.4286,0.17857,3.5714,0,4.1071,0,1.4286-1.25,0.89286,0,1.9643,0,0.71428,0.71429,1.0714,1.0714,0.89286,1.7857-2.5,0-1.4286,0.89286-0.89286,1.4286,0,1.0714,2.3214-0.17858,1.4286-0.71428,1.25-0.35714,1.4286l0.36,1.43,1.25,0.89286,2.3214,1.25,1.7857,0.89286h1.9643,2.5l1.4286-1.0714,1.6071,0.17857,1.9643,1.0714,0.89285,1.6071,0.35715,1.7857,1.0714,1.25h1.7857l0.89286-0.89285h1.25l1.6071,0.53571,1.25,1.4286,0.53571,2.6786-0.17857,3.5714,1.7857,1.6072,1.4286,0.89285,1.0714,1.6072,1.0714,0.53571,1.6071-0.71429,1.4286-0.17857,1.6071,1.4286v1.25l1.9643,1.7857,1.25,0.71428,2.1429,0.35715h2.6786l1.4286-0.17857,1.25-0.89286,1.25-1.0714,0.89286-0.89286-0.17858-1.25-2.3214-3.2143-1.0714-1.25v-3.75l-0.71429-2.1429-0.17857-2.1429,1.0714-2.3214,1.9643-1.4286-1.4286-1.7857-3.0357-2.8571-1.9643,0.35714-1.4286-0.17857-0.89286-1.25h-2.3214l-1.4286,1.25-1.0714,1.25-0.53572,1.0714h-2.5l-1.0714-2.5-3.2143-0.17858-2.8572-0.35714-0.89285-2.5-1.08,0.33-1.79,0.89h-1.4286l-0.17857-1.0714,1.4286-1.7857,2.5-2.5-0.53-1.78-0.71-0.36v-0.89286l2.5-1.9643,0.35715-1.0714v-2.1429h-1.7857l-2.1429,0.71429-1.6071,0.17857-1.4286-1.9643-0.53571-2.3214,1.25-1.7857,1.0714-0.89286v-1.6071l-0.35714-2.3214,1.0714-0.89285,0.17857-3.0357-1.25-1.9643-1.7857-1.7857-0.17857-1.6071,1.0714-2.8571,1.6072-2.5,0.89285-1.7857-0.53571-1.25-2.1429-1.6071-1.4286-2.1429-1.25-1.4286-1.6071,1.7857-1.4286,1.4286-4.1072,2.5-1.4286,1.9643-0.35714,1.9643-0.53571,0.35714-1.9643,0.17857-2.1429-0.35714-1.9643,0.53571-1.9643,1.4286-2.8571,0.53572-1.0714,0.71428-1.4286,1.7857-2.1429,1.25h-2.5z",
            "name": "Оренбургская область"
        },
        "nn": {
            "path": "m186.25,271.57,4.2857-0.53571,2.5-1.4286,3.5714-0.71428,2.6786-1.0714,1.25-0.17857,2.3214,1.25,1.7857,1.0714,2.6786-0.17857,1.4286,0,2.6786-1.0714,1.25,0.17857,1.4286,1.9643,1.0714,2.1429,2.5,0.17857,2.5,1.7857,1.0714,1.25,0.89286,2.5,1.25,1.4286-0.17858,1.6071-1.25,0.89286-1.7857,0.17857-0.71429,0.89286-1.6071,0-0.71428-0.89286-1.7857-1.0714-1.6071,0.71429,0,1.6071-1.25,1.4286-1.25,0.53572-2.1429-0.89286-2.1429-1.6071-3.0357-0.89286-1.7857,0-1.0714,0.89286-0.71429,1.7857,0,2.8571-0.17857,2.8572,0.53571,1.0714-1.0714,1.4286-2.3214,1.4286-1.4286,0.89285,0,1.4286-0.35715,0.89285-0.89285,0.71429-2.8572-0.35714-1.0714-0.17858-0.89285,0-0.71429,0.53572-0.38692,0.34215-0.69448-0.12626-0.44194-0.50508-0.50508-3.0936-1.5784-0.12627-1.5784,1.4521-2.2097,0.44194-3.9775-0.25253-2.0834-2.0203,0.1894-3.3461-1.2627-1.389-0.0631-0.75761,1.0102-1.4521-0.0631-1.0733-3.7249-0.63135-1.1996-0.75761-1.0733-2.7148,1.1364-2.336-1.1996-3.3461,2.0203-0.50507,3.283-0.12627,5.9978,0.12627,1.2627,0.88388,2.0203,0.1894,2.0203-0.75761,0.12627-1.5152-0.94702-1.4521,0.63135-1.0733z",
            "name": "Нижегородская область"
        },
        "ml": {
            "path": "m211.51,286.29,2.2728,2.336,2.4622,2.0834,2.7779,1.1364,2.9673,0.0631,2.4622,2.0834,1.5784,1.6415,0.44194,1.3258,0.63134,0.94702-0.3788,1.6415-0.56821,1.1364-0.0631,1.8309-1.5152,1.389-0.88388,0.56821-1.4521-0.12627-1.1996-1.5152-1.1996-0.44194-1.389-0.82075-1.7046-0.12627-0.50508,0.88389-1.7046,0.88388-2.5885,0.12627-1.9572-0.82075-1.1364-0.69448-0.88388-3.0305-0.37881-4.7351-1.1996-1.4521-4.0406-0.0631-1.3258-0.1894-0.63134-1.0733,0-2.0834,0.0631-3.0936,0.37881-1.8309,1.0102-1.0733,0.82075-0.63134,2.5885,0.3788,2.2728,0.88389,2.9673,1.7678z",
            "name": "Республика Марий Эл"
        },
        "ta": {
            "path": "m190.93,308.14,0.0631,1.1364,0.44194,1.0733,0.88389,1.0102,1.5152,0.63134,1.8309,1.4521,1.5152,0.75762,1.389,0.44194,1.4521,1.0733,1.389,1.0102,2.4622,0.44194,1.4521,0.0631,1.7046,0.88388,0.12627,2.2097-0.37881,2.9042,0.44195,1.4521,2.0834,1.1996,1.0733,0.75761,2.9042,0.18941,0.82075,0.69448,0.56821,1.7046,1.3258,2.1466,0.63134,2.5885,0.88389,1.7678,1.6415,1.894,1.389,2.2728,1.6415,1.1364,0.88388,0.88388,1.1996,0.0631,2.9042-1.8309,2.9042-2.7148,0.44194-0.63135,0-1.894-1.0102-1.0102-0.0631-0.88388,1.8309-0.25254,1.2627,0.31567,0.75762,0.56822,1.3258,0.3788,1.6415-0.31567,1.1996-0.69448,2.9042-0.12627,1.5152-0.37881,0-0.94701-0.37881-1.2627-1.1996-1.5784-0.63134-1.2627-1.5152-0.44194-0.88389-1.2627s1.2627-1.0102,1.5784-1.1364c0.31567-0.12627,2.2728-0.75762,2.2728-0.75762l0.0631-1.4521s-1.1364-0.18941-1.389-0.50508c-0.25254-0.31567-0.69448-0.94702-0.69448-0.94702l2.0203-1.3258,2.0203-1.389,0.12626-1.1364-0.69447-0.82075h-1.5152l-0.69448,0.0631-1.1364,1.3258-0.56821,0.69448h-1.894l-0.12627,0.88388-0.12627,1.3258-0.82075,1.1364-1.5152-0.12627-0.75761-1.4521-1.1364-0.94702-0.82075,1.0102-1.7678-0.31567-0.56821-2.2728-1.4521-0.88388-0.63135-1.2627,0.12627-1.3258-1.1364-1.3258,0.0631-2.6516,0.12627-3.0936,0.63135-0.94702-0.25254-1.0102-0.69448-1.0733-0.56821-0.56821-1.0102,0.44194-0.88388,0.37881-1.0102-0.12627-1.0733-0.88389-0.88388-0.82074-1.8309-0.69448-1.4521-0.44195-0.94702,0.94702-1.8309,0.75762-1.8309,0.1894-1.6415-0.31567-1.9572-1.0733-1.389,0.50508h-2.7148l-2.0834,0.0631-1.389,1.1364-0.0631,0.88389,0.69448,0.50507,0.12627,0.82075-0.82075,1.0733-1.5152,1.2627-2.6516,1.0733-1.5784,0.69448-1.1364-0.75762-2.0834-0.82075z",
            "name": "Республика Татарстан"
        },
        "iv": {
            "path": "m174.26,252.7,2.0203-1.1364s0.94702-0.50507,1.1996-0.50507c0.25254,0,2.5885,0.31567,2.5885,0.31567l2.7148,1.1364,2.3991,1.1364,1.2627,1.1996s1.4521,1.0102,1.7046,1.1996c0.25254,0.18941,1.4521,1.2627,1.4521,1.2627l1.7046,0.63135,1.1364-0.88388h0.88388l0.50508,0.82074,0.1894,1.1996,1.0102,0.75762,1.5152,0.82074,1.0102,0.63135,0.44194,1.0102-0.69448,1.0733-0.12626,0.88388,0.75761,0.37881,0.88388-0.56821,1.389,0.63134,0.69448,0.94702,0.25254,1.2627-0.25254,0.50508-1.894,0.69448-2.9673,0.82075-3.0936,0.50507-2.3991,1.5152-3.4724,0.50508-0.94702-0.12627-1.7678-2.3991-3.5987-3.4724-2.7148-3.3461-0.82075-2.7779-0.88388-1.0102-2.1466-0.44195-0.69448-0.56821,0.50507-1.4521,0.56821-1.3258z",
            "name": "Ивановская область"
        },
        "yr": {
            "path": "m184.11,228.33,1.7678,1.5784,1.9572,0.50507,1.7678,0.50508,1.3258,1.6415,1.9572,1.5784,1.5784,0.0631,1.0733-0.69448,0.82075,0.31568,0.3788,1.4521,0.12627,3.4093-0.0631,2.6516,0.25254,1.5152,0.88388,1.0102,0.56821,0.94702-0.37881,1.0733-1.7046,1.1364-2.7148,1.3258-3.283,2.2097-1.6415,1.0733-3.3461,0.88388-2.4622-0.1894-2.1466-0.63135-2.6516-0.69448-2.1466,0.63135-1.8309,1.0733-1.7046-0.88388-1.4521-1.0102-1.894-1.1364-1.1364-1.1996-0.25254-1.3258,0.56821-1.4521,2.0203-0.88388,2.2097-1.1996,1.6415-2.7779,1.0102-2.9673,1.1996-1.2627,0.75762-2.4622,1.6415-1.8309,1.9572-1.8309,2.7148-1.5152z",
            "name": "Ярославская область"
        },
        "kt": {
            "path": "m198.7,245,1.389,0.12627,1.2627-0.75762,1.5152-1.389,1.894-0.75762,1.894,1.1364,1.894,1.5152,2.5254,0.12627,0.63135-0.75761,0.75761,0.50507,1.2627,2.1466,2.2728,2.2728,1.5152,1.5152,1.1364,1.894,0.3788,2.2728,1.2627,1.7678,1.5152,1.6415,2.5254,1.389,1.7678,1.5152,1.7678,1.894,2.0203,0.88388,1.894,0.12627,2.0203-2.0203,1.6415-0.3788,0.63135,1.894,1.1364,1.0102-0.12627,1.6415-1.6415,1.5152-0.12627,1.894-0.3788,2.5254s-1.7678,0.75761-2.3991,0.75761c-0.63134,0-6.3134-0.12626-6.3134-0.12626l-3.1567,0.12626-1.1364,1.1364-1.2627,0.50507-2.0203-0.75761-1.5152-0.75762-2.0203-0.3788-1.0102-1.5152-0.88388-1.6415-0.75762-0.63135-1.1364-0.12627-0.88388,0.50508-2.1466,0.75762-3.283-0.25254-1.7678-0.50508-2.0203-1.2627-0.50508-0.50508,0.25254-0.63134v-1.1364l-1.389-1.2627-0.88389-0.50508-0.63134,0.37881-0.38556,0.10695-0.53571-0.35714,0.0893-0.89286,0.71429-0.625,0.0893-0.98214-0.89285-0.71429-1.7857-1.0714-0.98214-0.98215-0.26786-0.98214-0.71428-0.89286h-0.98215l-0.89285,0.625-0.625,0.0893-1.25-0.71429-1.4286-0.80357-1.3393-1.25-1.7857-1.3393-0.69-0.57,1.07-0.71,2.05-0.54,2.3214-0.71428,2.8571-2.0536,3.3036-1.6964z",
            "name": "Костромская область"
        },
        "le": {
            "path": "m153.49,177.57,1.7678-1.6415,1.5152,0,2.2728-1.894,2.5254-0.50507,2.2728,0.63134,2.9042,2.1466,2.7779,1.5152,0.75761,2.5254,0.12627,1.389,1.0102,1.1364,1.1364-0.37881,0.75761-2.0203-0.12627-2.3991-0.88388-1.6415-0.88388-1.894,0.12626-2.0203,1.1364-1.2627-0.25254-1.894-0.75762-1.0102,0-0.37881,1.2627-0.25254,3.283,0.25254,3.5355,1.2627,2.2728,0.12627,1.894,0.12627,1.2627,1.1364,0.63135,1.2627,0,1.7678-0.37881,1.6415-0.25254,2.1466-0.63134,1.7678-2.1466,1.2627-0.75761,1.0102-1.0102,1.894-1.0102,1.1364-1.7678,1.1364-0.63135,1.2627,0.25254,1.1364,1.389,0.75762,2.1466,0.25253,1.0102,0.88389,0.25254,1.6415,1.0102,0.75762,2.1466,0.12627,1.1364-0.50508,3.4093-0.25254,1.7678-0.63134,2.0203-0.25254,1.5152,0.75761,1.0102,1.6415,1.1364-1.2627,1.389-1.7678,0.75762,0.88388,0.50507,2.0203,0.63135,2.2728,2.1466,0.50507,1.2627,0.75762,1.1364,1.0102,0.12626,1.2627,0.12627,1.6415-0.12627,1.7678-1.2627,0.75761-2.2728-0.25254-1.389-0.88388-1.389-0.25254-0.75761,0.88388-1.5152,1.0102-3.0305,0-1.5152,0.3788-2.7779,3.0305-1.0102,1.389-0.37881,2.1466-1.6415,1.0102-1.1364,0.12627-0.3788,1.2627-1.2627,0.63134-0.63135-1.0102-1.1364-1.1364-2.2728-0.12627-0.75761,0-1.1364-3.0305,0-2.9042-1.0102-1.5152-0.88389-1.894-0.12627-1.6415-2.2728-0.88388-0.88388-0.63135s-0.37881-1.0102-0.37881-1.5152c0-0.50507-0.25254-3.4093-0.25254-3.4093l-0.75761-1.1364-2.3991-0.25254-1.389,0.75761-0.75762-0.50507-0.12627-1.2627-0.63134-0.88389-1.0102,0.63135-2.1466,0.3788-2.7779-0.88388-1.5152-0.88388-3.283-0.37881-1.2627-0.88388-1.0102-0.75762,0.63135-1.2627,0.88388-2.1466,0.88388-1.389,0.12627-1.2627z",
            "name": "Санкт-Петербург и Ленинградская область"
        },
        "ki": {
            "path": "m237.59,265.33,1.2627-0.88388,0.12627-2.0203,0-2.0203-1.0102-1.389-0.12627-1.6415,1.5152-0.37881,3.9143,0.25254,2.5254-0.88388,2.6516-1.1364,0.63134-1.389,1.1364-0.63134,2.7779,0.25254,1.389,1.7678,0.12627,2.7779-0.63134,3.0305-1.0102,1.389-0.75761,2.7779-1.894,0.75762-2.0203,0.12626-1.6415,1.7678-0.63134,1.6415-1.0102,0.63134-0.75761,0.88389,0.75761,1.389,1.6415,0.88388,1.0102,1.389-1.6415,1.894,0.12626,1.894,1.1364,0.88389,1.2627,0.50507,0.88388-1.389,0.88388-1.894,2.7779,0,3.1567,0.3788,4.2932,1.2627,1.7678,2.2728,2.1466-0.12627,2.1466-1.6415,1.6415,0.37881,1.2627,1.0102,0.75762,1.894s1.0102,1.5152,1.389,1.7678c0.3788,0.25254,2.5254,1.894,2.5254,1.894l0.25254,1.5152-0.88389,2.0203-2.0203,1.1364-3.5355,0.25253-1.2627,0.63135-1.2627,1.5152-0.25254,1.389,1.0102,1.389,0.12627,1.1364-1.5152,1.1364-0.75762,1.389-0.12627,2.1466-1.2627,1.0102-2.7779,0.12627-1.1364-1.2627-1.0102-2.5254-2.0203-0.12627-1.389-0.3788v-1.894l-2.0203-1.1364-3.1567,0.75761-1.7678,1.389s-1.2627,1.0102-1.2627,1.5152c0,0.50508-0.3788,2.2728-0.50507,2.7779-0.12627,0.50508-1.6415,1.5152-1.6415,1.5152l-2.5254,1.1364-1.894-0.50507-1.2627-1.389-1.5152,0.25253s-0.75761,0.50508-1.0102,1.389c-0.25254,0.88389-0.12627,2.7779-0.12627,2.7779l0.12627,1.894-2.0203,0.63135-3.4093,0.3788-0.25254,1.1364v1.389l-0.3788,1.389-1.7678,0.88389h-0.63135l-0.63134-1.5152-0.50508-0.37881,0.12627-2.5254,0.25254-2.5254,0.50508-1.5152-0.88389-1.6415-0.25254-1.2627,0.75762-2.9042,0.63134-2.5254-1.0102-1.5152-1.6415-2.5254-2.1466-1.5152-0.88388-0.63134-3.9144-0.12627-1.7678-1.2627-1.6415-1.5152-1.6415-1.5152-0.50507-0.50508,0.50507-1.0102,1.2627-1.6415,0.25254-1.0102,1.1364-0.75761,1.5152,0.50507,1.894,1.389,1.389-0.75761,2.1466-0.63135,1.389-1.2627v-1.5152l-1.2627-1.894-0.63135-1.5152s-0.78918-1.1049-0.85231-1.2627c-0.0631-0.15784,0.56821-0.69448,0.56821-0.69448l0.97858-0.63135,0.75762-0.75761s2.2728-0.0316,2.8095-0.0316c0.53664,0,3.1567,0.0631,3.8828,0.0631,0.72605,0,3.7881-0.44194,3.7881-0.44194l1.4521-0.59978s0.12626-1.5784,0.15783-1.7993c0.0316-0.22097,0.47351-2.4938,0.47351-2.4938l2.0203-2.3991z",
            "name": "Кировская область"
        },
        "bs": {
            "path": "m241.5,329.86,2.3991-1.6415,2.5254-1.6415,1.5152-0.25254,1.894,2.6516,2.2728,2.2728,2.9042,0,2.6516,2.5254,1.7678,2.5254,1.1364,1.7678,1.7678,0,1.2627,2.1466,2.6517,2.3991,2.2728,1.6415,2.0203,1.7678,1.2627,1.1364,0.88389,1.389-0.37881,1.1364-1.6415,0.63134-0.88388,1.2627,0.25254,1.389,1.389,0.63135-0.63135,1.2627-1.5152,0.50508-1.2627-0.75762-2.3991,0.37881,0,1.0102-1.5152-0.25254-0.50508-0.88388-1.5152-1.0102-4.5457,0-1.1364-0.37881,0-1.2627,1.7678-1.2627,0.12627-1.389-1.0102-0.88389-1.6415-1.1364-2.5254,0.25254-1.0102,2.1466-1.7678,2.6516-0.88388,2.0203,0.50508,3.0305,1.894,1.0102,2.0203-0.75761,1.6415,0.75761,1.0102,2.0203,2.5254,0.12627,2.0203,0.75761,2.7779,0,1.7678-0.50508,1.5152,1.1364-0.63135,1.389-1.894,1.5152-1.2627,1.1364-1.0102,1.389-1.2627,0-1.2627-0.63134-2.1466-0.75762-1.6415-0.3788-1.6415,1.2627-0.3788,1.5152-0.63135,1.389-2.3991,2.6516-1.6415,2.3991-3.9143,3.6618-1.894,1.5152-0.25254,2.0203-0.63134,1.5152-2.9042-0.25254-1.6415,1.7678-1.2627,1.389-0.50507,0.63135-2.0203,0-1.1364-2.0203-0.50508-0.63134-5.4296-0.63135-1.389-2.1466-2.7779,0.88388-1.2627-0.12627,0-0.50507,3.4093-4.4194,0-1.6415-0.88389-0.63134,0-1.1364,1.7678-1.1364,1.0102-1.389,0-2.0203-0.25253-0.50508-1.894-0.12627-2.2728,1.2627-1.7678-1.1364-1.1364-2.3991,1.2627-2.3991,1.0102-1.894-0.25254-2.5254,0-0.75761,0.88389-1.5152,0-3.1567-2.5254-2.9042-0.12627-2.0203,1.0102-2.6516,2.0203-4.1669,2.9042-2.1466,3.9143-3.1567,1.0102-2.1466-0.88389-1.389-0.12627-0.12627,0-0.75761,1.389-0.25254,2.3991,0.75762,1.389,0.12626,1.7678-0.63134,2.6516-0.25254,1.7678-0.12627,0.88388-0.63134,0-1.7678z",
            "name": "Республика Башкортостан"
        },
        "cl": {
            "path": "m272.18,347.66,1.7678-0.88388,2.7779,0.50507,2.3991,2.1466,2.3991,1.7678,3.0305,1.894,2.9042,0,1.5152,1.6415,1.6415,2.3991,0.75761,1.894-0.63135,3.1567,0,2.7779-0.88388,1.389-1.7678,0.63135-1.6415,1.1364-0.75762,1.2627-2.0203,0.63135-1.894,1.5152,0,1.1364,1.5152,1.5152,2.0203,2.0203,1.1364,2.3991-0.37881,2.7779-0.75762,1.7678-2.3991-0.63135-2.6516-0.50507-3.283-0.37881-2.0203-0.50508-1.5152-1.7678-2.0203-1.7678-1.1364-1.1364-1.1364,0.50508-1.5152,1.1364-0.88388,1.0102,0,1.894,1.6415,1.2627-0.37881,0.75761-2.2728,0.63135v1.0102c0,0.50508,0.75761,2.0203,0.75761,2.0203l2.0203,1.7678,0.12627,1.894-1.5152,0.63134-1.5152-1.5152-1.389-1.2627-2.2728-0.63134-3.283,0.12627-1.5152,0.25253-0.63134,1.2627,1.0102,1.389-0.37881,1.894-1.0102,1.6415-4.5457,0.25254-1.6415-0.88389-1.6415-0.63134,0.50507-2.0203,1.6415-0.88388-0.75761-1.7678-2.0203-2.3991-1.6415-1.0102-1.894,0.12627-1.389-0.63135,0.63134-2.7779,1.7678-2.6516,4.4194-4.1669,3.7881-4.672,1.2627-2.9042,1.389-0.88389,2.5254,0.25254,2.0203,1.0102h2.0203l1.894-2.2728,2.2728-1.894,0.50508-1.389-1.5152-1.2627-2.1466,0.50507h-3.0304l-2.7779-0.88388h-1.5152l-0.88388-1.894-1.389-0.50507-1.7678,0.63134-1.0102-0.37881-0.88389-0.63134-0.63134-1.894-0.12627-1.6415,3.6618-5.6821,0.75762-0.63135,1.7678,0.37881,1.7678,0.88388,0.63134,1.1364-0.3788,0.75762-1.2627,1.1364v1.1364l-0.12627,0.12627,0.75761,0.63135,2.6516,0.12627h2.2728l1.5152,1.0102,1.2627,1.1364,1.1364-0.63135,0.50507-0.75761,2.0203,0.12627,1.7678,0.37881,1.1364-1.2627-0.37881-1.0102-0.75761-0.88388,0.25253-1.5152,1.5152-1.0102,0.63135-1.1364z",
            "name": "Челябинская область"
        },
        "ud": {
            "path": "m261.7,302.33-0.12627,1.389-2.0203,2.7779-1.5152,1.389,0.12626,1.389-1.6415,1.0102-1.1364,1.5152-1.5152,2.3991-0.50508,1.894-0.50508,3.1567-2.0203,1.0102-2.2728,0.12627-0.63135,1.1364-0.37881,3.0304-0.12627,1.389-3.0304,2.0203-2.2728,1.389-1.0102,0-1.2627-1.5152-1.7678-0.75762-0.63134-1.2627,1.389-1.1364,2.0203-0.75761,0.50508-1.1364-0.37881-0.50508-1.5152-0.88388,0.25254-0.88389,2.7779-1.7678,1.0102-1.1364-0.50507-1.0102-0.75762-0.63134-2.0203,0.63134-1.1364,1.389-1.5152,0.63135-1.0102,0.25253-0.3788,1.5152-0.63135,0.75762-0.88388,0.25254-0.75762-1.0102-1.389-1.2627-0.75761,0.37881-1.2627,0.37881-0.88388-0.88389-0.63135-1.1364-1.0102-1.0102-0.63135-1.0102,0-1.1364,1.6415-0.88389,1.1364-1.1364,0.25254-2.0203,0.25254-1.0102,3.1567-0.50507,1.6415-0.50508,0.37881-4.4194s0-1.2627,0.63135-1.5152c0.63134-0.25253,1.2627-0.3788,1.2627-0.3788l1.2627,0.63134s1.6415,1.894,2.3991,1.389c0.75761-0.50507,1.894-0.88388,1.894-0.88388s2.3991-1.0102,2.2728-1.6415c-0.12627-0.63134,0.25254-1.6415,0.25254-1.6415l0.3788-1.389,2.1466-2.2728,1.2627-0.75761,2.2728-0.50508,1.6415,0.37881,0.88388,1.1364v0.75761l0.25254,0.63135,1.0102,0.12627,1.6415,0.3788,0.63135,0.50508,0.63134,1.6415,0.75762,0.75761z",
            "name": "Удмуртская Республика"
        },
        "pe": {
            "path": "M272.06,274.03l-2.28,1.16,0.5,1.5-0.5,3.53,0.5,1.28,1.41,2.41,2.25,1.62,0.65,1.66-1.4,2.12-2.41,1.03-2.87,0.63-1.66,0.87-1.13,1.54,0.5,1.24,0.63,1.38-0.13,1.03-1.9,1.63-0.38,2.4-0.87,1.6-0.13-0.19-1,0.12-1.28,2.5-2,2.29-0.15,1.53-0.88,0.87-2,2.03-1.91,3.41-0.62,3.9-1.28,0.88-2.25,0.38-1.28,0.78-0.63,4.9,2.53,2.66,2.13,2.28,2.53,0.25,2.28,1.5,3.41,4.94,1,0.37,1.28-0.12,1.12-1.25,0.88-1.28,1.03-1.75,1.25-1.66,1.28,0.88,1.5,1.28h2.41l2.03-0.91,0.5-1.75,0.25-1.91,0.87-0.75,0.88-1,0.78-0.5,2.5,2.75h3.69l0.87-1,0.5-1.5,0.25-1.65,0.88-1.25,4.69-0.38,2.15-0.78,0.63-1.5-0.63-0.62-0.12-1.41,1.12-1.38,0.75-1.03v-1.37l-0.5-0.88-0.62-1.03,0.25-1.75,1-1.53,2.03-1.5,3.15-0.5,1.88-1.91,2.28-1.62,2.28-1.66,2.28-1.65,0.88-0.75,0.5-1.25,1-1.78s0.9-1.12,1.53-1.75c0.63-0.64,1.62-1.91,1.62-1.91l1.16-1.37,0.25-1.66-2.41-0.38-2.65-0.75-2.66-1.65-2.75-1.38-2.66-1.28-2.53,0.66-3.15,0.12-3.66-0.9-2.9-1.63-1.63,0.85-0.41-0.22-1.9-1.25-1.38-2.03-1.12-1.13-2.28-0.78-0.13-1.63-1.12-1.28-1.41-1.5-1.91-0.5-2.62-0.25-2.41-0.78z",
            "name": "Пермская область"
        },
        "sv": {
            "path": "m316.13,291.72,1.7678-1.1364,1.1364,1.389,0.88388,2.3991,2.6516,1.5152,2.9042,2.1466,1.2627,2.3991,2.2728,2.7779,0.12627,1.7678,0.63135,2.0203,0.75761,1.5152-0.63134,1.7678-1.894,1.894-0.63135,1.7678-0.25253,4.7982,0.3788,2.7779,0.63135,1.0102-1.0102,2.9042-1.5152,1.7678-0.37881,2.3991,2.0203,1.2627,2.3991,2.0203,0.75761,2.0203,0.12627,2.6516-0.63134,1.6415,0,2.9042,0.75761,2.3991-0.25254,1.894s-0.88388,0.88388-0.88388,1.389c0,0.50508-0.50508,2.7779-0.50508,2.7779l-1.2627,1.2627-2.0203,0.12627-1.1364,0.88388h-3.0304l-1.5152-0.88388-2.1466,0.25254-1.389,1.1364-0.88388,1.389-0.25254,2.9042-0.75761,1.1364-1.1364,1.0102-1.7678,0.50508-3.0305,0.25254-2.0203,0.25254-1.0102,0.88388-1.894-0.37881-1.389-1.1364-1.894-1.894-2.5254-1.6415-1.5152-0.63135-2.2728,0.37881-1.894,0.3788-1.389-0.12626-1.6415-1.389-1.894-2.2728h-2.2728c-0.50508,0-1.6415-0.75761-1.6415-0.75761l-4.672-3.1567-1.6415-1.7678-2.9042-0.3788-1.389,0.12627-0.88389,0.12627-1.2627-1.2627-3.9143-3.283-3.1567-3.0305-0.50507-1.389,2.0203-2.9042,1.389-2.7779,0.75762-0.25253,1.6415,1.1364,1.1364,0.75761h2.7779l1.5152-1.389,0.50507-1.7678,0.12627-1.7678,2.5254-1.7678,1.7678,2.0203,1.2627,0.63134h2.3991l1.6415-1.1364,0.75761-2.0203,0.50508-1.894,3.7881-0.75762,2.5254-0.3788,1.389-1.2627v-1.0102l-0.88388-1.389,1.7678-2.1466,0.25254-1.1364v-1.389l-1.0102-1.6415,1.0102-2.5254,2.1466-1.6415,3.283-0.88388,1.1364-0.75762,8.0812-6.1872,0.88388-1.6415,1.6415-2.7779,2.1466-2.5254z",
            "name": "Свердловская область"
        },
        "ku": {
            "path": "m285.69,383.01,2.3991,1.894,3.283,0.88388,4.2932,1.2627,3.1567,0.75762,4.1669-0.50508,2.5254,0.25254,2.9042,1.0102,3.5355,1.1364,3.5355,0.88388,3.283,1.0102,3.4093-0.12627,2.3991-1.2627,3.6618,0,1.0102-1.5152,0-1.894-1.5152-2.1466-1.389-2.7779s-1.5152-0.12627-2.1466-0.37881c-0.63135-0.25254-2.2728-1.6415-2.2728-1.6415l-0.75761-3.1567-1.389-1.7678-2.6516-1.2627-1.5152-1.6415-1.2627-2.2728-1.6415-1.5152-1.389-1.2627-1.0102-1.389,0.50508-2.3991,1.389-1.2627,1.1364-1.894-2.5254,0.37881-3.0305,0.12627-1.389,0.50507-0.75762,0.50508-1.2627-0.37881-2.0203-1.0102-1.7678-1.7678-2.0203-1.389-1.7678-0.75761h-1.2627l-3.0305,0.63134-1.7678-0.12627v1.1364l0.63135,0.88388-0.50508,2.2728v2.2728l-0.25253,2.1466-0.88389,1.1364-2.5254,1.1364-1.389,1.1364-1.5152,1.2627-1.7678,0.88388-0.50507,1.2627,0.63134,1.1364,1.894,1.894,1.389,1.389,0.63134,1.7678v1.894l-0.50507,1.7678z",
            "name": "Курганская область"
        },
        "ko": {
            "path": "m254.63,259.27,2.1466-0.63134,0.63134-0.88388,1.894,0.12627,1.6415,1.894,2.1466,0.25254,2.1466-0.50508,1.5152-1.894,0.50508-1.5152-0.63135-0.88389,0.63135-1.5152,2.1466-1.2627,4.5457-1.894,2.6516-1.1364,0.25254-1.5152-0.50508-2.5254-2.1466-0.88389-3.283,0.12627-2.3991,1.6415-2.3991-0.75761s-0.50508-1.0102-1.2627-1.0102-1.5152-0.25253-1.5152-0.25253l0.50507-3.0305,1.7678-0.37881,1.389-1.5152,0.50508-1.894,2.1466-0.50508,2.2728,0.12627,0.63135-1.7678-0.63135-0.63134-0.63134-2.1466,0.63134-1.389,4.5457-2.0203v-1.2627l-1.0102-2.5254-0.63135-1.6415-1.6415-1.7678-0.63134-1.1364,0.25254-1.6415,1.2627-0.63134,1.7678,0.75761,1.5152,2.1466,1.6415,1.5152,2.2728,1.894,2.6516,1.2627,1.7678,1.1364,0.50508,1.7678,1.5152,1.5152,3.1567,0.3788,1.894,1.2627,2.9042,0.50507,0.88388,1.2627h2.0203l1.0102-0.63134-0.25254-1.5152-0.75761-1.5152,0.50507-1.0102,0.88389-1.5152s0.25253-1.1364-0.12627-1.6415c-0.37881-0.50508-1.1364-1.1364-1.1364-1.1364v-0.88388l2.7779-3.283,3.1567-2.1466,1.894-2.0203,1.0102-0.88388,2.3991,0.63134,3.4093,0.12627,2.5254,0.75762,4.2932,0.50507,2.1466,0.63135,3.283,0.12627,2.3991-0.50508,1.5152,0.12627,0.12627,1.894,1.2627,1.0102,2.1466,2.1466,5.3033,4.672,7.4499,4.672,6.4397,3.7881,5.177,3.0305,5.5558,3.283,2.7779,1.894,2.2728,0.25254h3.283l2.1466-1.0102,2.5254-2.3991,1.6415-1.2627,2.7779,0.25253,2.3991-0.12626,2.0203-0.63135,1.5152-0.88388,1.6415-0.37881,3.1567,0.12627,1.6415,0.25254-0.50508,1.5152-0.88388,1.1364-1.1364,0.63134-0.50508,1.894,1.2627,1.7678,1.2627,1.389,0.12627,1.894-1.1364,1.389-0.88388,0.25254-0.75762,1.389-2.0203,0.25254-2.3991-0.12627-2.1466,0.88388-2.5254,1.389-1.389,1.1364-3.0305-0.12627-2.1466-0.50507h-3.1567-2.0203l-1.0102,0.3788-1.389,1.5152-0.75762,0.88389-2.1466,1.6415-1.5152,0.50508h-2.3991l-2.3991-0.25254-1.5152,0.50508-2.9042,2.0203-2.2728,1.2627-1.5152,1.0102-1.5152,0.3788-1.2627-0.12626-1.2627-1.0102-0.12626-1.894-0.63135-1.389-1.6415,0.88388-1.5152,1.389-1.0102,1.2627-0.88388,0.50508-1.2627,0.50507-0.75762,0.37881-0.12627,1.7678-0.3788,1.7678-0.63135,1.389-0.88388,1.1364-1.0102,1.6415-1.894,1.6415-1.6415,1.389-1.2627,0.75762-2.7779,3.283-1.894,2.6516-1.1364,3.0305-0.50507,1.6415-1.5152,1.6415-2.0203,0.88388-1.5152,0.63134-1.7678,1.0102h-2.2728l-3.1567-1.0102-3.1567-1.6415-4.4194-2.1466-0.75761-0.3788-2.5254,0.50507h-3.283l-3.0305-0.88388-2.9042-1.389-1.0102,0.25254-1.6415-0.12627-1.5152-1.2627-2.2728-2.3991-1.894-0.88388-0.63135-1.5152-2.2728-3.0305-5.8084-1.1364-1.389-0.63134-1.7678,0.63134-0.75761,0.75762v0.75761l0.37881,0.88389v1.6415,1.0102l-0.50508,0.3788-1.389-0.63134-0.88388-0.37881-1.1364,0.25254-1.5152,0.88388-1.5152,0.50508-1.1364-0.25254-0.88389-1.389-0.88388-0.63135-2.2728-0.88388-6.0609-1.1364-1.2627,0.25254-1.1364,1.1364-0.63135,1.5152-1.1364,0.37881-1.6415-1.389v-1.1364l1.0102-1.389,0.50507-0.75761-0.50507-1.0102-1.1364-1.0102-1.1364-1.0102-0.3788-0.75761,1.5152-1.2627,1.1364-2.5254,1.6415-1.0102,1.6415-0.3788,1.894-1.2627,0.88388-2.3991,1.2627-1.2627z",
            "name": "Республика Коми"
        },
        "mu": {
            "path": "m247.31,136.92,1.1364-1.5152,1.5152-0.75761,2.9042,0,4.2932,0.12626,2.1466-0.50507,2.5254-1.6415,0.88388-2.0203,0.12627-3.5355,1.5152-3.4093,1.0102-1.0102,4.7982,0,2.3991-0.63134,1.0102-1.2627,1.7678-0.12627,2.3991,1.0102,3.0305,1.894,2.2728,1.894,2.6516,0,2.2728-0.25253,0.25254,2.3991,1.894,0.3788,1.7678,1.0102,0,2.2728,0,1.7678-1.0102,0.63134-1.5152-0.3788-0.75761-1.1364-0.25254-0.63134-0.88388,1.0102-0.25254,0.63135,0.50508,1.1364,1.1364,0.88388,0.50507,0.75762-0.3788,1.0102-1.0102,0.63134,0,0.75762,1.1364,1.2627,0.88388,1.5152,0.88388,1.7678,2.0203,2.1466,0.75761,1.7678,0,1.7678,0,1.1364-0.50507,1.1364-0.25254,2.0203-0.12627,5.5558,0,5.5558-0.75762,1.389-0.25253,1.894,0.63134,0.88389,0.63135,1.0102-0.12627,4.0406,0,3.5355-0.63135,1.389-1.7678,1.1364-0.88389,0.88388,0,1.0102-0.25254,0.88389-1.1364,0.88388-2.7779,0.75761-3.6618,0.12627-3.1567,0.50508-1.6415,0.37881-2.5254-0.50508-2.0203-0.75761-1.894-1.389-1.894-2.2728-1.7678-2.2728-1.1364-1.894-0.63135-2.2728-0.3788-2.3991-1.2627-2.6516-1.1364-2.0203-0.3788-1.6415-0.37881-3.9143,0-1.7678,0-1.389-0.88388-0.88389-0.12627-2.9042,0-2.1466,0.75761-1.5152,0.12627-1.1364,0-1.5152-0.88388,0-0.63135,0.88388-0.88388,1.389-0.75762,1.894-0.25253,0.63135-3.5355,0-2.6516-0.25254-0.75761-1.5152,1.389-2.0203,1.1364-0.75761,0.25254-1.0102-1.7678-2.2728-1.5152-1.7678-1.2627-2.7779-1.2627-1.2627z",
            "name": "Мурманская область"
        },
        "kl": {
            "path": "M246.94,136.91l-2.28,1.53,0.12,1.62-1,2.28-1.9,2.04-1.88,0.87-4.31-0.13-0.88,1-2.28,2.16h-2.91l-2.4,0.38-0.13,4.03-0.62,1.9-2.91,0.38-1.87,0.25,0.12,1.4,0.88,1.5-1.78,1.29-1.25,0.5-3.41-0.91-1.66,1.16-0.37,2.9-0.13,4.16-1.25,2.28-2.65,1.62-3.41,1.16-8.72-0.12-3.53-0.91-5.19-0.75-4.28-0.75,0.88,1.87-0.13,1.54,0.07,0.53-0.94,5.65-2.53,1.5-2.03,3.32-2.91,1.87-0.13,1.66,2.66,1.25,1.91,0.75,1,2.4,2.9,0.25,5.07-0.75,1.65-0.9,2.25,0.53,1.78,1.37,1.38-1.62,1.12-0.78,1.78,4.69,1.5,0.62,2.91,1.53,0.06,0.69-0.12,2.69,0.06,1.78-1.63,1.53,1,1.12,2.29,0.5,1.75-0.62,2.53-1,0.62-0.5,1.91,1.5,1,1.9,1.03,1.88,3.16,0.25,3.28-3.03,0.75-1.5,1.25-1.38,2.4-1.28,2.03-1.75,0.5-1.15-0.37-1.25-1.91-0.63-1-1.03,0.13-1.63,1.37-2.4,1.78-1.91,1.66-1.87,1.25-2.16,1.38,0.25,1.78,1.53h1.9l0.88-0.53,0.12-2,1.5-2.03,0.25-1.75-0.25-3.16-0.5-1.53,0.63-1.78,1.4-0.87,1.38-0.63,3.03-2.53,0.5-1.13,0.53-1.28h1.38l3.4-0.62,2.16-1,1.5-1.28v-1.88-3.4l0.25-2.54,1.03-0.87v-1.16l-0.12-2-0.78-1.15-2-0.38-1.41-0.37-0.63-0.88v-0.75l0.63-1.15,1.28-1,0.75-0.63-0.38-1.03-1.65-2.37-1.88-2.29-1.4-2.15-1.75-2.53z",
            "name": "Республика Карелия"
        },
        "vo": {
            "path": "m215.36,208.76c0.12627,2.5254-1.389,5.0508-1.389,5.0508l-1.5152,1.894s-0.3788,1.0102-0.3788,1.7678c0,0.75762,0.12626,1.389,0.12626,1.389s0.63135,1.389,1.894,2.1466c1.2627,0.75761,2.0203,2.7779,2.0203,2.7779l1.0102,1.894,1.5152,1.2627,1.2627,1.0102,1.1364,1.894,1.2627,0.37881,3.1567,0.50508,1.5152,2.2728,1.0102,1.894,1.7678,0.63135,0.25254,0.63135,1.0102,2.2728,1.2627,0.75761,2.6516,0.25254,1.5152,0.12627,0.50507,2.7779,1.2627,2.0203,2.7779,1.389,1.389,0.12627,1.0102-0.63134,1.389,0.12627,1.0102,0.50507,0.75761,1.0102-0.63134,1.5152-0.75762,1.389,0.25254,0.75762,1.2627,1.1364,0.75761,0.50508,1.0102,0.50507,0.3788,0.63135v1.0102l-1.5152,1.5152-2.0203,0.63135-2.0203,0.75761-4.2931-0.25254-1.2627,0.88389,0.25253,1.1364,0.88389,1.2627v2.6516,1.1364l-1.0102,1.1364-0.75761-0.63134-1.1364-1.0102-0.37881-1.5152-1.0102-0.12626-1.6415,1.0102-1.0102,1.0102h-1.7678l-3.0305-1.5152-2.1466-2.1466-2.0203-1.1364-1.894-1.6415-2.0203-2.7779v-1.894l-1.894-2.7779-2.5254-2.2728-1.5152-2.0203-1.2627-1.7678-0.63135,0.75761-1.6415,0.12627-1.6415-0.25254-2.2728-1.894-0.88388-0.50508-1.2627,0.63135-2.7779,1.7678-0.63135,0.37881-1.2627,0.12627-0.88388-0.50508-0.50508-1.2627-0.63134-1.894,0.25254-4.0406-0.50508-2.5254-0.50508-1.2627-1.2627,0.12627-1.2627,0.37881-0.88388-0.25254-1.389-1.2627-1.6415-1.7678-4.0406-1.0102-1.2627-1.1364-0.50508-1.0102,0.63135-2.0203-0.50508-0.88388-1.0102-0.75761-1.1364-0.63135-1.894-0.37881-0.25254-0.12627,0.50508-2.7779-0.50508-1.6415-0.63134-1.2627-0.88388-0.88389-0.37881-0.50507-0.12627-1.0102-0.25254-1.5152,0.63135-0.88388,0.75761-0.88388,1.389-0.25254h1.6415l0.88388,1.2627,1.0102,0.88388,1.1364-0.50507,0.25253-1.1364,1.2627-0.25254,1.1364-0.63135,0.75761-1.1364,0.12627-1.5152,3.283-3.6618,1.2627-0.88388h1.7678l2.0203-0.37881,1.389-0.75762,0.88388-0.63134h1.1364l1.5152,0.88388h1.2627l0.88389,0.75762,0.50507,0.88388,1.389,0.63134h1.1364l1.389-0.3788,1.5152-0.50508,1.1364-0.37881,0.63135-0.25253,0.88388,0.12627,1.0102,0.88388,1.2627,1.6415,0.50507,1.2627z",
            "name": "Вологодская область"
        },
        "ar": {
            "path": "M421.06,151.03l-3.56,1.06-2.16,0.91-3.56,0.19-1.59,0.87s-1.26-1.07-1.97-1.25c-0.72-0.18-0.91,1.1-0.91,1.1l-1.78,2.65-2.69,1.63-3.03,0.87-2.31,1.78s-2.15,0.37-3.22,0.72c-1.07,0.36-2.5,0.19-2.5,0.19l-1.59,0.72,1.06,1.78-2.16,1.25,0.38,0.72,1.25,1.44,1.78,1.59,1.78,1.78,0.91,1.63,1.4-0.72,0.91-1.97,2.16-0.72,1.25-0.53,1.93-0.19,0.91-1.59h1.97l1.25,0.87,1.59-1.25,1.1-1.25,2.65-0.15,0.72-0.57,3.41,0.72,1.78-1.06,0.34-1.44,2.69-0.34s1.07-0.01,2.5-1.44l0.72,1.06,2.84-0.68s1.98-0.19,2.69-0.19,3.03-0.38,3.03-0.38h2.31l2.35,1.25,1.78,0.91,1.25-0.72,0.72-0.87,4.28,1.06,1.97-1.44,3.22,0.19,4.09-0.72,1.25-1.59,1.97-2.88s-1.26-0.89-1.97-1.25-2.69-1.44-2.69-1.44l-3.22,0.57-4.43,1.59-4.32-0.91-2.5-0.15-3.18-0.72-1.63-0.91-1.59-1.78-1.44,0.72-1.97,1.06-2.5-0.15-3.22-0.91-2.5-0.72zm-35.53,14.47l-2.5,0.53-1.78,1.63-2.5-0.38s-1.44-1.06-1.44-0.34v1.78l0.72,1.59-2.12,1.25-2.88,1.1-1.06,1.25h-2.16l-0.72-1.1-1.59-0.87-2.69,2.12-0.15,3.03,1.93,2.69,1.44,2.16s1.26,2.14,0.91,3.03c-0.36,0.89-4.28,2.5-4.28,2.5l1.06,2.5,1.25,1.59v1.97l2.31,0.53,2.88,1.97,2.12,2.31,1.97,0.38s1.06-1.07,1.06-1.78c0-0.72-0.15-4.48-0.15-5.38,0-0.89,1.59-8.37,1.59-8.37l0.34-1.44,4.13-2.69s0.88-1.07,2.31-1.97c1.43-0.89,4.66-3.03,4.66-3.03l1.78-1.4s0.71-1.64,0-1.82c-0.72-0.17-1.62-0.53-2.16-1.25-0.53-0.71-3.03-2.65-3.03-2.65l-1.25-1.44zm-132.28,14.34l-0.63,0.63-2.28,0.25-0.87-0.13-1.78,0.91v1.38l-0.63,1.65-1.15,0.75-0.13,1.38,0.91,0.78,0.87,0.87-0.12,1.25-1.25,1.28-1.66,1.5-1.65,0.13-1.38-1-0.62-1.53-1.41-2-1.25-1.03-2.03,0.53h-1l-2.41-1.66-1,0.38-1.66,2.15-1.37,2-1.66,1.78-1.25,2.66,0.38,1,1,1.28,1.78,0.25,0.12,1-0.12,1-2.78,2.41-2.16,0.87-1.87,3.03-2.53,2.53-2.91,0.5-1.13,0.13-0.5,0.91-0.28,1.87-0.87,2.16-1.75,2.03-0.13,1.87,1.25,2.79,1.5,1.28,2.04,3.53,3.78,4.15,1.28,0.75,3.15,0.38,0.38,0.65,1.37,1.38,1.66,2.53,1.38,0.5,0.5,1.66,0.9,1.5,3.28,0.5,1.63,0.25,0.78,1.4,0.37,2.13,0.75,1.15,2.41,0.88,1.5,0.75,1.28-0.5,1.13-0.25,1.37,0.75,0.91,1.66-1.03,1.25-0.13,1.53,0.66,1,1.25,0.75,1,1.03,1.03,0.62,0.75-0.37,1.25-0.25,1.41,0.5,1,1.37,0.5,0.91,0.24,2,0.26,1.03h0.65l0.88-0.16,0.87-0.5,0.63-0.37h1.03l0.75,0.75,0.62,0.91,0.88,0.25,1.4,0.25,1.88-0.5,1.41-0.5,1.37-1.79v-0.87l-0.37-0.66-0.26-0.5,0.26-1,0.5-0.5,2.78-1.28,2.4-1,1.66-1.12,1.87-0.78,0.5-0.75,0.13-1.38-0.75-1.53-1.13-0.87-2.15-0.13h-1.5l-1.53,0.5-1,0.75h-1.28l-0.63-0.12-1-1.13-1.53-0.37-0.75-0.38,0.25-1.53v-1.13l1.66-0.5,0.74-0.78,0.76-0.87,0.62-1.63,0.53-0.37,1.5-0.53,1.78,0.25,1-0.5-0.12-1.38-0.5-0.87-0.5-1.66,0.25-0.88,0.87-0.62,1-0.53,1.41-0.63,1.37-0.75,0.38-0.75v-0.5l-0.88-1.9-0.75-1.41-0.9-1.62-1-0.75-0.63-1.28,0.38-1.88,0.62-0.5h1.28l0.88,0.38,1,0.87,1.41,2.16,2.65,2.37,1,0.91s1.65,0.49,2.28,0.75c0.63,0.25,1.38,1,1.38,1l0.5,0.62,0.37,1.03,0.53,1,1,0.63,1.38,0.37h1.41l1.12,0.53,0.88,0.88,2.03,0.5h1.37l0.28,0.88,1,0.53,1,0.25,0.88-0.54,0.78-0.74-0.13-1.26-1.03-1.03,0.38-0.87,0.78-1,0.37-1.53-0.25-1-1.15-0.75-0.13-1.28,0.91-0.88,3.15-3.28,1.88-1.12,1.91-1.79,0.25-1.25-0.63-0.5-1.65-0.9-1.63-1-2.16-0.25-1.25,0.62h-1.4l-1.5-1.12-1.03-1.78-0.75-1.75-1.5-3.16-1.41-2.28-0.75-1.41-0.88-2.25-0.12-1.15-2.41,0.25-0.75-0.63-1.53-1.12s0.25-0.5,0.88-0.5,1.02-0.41,1.53-0.66c0.5-0.25,0.25-0.87,0.25-0.87s-0.37-1-0.88-1.76c-0.5-0.75-0.77-0.77-1.28-1.15-0.5-0.38-0.75-1.75-0.75-1.75l-1.25-0.41-2.03-0.5-1.66,0.13-1.5,0.53-1.9,0.12-0.88-0.65-1.62-1-2.03-0.13h-2.78-2.53l-1.63,0.75-0.91,0.75-0.37,1.66-1.13,1.37-1.12,2.04-1.28,0.87h-2.41c-0.63,0-1.75-1-1.75-1l-1.03-1c-0.51-0.51,0-2.03,0-2.03s0.13-1.53,0-2.16-1.5-1-1.5-1l-2.03-0.87s1.65-0.78,2.16-1.16c0.5-0.38,0.37-1,0.37-1v-2.28c0-0.63-0.25-2-0.25-2l-0.75-1.91zm110.16,1l-0.19,1.1,0.53,1.78,1.44,0.72,0.53-0.72v-1.63l-0.38-1.25h-1.93zm-28.22,6.19l-2.35,0.78-1.4,2.07-2.88,1.43-0.25,1.07,1.78,1.43,2.13,0.97,3.22-0.44,3.5-0.9,0.25-1.6-0.78-1.96-1.1-1.88-2.12-0.97z",
            "name": "Архангельская область"
        },
        "tu": {
            "path": "m329.02,389.7,2.0536,0.80357,2.1428,1.1607,1.6072,1.3393,1.6071,1.5179,1.7857,0.71428,2.3214,0.17858,0.89286-1.0714,1.6071-1.875,0.53572-2.3214,0.625-2.1429,2.2321-1.7857,1.875-0.44643,1.25-2.5,1.6964-1.0714,2.9464,0.26786,1.6071-1.6072s0.625-2.3214,0.53571-2.6786c-0.0893-0.35714-0.80357-2.5893-0.80357-2.5893l-0.89285-1.875-0.625-3.3036-0.71429-2.2322v-1.7857l1.5179-1.9643,2.2321-2.5,1.4286-1.4286,3.125-0.26786,0.35714,1.4286-0.89285,1.6071-1.6964,1.6964-0.17857,1.25,2.5,0.35714,4.0178,0.35714,1.9643,1.6072,3.0357,1.7857,1.5179-1.25,2.9464-0.17857,2.1429,1.4286,3.3928,1.0714s2.5-0.98214,2.9464-1.1607c0.44643-0.17857,3.5714-0.44642,3.5714-0.44642l0.89286-0.98215-0.53572-1.0714-1.6964-1.25-2.9464-2.2321-1.0714-1.4286s-1.6964-0.44643-2.3214-0.44643-2.6786-0.80357-2.6786-0.80357l-0.17857-2.6786-0.26786-2.4107-1.3393-1.3393-0.44642-2.2321-0.53572-3.5714-0.35714-0.89286-2.4107-2.7679-1.1607-0.71428s-2.6786-0.26786-2.9464-0.26786h-5.0893l-0.98215-0.26786s-0.625-1.5178-0.625-1.875c0-0.35714-0.98214-1.5178-0.98214-1.5178l-1.875-0.35715-1.25,1.25-2.4107,1.875-2.1429,0.89286h-3.0357l-4.6428,0.0893-2.9464,0.26785s-1.4286,0.53572-1.7857,0.625c-0.35714,0.0893-4.375,0.0893-4.375,0.0893l-3.0357-0.0893-1.4286,0.35715-0.89286,1.5178-0.53571,2.3214-0.89286,1.3393-2.3214,0.71428-1.6071,0.53572-1.5179,0.35714-1.7857-0.17857-1.3393-0.625-1.4286,0.17857c-0.35714,0.17857-1.6964,1.0714-1.6964,1.0714l-1.1607,2.1429-0.35715,2.4107-1.6071,2.3214-2.1429,2.5893-0.98214,1.5179,0.26786,1.25,0.71428,1.3393,1.5179,1.25,1.25,1.6071,1.6964,1.875,1.0714,1.6964s3.0357,0.98214,3.0357,1.5179c0,0.53571,1.6964,2.9464,1.6964,2.9464l0.625,1.875,1.6071,1.4286,1.875,0.71428,1.0714,0.80357,1.4286,2.3214,1.0714,1.4286v1.6072z",
            "name": "Тюменская область"
        },
        "ne": {
            "path": "m290.27,198.54,1.6071-0.89286,1.4286-1.1607,2.0536-1.0714,1.1607-1.25,0.625-3.3929,1.1607-1.6071s1.4286-0.80358,2.4107-1.0714c0.98215-0.26786,2.3214-0.26786,2.6786-0.26786,0.35714,0,1.5178-0.98214,2.0536-1.5179,0.53571-0.53571,3.0357-2.5,3.0357-2.5l0.71429-1.0714v-2.2321l1.25-1.9643s0.89285,0.17857,0.98214,0.625c0.0893,0.44642,0.26786,1.5178,0.625,1.6964,0.35714,0.17858,1.875,1.4286,1.875,1.4286l1.6964,1.1607,0.98214,0.89286-0.0893,1.3393-0.625,1.4286-0.44643,1.7857v1.6964l-0.26786,1.0714-0.44643,0.80357-0.26786,1.25-1.25,0.71428-1.3393-0.625-1.25-0.98214-0.625-0.80357-2.3214-0.53572h-3.0357c-0.44643,0-2.1429,1.1607-2.1429,1.1607l-0.80357,1.4286,0.17857,1.0714s0.53571,0.89286,0.625,1.25c0.0893,0.35714-0.71429,1.1607-0.71429,1.1607l-0.89285,1.6072s-0.26786,1.1607-0.0893,1.4286c0.17857,0.26785,0.625,0.80357,1.1607,1.25,0.53572,0.44643,1.875,1.5178,2.1429,1.6964,0.26786,0.17857,1.875,0.89285,1.875,0.89285s2.3214,0.17857,2.8571,0.17857c0.53572,0,1.9643-0.26785,1.9643-0.26785s1.5179-0.98215,1.875-1.1607c0.35714-0.17857,1.9643-1.1607,1.9643-1.1607s1.0714-0.44643,1.4286-0.35714c0.35714,0.0893,1.3393,0.98214,1.3393,0.98214l2.3214,0.17857s0.35714-0.44643,0.71429-0.80357c0.35714-0.35714,0.53571-0.71429,0.98214-0.35714,0.44643,0.35714,1.875,1.3393,1.875,1.3393l1.7857,0.44643h5.0893l2.5893,0.0893s0.80357,0.80357,1.25,0.89285c0.44642,0.0893,3.3928,0.53572,3.3928,0.53572l1.5179,1.4286,0.71429,1.9643,1.1607,0.17858,0.71429-1.5179,0.89285-1.0714,1.875-0.17857,0.89286,0.53571,2.1429,0.17857,2.5893,0.44643-0.44643,0.80357-0.98214,0.80358-1.6964,0.625-0.80357,0.98214-0.71428,0.98214-1.6964,0.71429-0.26786,1.0714,1.3393,0.98214,1.25,0.53571,0.625,2.0536,0.71428,0.35715,1.6964-0.80357s1.3393-0.89286,1.6071-0.89286c0.26786,0,3.3036,0.53571,3.3036,0.53571l2.6786,1.3393,1.5178,1.3393,1.4286,0.89286,4.4643,0.17857,0.71429,0.71429,1.5178-0.26786,2.5893-0.35714,1.7857-1.3393,0.625-1.7857s0.53572,0.625,0.53572,1.1607c0,0.53572-1.6964,2.7679-1.6964,2.7679l-0.71429,1.7857v1.0714l-1.1607,1.1607-0.89286,0.625-0.44643,0.98214,0.44643,0.80357h1.4286l0.80357-1.6071,0.17858-0.53572,1.5178-0.0893,1.5179,1.25,2.3214,0.35714,1.1607-0.89286,1.3393-1.1607,0.53571-0.89286-0.71428-1.0714-0.35715-1.4286,1.5179-1.1607,0.71429-1.875-0.53572-1.6964-1.25-0.80357-0.71428-3.3929-0.26786-3.125s-0.26786-0.89286,0.0893-1.25c0.35714-0.35714,2.2321-1.6964,2.2321-1.6964l1.3393,0.17857,1.1607,1.4286,1.0714,1.9643,0.35714,2.1429-0.89286,3.3036,0.89286,1.0714,2.8571,2.4107,2.7679,2.8572,3.3929,2.5893,2.1428,3.3036,1.6964,3.3929,0.80357,1.875,0.17858,1.6071-1.0714,1.1607-0.98215,2.0536-0.98214,1.5179h-2.5c-0.44643,0-3.6607-0.17858-3.6607-0.17858l-2.1429,0.98215-2.7679,0.71428h-3.0357l-1.7857-0.17857-2.4107,1.875-3.0357,2.4107-1.6072,0.53571-2.7678-0.0893-2.0536-0.53571-4.2857-2.4107-23.036-13.929-7.6786-6.875-1.25-1.1607v-1.3393l-0.98214-0.625-2.4107,0.625-5.0893-0.44642-5.625-0.98215-5.1786-0.80357-3.125-0.26786-4.1071-2.3214-2.0536-0.44643-1.7857,0.625-1.7857-0.26786-1.5179-1.7857-4.2857-8.4822-0.98215-2.4107z",
            "name": "Ненецкий автономный округ"
        },
        "om": {
            "path": "m388.39,368.89,0.71428,2.5-1.25,1.6071-1.25,1.9643,0.53572,1.6071,0.71428,1.9643-1.25,1.9643s-1.0714,1.25-1.0714,2.1429c0,0.89286,0.17857,3.0357,0.17857,3.0357l1.7857,1.6072,0.35714,2.3214-0.53571,3.3929-1.9643,0.89286-1.25,1.6071,0.71429,2.3214-0.35715,1.9643-3.9286,0.17857s-1.4286-0.89286-2.3214-1.0714c-0.89285-0.17857-3.3928,2.8571-3.3928,2.8571l-2.5,2.1429-0.89286,4.2857,0.53571,0.89286,1.9643,2.1429,0.35714,2.6786-1.6071,2.6786-1.0714,1.7857-0.17857,3.0357-2.5,2.1429s-2.3214,1.0714-3.0357,1.0714h-4.8214l-1.6072-0.71428c-2.1428,1.4286-3.75,0-3.75,0l-1.6071-0.71429-1.9643-0.35714h-1.0714l0.35714-1.7857,1.7857-1.0714,0.71429-1.4286-2.3214-1.25-2.1429-2.3214-1.9643,0.89285-0.89286-0.71428v-3.75l-1.4286-0.89286-2.8571,0.35714-2.8572-0.89285-0.89285-0.53572-0.17857-2.1428,2.1428-2.6786,0.71429-2.3214,0.35714-2.6786v-4.1071l0.71429-2.1429,1.4286-3.9286,1.6071-2.5,2.3214-0.53571,1.0714-1.25,1.0714-1.7857,1.6071-0.89285h2.6786l1.6071-1.4286,0.89286-3.9286-1.4286-3.2143-0.71429-3.0357-1.25-3.3928,0.35715-1.6072,4.4643-4.6428,1.0714-0.89286h2.6786l0.17857,1.6071-1.25,1.6072-1.7857,1.25-0.17857,1.4286,1.4286,0.35714,3.2143,0.35714,2.3214,0.17857,2.1429,1.4286,1.9643,1.4286,1.0714,0.35714,1.0714-0.71429,1.9643-0.35714,2.3214,0.35714,3.5714,1.6072h2.5l2.1428-1.0714h2.1429z",
            "name": "Омская область"
        },
        "ht": {
            "path": "m359.64,260.32,0,3.75-0.53572,3.2143-1.6071,2.3214-2.3214,2.3214-0.89286,1.25,1.9643,1.9643,1.7857,2.3214,5,1.9643,4.8214,0.17857,3.5714,1.4286,2.3214,2.6786,0,1.4286-2.1429,1.7857,1.4286,1.4286,2.3214,2.8572,1.9643,1.0714,2.1428-1.0714,1.7857-0.89286s1.6071,0.71429,1.9643,0c0.35715-0.71429,0.89286-2.1429,0.89286-2.1429l1.6071,2.1429,1.4286,2.8571,1.9643,1.6072s0.35714,2.1428,0.35714,2.8571v4.6429l1.9643,3.3928s0.35714,0.17857,0.71429,0.89286c0.35714,0.71429,0,2.1429,0,2.1429l1.0714,1.25,2.5,0.53571,3.75,0.71429,1.4286,0.89285s2.8571,2.1429,3.5714,2.6786c0.71429,0.53571,1.25,1.6071,2.1429,1.9643,0.89286,0.35714,3.5714,0.53572,3.5714,0.53572l2.8571,0.35714,0.89286,1.0714s0.35714,1.6071,0.71428,2.6786c0.35715,1.0714,1.4286,1.7857,1.4286,1.7857l3.0357,0.17857,1.7857,0.53572,0.35715,1.9643,0.35714,1.4286,1.0714,2.5c1.9643,0.17857,2.5,0.17857,3.5714,0.17857s3.3928,1.0714,3.3928,1.0714l1.9643,0.71428,2.8571,0.35714,2.8572-1.0714,3.2143-1.9643,3.0357,0.53571,1.9643,2.6786s0.35714,1.7857,1.0714,2.1428c0.71429,0.35715,2.8571,0.53572,2.8571,0.53572l2.3214,1.6071,0.71429,2.3214,1.9643,0.71428,2.6786-0.89285,1.9643,1.6071,1.0714,3.0357v2.3214l-0.35714,1.6072-0.53572,1.9643,3.0357,1.9643,2.5,1.7857,0.35714,2.3214v1.0714l-3.75,1.7857-2.6786,0.53572-3.2143,0.17857-3,0.15-1.61-1.07-1.7857-0.71428-2.3214,0.35714-2.3214,1.6071-2.6786,1.0714-2.1429-1.9643s-2.8571-0.35714-3.5714-0.35714c-0.71429,0-2.3214-1.7857-2.3214-1.7857l-0.89286-1.25-3.9286,0.17857h-3.5714l-1.6071-2.5s-1.25-0.89286-2.1429-0.89286c-0.89286,0-4.4643-1.25-4.4643-1.25l-2.5-2.3214h-1.25c-0.71428,0-2.3214,1.25-2.3214,1.25l-2.5,2.1429-1.7857,2.6786-2.8571,2.5-1.6071,3.3929-4.4643,1.6071-3.5714,0.89286-0.35714,2.1429-0.71429,2.1428-2.6786,1.25h-2.8571l-5.8929-5.5357-3.9286-0.89286-1.0714-1.4286-0.53571-4.1071-1.0714-1.25-1.0714-5.3572-0.53571-1.7857-3.5714-3.2143h-5.5357l-3.0357-0.35714-1.9643-2.8571-1.6071-0.53572-4.4643,3.0357-3.3929,0.71428h-5.1786l-5,0.71429-4.2857,0.53571h-3.5714l-1.4286-0.17857-0.53571-2.8571-0.35714-3.2143,0.89285-3.2143-0.89285-3.2143-2.3214-2.1428-1.0714-0.89286-1.0714-1.0714,1.25-2.6786,1.4286-2.3214-0.17857-2.1429-0.71429-3.2143,0.71429-5.5357,1.4286-1.7857,1.4286-2.1429-0.71428-2.3214-1.0714-3.5714-1.9643-2.6786-2.3214-3.3928-3.3928-2.1429-1.7857-1.9643-1.0714-2.6786,3.3929-2.1429,1.6071-2.6786,2.3214-4.8214,2.1429-2.6786,2.5-1.9643,3.5714-3.3929,1.6071-1.7857,1.7857-3.3929-0.17858-1.7857,0.89286-1.0714,2.1429-1.0714,1.4286-1.9643,1.6071-1.0714,1.25,0.17857,0.89286,2.3214,0.35714,1.0714,1.4286,0.35714,2.5-0.71428,3.0357-1.6071,1.4286-1.25,1.25-1.0714,2.5-0.53572z",
            "name": "Ханты-Мансийский автономный округ"
        },
        "ya": {
            "path": "m396.25,234.25,1.4286,2.6786,1.6071,1.7857,1.6072,2.6786,1.0714,3.0357,0.89286,2.8572,3.0357,0.17857,1.7857-1.6072,1.4286-1.25-0.53571-3.2143s-0.89286-1.4286-0.53572-2.3214c0.35715-0.89286,1.7857-2.5,1.7857-2.5v-2.3214l-2.1429-1.6071-1.25-2.5s0.71429-1.6071,1.4286-1.9643c0.71429-0.35714,3.75-2.3214,3.75-2.3214s1.6071-3.75,1.9643-4.4643c0.35714-0.71429,0.35714-4.8214,0.35714-4.8214l0.89286-1.4286,7.5-2.1429,4.8214-3.5714,5.7143-6.0714,3.2143-2.1429,2.1428-0.71429,1.7857,2.3214,3.3928,0.35714,1.7857,1.25,1.0714,2.6786,0.17857,1.7857-0.89286,3.75-2.1429,2.6786-2.3214,2.8571-3.0357,1.6072-1.25,1.0714-0.35714,1.9643,1.0714,2.1429,0.17857,2.8571-0.89286,2.8571-2.1429,2.6786-1.7857,3.2143-2.6786,4.4643-1.25,3.5714-0.89286,2.1429-0.17857,2.5,0.35714,2.6786,0.71429,2.3214-0.71429,1.4286-3.0357,2.1429-1.0714,3.2143-0.89286,3.2143h-3.2143l-2.3214,1.25-2.1429,3.3929-3.5714,0.53571-2.3214,1.25-1.4286,1.4286h-3.5714l-1.4286-1.0714-1.0714-2.6786-0.71429,0.53572v1.6071l-1.9643-1.4286-0.71428-1.9643-1.0714,0.71429-0.17857,1.9643,1.7857,2.1428,2.5,2.1429,2.5,1.25,3.2143,1.0714,2.1429,1.25,2.1428-0.89286,3.5714-1.7857,3.0357-0.71429,3.75-1.0714,2.3214-3.0357,3.2143-2.6786,3.3929-1.6072,2.1428-1.7857-0.17857-2.1429-0.89286-2.3214-0.17857-1.7857,2.1429-2.1429,4.2857-0.89285h3.3929l1.4286,1.4286,1.25,3.0357v2.8571,3.0357l-1.6071,1.4286-1.25,2.5,0.17857,3.5714,1.7857,1.25,3.2143,0.71428,2.1429,2.8572,1.9643,3.2143,0.53572-0.71428-0.53572-4.1072-2.5-3.2143-3.75-1.0714v-2.8571l2.3214-3.0357s1.7857-0.35714,1.9643-1.0714c0.17857-0.71428,0.17857-3.5714,0.17857-3.5714l-0.89286-3.9286-2.6786-2.6786-2.6786-3.2143-0.89286-1.4286h-2.1428s-0.53572,1.25-1.4286,1.25c-0.89285,0-2.6786-1.25-2.6786-1.25l-1.6071-1.0714-0.53571-2.5,1.4286-3.75,2.3214-3.2143,2.1428-2.6786,3.0357-1.25,0.17857-4.4643-0.17857-3.0357v-3.0357l0.17857-2.3214,1.7857-2.3214,1.4286-1.4286,2.1429-0.35715,3.2143-0.53571,2.3214-2.5,1.7857-1.0714,1.25,2.1429-1.9643,2.3214-0.89285,1.4286-1.0714,4.4643-1.25,2.5,1.25,1.7857,2.6786,2.1429h2.8571l1.4286,2.1428,2.3214,2.5,1.7857,0.35715-1.4286-2.1429v-2.5s-1.25-1.25-1.9643-1.6071c-0.71429-0.35715-3.5714-2.8572-3.5714-2.8572l-1.25-3.5714-0.17857-1.4286s1.9643-0.71428,2.6786-0.71428c0.71429,0,3.2143,0.89285,3.2143,0.89285l0.89285,1.7857,1.6072,0.17857,1.25-0.71429-0.35715-1.9643,0.17858-1.9643,1.4286-0.35714,1.6071,0.71429,1.7857,1.4286,1.25,1.0714,0.89286,1.7857-0.35714,1.7857-2.3214,2.5-3.0357,1.25,1.0714,1.4286,2.6786,2.1428,0.35714,2.8572,0.17857,3.3928-0.71429,2.6786-2.5,1.4286-2.6786,1.4286-3.5714,1.7857-2.1428,2.1429,0.35714,2.6786,1.4286,2.5,1.25,2.5,1.6071,1.0714h3.3929,2.5l1.7857,1.6071,0.53571,3.0357,0.17857,3.3928v2.8572l-1.9643,3.2143-1.7857,2.5h-2.6786l-0.71429,0.53572,0.53572,1.9643,0.71428,1.7857-0.53571,2.5-0.89286,1.25,2.3214,3.3928,0.53572,1.7857,0.35714,1.7857-1.25,1.7857-1.0714,1.25,0.89286,2.1428-0.17857,2.5-1.6072,1.6072,1.6072,1.7857,2.1428,1.9643,1.6072,1.4286-0.17858,3.3928-1.4286,2.3214-0.17857,2.6786,2.3214,2.1429,4.6429,0.89286,0.89285,1.4286-1.4286,2.1429-0.53571,3.3928-0.89286,2.3214-2.6786,1.4286s-0.89286,0.53572-1.6071,1.0714c-0.71429,0.53572-1.7857,2.8572-1.7857,2.8572l1.9643,1.7857,0.17857,2.3214-1.4286,2.1429-1.25,2.5-2.6786,2.3214-2.8572,2.8572-0.89285-1.7857-1.6072-2.1428-1.7857-1.0714-1.9643,0.71428-1.9643-0.71428-0.71429-1.6072-1.25-1.25-2.5-0.89285-2.1428-0.89286-0.71429-1.6071-0.89286-1.7857-1.4286-1.4286-2.8571-0.17857-2.5,1.4286-2.5,1.0714-2.6786,0.17857-4.1072-1.6071-3.5714-0.35714-2.1429-0.17858-0.89286-1.9643-1.0714-2.3214v-1.4286l-3.3928-0.71429-2.3214-0.53571-0.89286-2.5-0.71429-2.3214s1.4286-0.17857-1.0714-0.35714-5.5357-1.0714-5.5357-1.0714l-1.4286-0.53572-3.2143-2.5-2.5-1.6071-2.8572-1.0714-3.2143-1.25-1.25-0.89285-0.17857-2.1429-2.8572-3.9286,0.17857-6.7857-1.25-1.7857-2.3214-2.8571-1.0714-2.1429-0.53572-0.53572-1.0714,1.25-0.53571,0.71429h-1.4286l-2.6786,0.89286-1.25,0.35714-1.6072-0.35714-2.1428-2.3214-1.7857-1.6071,0.53572-0.89286,1.4286-1.6071-0.35714-1.7857-2.5-2.3214-3.0357-1.4286-4.2857,0.35714-3.0357-1.25-2.6786-0.89285-3.3929-4.2857,2.3214-2.5,2.5-3.75,0.17857-5.3571,0.35715-1.4286,3.75-1.0714,2.6786-2.5,1.4286-1.4286h3.75,3.3929l3.9286,0.53571,1.7857-1.25,3.5714-1.6071,3.3929-0.53571,2.5-1.25,2.3214-1.25,0.35714-2.8572-2.1429-2.3214-0.71428-1.25,0.53571-1.6071,2.3214-1.4286,0.35714-1.25,1.92-2.87z",
            "name": "Ямало-Ненецкий автономный округ"
        },
        "kr": {
            "path": "M531.66,122.41c-0.45,0.04-1,0.37-1,0.37-0.9,0.72-1.25,0.77-0.94,1.13,0.31,0.35,0.19,0.55,0.9,0.78,0.72,0.22,0.91,0.49,1.44,0,0.54-0.49,0.77-1.24,0.41-1.69s-0.37-0.64-0.81-0.59zm11.56,0.65c-0.22,0.02-0.44,0.11-0.6,0.38-0.31,0.53-0.49,1.57-0.62,1.84s-0.2,0.74-0.78,0.88c-0.58,0.13-1.39,0.54-1.75,0.09s-1.03-1.51-1.25-1.69-1.04-0.74-1.13-0.03c-0.09,0.72,0.19,1.51,0.19,1.91s-0.18,0.99-0.4,1.12c-0.23,0.14-1.06,0.25-1.29,0.56-0.22,0.32-0.62,0.49-0.62,1.16s-0.27,1.67-0.31,1.94c-0.05,0.27-0.32,0.26-0.63,0.75s-1.09,1.87-1.09,1.87,0.89,0.62,1.15,0.85c0.27,0.22,0.42,0.77,0.38,1-0.05,0.22-0.13,1.05-0.53,1.19-0.4,0.13-1.43,0-1.78-0.13-0.36-0.13-1.01-0.48-1.5-0.44-0.49,0.05-1.01,0.23-1.19,0.63s-0.71,0.38-0.13,1.18c0.58,0.81,0.87,1.53,1,1.76,0.14,0.22,0.29,1.51,0.07,1.87-0.23,0.36-1,1.13-1.22,1.53-0.23,0.4-0.44,0.71-0.22,1.16,0.22,0.44,0.66,0.8,1.15,0.94,0.5,0.13,3.66,0.71,3.66,0.71s0.28-0.36,0.81-0.71c0.54-0.36,1.36-0.77,1.85-0.41s0.52,0.8,0.65,1.25c0.14,0.45,0.41,2.02,0.5,2.37,0.09,0.36,0.49,0.58,0.94,1.16s1.59,1.37,2.22,1.59c0.63,0.23,1.05,0.55,1.72,0.6,0.67,0.04,2.85,0.82,2.94,1.09s0.31,1,0.31,1,0.54,0.52,0.81,0.56c0.27,0.05,2.22,0.19,2.22,0.19,1.38-0.76,2.23-0.8,2.5-0.94,0.27-0.13,0.84-0.03,1.37-1.06,0.54-1.03,0.76-1.35,0.63-2.06-0.13-0.72-0.34-0.93-0.87-1.6-0.54-0.66-1.5-1.24-1.1-1.56,0.4-0.31,1.56-0.8,1.88-1.15,0.31-0.36,0.54-1.32,0.4-2.35-0.13-1.02-0.15-2.5-0.47-2.9-0.31-0.41-0.73-0.92-1.4-1.19s-1.23-0.67-1.81-0.53c-0.59,0.13-1.92,0.25-2.19,0.03s-0.62-0.83-0.85-1.5c-0.22-0.67-0.5-1.13-0.5-1.53s1.16-3.63,1.16-3.63,0.71-0.29,0.84-0.56c0.14-0.27,0.36-0.76,0.22-1.66-0.13-0.89-0.39-1.55-1.28-2.09s-2.09-1.72-2.09-1.72v-0.97c0-0.35-0.15-1.73-0.28-2-0.14-0.27-0.48-0.72-0.97-0.72-0.25,0-0.5-0.05-0.72-0.03zm17.72,22.91c-0.13,0.02-0.25,0.07-0.35,0.19-0.4,0.44-0.72,1.12-0.9,1.34s-0.51,0.09-0.91,0-0.89-0.43-1.16-0.03c-0.26,0.4-0.67,0.74-0.71,1.19-0.05,0.44,0.09,1.75,0.09,2.46,0,0.72,0.09,1.8,0,2.6s-0.2,1.3-0.78,1.66c-0.58,0.35-0.91,0.4-1.31,0.93-0.41,0.54-1.13,1.25-1.13,1.88,0,0.62,0.06,1.45-0.66,2.03-0.71,0.58-1.14,0.56-0.96,1.4,0.17,0.85,0.22,0.93,0.84,1.38s2.79,0.63,3.28,0.5,1.26-0.77,1.66-1.22,1.61-0.99,2.28-1.12c0.67-0.14,1.17-0.08,2.16-0.13,0.98-0.04,1.54-0.39,2.03-0.65,0.49-0.27,0.54-0.54,1.43-0.54,0.9,0,1.74,0,2.1-0.31,0.35-0.31,1.35-1.19,1.62-1.5s0.88-1.05,0.97-1.5,0.18-1.3,0-1.75,0.15-1.15-1.19-1.28-1.57,0.07-1.84-0.38c-0.27-0.44-1.03-0.88-1.03-1.37s0.08-1.02-0.19-1.37c-0.27-0.36-0.79-0.81-1.28-0.72s-1.31,0.58-1.53,0.62c-0.22,0.05-0.71-0.09-0.85-0.4-0.13-0.32-0.21-1.11-0.21-1.91s-0.25-1.63-0.25-1.63c-0.34-0.13-0.83-0.43-1.22-0.37zm5.22,20.03c-0.62,0.05-1.16,0.75-1.16,0.75s-1.62,1.95-2.16,2.84c-0.53,0.9-0.86,1.08-1.93,1.25-1.08,0.18-1.82,1.63-1.82,1.63s-0.51,1.23-0.68,2.12c-0.18,0.9-1.25,3.07-1.25,3.07v1.93l0.87,1.63s1.6,1.05,1.78,2.12c0.18,1.08-2.12-0.68-2.12-0.68s-2.14-0.73-3.03-0.91c-0.9-0.18-1.64,0.01-3.07,0.19-1.42,0.18-1.25,0.34-1.25,0.34l0.72,1.63s1.61,1.4,1.25,2.65c-0.35,1.25-1.4-0.53-1.4-0.53l-1.97-0.87s-1.98,0.16-2.88,0.87c-0.89,0.72-1.25,0.91-1.97,0.91-0.71,0-1.59-0.71-2.12-1.78-0.54-1.08-0.91-0.91-1.63-1.44-0.71-0.54-3.2,0-4.09,0s-2.32,1.79-3.75,1.97-1.78,0.53-1.78,0.53l0.34,2.12-1.97,1.1-2.12,0.53-2.16,0.53c-0.71,0.18-2.12-0.19-2.12-0.19l-1.97-0.34-1.44,0.87-0.53,0.57-2.84,0.15-2.16,0.91s-2.49,2.13-4.09,2.31c-1.61,0.18-0.19,0.53-0.19,0.53s1.06,0.91,1.06,1.63c0,0.71-0.7,0.87-0.87,1.4-0.18,0.54-1.45-0.33-2.35-0.68-0.89-0.36-1.25,0-1.25,0s0.2,1.04,0.38,1.93c0.18,0.9,1.06,1.28,1.06,2.35s-0.19,2.12-0.19,2.12,0.53,2.69,0.53,3.41v2.69c0,0.89-0.87,1.59-0.87,1.59s-1.25,0.72-3.03,0.72c-1.79,0-0.91-0.72-0.91-0.72l0.72-0.91-0.53-1.4-1.97-0.38-2.31,1.25-1.78-0.53h-3.22-3.94c-1.43,0-1.95-1.07-2.84-1.25-0.9-0.18-2.88-0.34-2.88-0.34s-2.14-0.02-3.03,0.34-1.97,1.06-1.97,1.06v3.07,3.03s-1.6,0.69-1.78,1.4c-0.18,0.72,0.01,2.68,0.19,3.75,0.18,1.08,1.05,0.72,2.12,1.25,1.07,0.54,2.16,1.25,2.16,1.25l0.53,0.57,0.34,1.78s0.57,1.94,0.57,2.65c0,0.72,1.25,1.97,1.25,1.97s0.68,1.63,0.68,2.35c0,0.71-0.51,1.22-0.87,1.93-0.36,0.72-0.73,1.61-0.91,2.5-0.18,0.9,0,2.16,0,2.16l0.38,2.84s-0.2,2.88-0.38,3.6c-0.18,0.71-0.89,1.42-1.78,1.78s-1.25,2.12-1.25,2.12,0.01,2.7,0.19,3.6c0.18,0.89,0.88,1.42,1.59,1.78,0.72,0.36,1.25,1.78,1.25,1.78l-0.87,1.78-1.78-0.34-1.44-1.78-0.91-1.82v-2.5s-0.54-1.76-1.97-2.65c-1.42-0.9,0.19-1.63,0.19-1.63s1.08-1.25,1.44-1.97c0.36-0.71,1.06-1.78,1.06-1.78s1.8-1.6,2.16-2.5c0.35-0.89-0.38-1.4-0.38-1.4l-1.06,0.68-1.78,1.82-1.78-0.91s0.69-1.25,0.87-1.78c0.18-0.54,0.54-1.79,0.72-2.5,0.18-0.72,0.35-1.6,1.06-2.31,0.72-0.72,2.35-0.19,2.35-0.19l1.25-1.25v-1.63l-1.1-1.59s-1.4-0.17-3.9-0.34c-2.5-0.18-0.72-1.25-0.72-1.25l-0.72-1.82s-0.72-1.76-1.44-2.12c-0.71-0.36-1.94-3.04-2.65-3.75-0.72-0.72-1.1-1.44-1.82-2.16-0.71-0.71-2.11-1.78-3.18-2.5-1.08-0.71-1.97-1.4-1.97-1.4l-1.63,0.34s-1.05,1.07-0.15,2.5c0.89,1.43,1.06,1.44,1.06,1.44l1.25-0.28,0.97,0.18,1.22,0.5,1.15,1.07,1.06,0.71,0.91,1.07,0.53,0.9,0.1,0.94-0.6,1.63-1.68,1.84-1.29,0.81-1.93,0.88,0.81,1.15s2.04,1.71,2.22,1.85c0.18,0.13,0.69,0.9,0.69,0.9l0.31,2.85,0.09,2.59s-0.33,2.1-0.37,2.28c-0.05,0.18-0.63,0.88-0.63,0.88l-7.09,3.97-1.44,0.9-1.25,0.94-0.66,0.81s0.3,2.37,0.35,2.6c0.04,0.22,0.64,1.18,0.69,1.4,0.04,0.23,1.28,2.69,1.28,2.69s1.15,1.2,1.46,1.69c0.32,0.49,2.16,0.31,2.16,0.31h3.44c0.4,0,1.34,0.5,1.34,0.5s1.3,0.98,1.35,1.16c0.04,0.17,0.37,1.31,0.37,1.31l0.38,3.34s0.09,3.42,0.09,3.69-0.5,1.56-0.5,1.56l-0.34,1.22c-0.04-0.01-0.07-0.03-0.1-0.06l-1.15,2.06-1.82,1.69-1.68,0.28-1.6,0.28,0.16,1.41s1,1.98,1,2.34-0.01,1.68-0.19,2.13c-0.18,0.44-0.81,1.68-0.81,1.68l0.47,1.19,1.15,1.69,0.88,2.41,0.47,1.68-1.16,1.97-1,1.63,0.72,1.93s0.08,1.53-0.09,1.97c-0.18,0.45-1.07,1.16-1.07,1.16l-0.43,1.19s4.1,3.63,5,4.53c0.89,0.89,0.15,1.52,0.15,2.06s-0.72,2.5-0.72,2.5l-1.25,2.22,0.1,1.87s1.54,1.46,1.72,1.82c0.17,0.35,1.68,0.78,2.22,0.87,0.53,0.09,2.78,0.38,2.78,0.38l1.25,1.31-0.19,0.81-1.16,1.63-0.72,3.28s-0.8,2.07-1.15,2.34c-0.36,0.27-1.44,1.16-1.44,1.16l-2.22,1.15-1.72,2.41,0.38,0.97,1.34,1,0.25,1.78-0.81,1.78-1.25,2.78-1.5,1.41-2.31,2.34-1.72,1.6-1.5,2.25s-0.9,2.92-0.81,4c0.08,1.07,0.96,0.72,0.96,0.72s1.62,1.07,2.16,1.34,1.51,0.99,1.78,1.34c0.27,0.36,1,1.24,1,1.69v1.53l-0.81,0.88-1.25,0.81-3.41,1.25-1.69,0.34-2.4-0.25s-1,0.43-0.91,0.78c0.09,0.36,0.72,1.63,0.72,1.63s0.45,1.24,0.63,1.69c0.17,0.44,0.27,0.88,0.72,1.06,0.44,0.18,0.09,2.97,0.09,2.97s-0.89,2.3-1.16,2.75c-0.27,0.44-0.46,1.25-0.37,1.87,0.09,0.63,0.72,1,0.72,1s1.7,0.69,2.06,0.78,2.94,1.1,2.94,1.1,3.13,0.72,3.84,0.72,2.58,0.06,3.56,0.15,2.5,1,2.5,1,1,0.87,1.53,1.41c0.54,0.53,0.25,4.64,0.25,5s2.88,0.19,3.5,0.28c0.63,0.09,2.32,0.81,2.32,0.81s0.43,1.33,0.43,1.69-0.43,1.88-0.43,1.88l-1.78,0.9-3.47,1.5-0.57,1.06s-1.13,4.74-1.4,5.19,0.53,1.88,0.53,1.88l1.5,0.62,2.25,1.06s3.47,2.25,4.09,2.79c0.63,0.53-0.09,0.96-0.09,0.96l-0.97,1.82-5.44,4.72-0.72,1.96-0.18,1.5s-0.44,3.58-0.44,3.94,0.34,1.53,0.34,1.53,1.81,1.15,2.25,1.5c0.45,0.36,1.88,1,1.88,1l0.72,1.41s0.79,1.54,1.06,2.34c0.27,0.81-0.72,0.97-0.72,0.97l-3.56,2.94-1.97,0.91s-1.35,1.33-1.44,1.87,0.81,0.97,0.81,0.97l0.97,1.44,1,1.34s1.95,0.73,2.75,0.91c0.81,0.17,1.63-0.57,1.63-0.57s1.42-1.95,2.4-2.22c0.99-0.26,0.53,0.46,1.07,0.72,0.53,0.27,1.96,0.61,2.59,0.88s2.22,1.34,2.22,1.34l0.81,2.06,1.78,7.41,0.82,2.5-1.26,4.13s0.1,2.05,0.19,2.4c0.09,0.36,0.8,1.24,1.07,1.6,0.26,0.35,0.43,2.15,0.43,2.15l-0.97,1.35-2.4,1.5-1.1,1.78s-2.3,3.32-2.65,3.59c-0.36,0.27-2.06,1.14-2.6,1.41-0.53,0.27-2.06,1.44-2.06,1.44s0.27,1.06,0.63,1.15c0.35,0.09,0.53,2.16,0.53,2.16l0.81,1.06,1.88-0.44,3.21,0.78,2.5,0.91s1.25,0.88,1.79,1.06c0.53,0.18,3.4-0.44,3.4-0.44s5.87-2.32,6.31-2.59c0.45-0.27,1.72-1.06,1.72-1.06s2.5-1.89,3.03-2.25c0.54-0.36,3.74-2.14,4.1-2.41,0.35-0.27,1.44-1.78,1.44-1.78l0.9-2.12s0.16-1.99,0.25-2.44,0.53-1.5,0.53-1.5l0.72-1.25,2.16-0.19,3.12,0.44,2.32,0.19s3.57,0.1,4.37-0.35c0.8-0.44,0.45-0.72,0.63-1.34,0.17-0.63-0.27-0.9-0.63-1.35-0.36-0.44-1-1.33-1.53-1.78-0.54-0.44-1.25-1.15-1.25-1.15s-2.31-4.22-2.31-4.75c0-0.54,0.81-1.15,2.15-1.69s3.91-0.97,3.91-0.97l2.06-1.19-0.09-2.65,0.47-1.78s1.16-2.8,1.25-3.07c0.09-0.26,1.51-2.93,1.68-3.56,0.18-0.62,0.62-1.79,1.07-2.59,0.44-0.81,1.62-1.68,2.15-2.03,0.54-0.36,1.68-1.91,2.13-2.44,0.44-0.54,1.09-2.22,1.09-2.22l-0.19-4.09s-2.13-2.42-2.4-3.22c-0.27-0.81,0.07-1.43,0.34-1.78,0.27-0.36,1.61-1.88,1.97-2.5,0.36-0.63,0.81-2.53,0.81-2.97,0-0.45,0.98-1.5,1.88-2.13,0.89-0.62,2.83-0.18,3.28,0s1.09,0.81,1.72,1.35c0.62,0.53,3.28,0.68,3.28,0.68s1.07-1.42,1.25-1.87,0.98-1.77,1.25-2.22,1.53-1.07,2.25-1.16c0.71-0.09,1.69,0.63,1.69,0.63s0.97,1.78,1.15,2.31c0.18,0.54,1.18,1.61,1.53,1.97,0.36,0.36,1.26,1.8,1.35,2.16,0.09,0.35,1.06,0.33,2.22,0.15s0.09-1.4,0.09-1.4v-2.16s-0.62-2.16-0.62-2.78c0-0.63,0.71-1.78,0.71-1.78s2.5-0.8,3.03-1.06c0.54-0.27-0.08-1.17,0.1-1.97,0.18-0.81,1.33-1.7,1.69-1.88,0.35-0.18,2.96-0.61,3.4-0.87,0.45-0.27,1.41-1.25,1.41-1.25l0.62-2.69,0.28-2.88s-0.02-0.11-0.03-0.12c0.09-0.06,0.32-0.22,0.32-0.22l1.31,0.19s0.6-0.58,1.31-0.94c0.72-0.36,0.79,0.03,0.97,0.03s0.68,1.11,0.81,1.47c0.14,0.36,0.36,1.26,0.41,1.53,0.04,0.27,1.38,0.68,1.56,0.72s1.55,0.47,1.81,0.56c0.27,0.09,1.66,1.08,1.97,1.44,0.32,0.36,1.04,0.45,2.38,0.94s1.53-0.28,1.53-0.28l0.65-0.63s0.23-1.4,0.32-1.94c0.09-0.53,0.72-0.87,0.72-0.87s1.51-1.22,1.87-1.63c0.36-0.4,0.5-0.87,0.5-0.87s0.34-2.99,0.16-3.13c-0.18-0.13-1.38-0.71-1.78-0.84-0.41-0.13-1.6-1.46-2-2.13-0.41-0.66,0.3-1.16,0.43-1.43,0.14-0.27,1.41-1.06,1.63-1.28,0.22-0.23,1.06-0.78,1.59-1,0.54-0.23,0.27-2.9,0.22-3.35-0.04-0.44-0.7-0.44-1.81-0.62-1.12-0.18-1.97-0.85-1.97-0.85s-1.52-1.52-2.19-2.28-0.22-2.76-0.22-3.03,0.17-4.1,0.13-4.9c-0.05-0.81,0.54-1.63,0.72-1.85s2.37-0.49,2.59-0.53,1.9-0.99,2.35-1.34c0.44-0.36,0.59-1.19,0.59-1.19s-0.37-1.3-0.5-1.75c-0.14-0.45,0.72-1.65,1.03-1.88,0.31-0.22,1.91-1.37,1.91-1.37s1.07-6.86,1.25-7.13c0.17-0.26-0.32-1.59-0.32-1.59s-1.19-3.62-1.28-3.84c-0.09-0.23-0.68-1.65-0.5-2.32s1.27-1.02,1.41-1.25c0.13-0.22,0.07-0.97-0.16-1.15-0.22-0.18-1.03-1.16-1.03-1.16s0.58-3.41,0.63-3.81c0.04-0.4,0.28-1.69,0.28-1.69l1.22-0.84s3.79-0.07,4.06-0.07,2.03-0.79,2.44-1.06c0.4-0.27,0.13-1.66,0-1.84-0.14-0.18-1.19-1.94-1.19-1.94h-2.28l-2.5,0.06-2.1-0.43-1.03-0.41s-2.49-0.25-2.72-0.25c-0.22,0-1.5-0.16-1.5-0.16l-0.65-0.25s-0.13-1.6-0.13-1.87,0.48-0.55,1.07-0.91c0.58-0.35,0.93-0.94,0.93-0.94s-0.17-0.98-0.43-1.34c-0.27-0.36-0.1-0.97-0.1-0.97s2.29-2.76,2.38-2.93c0.09-0.18,0.62-1.04,0.62-1.04s0.89-1.56,1.06-2.18c0.18-0.63-0.59-1.16-0.59-1.16s-3.42-4.04-3.78-4.44-1.14-1.64-1.31-1.9c-0.18-0.27-0.91-1.24-1-1.69s0.31-1.41,0.31-1.41l1.09-3.47-0.56-1.06s-1.07-0.96-1.16-1.09c-0.09-0.14-1-0.75-1-0.75s-0.63-0.55-0.5-0.91c0.14-0.36,1.36-0.56,1.63-0.56s2.31-0.69,2.31-0.69,1.39-0.56,1.56-0.78c0.18-0.22-0.03-1.16-0.03-1.16s-1.56-17.7-1.56-18.06-0.65-1.56-0.78-1.78c-0.14-0.22-2.19-2.34-2.19-2.34l-0.72-5.16h0.06s1.85,0.06,2.47,0.06c0.63,0,0.97-0.84,0.97-0.84l2.5-2.06,1.53-1.38s0.57-0.52,0.88-0.56c0.31-0.05,1.26,0.58,1.44,0.62,0.17,0.05,1.47,0.6,1.47,0.6s0.99-0.52,1.43-0.66c0.45-0.13,0.75-0.62,0.75-0.62l-0.31-5.94,4.16-2.16s0.93-1.1,0.93-1.28,0.57-1.87,0.57-1.87l4.47-3.1s1.78-2.23,2.18-2.5-0.03-0.62-0.03-0.62l-1.25-1.85s-1.07-1.29-1.78-1.47c-0.71-0.17-0.91-1.09-0.91-1.09l0.29-5-0.6-0.47-2.84-2.31-3.41-2.69-0.72-1.97-0.34-1.4-1.06-1.78,0.15-0.91,1.25-2.69-1.4-1.4-1.63-1.97-0.72,1.59s-1.43-0.53-2.5-0.53-1.06,1.44-1.06,1.44-1.95,0.71-2.84,1.25c-0.9,0.53-1.25,1.78-1.25,1.78s-1.45,1.25-2.16,1.25-2.14,0.01-3.03,0.19c-0.89,0.17-1.43,1.41-1.97,2.12-0.54,0.72-1.44,2.33-2.16,2.69-0.71,0.36-0.71,0.34-1.78,0.34s-0.16-0.7,0.38-2.31c0.53-1.61,1.95-1.79,2.31-2.5s0.72-1.78,0.72-1.78l2.5-0.91s0.54-3.02,1.44-3.37c0.89-0.36,3.75-0.53,3.75-0.53s1.22-1.63,1.4-2.35c0.18-0.71,1.44-1.58,1.97-2.65,0.54-1.08,0.72-1.79,0.72-2.5,0-0.72,0.91-1.82,0.91-1.82l2.5-2.12s1.58-1.6,1.93-2.31c0.36-0.72,2.16-1.97,2.16-1.97l2.16-1.97,2.31-2.5s0.19-1.44,0.19-2.16c0-0.71-0.72-1.78-0.72-1.78s-1.26-0.9-1.97-1.44c-0.72-0.53-1.78-0.7-1.78-1.59s0.16-0.72,0.34-1.44c0.18-0.71,0.72,0,0.72,0l1.44,1.1,0.15-1.25-0.15-2.35-0.53-1.97-2.69-0.68-1.78-1.1h-2.16c-0.71,0-0.52-0.69-0.87-1.4-0.36-0.72-0.37-1.62-0.91-2.69s-2.31-0.19-2.31-0.19l-1.78,0.91c-0.72,0.35-0.73,0.52-1.44,1.06-0.72,0.54-1.61-0.37-3.22-0.91-1.61-0.53-1.77,0.02-2.84,0.38-1.08,0.36,0.17,0.88,0.53,1.59,0.35,0.72,0,1.44,0,1.44l-2.35-0.19s-1.06-0.35-1.78-1.25c-0.71-0.89,0.19-1.06,0.19-1.06s1.25-1.43,1.25-2.5-0.72-1.25-0.72-1.25h-2.69c-1.25,0-1.96-0.17-3.03-0.34-1.07-0.18-1.25-0.37-1.97-1.44-0.71-1.07,0.57-0.53,0.57-0.53l1.4-1.25,1.25-0.72,2.69,0.34s0.9,0.56,1.97,0.38,0.19-0.72,0.19-0.72l-1.63-1.06s-1.77,0.34-2.84,0.34-2.16-0.72-2.16-0.72l-1.97-0.87s-1.41-1.45-2.12-1.63c-0.09-0.02-0.2-0.04-0.28-0.03zm-45.94,3.34c-0.85,0.32-1.23-0.03-1.5,0.82-0.27,0.84-0.34,0.96,0.16,1.18,0.49,0.23,0.87,0.53,1.4,0.44,0.54-0.09,1.24-0.47,1.06-1.09-0.17-0.63-1.12-1.35-1.12-1.35zm20.84,3.82c-0.33,0-0.47,0.12-0.94,0.56-0.62,0.58-1.62,1.37-1.71,1.9-0.09,0.54,0.12,0.96-0.19,1.54s-1.55,1.81-2,2.12-2.51,0.16-2.6,0.47c-0.08,0.31-0.37,0.52,0.04,0.87,0.4,0.36,2.91,0.63,3.72,0.54,0.8-0.09,3.3-0.3,3.74-0.35,0.45-0.04,0.71,0.28,0.66-0.43-0.04-0.72-0.72-1.36-0.4-1.85,0.31-0.49,0.6-0.65,0.78-0.97,0.17-0.31,0.49-1.06,0.31-1.47-0.18-0.4-0.72-0.95-0.72-1.53s-0.28-1.37-0.28-1.37c-0.18-0.01-0.3-0.04-0.41-0.03zm-45.53,6.62c-0.49,0-2.1,0.86-2.19,1.13-0.09,0.26-0.56,0.38,0.07,0.97,0.62,0.58,0.39,0.88,1.15,0.84,0.76-0.05,1.55-0.67,2.22-0.63,0.67,0.05,1,0.79,1.31,0.79,0.32,0,0.62-0.23,0.66-0.72s-0.42-0.89-0.59-1.07c-0.18-0.17-0.54-0.18-0.54-0.18-0.31-0.45-1.6-1.13-2.09-1.13zm-2.06,6.25c-0.54,0.18-1.01,0.45-1.5,0.63-0.49,0.17-0.81,0.17-1.13,0.43-0.31,0.27-0.72,0.46-0.72,0.82,0,0.35,0.15,0.5,0.6,0.81s0.52,0.62,1.19,0.62,1.89-0.5,2.03-0.81c0.13-0.31,0.48-0.94,0.53-1.25,0.04-0.31-1-1.25-1-1.25zm-51.31,9.13l-2.35,2.12-0.34,1.78,1.97,0.38,1.25,0.87h2.5l1.25-0.87v-1.78l-1.63-2.16-2.65-0.34zm59.09,4.4c-0.49,0.14-1.47,0.59-1.25,1.03,0.22,0.45,0.5,0.8,0.91,0.75,0.4-0.04,0.74-0.01,0.87-0.5,0.14-0.49-0.22-1.25-0.22-1.25l-0.31-0.03zm97.34,1.78c-0.09,0.01-0.18,0.07-0.28,0.22-0.38,0.6-0.53,1.69-0.4,2.1,0.12,0.41-0.42,0.87,0.12,1.31s0.62,1.22,1.53,1.25c0.92,0.03,1.9,0.47,2.63-0.06,0.72-0.54,1.43-1.69,1.65-2.19,0.22-0.51,0.32-1.22,0.07-1.53-0.26-0.32-0.62-0.81-1.13-0.88-0.5-0.06-1.19,0.16-1.19,0.16-1.07,0.31-0.99,0.66-1.78,0.31-0.59-0.26-0.92-0.72-1.22-0.69zm-135.37,0.22l-1.97,0.19-1.44,1.44,0.53,1.06,1.63-0.91,1.44,0.57,0.34,1.59,1.25,0.34,0.72-0.87-0.53-1.06-1.97-2.35zm27.09,1.13c-0.49,0.01-1.04,0.1-0.9,0.5,0.17,0.53,1.09,0.75,2.03,0.75s2.97,0.08,3.06,0.44c0.09,0.35,0.68,1.56,0.91,1.65,0.22,0.09,0.92,0.13,0.97-0.41,0.04-0.53-0.44-1.13-0.76-1.4-0.31-0.27-2.09-1.25-2.09-1.25-0.45-0.09-2.24-0.28-2.78-0.28-0.13,0-0.27-0.01-0.44,0zm10.31,1.12c-0.71,0.23-0.93,0.25-0.93,0.88,0,0.62-0.1,1.06,0.43,1.15,0.54,0.09,0.85,0.33,1.26,0.07,0.4-0.27,0.59-0.91,0.37-1.22s-1.13-0.88-1.13-0.88zm-44.71,1.16l-1.44,1.25,0.72,0.87,1.78-1.06-1.06-1.06zm6.4,2.31v1.78l2.35-0.53v-1.25h-2.35zm133.35,1.5c-1.05,0.29-1.25,0.28-2.07,0.6-0.82,0.31-1.49,0.24-1.87,0.74-0.38,0.51-0.44,0.28-0.66,1.29s-0.69,0.99,0.1,1.31c0.79,0.31,1.39,0.29,2.31-0.41,0.91-0.69,1.71-1.09,2.19-1.65,0.47-0.57,0.84-1.19,0.84-1.35s-0.84-0.53-0.84-0.53zm-122.41,0.5c-0.4,0.63-0.65,1.16-0.87,1.56-0.23,0.41-0.68,0.77-1.13,1.66s-0.81,1.32-0.81,2.03c0,0.72,0.24,1.18,0.68,1.41,0.45,0.22,0.34,0.5,0.57,0.5,0.22,0,0.82,0.09,1.31,0s1.03-0.19,1.03-0.5v-1.88c0-0.53-0.31-3.37-0.31-3.59s-0.47-1.19-0.47-1.19zm-16.47,0.69l-1.06,0.87v1.25l1.44,0.57,0.87-1.25-1.25-1.44z",
            "name": "Красноярский край"
        },
        "tm": {
            "path": "m454.64,359.43,1.25,3.2143,1.25,2.3214s-0.53571,2.3214-0.71428,3.0357c-0.17857,0.71429-1.6071,3.0357-1.6071,3.0357s0.53571,1.25,1.6071,1.9643c1.0714,0.71429,5.8929,1.7857,5.8929,1.7857l5.3571,0.17857s3.75,0.89285,4.1071,1.6071c0.35714,0.71429,0.89286,1.0714,0.89286,2.1429,0,1.0714,0.35714,4.2857,0.35714,4.2857s1.25,0.35714,2.6786,0.35714,3.0357,0.35715,3.0357,0.35715,0.35714,2.1428,0.35714,2.6786c0,0.53571-0.89286,1.7857-1.9643,1.7857s-3.75,1.6072-3.75,1.6072-1.25,2.6786-1.25,3.75-0.89285,3.5714-0.53571,4.2857c0.35714,0.71429,4.4643,1.7857,5.1786,2.1429,0.71429,0.35714,3.2143,2.6786,3.2143,2.6786s-0.71429,1.6071-1.6072,2.6786c-0.89285,1.0714-4.1071,3.0357-5.3571,4.6429-1.25,1.6071-0.35714,2.8571-0.35714,2.8571l-0.71429,1.6071-3.2143,0.53572-3.2143,0.35714-1.4286-1.6071-1.9643-0.17857-4.66-0.57h-2.3214l-1.25,1.0714s-2.1429,1.0714-3.2143,1.25c-1.0714,0.17857-5.3571,1.25-6.0714,1.25-0.71428,0-6.4286,0.71429-6.4286,0.71429l-3.3928,1.4286h-2.3214l-0.35715-1.9643,0.71429-2.1429-0.35714-2.3214,1.7857-2.3214-0.53571-1.4286s-1.0714-0.17858-1.9643,0.53571c-0.89286,0.71429-4.4643,1.0714-4.4643,1.0714l-4.2857-0.17857-1.9643-2.3214-0.89286-3.0357s-1.25-1.0714-2.6786-0.71428c-1.4286,0.35714-1.6072,1.25-2.6786,1.25s-2.5,0-3.0357-0.89286c-0.53571-0.89286-0.89285-3.0357-0.89285-3.0357l-0.9-2.33s-1.6071-0.89286-2.5-1.6071c-0.89286-0.71429-3.2143-2.3214-3.2143-2.3214l-5.1786-2.3214-4.2857-1.9643-4.6429-1.7857-2.6786-1.0714-1.7857-2.5v-3.0357l1.6072-2.8572,0.35714-1.7857-0.53571-2.3214,1.25-3.0357,0.71428-3.3929,1.9643-1.0714,3.3928-2.8571s0-2.1429,0.71429-2.3214c0.71429-0.17857,5.7143-1.6071,5.7143-1.6071l1.9643-1.7857,1.25-2.6786,2.5-1.6071,1.6071-3.2143s1.0714-1.0714,1.7857-1.7857c0.71428-0.71429,2.1428-1.4286,2.1428-1.4286l1.9643-0.35715,2.1429,1.7857,2.1428,1.0714,2.5,0.35714,2.8572,1.4286,1.0714,1.6071,3.0357,0.89286h3.3929l2.1428,0.35714,1.25,1.6072,2.6786,0.71428,2.3214,0.71429,2.1429,1.7857,1.25-0.89286,1.7857-0.53571,2.1428-1.4286,2.1429-0.17857,1.6071,0.71428,1.7857,0.89286z",
            "name": "Томская область"
        },
        "nv": {
            "path": "m371.43,421.57,4.1071,0.71429l4.4643-0.17858c1.25-0.17857,2.1429-0.71428,2.1429-0.71428l-2.14,3.4h-3.0357l-0.89285,2.1428s1.0714,1.9643,1.7857,2.5c0.71429,0.53572,2.6786,3.0357,2.6786,3.0357l0.53572,2.1428,2.3214,0.35715h1.4286s2.6786,0.35714,3.3928,0.35714c0.71429,0,0.89286,0,1.9643-0.35714,1.0714-0.35715,3.2143-0.71429,4.6429-0.71429h3.5714s2.6786,0.17857,3.5714-0.35714c0.89286-0.53572,0.89286-1.0714,2.3214-1.25,1.4286-0.17857,3.0357-0.17857,3.9286-0.17857,0.89286,0,1.9643-0.17857,1.9643-0.17857s0,1.6071,0.89286,2.1428c0.89285,0.53572,4.1071,2.6786,4.1071,2.6786l0.71428,0.71429c0.17858,0.71429-0.17857,2.5-0.17857,3.2143,0,0.71428-1.0714,0.71428-0.17857,1.6071,0.89286,0.89286,1.9643,1.4286,1.9643,1.4286l2.3214-1.9643,2.3214-2.3214s2.1429-0.53572,2.8572-0.53572c0.71428,0,3.0357,0,3.75-0.17857,0.71428-0.17857,1.4286-0.71429,2.6786-0.17857,1.25,0.53571,2.3214,0.71428,3.3929,0.71428,1.0714,0,3.5714-1.25,3.5714-1.25s1.7857-2.1428,1.9643-2.8571c0.21-0.7-0.33-4.45-0.33-4.45v-3.75c0-0.71429,0.71428-2.3214,1.25-2.6786,0.53571-0.35714,1.7857-0.89285,1.7857-1.7857,0-0.89286-0.89286-1.6071-0.89286-1.6071s-0.89285-0.53572-0.89285-1.4286c0-0.89286,0.35714-3.2143-0.53572-3.0357-0.89285,0.17857-4.1071,1.7857-4.1071,1.7857s0,0.17857-1.4286,0.17857-2.5,0-2.6786-0.71429c-0.17857-0.71428,0.35714-5,0.35714-5l0.53571-2.6786,0.17858-2.1429-2.8572,1.4286s-1.6071,0.53572-2.5,0.71429c-0.9,0.18-4.47-0.71-4.47-0.71l-2.1429-0.71428-1.4286-2.1429-1.4286-2.8571s-2.5,0.53571-3.2143,0.71428c-0.71428,0.17858-1.9643,0.53572-1.9643,0.53572l-2.3214-1.25-1.0714-3.3929v-1.25l-3.0357-1.7857s-1.9643-1.6072-2.6786-2.1429c-0.71428-0.53571-3.3928-1.7857-3.3928-1.7857s-3.3929-1.25-4.1072-1.6072c-0.71428-0.35714-1.9643-1.25-2.6786-1.6071-0.71428-0.35714-3.9286-1.4286-3.9286-1.4286l-1.9643,0.17857s-0.35715,1.0714-0.53572,1.9643c-0.17857,0.89285-1.0714,2.3214-1.0714,2.3214l-1.4286,1.0714-0.89286,1.6072,0.17858,2.1428-0.71429,1.4286h-3.2143l-2.5-0.35714-2.1428,0.89286-2.1429,2.3214-1.4286,1.9643-0.71429,2.6786,0.71429,1.9643,1.7857,2.6786v1.7857l-2.1428,3.5714z",
            "name": "Новосибирская область"
        },
        "al": {
            "path": "m381.25,435.14,1.7857,5,1.7857,5.1786,1.6071,6.7857,0.89286,8.5714,0.35714,8.2143,0.35714,2.8571,2.3214-0.53571,1.7857-0.53572,0.89285-0.53571,0.17857-1.9643,1.25-1.6071,1.25-0.35714,1.7857,0.53571,0.89286,1.9643,0.89285,2.8571,2.3214,2.8571,1.9643,1.6071,4.6428,0,3.3929-0.35714,2.5-0.89286,2.3214,0,3.3929,1.4286,1.0714,1.9643,2.3214,0.53572,2.3214-0.53572-0.17857-1.4286-1.6071-1.0714-1.0714-0.89286,0.35714-1.6071,0.71429-0.35714,2.5-0.35714,4.4643-0.71429,3.75-0.17857,2.6786-0.71429,2.3214-1.9643,1.0714-1.9643s0.53572-0.71428,1.25-0.71428c0.71429,0,3.3929-0.17858,3.3929-0.17858l1.9643-0.17857,1.0714-1.7857s0.53572-2.1429,1.25-2.5c0.71429-0.35714,0.89286-2.3214,0.89286-2.3214l0.71429-2.1429-0.35715-1.0714-0.71428-1.0714,0.71428-0.89286,1.25-0.53571-0.17857-1.0714-1.4286-1.6072-1.0714-1.0714c-0.17857-0.71429-0.89286-2.8572-0.89286-2.8572l-1.7857-1.7857-0.17857-0.89286-0.53572-2.1429-1.6071-1.4286-2.5-1.9643-1.74-1.79s-1.6072,1.0714-2.3214,1.4286c-0.71429,0.35715-1.7857,0.71429-1.7857,0.71429l-2.5,0.17857-2.5-0.35714-3.0357-0.17857-4.8214,0.71428-2.5,1.6072-1.6071,1.7857-1.0714,0.71429-0.89286,0.35714-1.4286-1.25-0.35714-0.89286,0.35714-0.89286,0.17857-1.7857-0.17857-1.4286-2.3214-1.6071-1.9643-1.25-1.0714-1.25-0.17857-0.89286-1.9643-0.17857-4.2857,0.17857-1.25,1.25-2.1429,0.53571-3.75-0.53571-4.2857,0.17857-2.6786,1.25h-2.5l-3.3929-0.17857z",
            "name": "Алтайский край"
        },
        "km": {
            "path": "m472.14,414.79-0.71428,2.3214,0.89286,1.6072,2.5,1.4286,1.7857,1.6071,1.25,2.5,0.17857,0.89286s-0.89286,1.4286-1.6071,2.1429c-0.71429,0.71428-4.2857,2.3214-4.2857,2.3214l-1.7857,1.7857-1.7857,1.7857v1.6072l1.0714,1.7857,0.17858,1.7857-1.9643,2.5s-1.25,1.0714-1.0714,1.7857c0.17857,0.71428,1.0714,1.4286,1.7857,1.6071,0.71428,0.17857,2.8571,0.89286,2.8571,0.89286l-0.71429,1.4286-1.25,1.7857-0.53571,1.6072-1.7857,0.71428-1.4286,1.6072,0.71429,1.25,1.25,1.25-0.89286,2.5-1.25,1.6071,0.53572,1.25,1.7857,1.7857-0.35714,1.6072-1.6072,1.9643-2.5,2.1429h-1.9643l-0.71429-1.7857-1.9643-1.25-2.6786-0.35714-1.4286,1.0714-2.1428-1.4286-0.71429-2.3214-1.0714-0.71429,0.17857-2.5-0.53571-2.5,0.89286-1.9643,0.71428-1.6071-2.1428-2.6786-1.6072-2.6786-1.25-1.4286-0.71428-2.3214-0.89286-1.7857-2.3214-2.1429-1.7857-1.6071-0.71429-1.25v-1.7857l-0.35714-4.6428,0.17857-2.5,0.71429-2.3214,1.25-1.4286,0.71428-1.25-1.4286-1.9643v-0.89286l-0.35714-2.5,1.6071-0.35714,4.4643-0.53571,2.5-0.89286,3.0357-0.89286,1.0714-0.35714,0.71428-0.89286h1.6072,1.9643,2.5l1.7857,0.35715,1.4286,0.35714,0.89286,0.89286,1.9643,0.53571,1.6071-0.17857,2.5-0.71429z",
            "name": "Кемеровская область"
        },
        "lt": {
            "path": "m422.32,478.89-0.44643,2.1428s-0.17857,1.875,0,2.5893c0.17857,0.71429,1.1607,2.3214,1.1607,2.3214l3.3036,0.89286s0.98215,1.1607,1.0714,1.6071c0.0893,0.44643,0.0893,3.3036,0.0893,3.3036s0.17857,0.89286,0.53571,1.6071c0.35715,0.71429,1.25,1.875,1.7857,2.2322,0.53571,0.35714,1.6071,1.25,2.4107,1.3393,0.80357,0.0893,3.125,0.0893,3.5714,0.0893,0.44643,0,4.0179,0.0893,4.0179,0.0893s1.0714,0.53572,1.6071,0.89286c0.53571,0.35714,1.4286,1.25,1.7857,1.875,0.35715,0.625,1.5179,1.6964,2.0536,1.9643,0.53571,0.26785,1.1607,0.80357,1.7857,1.1607,0.625,0.35714,1.6964,0.71429,2.4107,0.80357,0.71429,0.0893,2.9464-0.44643,3.3929-0.71428,0.44643-0.26786,2.3214-0.89286,3.4821-0.89286s4.7322-0.35714,5-0.44643c0.26786-0.0893,3.5714-1.3393,4.1964-1.3393s1.4286-0.89285,1.6071-1.25c0.17858-0.35714,0.625-1.9643,0.17858-2.7678-0.44643-0.80357-0.80358-1.0714-1.4286-1.4286-0.625-0.35715-1.4286-1.25-1.25-1.7857,0.17858-0.53571,1.9643-1.1607,2.4107-1.1607,0.44643,0,2.5,1.0714,2.5,0.26785,0-0.80357-1.6964-2.2321-1.6964-2.2321s-0.98214-1.3393-1.25-1.7857c-0.26786-0.44643-1.875-1.9643-1.875-1.9643s-2.2321-2.7679-2.0536-4.1071c0.17857-1.3393-0.0893-3.3929-0.0893-3.3929s-0.625-1.3393-0.71428-1.6964c-0.0893-0.35714-1.3393-0.17857-1.3393-0.17857l-1.5179,1.5179s-1.4286-0.26786-1.5178-0.80357c-0.0893-0.53572-0.71429-2.5893-0.71429-2.5893s-0.35714-1.7857-0.44643-2.1429c-0.0893-0.35714-0.17857-1.9643-0.17857-1.9643l1.6964-1.3393,2.8571-1.3393,0.35715-1.1607-1.3393-1.6071-0.80357-0.625-2.1429-0.53571-1.9643,0.98214s-1.0714-0.625-1.4286-0.80357c-0.35714-0.17857-1.0714-0.89286-1.0714-0.89286l-0.89286-1.7857s0-1.0714-0.71429-0.89286c-0.71428,0.17857-0.89285,0.71428-0.89285,0.71428s-1.1607,1.1607-1.1607,1.5179c0,0.35714-0.625,1.4286-0.625,1.4286l-0.98214,1.0714s-1.6071,0.44643-1.9643,0.44643h-3.0357c-0.35714,0-1.1607,0.71429-1.5179,1.0714-0.35714,0.35714-1.1607,1.9643-1.1607,1.9643l-1.5179,1.0714-0.98214,0.625-2.3214,0.71429h-2.3214l-4.1071,0.71428-4.1071,0.625-1.0714,0.625-0.0893,0.98215s0.0893,0.89285,0.53572,0.98214c0.44642,0.0893,1.6071,0.80357,1.6071,0.80357l0.44643,0.89286-0.0893,0.89286-1.875,0.625z",
            "name": "Республика Алтай"
        },
        "tv": {
            "path": "m461.96,477.02,0.26786-1.6964s0.89286-0.625,1.6071-0.625c0.71429,0,1.6964,0.71428,2.4107,0.89286,0.71428,0.17857,2.7678,0.71428,3.0357,0.71428,0.26786,0,1.0714-0.80357,1.3393-1.25,0.26785-0.44643,1.9643-2.6786,1.9643-2.6786s0-1.25,0.625-1.6071c0.625-0.35715,1.875-0.35715,2.3214-0.35715,0.44643,0,1.6071-0.17857,2.3214,0.26786,0.71429,0.44643,1.1607,3.0357,1.1607,3.0357s0.89286,0.89285,1.1607,0.89285c0.26786,0,2.1429-0.80357,2.1429-0.80357s1.4286,0.17857,1.7857,0.44643c0.35714,0.26786,3.0357,0.89286,3.0357,0.89286s1.6964,1.6071,2.2322,1.6071c0.53571,0,1.6964,0.26786,2.6786-0.0893,0.98214-0.35714,2.8571-0.80357,3.3929-1.25,0.53571-0.44642,5.5357-1.9643,5.9821-2.5,0.44643-0.53571,7.0536-5.9821,7.0536-5.9821l2.1429-2.8571s-0.17857-1.875-0.17857-2.9464,1.0714-2.3214,1.4286-2.5893c0.35714-0.26785,2.8571,0.0893,3.3036,0.17858,0.44643,0.0893,4.375,0.89285,4.7321,0.80357,0.35714-0.0893,4.2857-0.44643,4.2857-0.44643l2.4107-2.2321s1.5179-0.35715,2.4107,0.0893c0.89286,0.44643,3.6607,2.5,4.1964,2.7679,0.53572,0.26786,3.75,2.3214,3.75,2.3214l1.6072,1.5178s1.25,0.71429,1.7857,0.44643c0.53571-0.26785,2.3214-0.89285,2.3214-0.89285l1.6071,0.53571,0.35714,1.25s0.53572,0.89286,0.53572,1.25-0.89286,1.6071-0.89286,1.6071-0.71428,0.53572-0.80357,1.1607c-0.0893,0.625-0.26786,4.1071-0.26786,4.1071s-0.0893,2.3214-0.0893,2.7679c0,0.44643-0.71429,2.1428-0.71429,2.1428l-1.4286,2.4107s-1.5179,1.3393-1.875,1.875c-0.35714,0.53571-2.2321,1.3393-2.4107,1.6964-0.17858,0.35714-0.71429,1.875-0.71429,1.875s-0.71429,1.875-0.71429,2.4107c0,0.53572-0.0893,3.3929-0.0893,3.9286,0,0.53572,0.53571,2.5,1.0714,3.2143,0.53571,0.71428,1.25,1.6071,1.25,2.0536,0,0.44643-0.80357,2.3214-1.1607,2.7679-0.35714,0.44643-4.8214,4.1964-4.8214,4.1964l-2.0536,1.25-2.1428,0.17857s-1.7857-0.98215-2.1429-0.89286c-0.35714,0.0893-2.3214,0.17857-2.6786,0.17857-0.35715,0-1.7857-0.89286-1.7857-0.89286s-1.6964-0.35714-2.1428-0.625c-0.44643-0.26785-1.7857-1.1607-1.7857-1.1607s-2.7679-0.26786-3.2143-0.26786c-0.44643,0-2.8572-0.17857-3.2143-0.53571l-2.0536-2.0536s-0.71429-1.4286-0.80357-1.9643c-0.0893-0.53571-0.17857-2.5-0.17857-2.5s-0.80358-0.80357-1.3393-1.25c-0.53571-0.44643-2.1429-0.89286-2.9464-0.89286-0.80357,0-3.9286,0.17858-3.9286,0.17858s-1.9643,0.53571-2.2321,0.625c-0.26786,0.0893-1.25,0.71428-1.875,0.80357-0.625,0.0893-2.0536,0.0893-1.9643-0.80357,0.0893-0.89286,1.25-1.6964,1.3393-2.0536,0.0893-0.35714-0.0893-1.0714-0.71429-1.3393-0.625-0.26786-2.1429-0.17857-3.0357,0.0893-0.89286,0.26786-2.3214,0.80358-2.8572,0.89286-0.53571,0.0893-3.3928,0.71429-3.3928,0.71429s-2.1429,0.89285-2.6786,1.0714c-0.53572,0.17857-3.8393,1.1607-3.8393,1.1607l-3.0357,1.5179-2.4107,1.1607-2.5893-0.26786-2.1429-0.98214-1.5179-0.71428-1.25-1.25c0-0.44643,0.35714-0.98215,0.35714-0.98215l2.4107-0.44643,1.7857,0.53572s1.25-0.35714,0.17857-1.0714c-1.0714-0.71429-4.4643-5.0893-4.4643-5.0893l-1.48-2.44s-1.0714-1.4286-1.0714-1.7857v-2.5893z",
            "name": "Республика Тыва"
        },
        "hk": {
            "path": "m470.27,432.11c0.53572,0.35715,1.9643,1.875,1.9643,1.875l1.3393,1.6072s0.26785,0.625,1.1607,0.80357c0.89286,0.17857,2.0536,0.17857,2.0536,0.17857s0.35714-0.35714,0.80357-0.80357,0.625-0.98214,0.98215-1.25c0.35714-0.26786,0.89285-0.89286,1.3393-0.80357,0.44643,0.0893,0.71429,0.26785,1.3393,0.71428,0.625,0.44643,1.3393,1.25,2.2321,1.25,0.89286,0,2.5,0.80357,2.5,0.80357s0.44643,1.875,0.625,2.3214c0.17857,0.44643,0.53571,2.9464,0.53571,2.9464s0.35715,1.5179,0.71429,2.4107c0.35714,0.89285,0.98214,2.0536,1.0714,2.4107,0.0893,0.35714-0.0893,3.125-0.17857,3.3929-0.0893,0.26785-0.80357,1.875-0.89286,2.2321-0.0893,0.35714,0,2.5893,0,2.5893l1.5179,1.5179,0.625,1.875s-1.25,1.4286-1.4286,1.6964c-0.17858,0.26786-2.2322,1.3393-2.5893,1.875-0.35714,0.53571-1.4286,3.0357-1.4286,3.0357s-1.6071,1.9643-2.1429,2.2322c-0.53571,0.26785-2.8571,1.0714-3.125,1.5178-0.26786,0.44643-1.6964,1.6964-1.6964,1.6964l-2.7678,0.0893s-1.3393,0.17857-1.6072,0.625c-0.26785,0.44643-0.53571,1.4286-1.0714,1.875-0.53571,0.44643-1.0714,1.25-1.1607,1.6071-0.0893,0.35714-0.89286,1.0714-0.89286,1.0714s0.0893,0.71429-1.0714,0.625c-1.1607-0.0893-2.9464-0.35714-2.9464-0.35714l-1.7857-1.1607-1.6071,0.44643-0.625,0.80357-0.26786,0.89286-2.5,1.0714s-0.625,0.89286-1.1607,0.35714c-0.53572-0.53571-1.25-2.3214-1.25-2.3214l-0.625-2.5893v-1.5179s0.17857-1.0714,0.53571-1.25c0.35714-0.17857,2.5-1.6071,2.5-1.6071s1.3393-0.98215,1.6964-1.0714c0.35714-0.0893,2.1429-0.44643,2.1429-0.44643l1.9643-1.0714,1.5179-2.0536,1.3393-1.0714-0.44643-1.6071s-1.25-1.25-1.4286-1.6071c-0.17858-0.35715-0.44643-1.25-0.44643-1.25l1.6071-2.2322,0.0893-1.875s-1.0714-1.1607-1.1607-1.5178c-0.0893-0.35715-0.0893-1.25-0.0893-1.25l2.5893-1.5179,1.0714-1.875,1.1607-1.9643,0.53572-1.6964-3.5714-1.1607s-0.89286-1.25-0.71429-1.7857c0.17858-0.53572,1.7857-2.4107,1.7857-2.4107s0.89286-1.875,0.89286-2.3214c0-0.44642-1.0714-2.8571-1.0714-2.8571s0-0.71428,0.26785-1.1607c0.26786-0.44643,1.25-0.98215,1.25-0.98215z",
            "name": "Республика Хакасия"
        },
        "ir": {
            "path": "M599.41,325.78c-0.12,0.03-0.22,0.12-0.22,0.34,0,0.45,0.53,1.54,0.53,1.54l0.37,1.06s-0.26,0.88-0.62,1.06-1.78,0.63-1.78,0.63l-2.69,0.09s-1.61,0.26-1.88,0.44c-0.26,0.18-0.9,0.73-0.9,1.09s-0.44,1.96-0.53,2.31c-0.09,0.36-0.16,1.97-0.16,1.97s0.18,0.78,0.63,1.41c0.44,0.62,0.43,1.81,0.43,1.81l-1.25,1.16s0.26,1.67,0.35,2.03,1,3.4,1,3.4l0.43,2.5s-0.28,1.42-0.28,1.69-0.96,4.57-0.96,4.57-0.09,0.98-0.54,1.24c-0.44,0.27-2.06,1.88-2.06,1.88s-0.19,0.99-0.19,1.34c0,0.36,0.37,1.06,0.19,1.5-0.18,0.45-1.97,1.72-1.97,1.72l-2.59,0.72-1.31,0.88-0.29,3.84-0.09,2.22v1.81c0,0.36,0.27,1.34,0.72,1.78,0.45,0.45,2.16,1.97,2.16,1.97l2.21,0.53,1.16,0.78,0.1,2.25s-0.37,1.33-0.82,1.5c-0.44,0.18-2.75,1.82-2.75,1.82l-0.53,1.15,0.97,1.16,1.97,1.59s0.78,0.1,0.87,0.72c0.09,0.63-0.15,2.6-0.15,2.6l-0.47,1.43-1.25,1.07-1.41,1.43-0.19,1.6-1.24,0.81-2.79-0.28-1.59-1.35-1.78-0.68-2.25-0.63s-0.45-0.74-0.63-1.19c-0.17-0.44-0.34-1.68-0.34-1.68l-1.25-0.72-1.87,1-1.26,0.09-0.18,1.69-0.35,2.41-0.53,1.53-0.9,0.97-1.6,0.53s-1.89,0.28-2.25,0.37c-0.35,0.09-1.34,1.41-1.34,1.41s-0.53,0.8-0.44,1.15c0.09,0.36,0.19,1.25,0.19,1.25l-1.16,0.91-2.06,0.81s-0.44,0.9-0.44,1.25c0,0.36,0.16,1.97,0.16,1.97l0.37,1.5,0.1,1.63s0.7,0.7,0.43,1.06c-0.26,0.36-2.78,0.62-2.78,0.62l-1.93-2.78-1-1.5-1.07-2.34-1.06-0.69h-1.72l-1.59,1.69s-0.89,0.81-1.16,1.44c-0.27,0.62,0.01,1.78-1.15,1.78s-3.22-0.38-3.22-0.38l-1.25-1.15-1.97-0.44-1.34-0.19s-0.62,0.64-0.97,0.91c-0.36,0.27-1.35,1.25-1.35,1.25v0.62l-0.72,1.88-1.15,2.22-0.81,0.9-0.29,1.35,0.63,1.68s0.45,0.9,0.81,1.25c0.36,0.36,0.63,0.35,0.72,0.97,0.09,0.63,0.19,2.6,0.19,2.6l-0.38,2.4-0.97,1.88s-1.88,1.79-2.15,2.06-2.13,1.61-2.13,1.97-1.62,4.19-1.62,4.19l-1.25,2.25s-0.69,2.11-0.78,2.56-0.63,3.59-0.63,3.59-0.09,1.33-0.62,1.6c-0.54,0.26-3.69,0.81-3.69,0.81s-2.12,1.07-2.56,1.34c-0.45,0.27-0.72,0.63-0.72,0.63s-0.19,0.52-0.1,0.87c0.09,0.36,1.16,2.25,1.16,2.25l1.44,2.66,1.06,0.56,0.97,1.06,1.09,1.69v0.81l1.25-0.43s0.9-0.91,1.25-1c0.36-0.09,1.78,0.28,1.78,0.28l1.44,0.87s1.43,0.91,1.78,1c0.36,0.09,2.03,1.41,2.03,1.41l4.32,2.87s0.34,0.82,1.06,0.82c0.71,0,2.41-0.38,2.41-0.38l1.78-0.34,1.06,1.15,0.28,1.16,0.28,1.53,2.56-0.81,2.44-2.41s2.14-2.16,3.13-2.34c0.98-0.18,2.12,1.19,2.12,1.19s0.72,1.58,1.25,2.03c0.54,0.44,2.43,2.32,2.78,2.59,0.36,0.27,3.03,1.53,3.03,1.53l2.22,2.66c0.45,0.53,2.52,3.22,2.97,3.22s2.84,0.18,3.38,0.09c0.53-0.09,1.96,0.63,2.5,1.25,0.53,0.63,1.78,2.69,1.78,2.69s1.27,1.69,1.62,1.78c0.36,0.09,1.16,1.88,1.16,1.88s0.89,1.62,1.25,1.53,2.31-0.63,2.31-0.63,0.73,0.15,0.91,0.69c0.18,0.53,0.87,2.59,0.87,2.59s1.18,0.62,1.53,0.53c0.36-0.09,1.88-1.25,1.88-1.25s1.77-0.26,2.12-0.43c0.36-0.18,1.44-0.82,0.82-1.44-0.05-0.04-0.11-0.06-0.16-0.09,0.05-0.01,0.34-0.07,0.34-0.07l1.69-0.62,8.75-2.88s1-1.76,1-2.03,0.63-2.06,0.63-2.06l0.06-2.06,0.81-0.82,1.78-0.96,2.25-0.82,1.16-1.68,1.06-0.82,5.44-2.59,1.62-1.31,0.82-1.1,0.62-2.5,1.94-1.15s1.27-0.9,1.62-1.35c0.36-0.44,0.35-0.97,0.35-0.97l-0.63-0.81-1.25-1.25-0.34-0.81s0.18-0.96,0.62-1.41c0.45-0.44,0.71-0.63,1.07-0.72,0.35-0.09,1.25,0.35,1.25,0.35l1,1.09,0.87-0.47,0.63-1.78s0.81-2.14,0.9-2.5,0.25-1.69,0.25-1.69-0.25-3.05-0.25-3.5v-2.5s0.44-4.01,0.53-4.37,0.35-2.13,0.35-2.13l-0.1-1.87s-0.44-1.17-0.62-1.44-0.16-0.81-0.16-0.81,0.63-1.05,0.72-1.41c0.09-0.35-0.37-0.81-0.37-0.81s-0.54-0.71-0.72-1.06c-0.18-0.36-0.88,0.15-0.88,0.15l-1.44,0.91s-0.79,1.26-1.15,1.53-0.44,1.31-0.44,1.31l-0.28,4.38-0.81,1.34-1.53-0.09c-0.34-0.63-0.73-1.32-0.79-1.6-0.08-0.44-0.43-2.67-0.34-3.65s0.97-4.38,0.97-4.38l1.25-1.25s0.09-1.52-0.53-2.06c-0.63-0.53-1.87-1.07-2.41-1.34-0.53-0.27-1.72-1.35-1.72-1.97,0-0.63,0.92-1.77,1.19-2.13,0.27-0.35,3.93-1.51,4.28-1.78,0.36-0.27,3.57-2.15,3.57-2.15l3.65-1.07,2.78,0.25,2.13-0.34,1.34-2.5,2.88-0.81s1.87,1.25,2.4,1.25c0.54,0,2.22-0.72,2.22-0.72s1.07,0.64,1.25,1,1.63,1.34,1.63,1.34l1.93-0.37s1.35-0.44,2.07-0.35c0.71,0.09,1.7,0.98,2.06,1.07s2.75-0.72,2.75-0.72l1.09-1.5,2.5-1.16s1.35-1.08,1.35-1.53,0.15-3.22,0.15-3.22,1.25-0.61,1.88-0.97c0.62-0.35,2.15-0.18,2.15-0.18s0.17-1.34,0.35-1.79c0.18-0.44,1.33-1.34,1.78-1.43s2.44,0.37,2.44,0.37l1.15,0.97-1.34,1.44-0.72,1.15,0.72,0.72s2.31-0.45,2.94-0.72c0.62-0.26,2.24-0.44,2.78-0.53,0.53-0.09,2.84-1.15,2.84-1.15s0.91-1.08,0.91-1.44-0.2-1.71-0.38-2.16c-0.18-0.44-2.21-1.14-2.65-1.59-0.45-0.45-0.54-2.58-0.72-2.94s-0.9-1.9-0.63-2.44c0.27-0.53,1.06-1.78,1.06-1.78l-0.62-2.5s-0.01-2.48,0.34-2.84c0.36-0.36,2.07-1,2.07-1l2.93,0.81s0.9,1.15,1.35,1.06c0.44-0.09,2.15-0.53,2.15-0.53l0.25-3.56-0.87-1.16s-1.27-1.42-1.63-1.68c-0.35-0.27-1.25-1.25-1.25-1.25l-1.68-2.97-0.25-2.6-0.72-1.68-2.25-0.54-1.78,0.97-3.13,1.53-1.97,0.44-0.72-0.72-0.78-2.84-1-1.59-2.75-2.35-2.34-1.68-2.66-0.91-2.78-0.06s-2.49,0.8-2.84,1.15c-0.36,0.36-1.45,1.52-1.72,1.88-0.27,0.35-0.88,2.5-0.88,2.5l-0.28,2.12v2.5s-0.17,1.36-0.43,1.72c-0.27,0.36-3.94,2.03-3.94,2.03l-1.16,1.72-0.19,2.66-0.97,2.25-2.15,2.22s-0.6,0.63-0.69,0.09-0.62-2.22-0.62-2.22l-2.16-2.34s-0.44-1.23-1.06-0.78c-0.63,0.44-1.63,1.31-1.63,1.31l-3.28,1s-0.89,0.43-1.25,0.87c-0.36,0.45-2.97,0.72-2.97,0.72l-2.03,0.28-2.16,2.5s-0.62,1.26-1.24,0.82c-0.63-0.45-2.22-2.35-2.22-2.35l-0.82-1.59-0.53-2.94,0.16-5.56-0.06-2.56,1.5-2.6,1.87-3.03s0.44-1.61,0.44-2.06-0.53-3.03-0.53-3.03l-2.03-2.25-4.94-3.66s-0.63-0.71-0.63-1.25c0-0.53,0.1-2.31,0.1-2.31l1.15-1.97s0.63-0.35,0-1.06c-0.62-0.72-3.18-4.57-3.18-4.57l0.15-5.34s0.02-0.65-0.34-1.09c-0.36-0.45-2.59-3.28-2.59-3.28l-1.54-1.88s-0.24-0.62-0.68-0.62c-0.45,0-2.16,0.68-2.16,0.68s-1.17,0.82-1.44,0.29c-0.27-0.54-0.25-2.6-0.25-2.6s-0.29-1.16,0.16-1.25,1.62-0.44,1.62-0.44h1.5l0.29-1.43-1.79-1.97-1.53-1.35-1.4-0.06s-0.14-0.03-0.25,0z",
            "name": "Иркутская область"
        },
        "br": {
            "path": "m543.39,476.39s1.6072,0.98214,2.3214,1.1607c0.71429,0.17857,2.8572,1.25,3.3929,1.3393,0.53571,0.0893,1.7857,0.71428,2.5,0.98214,0.71429,0.26786,1.875,0.98214,2.5893,1.3393,0.71428,0.35714,2.2321,0.53571,3.2143,0.625,0.98214,0.0893,2.8571,0.89285,3.4821,1.0714,0.625,0.17858,2.1429,1.0714,2.9464,1.1607,0.80357,0.0893,1.5179,0,2.7679,0.625s2.7679,1.3393,3.125,1.5179c0.35714,0.17857,0.71429,0.26785,0.80357,0.98214,0.0893,0.71428,0,2.6786,0.0893,3.0357,0.0893,0.35715,0.26785,1.6964,0.625,2.0536,0.35714,0.35715,1.6071,1.9643,2.5893,2.5893,0.98215,0.625,1.4286,1.6964,1.9643,2.1429,0.53571,0.44643,2.3214,1.875,2.8571,1.9643,0.53572,0.0893,2.3214,0.625,2.7679,0.625,0.44643,0,5.0893,0.44643,5.0893,0.44643s1.7857-0.80357,2.7679-1.25c0.98214-0.44643,4.0179-1.25,4.4643-1.5179,0.44643-0.26785,1.5178-0.98214,2.6786-1.0714,1.1607-0.0893,4.1964-0.0893,5.0893-0.0893,0.89286,0,4.1072,0.0893,4.1072,0.0893s2.3214-0.0893,3.125,0.44642c0.80357,0.53572,1.6071,1.6072,1.9643,2.1429,0.35715,0.53572,0.625,1.4286,1.0714,1.6071,0.44643,0.17858,1.4286,0.35715,1.875,0.35715,0.44643,0,2.1429-0.26786,2.5-0.35715,0.35714-0.0893,2.2321-0.44642,2.2321-0.44642l0.0893-2.6786s-0.0893-1.7857,0.53571-2.0536c0.625-0.26785,4.4643-1.5178,4.8214-1.6964,0.35715-0.17857,1.25-1.6071,1.25-1.6071s-2.5-0.625-3.3036-0.625c-0.80357,0-1.25-1.4286-1.25-1.4286l1.0714-1.5179,0.17857-1.9643,0.98214-1.0714,0.80358-1.3393s-0.625-0.98214-0.80358-1.3393c-0.17857-0.35715-0.0893-1.4286-0.0893-1.4286l2.2321-1.1607,3.125-0.35714,2.4107-1.1607,3.4821-2.4107,1.7857-0.625s1.4286,0.0893,1.875,0.26786c0.44643,0.17857,2.4107,0.53571,2.5893,0.17857,0.17857-0.35714,1.6071-1.9643,2.0536-2.3214,0.44643-0.35714,2.6786-2.1429,2.6786-2.1429l1.4286-1.1607s0.98215-1.25,1.4286-1.5179c0.44643-0.26786,1.875-1.0714,2.4107-1.0714,0.53571,0,0.98214,0,1.3393-0.26785,0.35715-0.26786,1.1607-1.25,1.3393-1.6072,0.17857-0.35714,1.0714-0.80357,1.6071-0.89285,0.53572-0.0893,5-1.3393,5-1.3393l2.6786-1.5179s1.875-1.5178,2.0536-1.875c0.17857-0.35714,1.6071-2.8571,1.6071-2.8571l0.98214-1.875s-0.26786-1.4286-0.71428-1.7857c-0.44643-0.35715-2.1429-1.6072-2.1429-1.6072l-2.5-1.25s-1.25-0.80357-1.1607-1.6071c0.0893-0.80357,7.5-5.625,7.5-5.625s0.98215-1.6964,1.0714-2.0536c0.0893-0.35714,0.89286-1.9643,1.25-2.3214,0.35715-0.35714,2.5-2.0536,2.5-2.0536s1.4286-0.625,1.875-0.71429c0.44643-0.0893,3.5714-1.5178,3.5714-1.5178l1.25-0.98215s0.44643-2.0536,0.44643-2.5893c0-0.53572-0.80357-3.8393-0.80357-3.8393s-1.0714-0.53571-1.4286-0.89285c-0.35715-0.35715-1.25-0.80358-2.1429-0.80358-0.89286,0-2.6786,0-3.125-0.625-0.44643-0.625-1.3393-1.25-1.6964-1.875-0.35714-0.625-1.1607-1.7857-1.25-2.2321-0.0893-0.44643-0.80357-2.4107-0.98214-2.7679-0.17857-0.35714-1.0714-2.3214-1.0714-2.3214l-2.0536-3.5714-1.0714-2.7679,0.26786-2.0536,1.0714-0.625,0.80357-1.25,1.4286-1.875,0.625-0.98214-2.3214-1.25s-1.875,0.44642-2.2321,0.71428c-0.35715,0.26786-0.98215,1.3393-0.98215,1.3393s0.35715,0.625,0,0.80357c-0.35714,0.17857-2.3214,0.44643-2.3214,0.44643l-1.25,0.89285-0.71429,1.9643v1.6071l-0.98214,0.98215-2.0536,1.0714-1.3393,0.98215-1.1607,1.3393s-1.6964,0.0893-2.0536,0.0893c-0.35714,0-2.0536-0.625-2.0536-0.625l-2.6786,0.17857-2.3214-0.0893-1.9643-1.4286-1.4286,0.26786-2.0536-0.35714s-0.80357-0.71429-1.1607-0.71429c-0.35714,0-2.1429,0.625-2.1429,0.625l-1.5178,1.3393-0.98215,1.0714-2.6786,0.26785-1.9643-0.0893-2.3214,0.44643-2.2322,1.1607-3.3928,1.7857-2.3214,0.98215-1.3393,0.89285-0.89285,1.1607s-0.0893,0.35714,0.0893,0.71428c0.17857,0.35715,0.98214,1.4286,0.98214,1.4286l1.6072,0.80357,0.98214,0.89285,0.83,0.91,0.0893,1.1607-1.6071,2.1428-0.35714,2.2322-0.35715,1.875v2.6786l0.80358,1.6071,1.1607,1.4286s0.26786-0.44643,0.71429-0.80357c0.44642-0.35714,1.1607-2.3214,1.1607-2.3214v-2.0536l0.0893-2.0536,0.98214-1.875,1.6964-1.25,1.1607-0.17857,0.89286,1.1607s-0.0893,1.25-0.26786,1.6964c-0.17857,0.44643-0.53571,0.98214-0.35714,1.3393,0.17857,0.35714,0.89286,1.4286,0.89286,1.4286l-0.17858,2.7678s-0.35714,2.3214-0.35714,2.6786c0,0.35714-0.26786,2.5893-0.26786,3.0357v2.5893c0,0.89285,0,1.5178,0.0893,2.1428s0.0893,1.6964-0.0893,2.1429c-0.17857,0.44643-0.44642,1.25-0.71428,1.9643-0.26786,0.71428-0.35714,1.25-0.44643,1.9643-0.0893,0.71429-1.0714,1.6964-1.0714,1.6964s-0.71428,0.26786-0.98214-0.625-1.6071-0.98214-1.6071-0.98214-0.71429,0.44642-1.0714,0.98214c-0.35715,0.53571-0.89286,1.25-0.35715,1.6964,0.53572,0.44643,1.5179,1.6071,1.5179,1.6071s0.625,0.35714,0.26786,1.1607c-0.35714,0.80358-1.1607,1.0714-1.6964,1.4286-0.53571,0.35714-1.5179,0.89285-1.6964,1.25-0.17857,0.35714-0.71428,1.4286-0.71428,1.7857,0,0.35714-0.44643,2.0536-0.44643,2.0536l-1.3393,0.98214-1.875,1.3393s-2.2321,0.71429-2.6786,0.98214c-0.44643,0.26786-2.5,1.4286-2.8571,1.7857-0.35715,0.35714-0.53572,1.25-1.4286,1.6071-0.89286,0.35714-3.125,1.3393-3.125,1.3393l-0.98215,0.26785s-0.35714,0.80357-0.35714,1.1607c0,0.35714-0.26786,2.2321-0.26786,2.7678,0,0.53572-0.26785,0.98215-0.625,1.6964-0.35714,0.71429-0.98214,1.6964-1.6071,1.7857-0.625,0.0893-2.7679,0.71428-3.2143,0.89285-0.44642,0.17858-2.5,0.89286-3.0357,0.98215-0.53571,0.0893-2.8571,1.0714-2.8571,1.0714l-0.71429,0.80357-1.5179,1.1607-2.0536,0.71429-1.4286,0.80357-1.6964-1.0714-0.35714-0.98214-0.44643-1.25s-0.35714-0.35715-1.25-0.26786c-0.89286,0.0893-2.0536,0.44643-2.0536,0.44643s-1.3393-1.4286-1.6071-1.875c-0.26786-0.44643-1.875-3.125-1.875-3.125l-1.54-1.99-1.34-1.61s-1.1607-0.71429-1.6964-0.71429c-0.53571,0-2.6786-0.17857-3.0357-0.17857-0.35715,0-1.6072-0.89285-1.7857-1.1607-0.17857-0.26786-3.4821-4.2857-3.4821-4.2857l-1.875-0.89285-2.8571-1.9643-1.9643-2.2321-1.0714-1.6964-0.89286-0.625s-0.89285-0.26786-1.25,0.0893c-0.35714,0.35714-0.80357,0.53571-1.3393,0.89285-0.53572,0.35715-1.875,1.4286-1.875,1.4286l-1.3393,1.25-1.9643,1.1607-1.4286,0.89286s-0.89286,1.0714-0.98215,1.6071c-0.0893,0.53571-0.26785,1.1607-0.26785,2.0536,0,0.89286-0.35715,3.3036-0.35715,3.3036z",
            "name": "Республика Бурятия"
        },
        "zb": {
            "path": "m618.41,500.07s1.1364,1.1364,1.6415,1.5152c0.50508,0.3788,1.6415,1.6415,2.2728,1.894,0.63134,0.25254,2.6516,1.6415,2.6516,1.6415s2.9042,1.0102,3.4093,1.0102h5.5558c1.1364,0,3.283,0.75762,3.283,0.75762s0.88388,0.63134,2.0203-0.25254c1.1364-0.88389,2.3991-1.6415,2.3991-1.6415s0.75762,0.25254,1.6415,0.63135c0.88388,0.3788,1.5152,1.2627,2.1466,1.2627,0.63135,0,3.4093-1.7678,3.4093-1.7678s2.6516-2.2728,3.1567-2.7779c0.50507-0.50508,2.5254-0.88388,3.5355-1.2627,1.0102-0.37881,5.4296-0.50508,5.4296-0.50508s1.894-1.2627,2.2728-1.894c0.37881-0.63135,1.7678-3.4093,1.894-3.9143,0.12627-0.50508,2.7779-2.3991,3.4093-2.9042,0.63135-0.50508,4.9245-2.5254,5.177-3.0305,0.25253-0.50508,2.0203-1.5152,2.0203-1.5152l3.1567,1.2627,2.9042,1.2627s2.2728,0.25254,2.9042,0.25254c0.63135,0,2.2728-0.50508,2.7779-0.88388,0.50508-0.37881,3.1567-1.7678,3.1567-1.7678s3.283,0.25254,3.7881,0.50508c0.50508,0.25253,1.7678,0.88388,2.3991,1.1364,0.63135,0.25254,3.9144,1.389,3.9144,1.389s3.6618,0.3788,4.4194,0.25254c0.75762-0.12627,2.5254-1.7678,2.7779-2.3991,0.25254-0.63134,0.75762-2.3991,1.6415-2.9042,0.88388-0.50507,4.2932-1.5152,4.2932-1.5152s1.389-0.12627,1.5152-1.6415c0.12627-1.5152,0.37881-2.9042-0.25254-3.5355-0.63135-0.63134-1.389-0.88388-1.7678-1.7678-0.3788-0.88389,0.88389-8.9651,0.88389-8.9651l1.6415-3.7881,1.2627-4.2932s1.389-2.2728,1.2627-2.9042c-0.12627-0.63134-0.37881-3.9143-0.37881-3.9143l-1-2.41s-1.1364-0.88388-1.5152-1.389c-0.37881-0.50507-1.0102-0.37881-1.5152-1.0102-0.50508-0.63135-1.7678-1.1364-1.7678-1.7678,0-0.63134-0.25254-1.5152,0.37881-2.0203,0.63134-0.50508,3.0305-3.0305,3.7881-3.4093,0.75761-0.37881,4.5457-2.5254,4.9245-3.0305,0.37881-0.50507,1.389-1.6415,1.7678-2.1466,0.37881-0.50508,0.88388-0.50508,0.63135-1.6415-0.25254-1.1364-2.6516-3.5355-2.6516-3.5355s-0.63135-0.88389-1.5152-0.88389c-0.88389,0-3.1567-0.3788-3.1567-1.0102,0-0.63134-0.37881-1.2627-0.12627-2.0203,0.25254-0.75762,2.0203-2.2728,2.2728-2.9042,0.25254-0.63135,0.37881-1.894,0.37881-1.894l-2.3991-1.6415-2.6516,0.12627s-0.25254-0.25253-0.25254-0.88388c0-0.63134,0.63135-2.7779,0.88388-3.283,0.25254-0.50507,0.50508-1.5152,0.63135-2.1466,0.12627-0.63134-0.25254-1.7678-0.75761-2.3991-0.50508-0.63135-1.5152-1.389-1.5152-1.389s-1.1364-0.50508-1.6415,0.12627c-0.50508,0.63134-1.1364,1.5152-1.1364,1.5152s-1.1364,0.12627-1.6415-0.25254c-0.50508-0.37881-0.88388-4.1669-0.88388-4.1669s-0.88389-1.2627-1.6415-1.389c-0.75762-0.12627-1.6415-0.12627-2.1466,0.50508-0.50507,0.63134-1.0102,1.0102-1.7678,1.5152-0.75762,0.50508-1.2627,1.1364-1.894,0.75762-0.63134-0.37881-1.389-0.75762-1.2627-1.389,0.12627-0.63135,0.75761-1.6415,0.88388-2.1466,0.12627-0.50507-1.7678-2.1466-1.7678-2.1466l-3.283-0.12627-1.1364-1.1364c-0.12627-0.75761,0.25254-2.5254,0.25254-2.5254l-1.389-1.5152-2.7779-4.0406-1.2627-1.894-3.1567-0.3788-1.1364-2.0203-0.25254-2.9042-1.2627-0.3788h-1.2627l-1.6415,0.63134-1.6415-1.0102-3.0304-0.63135-1.894,0.75762-0.37881,1.0102-0.12627,1.894,0.37881,1.894-0.25254,1.5152-0.50507,2.0203,0.75761,2.0203,0.50508,1.389,1.7678,1.5152,0.88389,0.88388,0.25254,1.894s-0.25254,1.0102-0.75762,1.389c-0.50507,0.37881-3.0305,1.2627-3.0305,1.2627s-2.3991,0.63134-2.9042,0.75761c-0.50508,0.12627-3.4093,0.75762-3.4093,0.75762l-1.389,1.5152-0.25254,1.6415,0.75762,2.5254,1.7678,3.283,1.6415,3.7881,0.75762,2.9042,2.0203,2.2728,1.2627,1.1364,2.1466,0.25254,2.2728,0.50507,1.7678,1.389,0.50507,1.6415,0.12627,1.894v2.3991l-1.894,1.6415-3.0305,1.2627-2.5254,1.2627-2.1466,2.0203-1.0102,1.7678-0.75761,2.1466-2.6516,1.6415-1.894,1.389-2.0203,1.5152-0.88388,0.88388v0.75762l0.88388,0.88388c0.50508,0.12627,2.1466,1.2627,2.1466,1.2627l1.894,1.0102s0.75762,0.88389,0.88389,1.389c0.12627,0.50508,0,1.5152-0.12627,2.1466-0.12627,0.63134-2.0203,3.6618-2.0203,3.6618l-1.894,1.6415-3.6618,2.0203-3.1567,0.63135-2.1466,1.0102s-0.75761,0.37881-1.1364,1.0102c-0.3788,0.63135-1.6415,1.2627-1.6415,1.2627l-2.2728,0.50507-1.0102,0.88388s-1.2627,0.88389-1.6415,1.389c-0.37881,0.50508-3.5355,2.9042-3.5355,2.9042l-0.88389,1.389s-0.75761,1.1364-1.389,1.2627c-0.63134,0.12627-2.2728,0.12627-2.2728,0.12627l-2.3991-0.88388-1.6415,1.389s-1.6415,0.37881-2.1466,0.88388c-0.50508,0.50508-2.7779,1.7678-2.7779,1.7678l-2.3991,0.63134s-1.894-0.25253-2.5254,0.12627c-0.63134,0.37881-1.2627,1.5152-1.2627,1.5152l0.63135,1.5152,0.25254,0.88388-0.88389,1.894s-1.0102,0.75762-1.0102,1.2627-0.88388,2.0203-0.88388,2.0203-0.50508,0.88388,0.25253,1.389c0.75762,0.50507,2.5254,0.88388,2.5254,0.88388s1.389-0.12627,1.5152,0.50508c0.12627,0.63134-1.1364,1.6415-1.1364,1.6415l-2.6516,0.75762-2.0203,1.2627-0.88389,1.6415z",
            "name": "Забайкальский край"
        },
        "am": {
            "path": "m692.32,397.46,4.6429-0.17857,2.3214-0.17858,3.5714-1.7857,2.6786,0.35714,3.5714,1.0714,2.1429,1.0714,2.6786,0.53571,4.4643-0.53571,3.0357,0,2.3214,0.53571,2.8571,2.1429,2.1429,0.89286,2.8571,0.35714,2.3214-1.7857,2.3214-0.71429,1.9643,0,2.1429,1.4286,2.1429,0.71429,2.5-0.71429,1.7857-1.9643,1.7857-1.25,4.1072,0,2.5-1.4286,2.1428-0.89286,3.75,0,1.4286,0,1.25-0.71429,0.53571-2.5,1.6071-1.0714,4.2857-2.3214,2.3214-0.89286,3.5714-1.9643,2.8572-1.4286,5-0.89286,3.0357,0,1.6071,1.4286l-0.37,3.2s-1.25,1.6071-1.9643,2.6786c-0.71429,1.0714-1.6072,2.6786-1.9643,3.3929-0.35714,0.71429-1.25,2.1429-1.25,2.1429s-0.53571,2.8571-0.71429,3.5714c-0.17857,0.71428-1.0714,2.8571-1.0714,2.8571s-1.25,1.7857-1.0714,2.5c0.17857,0.71428,1.25,1.25,1.25,1.25l0.89285,0.71428,3.2143-0.71428s1.7857-0.17857,2.6786-0.17857c0.89286,0,2.5,0.89285,2.5,0.89285l0.53572,1.9643,0.89285,2.6786s0.17857,0.53572,1.6072,0.53572,2.6786-1.4286,2.6786-1.4286l0.17857-2.3214s1.0714-0.89286,1.9643-0.89286c0.89286,0,2.5-0.53572,2.5-0.53572l1.25-2.1428,0.35715-2.5,1.9643-1.7857,2.3214,0.17857c0.71,0.19,3.03-1.6,3.03-1.6l1.4286-1.4286s0.89285-1.0714,1.9643-0.35714c1.0714,0.71428,2.3214,2.5,2.3214,2.5v2.8571l0.53572,1.6071,1.9643,1.7857s1.6071,0.71428,1.25,1.6071c-0.35714,0.89286-2.8571,1.9643-3.5714,1.9643-0.71428,0-3.5714,0.89285-3.5714,0.89285l-1.6071,0.17857-1.96,0.89s-0.71429,0.17857-0.17858,1.0714c0.53572,0.89286,1.9643,1.7857,1.9643,1.7857l1.25,0.89286,0.35714,1.9643-3.2143,2.3214-1.6072,3.0357-0.17857,2.1429-1.6071,2.3214-2.6786,0.89285-1.6071,1.4286,1.9643,1.9643,0.35714,1.7857-2.3214,2.3214-1.25,3.5714,1.6071,2.8571s3.5714,1.4286,4.2857,1.6072c0.71429,0.17857,4.8214,0.71428,4.8214,0.71428s1.4286,0.71429,1.9643,1.25c0.53571,0.53572,0.71428,3.2143,0.71428,3.2143l0.35715,2.5s0,0.53571,0.71428,1.0714c0.71429,0.53571,0,3.5714,0,3.5714l-0.71428,2.8571-0.53572,1.7857-1.25,1.7857-3.2143,0.35714-4.1072-0.17857-2.8571-1.4286-1.77-0.53-3.04,1.07h-3.3929-2.5l-3.2143,0.89286s-2.6786-0.35714-3.5714-0.53572c-0.89286-0.17857-3.5714-2.1428-3.5714-2.1428l-3.22-2.67-1.07-2.15-1.43-2.14-1.7857-1.0714-1.0714-1.9643s0-1.0714-0.71428-1.6072c-0.71429-0.53571-2.6786-0.71428-2.6786-0.71428l-0.89286-1.25-1.7857-2.8571-1.9643-2.5s-1.25-1.4286-1.9643-1.6072c-0.72-0.18-1.79-0.36-2.15-1.43-0.35715-1.0714-2.3214-2.6786-2.3214-2.6786l-2.8572-1.4286-2.6786-1.4286-3.0357-0.17857-2.6786-0.17858s-0.71429,0.89286-1.6072,1.0714c-0.89285,0.17857-4.4643-0.35714-4.4643-0.35714l-3.5714-1.25-2.3214,0.35714-1.9643,0.89286-1.6072,1.4286-3.75,0.71429s-3.2143,0.71428-3.3928,0c-0.17858-0.71429-2.8572-4.1072-2.8572-4.1072l-1.7857-1.4286h-1.6071l-1.0714-1.0714v-2.1428l2.1428-2.1429,0.17858-1.4286-0.89286-1.4286-1.25-0.89286-2.1429-0.17857s-0.71428,1.0714-0.71428,0,0.71428-3.3929,0.71428-3.3929l0.89286-2.3214-0.35714-1.9643-1.25-1.7857-1.7857-0.71428-1.25,0.71428-1.25,0.71429-1.25-0.17857s-0.35714-0.71429-0.35714-1.4286c0-0.71429-1.25-2.6786-1.25-2.6786l-0.71429-0.71428-1.7857-0.17857-0.89286,0.89285-1.4286,0.89286-2.5,0.53572s-0.35714-0.35715-0.17857-1.0714c0.17857-0.71429,0.71428-2.5,0.71428-2.5l-1.25-1.4286-0.51-0.52-1.79-0.18h-2.1429l-0.35714-1.0714v-2.1429z",
            "name": "Амурская область"
        },
        "ch": {
            "path": "M906.72,53.094c-0.34,0-0.66,0.094-0.66,0.094l-1.78,2.124-4.47,1.969s-6.05,2.853-7.12,3.031c-1.07,0.179-1.44,1.969-1.44,1.969s0.37,2.514,0.19,3.407c-0.18,0.892-1.44,1.406-1.44,1.406s-2.32,1.428-2.5,2.5c-0.18,1.071,0.91,2.156,0.91,2.156s2.66,0.906,3.37,0.906c0.72,0,2.85-0.375,3.56-0.375,0.72,0-0.34,1.625-0.34,1.625l-0.91,1.782-2.31-0.907-3.03-0.719s-2.14,0.554-3.03,0.376c-0.89-0.179-2.31-1.438-2.31-1.438l-2.69,0.531-2.88,0.375h-1.06s-0.53,2.656-1.25,2.656c-0.71,0-2.12,1.782-2.12,1.782l-3.41,0.187-2.84,2.875s-2.86,2.496-3.75,3.032c-0.9,0.535-1.61,0.531-2.5,0.531-0.9,0-2.5,1.062-2.5,1.062l-4.85,3.219-5.15,1.062-3.07,0.907s-1.04,2.861-1.93,3.219c-0.9,0.357-2.88,1.968-2.88,1.968l-3.22,1.938-2.12,1.966-2.16,3.03-1.25,1.97-1.06,2.5v3.22s-0.91,0.72-1.63,0.72c-0.71,0-2.84,1.25-2.84,1.25s-0.9,2.51-1.44,3.41c-0.53,0.89-2.85,1.76-3.56,2.12s0.34,1.25,0.34,1.25l2.35,0.53,0.53,2.16,2.69,0.53h2.65,3.75s1.44,1.07,1.97,1.78c0.54,0.72,1.63,1.78,1.63,1.78l-1.82,2.5-2.5,1.1-2.31-0.72s-1.6,1.25-2.31,1.25c-0.72,0-2.16,1.59-2.16,1.59s-1.42-0.71-2.31-1.25c-0.89-0.53-1.96,0-3.03,0s-1.26,1.26-1.44,1.97-0.87,2.84-0.87,2.84-1.09,1.79-1.63,2.5c-0.53,0.72-2.66,2.69-3.37,3.22-0.72,0.54-1.81,0.54-4.13,0.72s-1.07,1.26-1.25,2.16c-0.18,0.89-1.06,3.03-1.06,3.03s-2.15,1.24-2.69,2.31c-0.53,1.07-0.53,2.67-0.53,3.56,0,0.9,0.53,1.82,0.53,1.82h1.06l0.19-0.72,0.19-1.97,0.72-1.06,0.72,0.53,3.9,1.59,5,3.41,0.38,0.87-0.38,5.19-1.06,2.84-4.09,4.47-2.88,3.94-0.34,2.5,1.25,0.19h1.59s-0.17,1.42-0.53,2.31,0.34,1.59,0.34,1.59l2.88,1.25,3.75,0.38,4.62-0.19,2.69,3.41,2.16,1.78h4.47c1.25,0,1.06,2.5,1.06,2.5l1.06,1.59,3.94-0.34s5.36-1.44,6.25-1.44,3.2-0.53,3.56-1.25c0.36-0.71,2.69-1.59,2.69-1.59l1.97-0.91h3.75s2.66-1.24,3.37-1.59c0.72-0.36,0.74-1.98,1.1-2.69,0.35-0.71,0.87-3.03,0.87-3.03l1.25-2.5h1.63l1.78-1.06,1.06-1.63,1.44-0.34,2.31-1.44,1.06-1.25s0.91-0.89,1.63-1.78c0.71-0.89,0.87-1.6,1.4-2.31,0.54-0.72,2.51-1.44,3.22-1.97,0.72-0.54,2.15-2.14,2.5-3.03,0.36-0.9,1.63,0,1.63,0l4.09,0.68s3.22-1.04,5.72-1.93c2.5-0.9,1.08,1.06,0.91,1.78-0.18,0.71,0,3.2,0,4.09s0.88,3.22,1.78,4.47c0.89,1.25,3.9-1.44,3.9-1.44s3.05-1.78,3.94-2.5c0.89-0.71,3.94,0,3.94,0h6.06v-2.84c0-0.72,1.43-3.23,1.97-4.13,0.54-0.89,1.25-3.56,1.25-3.56l0.72-2.5-0.19-4.81s1.79-1.97,3.22-1.97,2.69,1.59,2.69,1.59l4.28,0.91,1.44-0.53s-0.19-3.22-0.19-3.94c0-0.71-0.19-2.84-0.19-2.84l-0.53-3.22s-0.54-2.51-0.72-3.41c-0.18-0.89-0.87-2.12-0.87-2.12l-2.5-1.63,1.25-0.87,4.09-0.38s1.96-2.66,2.5-3.37c0.54-0.72,2.84-2.35,2.84-2.35v-2.5s-1.04-2.13-1.93-3.03c-0.9-0.89-2.35,0.18-3.07,0.53-0.71,0.36-3.03-0.34-3.03-0.34s-1.41-0.88-2.12-0.34c-0.72,0.53-1.63,1.06-1.63,1.06l-1.4-1.06-1.97,1.78-1.44-0.72s-2.84-1.79-4.09-1.25c-1.25,0.53-1.97-0.72-1.97-0.72h-2.5s-0.56,1.25-1.1,1.97c-0.53,0.71-3.03,0.87-3.03,0.87l-2.84,0.91-2.69,3.75-2.69,0.53,1.25-2.5,0.19-1.59-3.03-0.38s2.13-0.88,2.84-1.06c0.72-0.18,3.41-1.06,3.41-1.06l1.97-0.91,0.34-1.59s1.78-3.41,1.78-4.13c0-0.71-0.68-3.22-0.68-3.22l-0.91-2.31s-2.5-4.63-3.22-5.34c-0.71-0.72-1.05-1.78-2.12-1.78-1.08,0-3.07,0.68-3.07,0.68l-1.4,0.91-1.25-1.06s-2.17-1.98-3.6-2.159c-1.42-0.178,0.38-0.719,0.38-0.719l0.87-1.593s-0.16-1.973,0.38-2.688c0.53-0.714,1.97,1.25,1.97,1.25s2.67,1.438,3.56,1.438,1.78,0.531,1.78,0.531,3.41-0.371,4.13-0.906c0.71-0.536,0.68-2.313,0.68-2.313l0.19-2.687,0.72-1.25,1.25-1.782s0.36-1.964,1.25-2.5c0.89-0.535,1.79,0,2.69,0,0.89,0,2.31,1.626,2.31,1.626l1.59,0.718,2.5-1.437s1.28-2.139,1.82-3.031c0.53-0.893,2.84-1.782,2.84-1.782l2.84-2.156,1.44-3.219s2.14-1.973,2.5-2.687c0.36-0.715-0.34-1.782-1.59-1.782h-1.78l-1.82-1.062-1.93-0.188-3.07-1.781-3.18-0.187h-3.75c-0.9,0,0-0.875,0-0.875l2.5-1.625,0.68-2.5-1.06-1.25-2.5-0.532,1.78-1.25,0.53-1.25-2.31-0.531v-2.5s-0.35-1.785-0.53-2.5c-0.09-0.357-0.45-0.437-0.78-0.437zm-77.19,16.062c-0.22-0.01-0.48,0.081-0.78,0.282-1.61,1.071-3.94,2.312-3.94,2.312-1.07,0.357-1.79,1.42-1.97,2.312-0.17,0.893-0.53,2.88-0.53,3.594,0,0.715,0.2,2.496,1.1,3.032,0.89,0.535,3.03,1.598,3.03,2.312s-0.56,2.321,0.15,2.5c0.72,0.179,1.44-0.522,1.97-1.594,0.54-1.071,0.36-3.419,0.72-4.312s1.45-2.491,1.63-3.563c0.17-1.071-0.19-5.187-0.19-5.187s-0.24-1.644-1.19-1.688z",
            "name": "Чукотский автономный округ"
        },
        "ha": {
            "path": "m809.82,276.93c0.53572-0.71428,1.4286-1.4286,1.9643-2.3214,0.53571-0.89285,1.7857-2.5,1.7857-2.5s1.7857-0.17857,4.1072,0.17858c2.3214,0.35714,4.4643,1.4286,5.7143,2.1428,1.25,0.71429,2.6786,1.25,3.0357,2.3214,0.35714,1.0714,1.6071,2.1429,1.6071,3.3929s-1.4286,3.5714-1.4286,4.2857c0,0.71429-0.17857,2.5,0.71428,3.3929,0.89286,0.89286,0.71429,1.6071,1.7857,1.4286,1.0714-0.17857,3.9286-1.0714,5-1.25,1.0714-0.17857,3.3929,0,5,0.53572,1.6071,0.53571,2.8571,0.89285,3.2143,1.6071,0.35715,0.71428,1.0714,1.4286,0.89286,2.5-0.17857,1.0714-2.5,2.8571-2.5,2.8571l0.17857,1.4286,0.89286,1.6072s1.6071,0.71428-0.35714,0.89285c-1.9643,0.17857-3.0357-0.71428-3.0357-0.71428s0.17857-0.17857,0-1.0714c-0.17857-0.89286-0.71428-1.7857-1.7857-1.4286-1.0714,0.35714-2.3214,1.9643-3.0357,2.5-0.71428,0.53571-2.8571,3.0357-2.8571,3.0357s-1.9643,0.71429-2.8571,1.7857c-0.89286,1.0714-4.1071,4.6428-4.1071,4.6428s-0.17858,1.25-1.0714,2.5c-0.89286,1.25-2.3214,2.3214-2.5,3.5714-0.17857,1.25,0,4.1071,0,4.1071s1.4286,1.0714,1.6071,2.3214c0.17857,1.25-0.89286,1.9643-1.25,2.8572-0.35714,0.89285-1.4286,0.53571-1.4286,1.7857s0.17857,5.7143,0.17857,5.7143l-0.35714,4.8214-0.35715,4.1072s-1.0714,1.9643-1.25,3.2143c-0.17857,1.25-0.35714,2.6786-0.35714,3.3929,0,0.71429-0.17857,3.0357-0.17857,3.75,0,0.71429-0.71429,1.9643-0.89286,2.6786-0.17857,0.71429-1.0714,1.25-0.17857,1.9643,0.89286,0.71428,1.9643,1.9643,1.9643,1.9643l-1.7857,3.3929-0.17857,1.9643-1.7857,3.3928-1.25,3.75-0.35715,4.1072-0.71428,1.6071-3.2143,4.1071,0.35715,2.6786s2.1428,1.0714,2.8571,1.0714c0.71428,0,3.3929,0.53572,4.4643-0.17857s2.5-1.4286,3.2143-1.7857c0.71429-0.35715,1.6071-0.89286,2.8571,0.35714s2.5,4.4643,2.5,4.4643,0.17857,1.4286,1.4286,1.0714c1.25-0.35714,1.9643-2.1428,1.9643-2.1428l-1.0714-2.1429,0.53572-2.6786-0.53572-1.7857-1.6071-2.5s-1.7857-1.4286-2.5-1.4286c-0.71429,0-3.75,1.4286-3.75,1.4286s-1.9643,2.3214-1.6071,1.4286c0.35714-0.89285,1.9643-3.3928,1.9643-3.3928l1.6071-0.35715,1.25-1.7857s0.89286-0.71429,1.9643-0.71429,3.2143-1.25,3.2143-1.25,1.25-2.6786,1.0714-0.89285c-0.12,1.78-1.72,4.28-1.72,4.28l1.0714,2.1429,1.9643,2.1429,0.53572,1.7857-0.17857,2.6786,2.3214,1.4286v1.6072,2.8571l1.7857-0.71429c0.71429-0.71428,2.1429-4.2857,2.1429-4.2857l0.89285-3.2143v-2.1428s-1.6071-1.7857-0.89285-1.9643c0.71428-0.17857,4.6428-2.1429,4.6428-2.1429s2.1429-0.53571,3.0357-0.53571c0.89286,0,4.1071,0.17857,4.8214,0.35714,0.71428,0.17857,4.4643,1.6071,4.4643,1.6071s4.4643,1.25,5.1786,1.25c0.71429,0,1.9643,1.7857,1.9643,1.7857s-0.89286,1.9643,0.53571,2.8571c1.4286,0.89286,4.8214,3.0357,4.8214,3.0357l3.75,2.1428s1.4286,3.3929,1.4286,4.2857c0,0.89285-0.17857,4.6428-0.17857,5.7143,0,1.0714,0,5,0.53572,5.7143,0.53571,0.71428,1.0714,2.3214,2.1428,3.2143,1.0714,0.89286,3.2143,4.2857,3.2143,4.2857l2.5,1.25,3.0357,6.9643s1.4286,1.4286,1.6072,2.3214c0.17857,0.89286,1.6071,3.0357,1.7857,3.75,0.17857,0.71429,1.6071,5,1.7857,5.7143,0.17857,0.71428-0.53572,8.5714-0.53572,8.5714l0.53572,3.3928s0,1.25-0.89286,1.9643c-0.89286,0.71429-3.5714,1.6071-3.5714,1.6071l-1.4286,0.17857-1.4286-1.7857-0.53572-2.6786-3.0357-3.0357s-1.9643-1.25-2.6786-0.71428c-0.71429,0.53571-2.3214,1.9643-2.3214,1.9643s-0.89286,1.7857-1.25,2.5c-0.35714,0.71429-1.4286,1.25-0.89286,2.3214,0.53572,1.0714,1.9643,2.6786,1.9643,2.6786s0.35714-0.71428,2.1428-0.53571c1.79,0.18,2.14,2.68,2.14,2.68l-0.89286,3.2143s-1.9643,1.25-2.6786,1.6071c-0.71428,0.35714-2.8571,1.25-1.7857,2.1429,1.0714,0.89285,2.3214,1.25,2.3214,1.25s0.71428,1.25,0,1.9643c-0.71429,0.71429-2.3214,2.1429-2.3214,2.1429s-1.7857,0.35714-3.0357,1.25-3.2143,1.4286-4.2857,1.6071c-1.0714,0.17857-2.8571,1.25-4.1071,0s-2.1429-0.89285-2.5,0.17857c-0.35715,1.0714-1.6072,0.89286-1.7857,1.9643-0.17857,1.0714,0,2.8571,0.35715,3.5714,0.35714,0.71428,0,3.0357,0,3.0357s-2.3214,1.9643-2.5,1.25c-0.17858-0.71428,0.17857-2.3214-0.35715-3.2143-0.53571-0.89286-2.3214-2.5-2.3214-2.5s-2.8571-1.4286-1.7857-2.3214c1.0714-0.89286,2.8571-2.6786,3.2143-3.2143,0.35714-0.53571,0.35714-3.0357,0.35714-3.0357s-2.1429-0.89286-2.6786-1.7857c-0.53572-0.89285-1.0714-3.3928-1.0714-4.1071,0-0.71428-0.71429-3.3929,0.17857-3.75,0.89286-0.35714,2.8571-1.9643,2.8571-1.9643l0.53572-1.9643s-0.53572-0.35714-2.1429-0.35714c-1.6071,0-2.5-0.17857-3.9286,0.89285s-1.4286,1.0714-2.5,2.5-2.1429,2.6786-3.2143,3.2143c-1.0714,0.53571-2.6786,0.71429-2.6786,0.71429s-4.1071-0.71429-4.2857-1.4286c-0.17857-0.71428-1.6072-1.9643-2.5-1.9643-0.89286,0-2.1429,0.35714-3.2143,0.89286-1.06,0.55-1.95,0.73-2.84,0.73-0.89286,0-4.2857,1.0714-4.2857,1.0714s-2.1428,1.7857-3.2143,1.7857c-1.0714,0-2.1014,0.40945-2.28-0.66198-0.17857-1.0714-1.0823-3.4216-1.0823-3.4216l-1.5332-4.3507s-2.6677-0.69261-3.7392-0.87119c-1.0714-0.17857-3.8221-0.85138-3.8221-0.85138l-2.4892-1.1525s-2.1249-2.2078-1.7678-2.9221c0.35714-0.71428,1.7028-4.0044,2.4171-4.5401,0.71428-0.53572,1.2608-1.4069,1.2608-1.4069l-1.25-2.3214s-1.7965-1.2085-0.90368-1.7442c0.89286-0.53571,3.7608-2.0058,3.7608-2.0058l2.0906-4.0892,1.5025-3.2341,3.5498-2.6767-0.89285-1.9643-2.4171-1.7118-0.11357-1.6288,2.5306-1.1237,4.1071-0.71428,2.6786-0.89286,1.0714-1.25-0.53571-1.6071-1.986-1.47-1.0083-2.5108-0.0631-2.4477-1.47-2.0058-1.7226-0.67282-2.2583,1.7442s-1.6703,1.0823-2.3846,1.4394c-0.73,0.34-2.87,0.19-2.87,0.19l-2.3214,1.25-0.44008,2.5-0.80992,2.3214-2.5,1.0714-2.1429,0.53571-0.53571,2.4585-1.4809,1.4286-2.3431-0.17857-0.99746-2.4585-1.0714-2.5s-1.2608-0.51404-1.9751-0.69262c-0.71428-0.17857-4.4534,0.51405-4.4534,0.51405l-1.7857-0.17857-1.7857-1.25,1.9643-5.5357,0.89286-4.1072s1.25-2.3214,1.9643-3.0357c0.71428-0.71429,3.0357-5,3.0357-5l0.35714-2.6786s-0.53571-1.25-1.6071-1.6072c-1.0714-0.35714-5.3571,0.17858-5.3571,0.17858l-2.6786,0.53571s-3.3424,2.5325-4.0567,1.8182c-0.71428-0.71429-1.1219-3.9611-1.1219-3.9611s-3.0376-1.6288-3.0376-2.5217c0-0.89286,1.9662-1.5855,1.9662-1.5855s0.53571-1.0714,0.71428-2.1429c0.17857-1.0714-0.20024-2.8138-0.20024-2.8138l-2.6281-0.77741s-1.4069-0.89472-2.1212-1.0733c-0.71428-0.17857,1.1996-2.2998,1.1996-2.2998l0.89286-1.6072-0.35714-1.0714s-2.2493-0.54655-2.2493-1.2608c0-0.71429,1.6505-3.3604,1.6505-3.3604l-1.5873-1.6703-2.5415-0.82971-0.80806-1.618s0.69262-0.73594,1.5855-1.0931c0.89286-0.35714,1.0498-0.61866,1.0498-0.61866l-1.3852-0.89286v-2.4062c0-0.71429-0.074-2.3304-0.074-2.3304s-1.2718-1.1078-1.4502-2.345c-0.1894-1.3131,2.6371-1.7532,2.6371-1.7532l-0.93619-0.82972-0.49238-1.4917,0.2417-2.1339,2.7525-0.86037,2.9094-0.89285,2.4477,0.1371,0.70345-1.8922,3.2034,0.21106,2.9203,0.0108s0.35715-1.7749,0.35715-2.4892c0-0.71428-1.8705-1.618-1.4286-2.2691,0.40112-0.59101,1.5657-0.89285,2.4585-1.0714,0.89286-0.17858,3.9286-0.71429,4.1072-1.4286,0.17857-0.71428,2.5829-6.1562,2.5829-6.1562s0.96683-1.0083,1.6811-1.1869c0.71429-0.17857,3.9286-0.93432,3.9286-0.93432l-1.764-2.794-3.0051-2.8246-1.6378-4.8539-2.3214-2.1428-1.4286-1.7857v-5.3571l3.0357-6.7857-1.0714-3.2143-0.72512-5.8585,0.81889-2.85s3.5498,0.11543,4.264,0.29401c0.71428,0.17857,7.7634,0.22004,7.7634,0.22004s0.95599-4.0152,1.3131-4.7295c0.35714-0.71428,1.3871-0.826,2.28-1.0046,0.89286-0.17857,3.3495-0.62051,3.3495-0.62051l2.5433,1.1562,1.6071-1.0714z",
            "name": "Хабаровский край"
        },
        "eu": {
            "path": "m811.96,462.82c0.98214,1.875,1.1607,1.875,1.875,2.5893l2.6786,2.6786s0.80357,1.1607,1.0714,1.7857c0.26786,0.625-0.0893,1.6964,0.625,1.9643,0.71429,0.26785,2.3214,0.53571,2.7679,0.625,0.44643,0.0893,1.4286,1.0714,2.3214,1.1607,0.89285,0.0893,1.6071,0.0893,2.1428-0.35714,0.53572-0.44643,1.0714-1.25,1.6964-1.7857,0.625-0.53571,2.5893-1.4286,3.125-1.6964,0.53572-0.26785,1.875-0.625,2.3214-1.0714,0.44643-0.44643,1.1607-0.98215,1.1607-2.0536s0.26785-2.7678,0.71428-3.125c0.44643-0.35714,2.9464-1.9643,3.5714-2.5,0.625-0.53571,1.6964-2.2321,2.1429-2.8571,0.44643-0.625,1.875-2.6786,2.2321-3.2143,0.35714-0.53572,2.1429-2.0536,2.1429-2.0536l2.0536-2.3214,0.98214-1.0714,2.6786-1.875,0.71429-0.80357,0.17857-1.1607,0.0893-0.35714-1.5179-0.17857-1.875-0.0893-1.6964,0.44643-1.6964,1.1607-1.3393,1.25-0.80358,1.0714-1.25,1.6072-1.4286,0.98214-1.7857,0.625s-1.25,0.17857-1.7857,0c-0.53571-0.17857-2.1428-0.71429-2.1428-0.71429l-1.4286-0.625-0.80358-0.98214-0.89285-0.625s-0.80357-0.26786-1.1607-0.17857c-0.35714,0.0893-1.7857,0.625-1.7857,0.625l-2.0536,0.71429-2.4107,0.17857s-1.0714,0.44643-1.7857,0.625c-0.71429,0.17857-2.4107,0.80357-2.4107,0.80357l-1.4286,0.89285-1.875,0.26786-0.80357,0.17857-0.35714,0.98215-0.0893,1.4286s-0.44643,1.1607-0.44643,1.5178c0,0.35715-0.53571,1.875-0.53571,1.875l-0.53571,1.1607-0.71429,1.4286z",
            "name": "Еврейская автономная область"
        },
        "pr": {
            "path": "m852.68,473.71c0,0.53571,0.53571,1.25,0.53571,1.25l1.4286,1.4286s0.35715,1.0714,0.44643,1.4286c0.0893,0.35714-0.625,2.0536-0.625,2.0536l-1.1607,2.7679s-0.0893,2.2321,0,2.5893c0.0893,0.35715,0.625,1.0714,0.89285,1.5179,0.26786,0.44643,0.80358,1.1607,0.80358,1.5179,0,0.35714-0.80358,1.9643-0.80358,1.9643v1.9643c0,0.44643-0.44642,1.9643-0.44642,1.9643s-0.17858,0.0893-0.17858,1.0714v2.7679c0,0.71429-0.26785,3.0357-0.35714,3.3929-0.0893,0.35714-1.9643,0.53571-2.3214,0.53571-0.35714,0-1.3393-0.98214-1.3393-0.98214s-0.98215-1.6071-1.1607-2.0536c-0.17857-0.44643-1.3393-1.5179-1.3393-1.875,0-0.35715-0.26786-1.6072-0.89286-1.7857-0.625-0.17857-1.5179,0.26786-1.5179,0.26786s-0.53571,0.89286-0.625,1.25c-0.0893,0.35714,0,0.98214-0.0893,1.4286-0.0893,0.44643-0.71429,2.5-0.71429,2.5s-0.625,0.625-1.1607,0.89286c-0.53572,0.26786-2.2322,1.0714-2.2322,1.6071,0,0.53572,1.0714,0.71429,2.1429,2.0536,1.0714,1.3393,3.125,4.6429,3.125,4.6429l2.5,4.2857,1.4286,4.9107s0.44643,1.6071,0.625,2.1429c0.17857,0.53571,0.89286,1.1607,0.98215,1.9643,0.0893,0.80357,0.53571,2.5-0.35715,2.8571-0.89285,0.35715-4.0178,1.0714-4.0178,1.0714l-0.71429,0.625,1.1607,0.71429s0.625,0.44643,1.0714,0.53571c0.44643,0.0893,0.53572,1.4286,0.98215,1.4286,0.44642,0,1.875-0.35714,2.4107-0.71428,0.53571-0.35714,1.3393-0.625,2.1429-0.625,0.80357,0,1.4286-0.44643,1.4286-1.0714,0-0.625-0.625-3.3929-0.625-3.8393,0-0.44642,1.5179-2.5893,1.5179-2.5893v-2.1429c0-0.35714-0.17858-1.4286,0.35714-1.5179,0.53571-0.0893,2.9464-0.71428,2.9464-0.71428s0-1.1607,1.0714-0.26786c1.0714,0.89286,1.5178,2.9464,1.5178,2.9464s1.875,0.35714,2.2322,0.17857c0.35714-0.17857,0.98214-0.625,1.5178-0.98214,0.53572-0.35714,2.5893-0.53572,3.3929-0.53572,0.80357,0,2.1429-0.44642,2.1429-0.44642l-0.26786-1.1607s2.0536-1.25,2.5-1.5179c0.44643-0.26785,2.2321-1.1607,2.8571-1.7857s1.5179-1.4286,1.9643-2.4107c0.44643-0.98215,1.3393-3.125,1.5179-3.4822,0.17857-0.35714,1.1607-2.5,1.4286-3.2143,0.26785-0.71429,0.89285-2.3214,1.3393-3.125,0.44643-0.80357,1.5179-2.8572,1.5179-2.8572s-0.0893-2.3214-0.0893-2.8571c0-0.53571-0.26785-1.875-0.625-2.8571-0.35714-0.98214-0.53571-1.1607-0.44642-2.1429,0.0893-0.98214,0.98214-1.6071,1.6071-2.0536,0.625-0.44643,1.0714-1.4286,1.0714-1.9643,0-0.53571-1.25-2.9464-1.25-2.9464s0.0893-1.1607,0.35714-1.6964c0.26786-0.53572,1.5179-1.7857,1.5179-1.7857l0.17857-2.9464s0.80357-2.2321,0.80357-2.6786c0-0.44643,0.26786-3.9286,0.26786-3.9286l0.89285-2.1429s0.26786-3.3928,0.26786-3.9286c0-0.53571-0.53571-5-0.53571-5.5357,0-0.53572-0.17857-4.1071-0.17857-4.7321s-0.71429-2.1429-0.71429-2.5893c0-0.44643,0.0893-2.1429,0.26786-2.5893,0.17857-0.44643,0.98214-1.9643,0.98214-1.9643s-0.0893-2.0536-0.0893-2.5893c0-0.53571,0.17858-1.6964-0.44642-1.7857s-2.3214,0.80357-2.3214,0.80357l-1.7857,0.71429-1.5178,0.17857-0.71429-0.44643-1.0714-1.4286s-0.26786-1.4286-0.26786-1.7857c0-0.35714-0.53571-1.1607-0.53571-1.1607l-1.25-1.3393-1.3393-1.3393-1.4286-0.71429-1.0714,0.17857s-0.98214,0.17858-1.0714,0.53572c-0.0893,0.35714-0.53572,0.44643-0.80358,0.80357-0.26785,0.35714-1.1607,1.3393-1.1607,1.3393l-0.53571,1.0714-0.44643,1.0714-0.80357,0.80357-0.17858,0.71429,0.35715,0.80357,0.89285,0.98214s0,0.71429,0.53572,0.80358c0.53571,0.0893,1.0714,0.0893,1.0714,0.0893h1.3393l1.25,0.625,0.71429,0.80357,0.0893,1.3393-0.26785,1.4286-0.44643,1.25-0.53572,0.71429-1.5178,0.89285-1.7857,0.89286-0.89285,0.89286,0.26785,0.80357,1.9643,0.80357,0.80357,0.98214-0.0893,0.71429-0.80357,1.0714-1.0714,1.0714-1.875,0.89286-1.7857,0.98214-3.64,1.44-1.6964,0.44643-1.9643,0.26786-0.89286-0.44643-1.25-0.71429s-0.53571-0.26786-0.89285,0c-0.35715,0.26786-0.625,0.98214-0.625,0.98214l-1.5179,1.0714-0.53571,1.6964,0.0893,1.3393s0.35714,0.71428,0.44643,1.1607c0.08,0.44,0.08,1.33,0.08,1.33l-0.0893,1.6071-0.98214,1.0714z",
            "name": "Приморский край"
        },
        "ma": {
            "path": "m859.64,182.46s1.0714,0.71428,2.1429,1.25c1.0714,0.53571,3.0357,2.1429,3.2143,2.8571,0.17857,0.71429,0.17857,2.3214,1.0714,2.8571,0.89286,0.53572,3.5714,1.0714,3.5714,1.0714l1.9643,0.89286,1.0714,1.7857,3.0357,1.6072s0.71429,1.0714,0.17857,1.9643c-0.53571,0.89286,0,2.6786,0,2.6786l2.5-0.35714,2.8572,0.35714,1.6071,2.3214,1.9643,2.6786,2.1429,1.0714,1.9643,2.1429,1.0714,1.9643,0.17857,2.5s-0.35715,2.5,0,3.2143c0.35714,0.71429,1.0714,3.75,1.0714,3.75l1.0714,1.7857s0.53572,1.0714,0.53572,1.7857c0,0.71428-0.89286,2.1429-0.89286,2.1429l0.17857,1.7857-1.9643-0.53571-0.35715-1.9643s0.35715-0.71429-0.53571-0.35714c-0.89286,0.35714-1.7857,1.4286-1.7857,1.4286s-0.35715,0.89286-1.0714-0.53572c-0.71429-1.4286-1.7857-1.9643-1.7857-1.9643s-1.6071-0.71429-1.6071-1.9643-1.7857-2.3214-1.7857-2.3214l-1.6072-1.4286s-0.35714,1.7857-0.35714,2.5c0,0.71429,1.4286,1.4286-0.35714,1.4286s-4.1072,0.71429-4.1072,0.71429l-0.89285,1.0714-0.35715,2.6786-1.25,1.25-2.6786,2.8571-0.35714,2.3214-1.0714,1.9643,0.53572,2.3214,1.4286,1.4286s0.53571,0.71428,0.53571,1.4286v2.6786l0.17857,1.6071,1.6072,1.4286,0.17857,4.4643v4.4643l0.17857,3.0357,1.7857,2.6786,1.0714,3.0357,0.35714,0.89285,1.9643,0.35715,1.0714-1.25,1.9643-1.0714s1.6072-0.17857,2.3214-0.17857c0.71429,0,1.6072,0.89285,1.6072,0.89285l0.17857,0.89286-1.7857,1.4286-1.7857,0.71429v1.0714l-0.71429,0.89285-1.7857,0.89286-1.25,0.53571-0.53572,0.71429-0.17857,2.6786v2.3214l-0.89285,0.71429-1.7857-0.89286-0.71428,1.4286-0.53572,2.5-1.0714,1.25-3.2143,0.71429-1.25-0.17858-0.53572-1.6071,2.5-1.6071,1.25-1.9643s1.9643-1.7857,0.53572-1.7857-2.6786,1.0714-2.6786,1.0714l-0.89286,1.25-0.89286,0.53571s-0.89286,0.35714-1.7857-0.17857c-0.89286-0.53571-2.3214-0.71429-2.3214-0.71429s-1.25,0.89286-1.25,1.4286c0,0.53571,0.35714,1.4286-0.53572,1.4286-0.89285,0-3.2143,0.17857-3.2143,0.17857l-2.5,1.6071-2.5,0.89286-1.0714,2.1429,0.35714,1.7857,0.53572,1.9643,0.35714,0.89285,1.6071,1.0714s0.17857,0.89286-1.7857,0.89286h-4.4643l-1.0714,2.1429-1.0714,1.25-2.5,0.35714-2.1429-2.8571-2.6786-1.25s-1.9643-0.71429-2.6786-0.71429c-0.71429,0-3.3929,0.17857-3.3929,0.17857l-2.1429,0.89286-1.7857,0.17857-1.25-0.89286-1.0714-1.7857-0.17857-2.3214,1.25-1.9643,0.17857-2.5-2.5-3.9286-2.3214-1.4286-2.3214-1.25-2.6786-0.71428-2.6786-0.71429-2.1429,0.71429-1.0714,1.4286-1.0714,1.9643-0.89285,1.25h-1.25l-1.25-1.9643-0.17857-0.89286,1.25-0.71429,0.35714-1.4286v-1.25l-1.25-1.25-5.7143-6.7857s-0.35714-1.0714-0.35714-1.7857v-3.2143l-1.78-0.88-0.89286-0.35714-0.17857-3.0357-0.53572-1.4286-1.0714-0.35714-0.35714-1.25,1.6071-1.4286,2.1429-0.17857,1.0714-0.53572,1.0714-1.0714,2.1429-0.17857,1.9643,0.17857,0.53572-1.0714-1.25-1.9643-1.4286-1.25-0.35714-2.1429s1.25-0.53571,1.9643-0.53571c0.71428,0,3.5714-1.0714,3.5714-1.0714l-0.17858-2.6786s0.53572-0.35714,1.25-0.35714c0.71429,0,3.9286,0.35714,3.9286,0.35714l2.1428-1.7857,4.1072-6.4286-0.17858-3.0357-1.4286-1.4286-2.6786-2.8572s-1.25-0.89285-1.4286-1.6071c-0.17857-0.71428-0.35714-1.7857-0.35714-1.7857l2.1428-2.3214,0.17858-1.6071-1.25-1.25-2.5,0.17857-0.71429-0.53572-1.0714-1.0714v-0.71429l3.06-0.86,1.25-1.0714-0.53572-1.4286-1.25-0.89285-0.17857-1.6072,2.1429-3.0357,3.75-1.25,2.1428-1.25-1.25-2.5s0.17858-0.35714,0.89286-0.35714c0.71429,0,3.3929,0.71428,3.3929,0.71428l1.0714-0.17857-0.53572-3.5714v-1.6071l1.4286-0.53572,0.2-2.66-0.17858-0.53571h2.5l1.6072,0.53571,0.53571,1.9643,1.0714,1.0714s0.53571,0.53571,1.25,0.53571,3.75-0.71428,3.75-0.71428l3.5714-0.71429,2.3214-0.35714,2.6786-1.0714,2.3214-1.4286,2.3214-0.89286,1.9643-0.17857,2.8571-0.35714,2.5-1.6072z",
            "name": "Магаданская область"
        },
        "sh": {
            "path": "M973.16,321.59c-0.45,0.19-0.81,0.37-1.19,0.94s-0.31,1.53-0.5,1.85c-0.19,0.31-1.53,1.12-1.53,1.12-0.51,0.51-0.87,1.06-2,1.25-1.14,0.19-2.59-0.23-2.85,0.66-0.25,0.88,0.06,2.12,0.69,2.25,0.63,0.12,1.53,0.44,2.1,0.25,0.56-0.19,1.56-1.25,1.56-1.25s0.62,0.3,1,0.93c0.38,0.64,0.97,1.78,0.97,2.03,0,0.26,0.19,1.06-0.07,1.57-0.25,0.5-0.81,2.78-0.56,3.03s1.24,0.9,1.94,0.9c0.69,0,1.09,0.17,1.78-0.78,0.69-0.94,0.93-1.74,1.25-2.56s0.78-1.9,1.09-2.16c0.32-0.25,0.48-1.02-0.22-1.65-0.69-0.63-0.93-1.75-1-2.06-0.06-0.32-0.56-1.09-0.24-1.53,0.31-0.45,1.12-1.31,1-1.69-0.13-0.38-1.38-1.09-1.82-1.47s-0.96-1.82-1.4-1.63zm2.15,20.44s-0.43,0.15-0.69,0.85c-0.25,0.69-0.5,1.74-0.31,2.31s0.56,1.4,0.81,1.78c0.26,0.38,0.75,1.31,0.88,1.62,0.13,0.32,0.53,0.72,1.03,0.91,0.51,0.19,1.12,0.07,1.25-0.44,0.13-0.5,0.19-1.4,0.19-2.03s-0.19-2.15-0.19-2.53,0.07-0.87-0.31-1.31-2.66-1.16-2.66-1.16zm2.53,9.22c-0.56,0.19-1.9,0.5-2.15,0.69-0.26,0.19-0.63,0.52-0.5,1.03,0.12,0.5-0.2,1.24,0.5,1.69,0.69,0.44,2.15,0.96,2.53,1.09s0.55,0.44,1.19,0.13c0.63-0.32,1.09-0.59,1.03-1.41-0.07-0.82-0.59-1.62-0.78-1.88-0.19-0.25-1.5-1.34-1.5-1.34h-0.32zm-117,4.5l-1.87,1.25s0.5,1.12,0,1.12h-1.78s-1.26,0.78-0.5,1.29c0.76,0.5,2.4,0.87,3.03,1,0.63,0.12,1.52,0.65,2.16,1.15,0.63,0.51,1.49,0.87,1.74,1.63,0.26,0.76,0.63,2.28,0.63,2.28l0.91,1.62-0.54,2.16-1.74,0.13s-0.91-1.14-1.41-0.13c-0.51,1.01-0.5,1.77-0.5,2.41,0,0.63,0.27,1.24,0.91,1.37,0.63,0.13,1.48,0.4,2.74,1.41,1.27,1.01,2.03,2.9,2.29,3.53,0.25,0.63,0.24,2.65,0.5,3.41,0.25,0.75,1.4,2.02,2.03,2.53,0.63,0.5,2.03,2.52,2.28,3.03,0.25,0.5,1.25,2.4,1.5,2.9,0.25,0.51,1.78,1.75,1.78,1.75s1.24,1.15,2,1.66,3.8,1.37,4.56,1.37,3.03,0.66,3.28,1.16c0.26,0.51,2.78,5.66,2.78,5.66l5.57,8.34s2.52,2.15,3.15,2.66c0.64,0.5,2.4,3.9,2.91,4.65,0.51,0.76,2.12,4.44,2.5,4.94,0.38,0.51,3.69,5.06,3.69,5.06s2.77,1.88,3.4,2c0.64,0.13,3.41,1.91,3.41,1.91s2.65,2.9,2.78,3.41c0.13,0.5,0.75,3.53,0.75,3.53l2.16,3.4,3.15,2.66,2.5,5.19,0.53,2.25s0,2.15,0.5,2.53c0.51,0.38,5.29,4.06,5.29,4.06l1.65,0.88,1.78,0.25v-2.54s-0.9-1.65-1.15-2.15c-0.26-0.51-0.88-3.03-0.88-3.03s-0.5-0.74-0.5-1.63c0-0.88,0.75-2.4,0.75-2.4s1.53-0.25,2.16-0.25,1.24-0.12,2.25-0.63c1.01-0.5,2.41-0.37,2.41-0.37l2.28,2,1.37,0.78s0.5-1.4,0.5-2.03c0-0.64,0.01-1.53-0.62-2.41-0.64-0.88-1.63-1.88-1.63-1.88l-2.03-1.65s-0.99-1.38-1.75-1.25-1.15,0.24-1.41,0.75c-0.25,0.5,1.52,2.66,0,2.28-1.51-0.38-2.4-0.9-2.78-1.41-0.38-0.5-1.62-1.87-1.62-1.87s-2.4-1.28-3.03-1.53c-0.64-0.26-2.4-0.88-3.04-0.88-0.63,0-4.06-1.15-4.06-1.15l-2.12-2.38-2.41-6.31s-1.12-1.65-1.25-2.41-1.03-3.15-1.16-3.65c-0.12-0.51-0.37-2.28-0.62-2.78-0.25-0.51-1-2.29-1-2.29l-0.53-3.28,1.78-1.62s2.77-1.03,3.41-1.03c0.63,0,5.06-0.13,5.06-0.13l2.4,0.63s2,0.25,2.5,0.25c0.51,0,1.03,0.51,1.16-0.5s-1.53-2-1.53-2l-3.53-0.53-3.66-1.26-2.4-1.78-18.57-15.25-1.5-1.28-1.78-0.12s-0.87,0.13-1.25-0.63-0.4-1.27-1.15-1.9c-0.76-0.64-2.5-1.88-2.5-1.88s-1.52-0.25-2.66-0.5-3.66-1.4-3.66-1.4l-0.4-2.79-1.38-1.25-0.62-1.28,1.25-1.62-0.25-1.91-2.53-2.12-3.54-0.79s-2.4-0.99-2.65-1.5c-0.25-0.5,0.12-2.15,0.12-2.15s-0.62-1.12-1.12-1.5c-0.51-0.38-4.28-1.91-4.28-1.91l-2.91-1.9-1.03-2.63s0.01-1.91-0.63-1.91c-0.63,0-2.78-0.87-2.78-0.87zm119.16,7.94c-0.88,0.25-1.53,0.4-1.72,0.97-0.19,0.56,0.06,1.24,0.31,1.43,0.26,0.19,0.84,0.69,1.47,0.57,0.63-0.13,1.56-0.19,1.82-0.57,0.25-0.38-1.13-1.46-1.32-1.78-0.19-0.31-0.56-0.62-0.56-0.62zm1.75,4.06c-0.51,0.25-1.19,0.56-1.37,1.06-0.19,0.51,0.36,1.37,1,1.75,0.63,0.38,1.05,0.63,1.56,0.06,0.5-0.56,1.09-1.62,1.03-1.93-0.06-0.32-2.22-0.94-2.22-0.94zm0.19,6.97c-0.18,0.01-0.34,0.06-0.5,0.16-0.63,0.37-0.82,1.18-0.82,1.56s0.88,3.09,0.88,3.47-0.87,2.4-1,2.9c-0.13,0.51-0.01,1.33,0.62,2.6,0,0,1.13-0.25,1.38-0.25s1.72-0.94,1.84-1.19c0.13-0.25,0.44-2.28,0.44-2.91s-0.06-2.02-0.12-2.47c-0.07-0.44-0.63-1.4-0.63-1.78s-0.31-1.43-0.69-1.69c-0.28-0.18-0.87-0.44-1.4-0.4zm-4.41,14.53s-1.28,0.03-1.53,0.16c-0.25,0.12-0.69,0.49-0.81,0.75-0.13,0.25-0.57-0.07,0.06,0.62,0.63,0.7,1.02,1.38,1.66,1.38,0.63,0,2.06,0.65,2.31,0.65s1.03-0.21,1.22-0.47c0.19-0.25,0.75-0.49,0.31-1.18-0.44-0.7-0.97-1.06-1.22-1.19s-2-0.72-2-0.72zm1.81,6.47c-0.19,0.31-1.37,1.18-1.43,1.44-0.07,0.25-0.32,0.74-0.38,1.25-0.06,0.5-0.31,1.77-0.31,2.09s-0.53,1.59-0.78,2.16c-0.26,0.56-0.5,1.49-0.44,2.12s-0.07,1.09,0.19,1.66c0.25,0.57,0.24,1.18,0.56,1.37s-0.04,1.29,1.09,0.6c1.14-0.7,1.63-1.34,1.82-1.79,0.19-0.44,0.53-2.09,0.72-2.34,0.18-0.25,0.56-1.43,0.68-1.81,0.13-0.38,0.63-1.9,0.63-2.22s0.06-1.59-0.25-2.22c-0.32-0.63-1.19-1.31-1.19-1.31l-0.91-1zm-4.9,15.4c-0.26,0.07-0.97,0.19-1.28,0.44-0.32,0.26-0.63,0.56-0.69,0.75s-0.5,0.94-0.5,1.19,0.06,1.15,0,1.41c-0.06,0.25,0,0.56-0.56,0.81-0.57,0.25-1.22,0.43-1.6,0.56s-0.81,0.44-1.06,0.69-0.94,0.72-0.94,0.72-0.53,0.18-0.53,0.5c0,0.31,0.41,0.99,0.53,1.25,0.13,0.25,0.75,1.22,0.75,1.22l-0.18,0.75s-1.04,0.74-1.1,1.06c-0.06,0.31-0.12,1.59-0.12,1.97s0.06,1.74,0.06,2c0,0.25,0.19,1.84,0.19,2.09s0.15,1.34,0.28,1.97c0.12,0.63,0.12,1.06,0.43,1.44,0.32,0.38,0.56,1.03,0.88,1.22s0.5,0.68,0.88,0.62c0.37-0.06,1.71-1.03,1.71-1.03s0.63-0.62,0.75-1.06c0.13-0.44,0.44-2.16,0.44-2.16s0.19-1.37,0.13-1.69c-0.07-0.31-0.69-0.65-0.75-1.22-0.07-0.56-0.07-0.8,0-1.68,0.06-0.89,0.87-2.09,1.06-2.35,0.19-0.25,0.84-1.18,0.97-1.93,0.12-0.76-0.07-1.84,0.19-2.16,0.25-0.32,0.8-0.75,1.06-1.06,0.25-0.32,1.06-1.65,1.18-2.03,0.13-0.38,0.13-1.4,0.13-1.91s-0.31-1.37-0.56-1.56c-0.26-0.19-1.75-0.82-1.75-0.82zm-8.35,23.69c-0.31-0.01-0.62,0-0.75,0.03-0.25,0.07-0.56,0-0.81,0.32-0.25,0.31-0.78,0.71-1.22,0.84s-0.87,0-0.93,0.31c-0.07,0.32-0.26,0.87-0.26,1.13,0,0.25,0.06,0.74,0.32,1,0.25,0.25,0.62,0.21,0.75,0.78,0.12,0.57,0.19,1.18,0.12,1.44-0.06,0.25-0.31,1.12-0.37,1.43-0.07,0.32-0.19,0.4-0.38,1.03-0.19,0.64-0.31,1.38-0.31,1.76v1.15c0,0.38-0.06,1.19,0.13,1.44,0.18,0.25,0.62,0.56,0.87,0.81s1.47,0.47,1.72,0.47,0.5-0.28,0.75-0.66,0.56-0.99,0.56-1.56-0.12-2.96-0.06-3.28,1.12-0.84,1.19-1.41c0.06-0.56,0.03-1.74,0.09-2,0.06-0.25,0.31-1.15,0.31-1.15s0.75-0.44,0.88-0.81c0.12-0.38,0.25-1.13,0.25-1.5,0-0.38-0.19-1.54-0.19-1.54h-1.84c-0.19,0-0.5-0.02-0.82-0.03zm7.85,1.88c-0.57,1.01-0.72,0.99-0.78,1.75-0.07,0.76-0.88,1.53-0.88,1.53s-0.31,0.31-0.44,0.62c-0.12,0.32-0.69,0.81-0.06,1s1.72,0.19,1.97,0.07c0.25-0.13,0.75-0.69,1-0.82,0.25-0.12,0.44-0.49,0.44-1.37,0-0.89-0.19-1.9-0.31-2.16-0.13-0.25-0.94-0.62-0.94-0.62z",
            "name": "Сахалинская область"
        },
        "ka": {
            "path": "M918.56,146.75l-1.65,0.84c-0.26,0.13-1.25,0.88-1.25,0.88l-0.13,1,0.13,2.78,0.25,1.16-0.88,2.43-1.72,4.69-0.93,1.56-0.44,1.41-0.06,1.81s-0.22,1.03-0.47,1.22c-0.26,0.19-0.82,0.13-0.82,0.13h-1.81-2.59l-1.6-0.19-1.68-0.31s-0.53,0.25-0.85,0.25c-0.31,0-0.68,0.56-1,0.75-0.31,0.19-1.37,0.74-1.56,1-0.19,0.25-1.28,0.78-1.59,0.9-0.32,0.13-1.38,1-1.63,1.19s-0.78,0.56-1.22,0.63c-0.44,0.06-0.94-0.32-0.94-0.32s-0.62-0.99-0.74-1.25c-0.13-0.25-0.97-1.72-0.97-1.72s-0.07-1.31-0.13-1.62c-0.06-0.32-0.06-1.47-0.12-1.72-0.07-0.25-0.13-1.06-0.13-1.06s0.25-1.22,0.31-1.66c0.07-0.44,0.38-0.75,0.38-0.75s0-0.56-0.19-0.87c-0.19-0.32-0.81,0.06-0.81,0.06l-1.75,0.44-1.97,0.81-1.66,0.5-1.18,0.19-2.04-0.25s-1.62-0.38-1.87-0.57-1.03-0.12-1.03-0.12l-0.63,0.56-0.87,1.16-0.63,0.81-0.84,0.88s-1.31,0.74-1.56,0.87c-0.26,0.13-0.94,0.59-0.94,0.59l-1.22,1.32-1.44,2.28s-2.27,2.28-2.59,2.47-1.18,0.87-1.44,1.12c-0.25,0.25-1.34,0.38-1.72,0.44s-0.74,0.62-1,0.94c-0.25,0.31-1.15,1.28-1.15,1.28l-0.81,0.56s-0.75-0.31-1.13-0.31-0.44,0.31-0.44,0.31l-0.97,1.91-1,2.18s-0.5,1.59-0.5,1.91,0.63,0.44,0.88,0.63c0.25,0.18,1.65,0.8,2.03,1.06,0.38,0.25,1,0.84,1.31,1.15,0.32,0.32,1.41,1.32,1.41,1.32s-0.13,0.43-0.06,0.68c0.06,0.26,0.37,1.15,0.68,1.66,0.32,0.51,0.94,0.81,0.94,0.81s4.09,1.16,4.35,1.28c0.25,0.13,1.09,1.32,1.09,1.32l0.37,0.68s1.13,0.85,1.44,1.04c0.32,0.18,1.22,0.31,1.22,0.31l0.62,0.62,0.44,1.19s-0.31,1.59-0.37,1.97c-0.07,0.38-0.07,0.99,0,1.37,0.06,0.38,1.12-0.06,1.12-0.06s1.4-0.31,1.97-0.25,1.56,0.25,1.56,0.25,1.22,0.4,1.35,0.66c0.12,0.25,0.75,1.18,0.75,1.18l1.15,1.5,1.25,1.72,1.85,1.32,2,1.65,1,1.31s0.84-0.99,1.03-1.31c0.19-0.31,0-0.74,0-1.19,0-0.44-0.37-0.71-0.75-0.96-0.38-0.26-0.97-1.19-1.35-1.63-0.37-0.44-0.56-0.84-0.56-0.84s-0.81-1.06-1.06-1.31c-0.25-0.26-1.09-0.94-1.34-1.19-0.26-0.26-1.25-1.34-1.69-1.97s0-0.75,0-1.06c0-0.32,0.87-1.04,0.87-1.04s0.94-1.3,1.19-1.62,0.44-1.21,0.5-1.59,0.47-1.31,0.85-1.5c0.37-0.19,1.18-0.38,1.68-0.44,0.51-0.06,1.84,0.5,1.97,0.81,0.13,0.32-0.62,0.69-0.75,0.94-0.12,0.25,0,1.59-0.06,2.16-0.06,0.56,0.12,1.71,0.12,2.28,0,0.56,0.75,1.37,0.75,1.37s1.13,1.4,1.44,1.72c0.32,0.32,1.28,0.93,1.59,1.19,0.32,0.25,1.57,1.65,1.57,1.65l3.34,2.32,0.97,0.59s0.75,1.25,0.81,1.69c0.07,0.44,0.44,0.93,0.44,0.93s1.03,0.22,1.34,0.47c0.32,0.26,0.63,1.31,0.63,1.69s-0.12,1.03-0.44,1.47c-0.31,0.44-1.21,0.93-1.53,1.25s-0.69,0.75-0.69,0.75-0.06,5.68-0.06,6.25,0.75,1.78,1,2.16,1.21,2.14,1.72,2.9c0.5,0.76,0.69,1.12,0.69,1.44s0.25,1.66,0.25,1.66,0.56,10.46,0.62,11.09,0.59,1.03,0.78,1.41,0.75,0.93,1,1.18c0.26,0.26,0.75,0.84,0.88,1.16,0.12,0.32,0.97,1.62,0.97,1.62s0.74,2.78,0.87,3.54c0.13,0.75,0.13,1.72,0.13,1.72s1.31,3.96,1.31,4.4v1.47s-0.81,1.75-1.13,2.13c-0.31,0.37-0.06,1.77-0.06,2.09,0,0.31-1.34,2.46-1.84,2.84-0.51,0.38-1.31,1-1.44,1.38s0.25,1.03,0.25,1.03l1.81,0.87,2.28,0.94s1.09,2.15,1.47,2.66c0.38,0.5,0.56,1.59,0.56,1.9,0,0.32,0.32,3.47,0.44,4.16,0.13,0.69,0.38,1.65,0.56,2.09,0.19,0.45,1.79,1.5,1.79,1.5s2.21,3.94,2.34,4.25c0.13,0.32,0.81,1.69,1.06,2,0.08,0.1,0.29,0.25,0.53,0.41,0.62,0.78,3.07,1.94,3.07,1.94l0.93,0.62s4.63,4.25,4.69,4.5c0.06,0.26,2.78,2.32,2.78,2.32s2.34,0.84,2.6,1.03c0.25,0.19,1.68,0.75,1.68,0.75l14.91,10.22,2.03,1.21,3.03,0.94s1.19,1.59,1.44,1.72,3.15,1.19,3.59,1.19c0.45,0,1.47,1,1.47,1s2.59,2.78,2.97,3.03,2.56,1.91,2.56,1.91,2.09,1.18,2.47,1.18,2.85-0.5,2.85-0.5l0.68-0.62v-2.03s-0.06-1.69-0.06-1.88,0-1.21-0.25-1.53-0.81-0.88-0.81-0.88,0.18-1.52,0.44-1.96c0.25-0.45,0.43-0.69,0.43-1.07s-0.31-1.15-0.56-1.4c-0.25-0.26-0.5-1.19-0.5-1.19s-0.06-2.34-0.31-2.66c-0.25-0.31-1.09-0.99-1.28-1.62s-0.5-1.03-0.63-1.41c-0.12-0.38-1.37-1.62-1.62-2.06-0.26-0.44-1.53-1.59-1.72-1.84-0.19-0.26-0.31-1.28-0.5-2.1s-1.02-0.75-1.78-0.75-1.12-0.06-1.38-0.25c-0.25-0.19,0.5-0.43,0.75-0.56,0.26-0.13,1.09-0.9,1.28-1.22,0.19-0.31,0.5-1.37,0.5-1.37l0.69-4.22,1.91-1.6c0.38-0.31,0.25-0.93-0.19-1.31s-1.09-0.25-1.41-0.31c-0.31-0.06-0.8-0.84-1.31-1.16-0.5-0.31-0.84-0.81-1.28-1s-1.24-0.31-2.06-0.56-1.4-1.03-1.91-1.47c-0.5-0.44-0.44-1-0.5-1.25s-0.06-1.96-0.06-2.84v-1.22s-0.97-2.78-0.97-3.1c0-0.31,0.03-1.05,0.16-1.43,0.12-0.38,0.49-0.69,0.75-0.94,0.25-0.25,1.43-0.78,1.43-0.78l1.47-0.88s0.38-1.71,0.38-2.59-0.5-2.25-0.63-2.56c-0.12-0.32-1.34-0.72-1.34-0.72s-1.5-1.19-1.94-1.19-2.46-0.56-2.9-0.69c-0.45-0.12-1.6-0.78-1.85-0.9-0.25-0.13-1.71-1.25-2.09-1.56-0.38-0.32-1.25-1.1-1.5-1.41-0.26-0.32-0.75-1.44-0.88-1.75-0.12-0.32-0.84-1.66-0.84-1.66s0-0.55-0.13-1.12c-0.12-0.57-0.18-1.65-0.18-2.41s1.02-0.62,1.28-0.62c0.25,0,1.68-0.25,2-0.32,0.31-0.06,1.03-0.74,1.22-1,0.19-0.25,0.37-1.77,0.31-2.09s-0.65-0.81-1.22-1-0.94-0.78-1.12-0.84c-0.19-0.07-2.16-0.88-2.16-0.88s-2.06-0.69-2.5-0.75-0.59,0.44-0.84,0.63c-0.26,0.19-0.5,0.37-1.32,0.37s-1.22-0.44-1.22-0.44l-0.87-1.18s-1.18,0.06-1.81,0.06c-0.64,0-0.91-0.59-1.16-0.91-0.25-0.31-1.06-0.56-1.06-0.56s-0.47-0.19-0.69-0.28c0-0.06,0.19-3.44,0.13-3.69-0.07-0.25-0.66-1.21-0.91-1.47-0.25-0.25-1.37-0.44-1.94-0.44s-1.4,0.6-1.84,0.85-1.06,0.75-1.31,0.94c-0.26,0.19-0.13,1.12-0.13,1.68,0,0.57-0.34,1.03-0.72,1.35-0.38,0.31-0.68,0.25-1.31,0.25s-1.12-0.19-1.63-0.31c-0.5-0.13-0.77-0.56-1.03-0.82-0.25-0.25-1.06-0.96-1.37-1.47-0.32-0.5-0.19-1.05-0.25-1.62-0.07-0.57-0.84-1.65-1.1-2.16-0.25-0.5-1.24-2.34-1.37-2.59s-0.56-1.28-1-1.91-0.9-1.99-1.28-2.62-0.74-1.09-1.5-2.1-0.78-0.56-1.35-0.68c-0.56-0.13-0.99-0.78-1.5-1.35-0.5-0.57-0.84-0.93-1.15-1.75-0.32-0.82-0.37-0.83-0.94-2.15-0.57-1.33-0.07-1.09,0.19-1.66,0.25-0.57,1.06-0.62,1.06-0.62l0.47-0.88s-0.38-1.59-0.31-2.09c0.06-0.51,0.36-0.56,1.06-0.75,0.69-0.19,1.56,0.75,1.94,0.75s1.59-0.5,1.9-0.82c0.32-0.31,0.32-1.08,0.32-1.71,0-0.64-0.62-1-1.13-1.13s-0.94-0.56-0.94-1.06c0-0.51,0.25-1.21,0.25-1.91,0-0.69,0-0.74-0.06-1.25-0.06-0.5-0.12-0.53-0.25-0.91-0.13-0.37,0.06-1.18,0.19-1.68,0.12-0.51,0.56-0.44,0.94-0.38,0.37,0.07,1.24,0.69,1.62,0.94s0.65,0.62,0.84,1,1,1.09,1.63,1.16c0.63,0.06,1.15-0.38,1.15-0.38s-0.09-0.52-0.34-1.09-0.81-1.44-1-1.81c-0.19-0.38-0.5-1.22-0.75-1.6s-0.44-0.5-0.44-0.75,0.69-2.09,0.69-2.41v-3.78c0-0.82,0.19-1.4,0.38-1.72,0.19-0.31,0.87-1.24,1.25-2.06s0.84-1.15,1.09-1.9c0.25-0.76,0.87-1.4,1.44-2.16s0.77-1,1.15-1.12c0.38-0.13,2.91,0.06,3.29,0.06,0.37,0,1.96-0.44,2.65-0.56,0.7-0.13,2.71-0.31,3.41-0.57,0.69-0.25,0.25-0.59,0.18-0.84-0.06-0.25-1.27-0.94-1.65-1.06-0.38-0.13-1.12-0.69-1.38-0.94-0.25-0.25-0.5-1.16-0.5-1.16s-0.59-2.96-0.65-3.28c-0.07-0.31-0.75-1.56-0.75-1.56s-0.13-5.18-0.13-5.63c0-0.44-0.68-2.02-1.37-2.34-0.7-0.32-0.91-0.99-0.91-1.5s0-0.96-0.12-1.59c-0.13-0.64-0.75-1.37-1-1.88-0.26-0.5,0.12-0.78,0.12-1.22s-0.12-1.18-0.5-1.5c-0.38-0.31-0.68-0.49-0.94-0.75-0.25-0.25-0.46-0.9-0.46-1.53s0.28-1,0.34-1.31c0.06-0.32,0.06-1.09-0.06-1.53-0.13-0.44-0.35-1.06-0.41-1.31-0.06-0.26-0.37-1.22-0.37-1.22s-0.5-0.44-0.69-0.44-0.94-0.19-0.94-0.19l-1.78-0.31s-1.69-0.44-1.81-0.69c-0.13-0.25-1.04-0.69-1.04-0.69l-1.56-0.59zm7.25,70.22c-0.88,0.44-1.12,0.43-1.06,1s0.37,1.09,0.63,1.47c0.25,0.38,0.44,0.93,0,1.44-0.45,0.5-1.45,0.52-1.19,1.15,0.25,0.63,0.49,1.06,0.75,1.31,0.25,0.26,0.81,0.9,0.94,1.41,0.12,0.51-0.01,1.06,0.31,1.56,0.31,0.51,0.31,0.69,0.69,0.69,0.37,0,0.59,0.32,0.65-0.5s-0.06-0.95,0-2.84c0.06-1.9,0-2.84,0.06-3.41,0.07-0.57,0.26-1.37,0-1.75-0.25-0.38-1.28-0.9-1.4-1.22-0.13-0.31-0.38-0.31-0.38-0.31zm58.91,12.47c-1.07,0.71-1.16,0.62-1.16,1.15,0,0.54-0.18,0.9,0.53,0.72,0.72-0.18,0.91-0.18,1-0.62,0.09-0.45-0.37-1.25-0.37-1.25zm-10.97,4.53c-0.63,0.45-1.08,0.2-0.81,1.09,0.27,0.9,0.44,1.16,1.15,1.25,0.72,0.09,0.73,0.1,2.07,0.1s2.31,0.06,3.03,0.06c0.71,0,0.99,0.36,1.43,0,0.45-0.36,0.63-0.07,0.54-0.78-0.09-0.72-1.24-0.9-2.22-0.81-0.98,0.08-1.52,0.34-3.13-0.19-1.6-0.54-2.06-0.72-2.06-0.72z",
            "name": "Камчатский Край"
        },
        "in": {
            "path": "m63.393,395.68,0.08929,5.2679,17.946-8.5714-1.3393-1.25-2.9464-1.25-1.5179-1.9643-2.4107,2.4107-4.1071-2.6786-1.875,1.0714,0.08929,5.8929-1.5179,1.0714z",
            "name": "Республика Ингушетия"
        },
        "cc": {
            "path": "m63.482,401.04,1.0714,2.5,3.125,1.6964,3.4821,0.44642,2.1429-1.9643,2.1429,1.7857,2.5-1.5178-0.08929-1.6072,1.875-2.1428,2.8571,0.44642,3.8393-2.8571-0.625-1.9643-4.4643-0.53572,0.44643-2.7679z",
            "name": "Чеченская Республика"
        }
    }
});
