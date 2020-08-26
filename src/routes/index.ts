import Router from '@koa/router';
import { ParameterizedContext } from 'koa';
import { ContextState } from '../types/koa';
import { getBuildStr } from '../utils/misc';

const routes = new Router();

routes.get('/', (ctx: ParameterizedContext<ContextState>) => {
  ctx.status = 200;
  ctx.body = {
    msg: `${getBuildStr()} server is alive! :)`,
  };
});

/**
 * Access to logger, db connection and query as follows.
 * The context states are configured at middlewares.
 */

// routes.get("/examples", async (ctx: ParameterizedContext<ContextState>) => {
//   const examples = await ctx.state.client
//     .query<ExampleModel>(`SELECT * FROM ${EXAMPLE_TABLE}`)
//     .then((result) => result.rows);
//   ctx.state.logger.debug(JSON.stringify(examples));
//   ctx.status = 200;
//   ctx.body = {
//     examples: examples,
//   };
// });

export default routes;
