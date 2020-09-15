const indexRoutes = {
  routes: {
    "/connect/uclapi": `Authorise via the UCL API`,
    "/connect/uclapi/callback": `Callback from the UCL API`,
    "/user": `Get information about the currently authenticated user.`,
    "/timetable": {
      description: `Returns the timetable for the current user.`,
      parameters: {
        date: `filter by date.`,
      },
    },
    "/ping": `returns a 200 OK message. good for testing liveness`,
    "/echo": `returns the HTTP message body as the content`,
  },
  tips: {
    "pretty-print": `Add ?pretty=true to pretty print the json (as shown)`,
  },
};

export default indexRoutes;
