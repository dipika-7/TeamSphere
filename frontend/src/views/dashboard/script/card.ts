import { ValidationError } from "yup";
import { AxiosError } from "axios";

import {
  createCard,
  getCardByListId,
  updateCard,
} from "../../../services/cardService";
import { ICard } from "../../../interfaces/card";
import {
  displayValidationError,
  validateFormData,
} from "../../../utils/validateUtil";
import {
  createCardSchema,
  updateCardSchema,
} from "../../../schemas/cardSchema";
import { getUserByUsername } from "../../../services/userService";
import { closeCardForm } from "./common";
import { renderList } from "./list";
import { showToastMessage } from "../../../utils/responseUtil";
import { activeTeam } from "./team";

const mainContainer = document.getElementById("main-container") as HTMLElement;
const addCardForm = document.getElementById("add-card-form") as HTMLFormElement;
const cardTitleInputElement = document.getElementById(
  "card-title"
) as HTMLFormElement;
const cardCloseButton = document.getElementById(
  "card-close-btn"
) as HTMLElement;
const cardEditFormElement = document.getElementById(
  "edit-card-form"
) as HTMLFormElement;
const editCardCloseButton = document.getElementById(
  "edit-card-close-btn"
) as HTMLElement;

export async function renderCard(listId: string) {
  const cards = await getCardByListId(listId);

  const listElement = document.getElementById(`list-${listId}`);
  const cardGroupElement = document.createElement("div");
  cardGroupElement.classList.add("card-group");

  const cardListElement = document.createElement("ul");
  cardListElement.id = listId;
  cardListElement.classList.add("card-list", "col-12", "swim-lane");

  cards.forEach((card: ICard) => {
    const cardItemElement = document.createElement("li");
    cardItemElement.classList.add("card-item", "task", "mb-2", "p-3");

    cardItemElement.id = card.id;
    cardItemElement.draggable = true;

    const cardTitleElement = document.createElement("div");
    cardTitleElement.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const cardTitle = document.createElement("span");
    cardTitle.style.fontSize = "16px";
    cardTitle.innerHTML = card.title;
    cardTitleElement.appendChild(cardTitle);

    const deadlineDiv = document.createElement("div");
    deadlineDiv.classList.add("deadline", "flex-wrap", "d-flex");

    const deadlineDateDiv = document.createElement("div");
    deadlineDateDiv.classList.add(
      "deadline",
      "flex-wrap",
      "align-items-center"
    );

    const iconElement = document.createElement("i");
    iconElement.classList.add("ph", "ph-clock", "icon-small-size");
    deadlineDateDiv.appendChild(iconElement);

    const cardDeadlineElement = document.createElement("span");
    cardDeadlineElement.style.fontSize = "12px";
    const date = card.deadline.split("T")[0];
    cardDeadlineElement.innerHTML = date;

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    if (Date.parse(card.deadline) < endOfToday.getTime()) {
      deadlineDateDiv.classList.add("text-danger");
    }
    deadlineDateDiv.appendChild(cardDeadlineElement);

    const cardDetailDiv = document.createElement("div");
    cardDetailDiv.classList.add("d-flex", "flex-column");

    const cardStatusElement = document.createElement("span");
    cardStatusElement.style.fontSize = "12px";
    const status = card.status === "incomplete" ? "Incomplete" : "Complete";
    cardStatusElement.innerHTML = `Status: ${status}` || "incomplete";

    const cardAssignedToElement = document.createElement("span");
    cardAssignedToElement.style.fontSize = "12px";
    cardAssignedToElement.innerHTML = `Assigned to: ${card.assignedTo}`;

    const editCardButtonElement = document.createElement("button");
    editCardButtonElement.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-secondary"
    );
    editCardButtonElement.innerHTML = "<i class='ph ph-pencil-simple'></i>";

    cardItemElement.appendChild(cardTitleElement);

    cardDetailDiv.appendChild(cardAssignedToElement);

    deadlineDiv.appendChild(deadlineDateDiv);
    cardTitleElement.appendChild(editCardButtonElement);

    cardDetailDiv.appendChild(deadlineDiv);

    cardItemElement.appendChild(cardDetailDiv);

    editCardButtonElement.addEventListener("click", (e) =>
      handleCardEditElement(e, card)
    );

    cardListElement.appendChild(cardItemElement);
  });

  cardGroupElement.appendChild(cardListElement);
  listElement?.appendChild(cardGroupElement);
}

