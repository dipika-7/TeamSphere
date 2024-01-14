const addCardContainer = document.getElementById(
  "add-card-container"
) as HTMLElement;
const addUserContainer = document.getElementById(
  "add-user-container"
) as HTMLElement;
const addTeamContainer = document.getElementById("team-form") as HTMLElement;
const mainContainer = document.getElementById("main-container") as HTMLElement;
import { assignedToListInForm } from "./list";
import { addCardToList } from "./card";

export async function closeCardForm() {
  addCardContainer?.classList.add("d-none");
  addUserContainer?.classList.add("d-none");
  addTeamContainer?.classList.add("d-none");

  mainContainer.style.filter = "blur(0px)";
  mainContainer.style.pointerEvents = "auto";
}

export async function renderButton(listId: string, activeTeam: string) {
  const addCardDivButton = document.createElement("div");

  const addCardButton = document.createElement("button");
  addCardButton.classList.add("btn", "btn-info", "add-card-btn");
  addCardButton.innerHTML = "Add Card";

  addCardButton.addEventListener("click", async (e) => {
    console.log("in event listener");
    e.preventDefault();
    addCardContainer.classList.remove("d-none");

    mainContainer.style.filter = "blur(5px)";
    mainContainer.style.pointerEvents = "none";

    const assignedTo = document.getElementById(
      "card-assignedTo"
    ) as HTMLSelectElement;
    await assignedToListInForm(assignedTo, activeTeam);
    addCardToList(listId, activeTeam);
  });

  addCardDivButton.appendChild(addCardButton);
  return addCardButton;
}
