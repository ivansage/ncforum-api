import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import AppError from "./utils/app-error.util";

// Create instance of express
const app = express();

/* MIDDLEWARES */
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
app.use(express.json());

/* ROUTES */

// Invalid routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server...`, 404));
});

// Error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

export default app;