cardEditFormElement.addEventListener("submit", (e) => handleEditCardForm(e));

addCardForm.addEventListener("submit", async (e) => {
  handleAddCardForm(e);
});

export function addCardToList(listId: string) {
  addCardForm.setAttribute("id", listId);
}

export async function handleCardEditElement(e: Event, card: ICard) {
  e.preventDefault();
  const cardFormContainer = document.getElementById(
    "edit-card-container"
  ) as HTMLElement;
  cardFormContainer.classList.remove("d-none");

  cardEditFormElement.editCardTitle.value = card.title || "";
  cardEditFormElement.editCardDescription.value = card.description || "";
  cardEditFormElement.editCardDeadline.value = card.deadline.split("T")[0];
  cardEditFormElement.cardId.value = card.id;

  mainContainer.style.filter = "blur(5px)";
  mainContainer.style.pointerEvents = "none";
}

export async function handleEditCardForm(e: Event) {
  try {
    e.preventDefault();

    const editCardTitle = cardEditFormElement.editCardTitle.value;
    const editCardDescription = cardEditFormElement.editCardDescription.value;
    const editCardDeadline = cardEditFormElement.editCardDeadline.value;
    const cardId = cardEditFormElement.cardId.value;

    const data = {
      editCardTitle,
      editCardDescription,
      editCardDeadline,
    };

    data.editCardDeadline = data.editCardDeadline.split("T", 1)[0];

    const validateData = await validateFormData(updateCardSchema, data);

    const updatedCardDetails = {
      title: validateData.editCardTitle,
      description: validateData.editCardDescription,
      deadline: validateData.editCardDeadline,
    };

    await updateCard(cardId, updatedCardDetails);

    closeCardForm();

    renderList(activeTeam);

    return;
  } catch (e) {
    if (e instanceof ValidationError) {
      e.inner.forEach((error) => {
        displayValidationError(cardEditFormElement, error.path!, error.message);
      });
    }
    if (e instanceof AxiosError) {
      showToastMessage("error", e.response?.data.message);
    }
  }
}

export async function handleAddCardForm(e: Event) {
  try {
    e.preventDefault();

    const listId = addCardForm.id;
    const title = (addCardForm.elements.namedItem("title") as HTMLInputElement)
      .value;
    const description = (
      addCardForm.elements.namedItem("description") as HTMLInputElement
    ).value;
    const deadline = (
      addCardForm.elements.namedItem("deadline") as HTMLInputElement
    ).value;
    const assignedTo = (
      addCardForm.elements.namedItem("assignedTo") as HTMLInputElement
    ).value;

    const data = {
      title,
      description,
      deadline,
      assignedTo,
      listId,
    };

    data.deadline = data.deadline.split("T", 1)[0];

    const validateData = await validateFormData(createCardSchema, data);

    const userDetail = await getUserByUsername(assignedTo);
    data.assignedTo = userDetail.id;

    if (validateData) {
      await createCard(data);
    }

    closeCardForm();

    const getCards = await getCardByListId(data.listId);
    resetAddCardForm();
    renderList(activeTeam);
    return getCards;
  } catch (e) {
    if (e instanceof ValidationError) {
      e.inner.forEach((error) => {
        displayValidationError(addCardForm, error.path!, error.message);
      });
    }
    if (e instanceof AxiosError) {
      if (e.response?.status === 404) {
        displayValidationError(
          addCardForm,
          "assignedTo",
          "Assigned to is required"
        );
      } else {
        showToastMessage("error", e.response?.data.message);
      }
    }
  }
}

editCardCloseButton?.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();
});

cardCloseButton?.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();

  //reset form value
  resetAddCardForm();
});

export async function resetAddCardForm() {
  cardTitleInputElement.value = "";
  addCardForm.description.value = "";
  addCardForm.deadline.value = "";
  addCardForm.assignedTo.selectedIndex = 0;
}

cardTitleInputElement?.addEventListener("input", () => {
  cardTitleInputElement.classList.remove("is-invalid");
});

addCardForm?.description?.addEventListener("input", () => {
  addCardForm.description.classList.remove("is-invalid");
});

addCardForm?.deadline?.addEventListener("input", () => {
  addCardForm.deadline.classList.remove("is-invalid");
});
addCardForm?.assignedTo?.addEventListener("input", () => {
  addCardForm.assignedTo.classList.remove("is-invalid");
});
