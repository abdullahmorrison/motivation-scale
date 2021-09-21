"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var githubLogo_png_1 = __importDefault(require("./images/githubLogo.png"));
var mailLogo_png_1 = __importDefault(require("./images/mailLogo.png"));
var laptop_png_1 = __importDefault(require("./images/laptop.png"));
var landing_module_css_1 = __importDefault(require("../css/landing.module.css"));
var react_router_dom_1 = require("react-router-dom");
var DemoScale_1 = __importDefault(require("./components/DemoScale"));
var Landing = function () {
    var history = react_router_dom_1.useHistory();
    return (<>
        <header className={landing_module_css_1.default.hero}>
            <div>
                <h1>Prevent Your Emotions From Slowing Your Progress</h1>
                <button className={landing_module_css_1.default.btn} onClick={function () { return history.push("/pgpscale"); }}><b>Get Started</b></button>
            </div>
            <img src={laptop_png_1.default} alt="laptop"/>
        </header>
        <div className={landing_module_css_1.default.demo}>
            <DemoScale_1.default />
        </div>
        <div className={landing_module_css_1.default.guideOnTool}>
            <a href="/"><h2>View an In-Depth Guide on This Tool &rarr;</h2></a>
        </div>  
        <footer>
            <div className={landing_module_css_1.default.actionLink}>
                <a href="mailto:abdullahmorrison@gmail.com" target="_blank" rel="noreferrer">
                    <img className={landing_module_css_1.default.logo} src={mailLogo_png_1.default} alt="Mail Logo"/>
                    Email Me
                </a>
            </div>
            <div className={landing_module_css_1.default.actionLink}>
                <a href="https://github.com/abdullahmorrison/ThePerceivedGoalProgressScale" target="_blank" rel="noreferrer">
                    <img className={landing_module_css_1.default.logo} src={githubLogo_png_1.default} alt="GitHub Logo"/>
                    View The GitHub
                </a>
            </div>
        </footer>
    </>);
};
exports.default = Landing;
