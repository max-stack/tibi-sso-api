import Koa from "koa";
import Router from "koa-router";
import { jwt } from "../middleware/auth";
import redis from "../redis";
import { getModuleTimetable, getPersonalTimetable } from "./timetable";
import { getUserData } from "./user";

const app = new Koa();
const router = new Router();

router.get(`/user`, jwt, async (ctx) => {
  ctx.body = await getUserData(ctx.state.user.apiToken);
});

router.get(`/timetable`, jwt, async (ctx) => {
  const date = ctx.query.date || null;

  const timetableData = await redis.loadOrFetch(
    ctx,
    `${redis.keys.TIMETABLE_PERSONAL_PATH}/${ctx.state.user.upi}/${date}`,
    async () => getPersonalTimetable(ctx.state.user.apiToken, date),
    redis.ttl.TIMETABLE_TTL
  );
  const { lastModified, data } = timetableData;
  ctx.body = data;
  ctx.set(`Last-Modified`, lastModified);
});
router.get(`/timetable/:module`, jwt, async (ctx) => {
  ctx.assert(ctx.params.module, 400);
  const { module: timetableModule } = ctx.params;
  const date = ctx.query.date || null;

  const timetableData = await redis.loadOrFetch(
    ctx,
    `${redis.keys.TIMETABLE_MODULE_PATH}/${timetableModule}/${date}`,
    async () => getModuleTimetable(ctx.state.user.apiToken, timetableModule),
    redis.ttl.TIMETABLE_TTL
  );

  const { lastModified, data } = timetableData;
  ctx.body = data;
  ctx.set(`Last-Modified`, lastModified);
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
