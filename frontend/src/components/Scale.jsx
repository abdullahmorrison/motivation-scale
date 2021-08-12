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
var ScaleTitle_1 = __importDefault(require("./ScaleTitle"));
var ScaleSlider_1 = __importDefault(require("./ScaleSlider"));
var WritingSpace_1 = __importDefault(require("./WritingSpace"));
//SVG
var ExplanationIconClosed_1 = __importDefault(require("./icons/ExplanationIconClosed"));
var ExplanationIconOpened_1 = __importDefault(require("./icons/ExplanationIconOpened"));
var DeleteIcon_1 = __importDefault(require("./icons/DeleteIcon"));
var DragDropIcon_1 = __importDefault(require("./icons/DragDropIcon"));
var Scale = function (_a) {
    var scaleID = _a.scaleID, onDelete = _a.onDelete;
    var _b = react_1.useState(false), writingSpaceVisible = _b[0], setWritiingSpaceVisible = _b[1];
    var handleWritingSpace = function () {
        setWritiingSpaceVisible(!writingSpaceVisible);
    };
    return (<div className="scale">
            <div className="scale__header">
                <DragDropIcon_1.default style={{ cursor: 'not-allowed' }} alt="Drag and Drop Tool"/> 
                <ScaleTitle_1.default scaleID={scaleID}/>
                <div className="scale__header__container">
                    {writingSpaceVisible !== true
            ? <ExplanationIconClosed_1.default alt="Explanation Button (Closed)" onClick={handleWritingSpace}/>
            : <ExplanationIconOpened_1.default alt="Explanation Button (Opened)" onClick={handleWritingSpace}/>}
                    <DeleteIcon_1.default alt="Delete Button" onClick={function () { return onDelete(scaleID); }}/>
               </div>
            </div>
            <ScaleSlider_1.default scaleID={scaleID}/>
            <WritingSpace_1.default scaleID={scaleID} visible={writingSpaceVisible}/>
        </div>);
};
exports.default = Scale;
