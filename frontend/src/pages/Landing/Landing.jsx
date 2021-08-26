"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var githubLogo_png_1 = __importDefault(require("./images/githubLogo.png"));
var mailLogo_png_1 = __importDefault(require("./images/mailLogo.png"));
var laptop_png_1 = __importDefault(require("./images/laptop.png"));
var Landing = function () {
    return (<>
        <header>
            <h1>Prevent Your Emotions From Slowing Your Progress</h1>
            <button><h2>Get Started</h2></button>
            <img src={laptop_png_1.default} alt="laptop"/>
        </header>
        <div>
            Demo
        </div>
        <div>
            <a href="/"><h2>View an In-Depth Guide on This Tool &rarr;</h2></a>
        </div>  
        <footer>
            <div>
                <a href="mailto:abdullahmorrison@gmail.com" target="_blank" rel="noreferrer">
                    Contact Me
                    <img src={mailLogo_png_1.default} alt="Mail Logo"/>
                </a>
            </div>
            <div>
                <a href="https://github.com/abdullahmorrison/ThePerceivedGoalProgressScale" target="_blank" rel="noreferrer">
                    View My GitHub
                    <img src={githubLogo_png_1.default} alt="GitHub Logo"/>
                </a>
            </div>
        </footer>
    </>);
};
exports.default = Landing;
