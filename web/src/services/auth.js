export const TOKEN_KEY = "@team-Token";
export const TEAM_KEY = "@team-Identifier"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getTeamThatIsAuthenticated = () => localStorage.getItem(TEAM_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, teamId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TEAM_KEY, teamId);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TEAM_KEY);
};