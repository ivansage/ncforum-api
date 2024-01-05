"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./index"));
// Stop the server if something goes wrong with initialization
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION!");
    console.log(err.name, err.message);
    process.exit(1);
});
// Connect to database
mongoose_1.default
    .connect(process.env.DATABASE)
    .then(() => console.log("DB Connection Success!"));
// Start the server
const port = process.env.PORT || 8000;
const server = index_1.default.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
// Stop the server if something went wrong with the connection
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
