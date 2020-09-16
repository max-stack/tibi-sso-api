import { Context } from "koa";
import querystring from "querystring";
import { genToken } from "../middleware/auth";
import User from "../uclapi/user";
const { getToken, getUserData } = User;

const callback = async (ctx: Context): Promise<void> => {
  console.log(
    "HIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPYYYYYYYYYYYYYYYY"
  );
  console.log(ctx.session);
  console.log("Hey");
  if (!Object.keys(ctx.session).includes("state")) {
    ctx.throw("You need to authorise first", 401);
  }
  const { result, code, state } = ctx.query;

  if (`${state}` !== `${ctx.session.state}`) {
    ctx.throw("States don't match", 500);
  }

  if (result === "denied") {
    ctx.throw("request denied", 400);
  }

  let json = await getToken(code);

  const apiToken = json.token;

  console.log(`made it`);

  json = await getUserData(apiToken);

  const user = {
    department: json.department,
    email: json.email,
    full_name: json.full_name,
    given_name: json.given_name,
    upi: json.upi,
    scopeNumber: json.scope_number,
    apiToken,
  };

  const jwt = genToken(user);

  const queryObj = {
    ...user,
    token: jwt,
  };
  const query = querystring.stringify(queryObj);
  ctx.redirect(`${ctx.session.redirectURL}?${query}`);
};

export default callback;
