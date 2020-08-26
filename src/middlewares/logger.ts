import { ParameterizedContext, Middleware, Next } from 'koa';
import { Logger, parseLogLevel } from '../utils/logger';
import { ContextState } from '../types/koa';

const logger = (): Middleware<ContextState> => async (
  ctx: ParameterizedContext<ContextState>,
  next: Next
) => {
  const { LOG_LEVEL } = process.env;
  const level = parseLogLevel(LOG_LEVEL ?? 'debug');
  ctx.state.logger = new Logger(level);
  await next();
};

export default logger;
