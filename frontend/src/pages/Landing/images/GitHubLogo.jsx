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
function GitHubLogo(props) {
    return (<svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.5 0C7.837 0 0 7.836 0 17.5c0 7.732 5.014 14.292 11.969 16.606.873.162 1.156-.38 1.156-.841v-3.258c-4.868 1.058-5.881-2.065-5.881-2.065C6.447 25.919 5.3 25.38 5.3 25.38c-1.589-1.087.12-1.063.12-1.063 1.758.122 2.682 1.804 2.682 1.804 1.56 2.674 4.094 1.901 5.093 1.454.156-1.13.61-1.904 1.111-2.34-3.886-.444-7.972-1.945-7.972-8.649 0-1.912.684-3.472 1.802-4.697-.18-.442-.78-2.223.17-4.632 0 0 1.47-.47 4.815 1.794a16.784 16.784 0 014.379-.59c1.488.008 2.985.202 4.384.59 3.34-2.263 4.808-1.794 4.808-1.794.952 2.41.353 4.191.172 4.632 1.123 1.225 1.801 2.787 1.801 4.697 0 6.721-4.093 8.202-7.99 8.635.627.542 1.2 1.607 1.2 3.24v4.803c0 .465.28 1.012 1.168.84C29.993 31.787 35 25.229 35 17.5 35 7.836 27.164 0 17.5 0z" fill="#000"/>
    </svg>);
}
exports.default = GitHubLogo;
