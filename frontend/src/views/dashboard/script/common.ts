const addCardContainer = document.getElementById(
  "add-card-container"
) as HTMLElement;
const addUserContainer = document.getElementById(
  "add-user-container"
) as HTMLElement;
import { assignedToListInForm } from "./list";
import { addCardToList } from "./card";
import { activeTeam } from "./team";

const addTeamContainer = document.getElementById("team-form") as HTMLElement;
const mainContainer = document.getElementById("main-container") as HTMLElement;
const cardEditFormElement = document.getElementById(
  "edit-card-container"
) as HTMLElement;

export async function closeCardForm() {
  addCardContainer?.classList.add("d-none");
  addUserContainer?.classList.add("d-none");
  addTeamContainer?.classList.add("d-none");
  cardEditFormElement?.classList.add("d-none");

  mainContainer.style.filter = "blur(0px)";
  mainContainer.style.pointerEvents = "auto";
}

export async function renderButton(listId: string) {
  const addCardDivButton = document.createElement("div");

  const addCardButton = document.createElement("button");
  addCardButton.classList.add("btn", "btn-info", "add-card-btn", "mx-3");
  addCardButton.innerHTML = "Add Card";

  addCardButton.addEventListener("click", async (e) => {
    e.preventDefault();
    addCardContainer.classList.remove("d-none");

    mainContainer.style.filter = "blur(5px)";
    mainContainer.style.pointerEvents = "none";

    const assignedTo = document.getElementById(
      "assignedTo"
    ) as HTMLSelectElement;
    await assignedToListInForm(assignedTo, activeTeam);
    addCardToList(listId);
  });

  addCardDivButton.appendChild(addCardButton);
  return addCardButton;
}
