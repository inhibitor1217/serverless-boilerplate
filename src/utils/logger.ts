import { LogLevel } from "../types";

export const parseLogLevel = (level: string): LogLevel => {
  if (level.toLowerCase().includes("error")) {
    return LogLevel.Error;
  }
  if (level.toLowerCase().includes("warn")) {
    return LogLevel.Warning;
  }
  if (level.toLowerCase().includes("info")) {
    return LogLevel.Info;
  }
  if (level.toLowerCase().includes("debug")) {
    return LogLevel.Debug;
  }
  if (level.toLowerCase().includes("verbose")) {
    return LogLevel.Verbose;
  }

  throw Error(`Invalid log level: got ${level}`);
};

const getSeverity = (level: LogLevel): number => {
  switch (level) {
    case LogLevel.Verbose:
      return 100;
    case LogLevel.Debug:
      return 200;
    case LogLevel.Info:
      return 300;
    case LogLevel.Warning:
      return 400;
    case LogLevel.Error:
      return 500;
  }
};

export class Logger {
  private severity: number;

  constructor(level: LogLevel) {
    this.severity = getSeverity(level);
  }

  public log(level: LogLevel, message: string | Error) {
    if (this.severity <= getSeverity(level)) {
      console.log(
        `[${new Date().toISOString()}] [${level.toString()}] ${
          message instanceof Error ? JSON.stringify(message, null, 2) : message
        }`
      );
    }
  }

  public error = (message: string | Error) => this.log(LogLevel.Error, message);
  public warning = (message: string | Error) =>
    this.log(LogLevel.Warning, message);
  public info = (message: string | Error) => this.log(LogLevel.Info, message);
  public debug = (message: string | Error) => this.log(LogLevel.Debug, message);
  public verbose = (message: string | Error) =>
    this.log(LogLevel.Verbose, message);
}
