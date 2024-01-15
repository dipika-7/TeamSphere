import { ICard } from "../../../interfaces/card";
import { searchCard } from "../../../services/cardService";
import { getUserById } from "../../../services/userService";
const listCardContainer = document.getElementById(
  "main-board-container"
) as HTMLElement;
const teamDetailElement = document.getElementById("team-detail") as HTMLElement;
const searchField = document.getElementById("search-field") as HTMLInputElement;
export async function handleSearch(e: Event) {
  e.preventDefault();
  const searchTerm = searchField.value;
  const result = await searchCard(searchTerm);
  searchField.value = "";

  // listCardContainer.innerHTML = "";
  teamDetailElement.innerHTML = "";
  if (result.length <= 0 || !result) {
    renderNotAvailable();
  } else {
    renderSearchedCard(result);
  }
}

export async function renderSearchedCard(cards: ICard[]) {
  listCardContainer.innerHTML = "";

  const cardGroupElement = document.createElement("div");
  cardGroupElement.classList.add("card-group", "mx-2", "p-2");

  const cardListElement = document.createElement("ul");
  cardListElement.classList.add("card-list", "col-12", "swim-lane");

  cards.forEach(async (card: ICard) => {
    const cardItemElement = document.createElement("li");
    cardItemElement.classList.add("card-item", "task", "mb-2", "py-3");

    cardItemElement.id = card.id;
    cardItemElement.draggable = true;

    const cardTitleElement = document.createElement("span");
    cardTitleElement.style.fontSize = "16px";
    cardTitleElement.innerHTML = card.title;

    const deadlineDiv = document.createElement("div");
    deadlineDiv.classList.add("p-1", "deadline", "flex-wrap", "d-flex");

    const deadlineDateDiv = document.createElement("div");
    deadlineDateDiv.classList.add("p-1", "deadline", "flex-wrap");

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

    const getUserDetail = await getUserById(card.assignedTo);

    const cardAssignedToElement = document.createElement("span");
    cardAssignedToElement.style.fontSize = "12px";
    cardAssignedToElement.innerHTML = `Assigned to: ${getUserDetail.username}`;

    cardItemElement.appendChild(cardTitleElement);

    cardDetailDiv.appendChild(cardStatusElement);
    cardDetailDiv.appendChild(cardAssignedToElement);

    deadlineDiv.appendChild(deadlineDateDiv);

    cardDetailDiv.appendChild(deadlineDiv);

    cardItemElement.appendChild(cardDetailDiv);
    cardListElement.appendChild(cardItemElement);
  });

  cardGroupElement.appendChild(cardListElement);
  listCardContainer?.appendChild(cardGroupElement);
}

export async function renderNotAvailable() {
  listCardContainer.innerHTML = "";
  const card = document.createElement("div");
  card.classList.add("card", "text-center", "not-available-card");
  card.style.width = "18rem";

  const cardIcon = document.createElement("i");
  cardIcon.classList.add("ph", "ph-smiley-x-eyes");
  cardIcon.style.fontSize = "80px";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "mt-3");
  cardTitle.textContent = "No Tasks Found";

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent =
    "Sorry, we couldn't find any matching items. Please try a different search.";

  // Append elements
  cardBody.appendChild(cardIcon);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  card.appendChild(cardBody);

  listCardContainer.appendChild(card);
}
