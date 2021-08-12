"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
function DragDropIcon(props) {
    return (<svg width={13} height={21} viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.2 18.375C5.2 19.819 4.03 21 2.6 21 1.17 21 0 19.819 0 18.375s1.17-2.625 2.6-2.625c1.43 0 2.6 1.181 2.6 2.625zm-2.6-10.5C1.17 7.875 0 9.056 0 10.5s1.17 2.625 2.6 2.625c1.43 0 2.6-1.181 2.6-2.625S4.03 7.875 2.6 7.875zM2.6 0C1.17 0 0 1.181 0 2.625S1.17 5.25 2.6 5.25c1.43 0 2.6-1.181 2.6-2.625S4.03 0 2.6 0zm7.8 5.25c1.43 0 2.6-1.181 2.6-2.625S11.83 0 10.4 0C8.97 0 7.8 1.181 7.8 2.625S8.97 5.25 10.4 5.25zm0 2.625c-1.43 0-2.6 1.181-2.6 2.625s1.17 2.625 2.6 2.625c1.43 0 2.6-1.181 2.6-2.625s-1.17-2.625-2.6-2.625zm0 7.875c-1.43 0-2.6 1.181-2.6 2.625S8.97 21 10.4 21c1.43 0 2.6-1.181 2.6-2.625s-1.17-2.625-2.6-2.625z" fill="#000"/>
    </svg>);
}
exports.default = DragDropIcon;
