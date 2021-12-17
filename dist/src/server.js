"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("./setup");
var app_1 = __importDefault(require("./app"));
var port = +process.env.PORT || 4000;
app_1["default"].listen(port, function () {
    console.log("Server running on port " + process.env.PORT);
    console.log("database url " + process.env.DATABASE_URL);
});
