"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app_error_util_1 = __importDefault(require("./utils/app-error.util"));
// Create instance of express
const app = (0, express_1.default)();
/* MIDDLEWARES */
if (process.env.NODE_ENV === "dev") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.json());
/* ROUTES */
// Invalid routes
app.all("*", (req, res, next) => {
    next(new app_error_util_1.default(`Can't find ${req.originalUrl} on this server...`, 404));
});
// Error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
});
exports.default = app;
