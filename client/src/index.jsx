"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = __importDefault(require("react-dom"));
var Landing_1 = __importDefault(require("./pages/Landing/Landing"));
var PGPScale_1 = __importDefault(require("./pages/PGPScale/PGPScale"));
var react_router_dom_1 = require("react-router-dom");
react_dom_1.default.render(<react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Route path="/" exact component={Landing_1.default}/>
        <react_router_dom_1.Route path="/pgpscale" component={PGPScale_1.default}/>
    </react_router_dom_1.BrowserRouter>, document.getElementById('root'));
