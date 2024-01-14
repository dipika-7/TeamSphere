import { fetchAndInsertNavBarContent } from "./navbar";
import { renderTeam } from "./team";

const userFormElement = document.getElementById(
  "add-user-form"
) as HTMLFormElement;
const addUserBtn = document.getElementById("btn-add-user");
import { handleAddUserBtn, handleAddUserFormSubmit } from "./user";

window.onload = async () => {
  fetchAndInsertNavBarContent();
  // renderProfile();
  await renderTeam();
  addUserBtn?.addEventListener("click", (e) => handleAddUserBtn(e));
};

userFormElement.addEventListener("submit", async (e) =>
  handleAddUserFormSubmit(e)
);
