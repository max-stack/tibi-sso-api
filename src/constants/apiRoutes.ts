import Environment from "../lib/Environment";

const API_URL = Environment.API_URL || `https://uclapi.com`;
const TIMETABLE_BASE_URL = `${API_URL}/timetable`;

export default {
  API_URL,
  USER_TOKEN_URL: `${API_URL}/oauth/token`,
  USER_DATA_URL: `${API_URL}/oauth/user/data`,
  PERSONAL_TIMETABLE_URL: `${TIMETABLE_BASE_URL}/personal`,
  MODULE_TIMETABLE_URL: `${TIMETABLE_BASE_URL}/bymodule`,
};
