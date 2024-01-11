const accessToken = localStorage.getItem("accessToken");
export const headers = {
  Authorization: `Bearer ${accessToken}`,
};
