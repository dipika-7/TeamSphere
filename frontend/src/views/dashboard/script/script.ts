import { fetchAndInsertNavBarContent } from "./navbar";
import { renderTeam } from "./team";

const userFormElement = document.getElementById(
  "add-user-form"
) as HTMLFormElement;
const addUserBtn = document.getElementById("btn-add-user");
import { handleAddUserBtn, handleAddUserFormSubmit } from "./user";

let activeTeam: string;

window.onload = async () => {
  fetchAndInsertNavBarContent();
  // renderProfile();
  activeTeam = await renderTeam();
};

userFormElement.addEventListener("submit", async (e) =>
  handleAddUserFormSubmit(e, activeTeam)
);

addUserBtn?.addEventListener("click", (e) => handleAddUserBtn(e, activeTeam));
