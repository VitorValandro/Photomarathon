export const TOKEN_KEY = "@team-Token";
export const TEAM_KEY = "@team-Identifier";
export const TOKEN_CHECKIN = "@team-Token-CheckInDate";

export const isAuthenticated = () => {
  var OneDayFromNow = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
  return localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem(TOKEN_CHECKIN) < OneDayFromNow; 
}
export const getTeamThatIsAuthenticated = () => localStorage.getItem(TEAM_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, teamId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TEAM_KEY, teamId);
  localStorage.setItem(TOKEN_CHECKIN, Date.now());
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TEAM_KEY);
  localStorage.removeItem(TOKEN_CHECKIN);
};