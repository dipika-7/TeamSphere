import { fetchAndInsertNavBarContent } from "./navbar";
import { handleSearch } from "./search";
import { renderTeam } from "./team";

const teamButton = document.getElementById("team-button") as HTMLElement;
const teamMembers = document.getElementById("team-members") as HTMLElement;
const userFormElement = document.getElementById(
  "add-user-form"
) as HTMLFormElement;
const addUserBtn = document.getElementById("btn-add-user");
import { handleAddUserBtn, handleAddUserFormSubmit } from "./user";

const searchField = document.getElementById("search-field") as HTMLInputElement;

/**
 * Function to fetch on window load
 */
window.onload = async () => {
  await fetchAndInsertNavBarContent();
  await renderTeam();
  addUserBtn?.addEventListener("click", (e) => handleAddUserBtn(e));
};

userFormElement.addEventListener("submit", async (e) =>
  handleAddUserFormSubmit(e)
);

teamButton.addEventListener("mouseenter", function () {
  teamMembers.style.display = "block";
});

teamButton.addEventListener("mouseleave", function () {
  teamMembers.style.display = "none";
});

teamMembers.addEventListener("mouseenter", function () {
  teamMembers.style.display = "block";
});

teamMembers.addEventListener("mouseleave", function () {
  teamMembers.style.display = "none";
});

searchField.addEventListener("change", (e) => handleSearch(e));
