"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GitHubLogo_1 = __importDefault(require("./icons/GitHubLogo"));
var MailLogo_1 = __importDefault(require("./icons/MailLogo"));
var Landing = function () {
    return (<>
        <header>
            <h1>Prevent Your Emotions From Slowing Your Progress</h1>
            <button><h2>Get Started</h2></button>
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
                    <MailLogo_1.default />
                </a>
            </div>
            <div>
                <a href="https://github.com/abdullahmorrison/ThePerceivedGoalProgressScale" target="_blank" rel="noreferrer">
                    View My GitHub
                    <GitHubLogo_1.default />
                </a>
            </div>
        </footer>
    </>);
};
exports.default = Landing;
