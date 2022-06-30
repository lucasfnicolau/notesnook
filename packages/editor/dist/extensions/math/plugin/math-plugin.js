"use strict";
/*---------------------------------------------------------
 *  Author: Benjamin R. Bray
 *  License: MIT (see LICENSE in project root for details)
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.mathPlugin = exports.createMathView = void 0;
var prosemirror_state_1 = require("prosemirror-state");
var math_nodeview_1 = require("./math-nodeview");
var katex_1 = require("./renderers/katex");
// uniquely identifies the prosemirror-math plugin
var MATH_PLUGIN_KEY = new prosemirror_state_1.PluginKey("prosemirror-math");
/**
 * Returns a function suitable for passing as a field in `EditorProps.nodeViews`.
 * @param inline TRUE for block math, FALSE for inline math.
 * @see https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews
 */
function createMathView(inline) {
    return function (node, view, getPos) {
        /** @todo is this necessary?
         * Docs says that for any function proprs, the current plugin instance
         * will be bound to `this`.  However, the typings don't reflect this.
         */
        var pluginState = MATH_PLUGIN_KEY.getState(view.state);
        if (!pluginState) {
            throw new Error("no math plugin!");
        }
        var nodeViews = pluginState.activeNodeViews;
        // set up NodeView
        var nodeView = new math_nodeview_1.MathView(node, view, getPos, {
            className: inline ? "math-inline" : "math-block",
            renderer: inline ? katex_1.KatexRenderer.inline : katex_1.KatexRenderer.block,
            tagName: inline ? "span" : "div",
        }, MATH_PLUGIN_KEY, function () {
            nodeViews.splice(nodeViews.indexOf(nodeView));
        });
        nodeViews.push(nodeView);
        return nodeView;
    };
}
exports.createMathView = createMathView;
var mathPluginSpec = {
    key: MATH_PLUGIN_KEY,
    state: {
        init: function (config, instance) {
            return {
                macros: {},
                activeNodeViews: [],
                prevCursorPos: 0,
            };
        },
        apply: function (tr, value, oldState, newState) {
            // produce updated state field for this plugin
            var newPos = newState.selection.from;
            var oldPos = oldState.selection.from;
            return {
                // these values are left unchanged
                activeNodeViews: value.activeNodeViews,
                macros: value.macros,
                // update with the second-most recent cursor pos
                prevCursorPos: oldPos !== newPos ? oldPos : value.prevCursorPos,
            };
        },
        /** @todo (8/21/20) implement serialization for math plugin */
        // toJSON(value) { },
        // fromJSON(config, value, state){ return {}; }
    },
    props: {
        nodeViews: {
            mathInline: createMathView(true),
            mathBlock: createMathView(false),
        },
    },
};
exports.mathPlugin = new prosemirror_state_1.Plugin(mathPluginSpec);
