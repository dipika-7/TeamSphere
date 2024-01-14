import { ValidationError } from "yup";
import { AxiosError } from "axios";
import {
  createCard,
  getCardByListId,
  updateCardStatus,
} from "../../../services/cardService";
import { ICard } from "../../../interfaces/card";
const addCardForm = document.getElementById("add-card-form") as HTMLFormElement;
import {
  displayValidationError,
  validateFormData,
} from "../../../utils/validateUtil";
import { createCardSchema } from "../../../schemas/cardSchema";
import { getUserByUsername } from "../../../services/userService";
import { closeCardForm } from "./common";
import { renderList } from "./list";
import { showToastMessage } from "../../../utils/responseUtil";
const cardCloseButton = document.getElementById(
  "card-close-btn"
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
    cardItemElement.classList.add("card-item", "task", "mb-2", "py-3");

    cardItemElement.id = card.id;
    cardItemElement.draggable = true;

    const cardTitleElement = document.createElement("span");
    cardTitleElement.style.fontSize = "16px";
    cardTitleElement.innerHTML = card.title;

    const deadlineDiv = document.createElement("div");
    deadlineDiv.classList.add("p-1", "deadline", "flex-wrap");

    const iconElement = document.createElement("i");
    iconElement.classList.add("ph", "ph-clock", "icon-small-size");
    deadlineDiv.appendChild(iconElement);

    const cardDeadlineElement = document.createElement("span");
    cardDeadlineElement.style.fontSize = "12px";
    const date = card.deadline.split("T")[0];
    cardDeadlineElement.innerHTML = date;
    deadlineDiv.appendChild(cardDeadlineElement);

    const cardStatusBtnElement = document.createElement("button");
    cardStatusBtnElement.classList.add(
      "btn",
      "btn-sm",
      "btn-info",
      "status-btn"
    );
    cardStatusBtnElement.innerHTML = "Change Status";

    const cardStatusElement = document.createElement("span");
    cardStatusElement.style.fontSize = "12px";
    const status = card.status === "incomplete" ? "Incomplete" : "Complete";
    cardStatusElement.innerHTML = `Status: ${status}` || "incomplete";

    cardStatusBtnElement.addEventListener("click", async (e) =>
      handleCardStatusBtn(e, card.id, {
        cardStatusBtnElement,
        cardStatusElement,
      })
    );

    deadlineDiv.appendChild(cardStatusBtnElement);

    cardItemElement.appendChild(cardTitleElement);
    cardItemElement.appendChild(deadlineDiv);
    deadlineDiv.appendChild(cardStatusElement);
    cardListElement.appendChild(cardItemElement);

    cardItemElement.addEventListener("drag", () => {
      // dropValue = card;
      // console.log(listId, cardItemElement);
    });
  });

  cardGroupElement.appendChild(cardListElement);
  listElement?.appendChild(cardGroupElement);
}

export function addCardToList(listId: string, activeTeam: string) {
  addCardForm.setAttribute("id", `form-${listId}`);
  addCardForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const title = (
        addCardForm.elements.namedItem("title") as HTMLInputElement
      ).value;
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
      const validateData = await validateFormData(createCardSchema, data);

      const userDetail = await getUserByUsername(assignedTo);
      data.assignedTo = userDetail.id;

      if (validateData) {
        await createCard(data);
      }
      closeCardForm();

      const getCards = await getCardByListId(listId);
      renderList(getCards[0].listId, activeTeam);
      return;
    } catch (e) {
      if (e instanceof ValidationError) {
        e.inner.forEach((error) => {
          displayValidationError(addCardForm, error.path!, error.message);
        });
      }
      if (e instanceof AxiosError) {
        showToastMessage("error", e.response?.data.message);
      }
    }
  });
}

export async function handleCardStatusBtn(
  e: Event,
  cardId: string,
  element: { cardStatusBtnElement: HTMLElement; cardStatusElement: HTMLElement }
) {
  {
    e.preventDefault();
    const response = await updateCardStatus(cardId);

    const statusShow =
      response[0].status === "incomplete" ? "Incomplete" : "Complete";
    element.cardStatusElement.innerHTML =
      `Status: ${statusShow}` || "Incomplete";

    return response;
  }
}

cardCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();
});
