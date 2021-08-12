"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = __importDefault(require("react-dom"));
var PGPScale_1 = __importDefault(require("./components/PGPScale"));
react_dom_1.default.render(<PGPScale_1.default />, document.getElementById('root'));
