import axios from "axios";
import moment from "moment";
import ApiRoutes from "../constants/apiRoutes";
import Environment from "../lib/Environment";
import ErrorManager from "../lib/ErrorManager";

export const getPersonalTimetable = async (token, date = null) => {
  const params = {
    client_secret: Environment.CLIENT_SECRET,
    token,
  };

  if (date) {
    params[`date`] = moment(date).format(`YYYY-MM-DD`);
  }
  try {
    const { data } = await axios.get(ApiRoutes.PERSONAL_TIMETABLE_URL, {
      params,
    });

    return {
      // lastModified should be headers[`last-modified`]
      // but the main API is returning the wrong value
      // TODO: change this back when caching is fixed
      lastModified: new Date().toUTCString(),
      data,
    };
  } catch (error) {
    ErrorManager.captureError(error);
    throw error;
  }
};

export const getModuleTimetable = async (token, timetableModule) => {
  const { data, headers } = await axios.get(ApiRoutes.MODULE_TIMETABLE_URL, {
    params: {
      client_secret: Environment.CLIENT_SECRET,
      token,
      modules: timetableModule,
    },
  });
  return {
    lastModified: headers[`last-modified`],
    data,
  };
};

export default {
  getModuleTimetable,
  getPersonalTimetable,
};
