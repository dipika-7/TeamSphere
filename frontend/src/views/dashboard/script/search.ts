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

  teamDetailElement.innerHTML = "";
  if (result.length <= 0 || !result) {
    renderNotAvailable();
  } else {
    renderSearchedCard(result);
  }
}

export async function renderSearchedCard(cards: ICard[]) {
  listCardContainer.innerHTML = "";

  // Div element for card group
  const cardGroupElement = document.createElement("div");
  cardGroupElement.classList.add("card-group", "mx-5", "p-2");

  // Ull element for card list in unordered list
  const cardListElement = document.createElement("ul");
  cardListElement.classList.add("card-list", "col-12", "swim-lane");

  cards.forEach(async (card: ICard) => {
    // Li element for each card
    const cardItemElement = document.createElement("li");
    cardItemElement.classList.add("card-item", "task", "mb-4", "py-3", "px-4");

    // Assign id and draggable for drag funvtion
    cardItemElement.id = card.id;
    cardItemElement.draggable = true;

    // Card title
    const cardTitleElement = document.createElement("span");
    cardTitleElement.style.fontSize = "16px";
    cardTitleElement.innerHTML = card.title;

    // Card deadline div
    const deadlineDiv = document.createElement("div");
    deadlineDiv.classList.add("deadline", "flex-wrap", "d-flex");

    const deadlineDateDiv = document.createElement("div");
    deadlineDateDiv.classList.add("deadline", "flex-wrap");

    // Clock icon
    const iconElement = document.createElement("i");
    iconElement.classList.add("ph", "ph-clock", "icon-small-size");
    deadlineDateDiv.appendChild(iconElement);

    // Card deadline
    const cardDeadlineElement = document.createElement("span");
    cardDeadlineElement.style.fontSize = "12px";
    const date = card.deadline.split("T")[0];
    cardDeadlineElement.innerHTML = date;

    // Check if deadline is passed and change text style
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    if (Date.parse(card.deadline) < endOfToday.getTime()) {
      deadlineDateDiv.classList.add("text-danger");
    }
    deadlineDateDiv.appendChild(cardDeadlineElement);

    // Store assigned to and deadline
    const cardDetailDiv = document.createElement("div");
    cardDetailDiv.classList.add("d-flex", "flex-column");

    const getUserDetail = await getUserById(card.assignedTo);

    const cardAssignedToElement = document.createElement("span");
    cardAssignedToElement.style.fontSize = "12px";
    cardAssignedToElement.innerHTML = `Assigned to: ${getUserDetail.username}`;

    // Appedn all elements
    cardItemElement.appendChild(cardTitleElement);

    cardDetailDiv.appendChild(cardAssignedToElement);

    deadlineDiv.appendChild(deadlineDateDiv);

    cardDetailDiv.appendChild(deadlineDiv);

    cardItemElement.appendChild(cardDetailDiv);
    cardListElement.appendChild(cardItemElement);
  });

  cardGroupElement.appendChild(cardListElement);
  listCardContainer?.appendChild(cardGroupElement);
}

/**
 * Render not found screen for empty search results
 */
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
