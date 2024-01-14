import { logout } from "../../../services/authService";

export async function fetchAndInsertNavBarContent() {
  try {
    const navBarElement =
      document.getElementById("navbar-container") ||
      document.createElement("div");

    const response = await fetch("../../components/navbar/navbar.html");
    const html = await response.text();
    navBarElement.innerHTML = html;

    const logoutBtn = document.getElementById("logout-btn") as HTMLElement;

    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const refreshToken = localStorage.getItem("refreshToken");
      //   const result = await logout(refreshToken);
      console.log(refreshToken);
      if (refreshToken) {
        try {
          const result = await logout(refreshToken);
          console.log("Logout successful");
          return result;
        } catch (error) {
          // Handle errors, e.g., display an alert
          console.error("Error during logout:", error);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching or inserting content:", error);
  }
}
