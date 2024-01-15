export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/signup",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/get-new-access-token",
  CHANGE_PASSWORD: "/auth/change-password",
};

export const USER_ENDPOINTS = {
  PROFILE: "/users/profile",
  USERS: "/users",
  USER: "/users/user",
  USERS_LIST: "/users/list",
};

export const CARD_ENDPOINTS = {
  CARDS_BY_LISTID: "/cards/list",
  CARDS: "/cards",
  CARDS_SEARCH: "/cards/search",
  CARDS_FILTER: "/cards/filter",
  UPDATE_CARD: "/cards/status",
};

export const LIST_ENDPOINTS = {
  LISTS_BY_TEAM: "/lists/team",
};

export const TEAM_ENDPOINTS = {
  TEAM: "/teams",
  USER_CHECK_TEAM: "/teams/check-team",
};

export const USER_TEAM_ENDPOINTS = {
  USER_TEAM: "/user-team",
  USER_TEAM_BY_TEAM_ID: "/user-team/team",
  TEAM_MEMBER_BY_TEAM_ID: "/user-team/team-member",
  USER_TEAM_BY_USER_ID: "/user-team/user",
};
