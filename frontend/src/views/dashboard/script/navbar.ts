import { IUserTeam } from "../../../interfaces/user_team";
import { logout } from "../../../services/authService";
import { getTeamListByUserId } from "../../../services/userService";
import { renderList } from "./list";
import { checkTeam, renderTeamDetail } from "./team";

/**
 * Fetch and insert nav bar content
 */
export async function fetchAndInsertNavBarContent() {
  try {
    const navBarElement =
      document.getElementById("navbar-container") ||
      document.createElement("div");

    const response = await fetch("../../components/navbar/navbar.html");
    const html = await response.text();
    navBarElement.innerHTML = html;

    const logoutBtn = document.getElementById("logout-btn") as HTMLElement;
    const logoutBtnCollapse = document.getElementById(
      "logout-btn-collapse"
    ) as HTMLElement;

    logoutBtn?.addEventListener("click", async (e) => handleLogout(e));

    logoutBtnCollapse?.addEventListener("click", async (e) => handleLogout(e));

    fetchNavListForCollapse();
  } catch (error) {
    console.error("Error fetching or inserting content:", error);
  }
}

/**
 *  Fetch nav list item for mobile view
 */
async function fetchNavListForCollapse() {
  const navListCollapseElement = document.getElementById(
    "team-list-collapse"
  ) as HTMLElement;
  const collapsibleNav = document.getElementById("collapsibleNavbar");

  const teamList = await getTeamListByUserId();
  await teamList.forEach((team: IUserTeam) => {
    const navTeamItem = document.createElement("li");
    navTeamItem.classList.add("nav-item");

    const navTeamAnchor = document.createElement("a");
    navTeamAnchor?.classList.add("nav-link");
    navTeamAnchor.innerHTML = team.teamName || "";

    navTeamItem.appendChild(navTeamAnchor);
    navListCollapseElement.appendChild(navTeamItem);

    navTeamItem.addEventListener("click", async () => {
      renderTeamDetail(team.teamId);
      const activeTeam = team.teamId;
      await renderList(activeTeam);
      await checkTeam(activeTeam);
      if (collapsibleNav) {
        collapsibleNav.classList.remove("show"); // Hide the collapsed navbar
      }
    });
  });
}

/**
 * Remove access token and refresh token
 *
 * @param e
 * @returns The logout message
 */
async function handleLogout(e: Event) {
  e.preventDefault();
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const result = await logout(refreshToken);
      return result;
    } catch (error) {
      // Handle errors, e.g., display an alert
      console.error("Error during logout:", error);
    }
  }
}
