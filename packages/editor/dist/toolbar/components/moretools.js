"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreTools = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var popuppresenter_1 = require("../../components/popuppresenter");
var toolbutton_1 = require("../components/toolbutton");
var toolbarstore_1 = require("../stores/toolbarstore");
var dom_1 = require("../utils/dom");
var toolbargroup_1 = require("./toolbargroup");
function MoreTools(props) {
    var popupId = props.popupId, editor = props.editor, tools = props.tools, autoCloseOnUnmount = props.autoCloseOnUnmount;
    var toolbarLocation = (0, toolbarstore_1.useToolbarLocation)();
    var isBottom = toolbarLocation === "bottom";
    var buttonRef = (0, react_1.useRef)();
    var _a = __read((0, react_1.useState)(false), 2), isOpen = _a[0], setIsOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(toolbutton_1.ToolButton, __assign({}, props, { toggled: isOpen, buttonRef: buttonRef, onClick: function () { return setIsOpen(function (s) { return !s; }); } })), (0, jsx_runtime_1.jsx)(popuppresenter_1.PopupWrapper, { isOpen: isOpen, group: "toolbarGroup", id: popupId, onClosed: function () { return setIsOpen(false); }, position: {
                    isTargetAbsolute: true,
                    target: isBottom ? (0, dom_1.getToolbarElement)() : buttonRef.current || "mouse",
                    align: "center",
                    location: isBottom ? "top" : "below",
                    yOffset: isBottom ? 10 : 5,
                }, autoCloseOnUnmount: autoCloseOnUnmount, focusOnRender: false, blocking: false, renderPopup: function () { return ((0, jsx_runtime_1.jsx)(toolbargroup_1.ToolbarGroup, { tools: tools, editor: editor, sx: {
                        flex: 1,
                        p: 1,
                        boxShadow: "menu",
                        bg: "background",
                        borderRadius: "default",
                        overflowX: "auto",
                        maxWidth: "95vw",
                    } })); } })] }));
}
exports.MoreTools = MoreTools;
