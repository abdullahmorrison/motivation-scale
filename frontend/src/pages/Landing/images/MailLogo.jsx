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
function MailLogo(props) {
    return (<svg width={33} height={25} viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M32.75 3.75c0-1.604-1.462-2.917-3.25-2.917h-26C1.712.833.25 2.146.25 3.75v17.5c0 1.604 1.462 2.917 3.25 2.917h26c1.788 0 3.25-1.313 3.25-2.917V3.75zm-3.25 0l-13 7.292-13-7.292h26zm0 17.5h-26V6.667l13 7.291 13-7.291V21.25z" fill="#000"/>
    </svg>);
}
exports.default = MailLogo;
