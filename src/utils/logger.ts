import { LogLevel } from '../types';

export const parseLogLevel = (level: string): LogLevel => {
  if (level.toLowerCase().includes('error')) {
    return LogLevel.Error;
  }
  if (level.toLowerCase().includes('warn')) {
    return LogLevel.Warning;
  }
  if (level.toLowerCase().includes('info')) {
    return LogLevel.Info;
  }
  if (level.toLowerCase().includes('debug')) {
    return LogLevel.Debug;
  }
  if (level.toLowerCase().includes('verbose')) {
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
    default:
      return 0;
  }
};

export class Logger {
  private severity: number;

  constructor(level: LogLevel) {
    this.severity = getSeverity(level);
  }

  public log(level: LogLevel, message: string | Error): void {
    if (this.severity <= getSeverity(level)) {
      // eslint-disable-next-line no-console
      console.log(
        `[${new Date().toISOString()}] [${level.toString()}]`,
        message
      );
      if (message instanceof Error) {
        // eslint-disable-next-line no-console
        console.log(message.stack);
      }
    }
  }

  public error = (message: string | Error): void =>
    this.log(LogLevel.Error, message);

  public warning = (message: string | Error): void =>
    this.log(LogLevel.Warning, message);

  public info = (message: string | Error): void =>
    this.log(LogLevel.Info, message);

  public debug = (message: string | Error): void =>
    this.log(LogLevel.Debug, message);

  public verbose = (message: string | Error): void =>
    this.log(LogLevel.Verbose, message);
}
