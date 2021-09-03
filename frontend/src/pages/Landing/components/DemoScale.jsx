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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var dragDropIcon_svg_1 = __importDefault(require("../../PGPScale/icons/dragDropIcon.svg"));
var editIcon_svg_1 = __importDefault(require("../../PGPScale/icons/editIcon.svg"));
var explanationIconOpened_svg_1 = __importDefault(require("../../PGPScale/icons/explanationIconOpened.svg"));
var explanationIconClosed_svg_1 = __importDefault(require("../../PGPScale/icons/explanationIconClosed.svg"));
var deleteIcon_svg_1 = __importDefault(require("../../PGPScale/icons/deleteIcon.svg"));
var DemoScale = function () {
    var _a = react_1.useState(false), writingSpaceVisible = _a[0], setWritiingSpaceVisible = _a[1];
    var _b = react_1.useState(""), title = _b[0], setTitle = _b[1]; //the title
    var _c = react_1.useState(false), displayH1 = _c[0], setDisplayH1 = _c[1]; //used to determine if you want to display value as h1 or input
    return (<div className="scale">
            <div className="scale__header">
                <img src={dragDropIcon_svg_1.default} alt="drag 'n' drop"/>
                <div className="scale__header__container">
                {displayH1 === true
            ? <h1>{title}</h1>
            : <input type="text" className="scale__header__container__input" defaultValue={title} placeholder="Name of Goal" onKeyDown={function (event) {
                    if (event.key === 'Enter' && event.target.value !== "") {
                        setTitle(event.target.value);
                        setDisplayH1(true);
                    }
                }}/>}
                    <div className="scale__header__icon">
                        <img src={editIcon_svg_1.default} alt="Edit Icon" onClick={function () { return setDisplayH1(false); }}/>
                    </div>
                </div>
                <div className="scale__header__container">
                    <img className="scale__header__icon" src={writingSpaceVisible ? explanationIconOpened_svg_1.default : explanationIconClosed_svg_1.default} onClick={function () { return setWritiingSpaceVisible(!writingSpaceVisible); }} alt="dropdown"/>
                    <img className="scale__header__icon" src={deleteIcon_svg_1.default} alt="delete"/>
                </div>
            </div>
            <div className="scale__slider">
                <input type="range" className="scale__slider__range" min="0" max="100"/>
                <div className="scale__slider__ticks">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ul className="scale__slider__labels">
                    <li>Saving What You Can</li>
                    <li>Avoiding Failure</li>
                    <li>Stagnant</li>
                    <li>Chasing Success</li>
                    <li>Upgrading Your Goal</li>
                </ul>
            </div>
            <div className="scale__writing-space" style={writingSpaceVisible ? { display: "flex" } : { display: "none" }}>
                <div>
                    <label>What would be avoiding failure?</label>
                    <textarea placeholder="Enter your comment here..."/>
                </div>
                <div>
                    <label>What would be chasing success?</label>
                    <textarea placeholder="Enter your comment here..."/>
                </div>
            </div>   
        </div>);
};
exports.default = DemoScale;
