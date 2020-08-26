import { Middleware, ParameterizedContext, Next } from 'koa';
import { ContextState } from '../types/koa';

const error: Middleware<ContextState> = async (
  ctx: ParameterizedContext<ContextState>,
  next: Next
) => {
  try {
    await next();
  } catch (err) {
    ctx.state.logger.error(err);
    ctx.status = 500;
  }
};

export default error;
