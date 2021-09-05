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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Scale_1 = __importDefault(require("./Scale"));
var react_google_login_1 = require("react-google-login");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var PGPScale = function () {
    var _a = react_1.useState([]), scales = _a[0], setScales = _a[1];
    var _b = react_1.useState(""), username = _b[0], setUsername = _b[1];
    var _c = react_1.useState("Guest"), name = _c[0], setName = _c[1]; //!DEFAULT "GUEST" MAY CAUSE ERRORS
    react_1.useEffect(function () {
        var fetchScales = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch('/scales/' + username + '/username/')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setScales(data.sort(function (a, b) {
                            return a.order - b.order;
                        }));
                        return [3 /*break*/, 4];
                    case 3:
                        console.error("Error: NO USER when fetching scales");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchScales();
    }, [username]);
    var handleAddScale = function () {
        if (username) {
            fetch('/scales/', {
                method: 'POST',
                body: JSON.stringify({ username: username, order: scales.length + 1 }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (response) { return response.json(); }).then(function (data) {
                setScales(__spreadArray(__spreadArray([], scales), [data]));
            });
        }
        else {
            alert("Error: Login in order to use app");
        }
    };
    var handleDeleteScale = function (scaleID) {
        document.getElementById("myModal").style.display = "block"; //display confirm modal
        //action if the delete button is clicked
        var deleteScale = function () {
            if (username) {
                fetch('/scales/' + scaleID, {
                    method: 'DELETE',
                }).then(function (res) {
                    res.json();
                    setScales(scales.filter(function (s) { return s._id !== scaleID; }));
                });
            }
            else {
                alert("Error: Login in order to use app");
            }
            document.getElementById("myModal").style.display = "none";
        };
        document.getElementById("modal-footer-delete").addEventListener("click", deleteScale);
        //remove modal if you click the cancel button
        document.getElementById("modal-footer-cancel").addEventListener("click", function () {
            document.getElementById("modal-footer-delete").removeEventListener("click", deleteScale);
            document.getElementById("myModal").style.display = "none";
            document.getElementById("modal-footer-cancel").removeEventListener("click", deleteScale);
        });
    };
    var handleReorderScale = function (scaleID, newOrder) {
        if (username) {
            fetch('/scales/' + scaleID + '/order', {
                method: 'PATCH',
                body: JSON.stringify({ order: newOrder }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (res) {
                res.json();
            });
        }
        else {
            alert("Error: Login in order to use app");
        }
    };
    var responseGoogleSuccess = function (response) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(response);
            fetch('/users/googlelogin/', {
                method: 'POST',
                body: JSON.stringify({ tokenId: response.tokenId }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function () {
                setUsername(response.profileObj.email);
                setName(response.profileObj.givenName + " " + response.profileObj.familyName);
            });
            return [2 /*return*/];
        });
    }); };
    return (<>
            <h3>logged in as {name}</h3>
            <react_google_login_1.GoogleLogin clientId="212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com" buttonText="Continue with Google" onSuccess={function (res) { return responseGoogleSuccess(res); }} isSignedIn={true} cookiePolicy={'single_host_origin'}/>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header"><h3>Confirm Action</h3></div>
                    <div id="modal-question" className="modal-body">
                        Are you sure you would like to delete this scale?
                    </div>
                    <div className="modal-footer">
                        <button id="modal-footer-delete"><h3>Delete</h3></button>
                        <button id="modal-footer-cancel"><h3>Cancel</h3></button>
                    </div>
                </div>
            </div>
            <div className='droppableArea'>{/**Element made to add style to the drag and drop context*/}
                <react_beautiful_dnd_1.DragDropContext onDragEnd={function (param) {
            var _a;
            var srcI = param.source.index;
            var destI = (_a = param.destination) === null || _a === void 0 ? void 0 : _a.index;
            var src = scales[srcI];
            if (destI != null) { //making sure a item isn't dragged outside of draggable area (otherwise a destination wouldn't exist)
                var removedSrc = scales.filter(function (_, index) { return index !== srcI; });
                var left = removedSrc.slice(0, destI);
                var right = removedSrc.slice(destI, removedSrc.length);
                var newScales = __spreadArray(__spreadArray(__spreadArray([], left), [src]), right);
                for (var i = 0; i < newScales.length; i++) { //looping to find changes in a scale's order in the array
                    if (newScales[i]._id !== scales[i]._id) { //only making api calls if a scale's order has changed
                        handleReorderScale(newScales[i]._id, i);
                    }
                }
                setScales(newScales);
            }
        }}>
                    <react_beautiful_dnd_1.Droppable droppableId="droppable-1">
                        {function (provided, _) { return ( //!FIX ANY
        <div ref={provided.innerRef} {...provided.droppableProps}>
                                {scales.map(function (scale, i) { return (<Scale_1.default index={i} key={scale._id} scaleID={scale._id} onDelete={handleDeleteScale}/>); })}
                                {provided.placeholder}
                            </div>); }}
                    </react_beautiful_dnd_1.Droppable>
                </react_beautiful_dnd_1.DragDropContext>
            </div>
            <button className="new-scale" onClick={handleAddScale}>+</button>
        </>);
};
exports.default = PGPScale;
