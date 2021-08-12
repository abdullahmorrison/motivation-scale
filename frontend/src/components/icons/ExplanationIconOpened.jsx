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
function ExplanationIconOpened(props) {
    return (<svg width={41} height={25} viewBox="0 0 41 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={0.5} y={0.5} width={40} height={24} rx={4.5} stroke="#000"/>
      <path d="M10.5 15.2h7v1.6h-7v-1.6zm0-3.2h7v1.6h-7V12zm5.25-8h-7C7.787 4 7 4.72 7 5.6v12.8c0 .88.779 1.6 1.741 1.6H19.25c.962 0 1.75-.72 1.75-1.6V8.8L15.75 4zm3.5 14.4H8.75V5.6h6.125v4h4.375v8.8zM36 14l-5-5-5 5h10z" fill="#000"/>
    </svg>);
}
exports.default = ExplanationIconOpened;
