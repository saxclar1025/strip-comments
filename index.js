/*!
 * strip-comments <https://github.com/jonschlinkert/strip-comments>
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const { compile } = require('./parse');

/**
 * Strip all code comments from the given `input`, including protected
 * comments that start with `!`, unless disabled by setting `options.keepProtected`
 * to true.
 *
 * ```js
 * const str = strip('const foo = "bar";// this is a comment\n /* me too *\/');
 * console.log(str);
 * // => 'const foo = "bar";'
 * ```
 * @name  strip
 * @param  {String} `input` string from which to strip comments
 * @param  {Object} `options` optional options, passed to [extract-comments][extract-comments]
 * @option {Boolean} [options] `line` if `false` strip only block comments, default `true`
 * @option {Boolean} [options] `block` if `false` strip only line comments, default `true`
 * @option {Boolean} [options] `keepProtected` Keep ignored comments (e.g. `/*!` and `//!`)
 * @option {Boolean} [options] `preserveNewlines` Preserve newlines after comments are stripped
 * @return {String} modified input
 * @api public
 */

function strip(input, options) {
  return compile(input, { ...options, block: true, line: true });
}

/**
 * Strip only block comments.
 *
 * ```js
 * const strip = require('..');
 * const str = strip.block('const foo = "bar";// this is a comment\n /* me too *\/');
 * console.log(str);
 * // => 'const foo = "bar";// this is a comment'
 * ```
 * @name  .block
 * @param  {String} `input` string from which to strip comments
 * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `/*!`)
 * @return {String} modified string
 * @api public
 */

strip.block = (input, options) => {
  return compile(input, { ...options, block: true });
};

/**
 * Strip only line comments.
 *
 * ```js
 * const str = strip.line('const foo = "bar";// this is a comment\n /* me too *\/');
 * console.log(str);
 * // => 'const foo = "bar";\n/* me too *\/'
 * ```
 * @name  .line
 * @param  {String} `input` string from which to strip comments
 * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `//!`)
 * @return {String} modified string
 * @api public
 */

strip.line = (input, options) => {
  return compile(input, { ...options, line: true });
};

/**
 * Strip the first comment from the given `input`. Or, if `opts.keepProtected` is true,
 * the first non-protected comment will be stripped.
 *
 * ```js
 * const output = strip.first(input, { keepProtected: true });
 * console.log(output);
 * // => '//! first comment\nfoo; '
 * ```
 * @name .first
 * @param {String} `input`
 * @param {Object} `options` pass `opts.keepProtected: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

strip.first = (input, options) => {
  return compile(input, { ...options, block: true, line: true, first: true });
};

module.exports = strip;
