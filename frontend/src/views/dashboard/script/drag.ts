let listId = "";
let cardId = "";

import { getCardByListId, updateCard } from "../../../services/cardService";

/**
 * Create draggable and droppable objects and their event listeners
 */
export async function dragFunction() {
  // HTMLElements that can be dragged have "task" class
  const draggables = document.querySelectorAll(
    ".task"
  ) as NodeListOf<HTMLElement>;

  // HTMLElements where draggable objects can be dropeed to have "swim-lane" class
  const droppables = document.querySelectorAll(
    ".swim-lane"
  ) as NodeListOf<HTMLElement>;

  // Event listeners for draggable objects to update classList
  draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", async () => {
      task.classList.remove("is-dragging");
      cardId = task.id;
      if (cardId && listId) {
        await updateCardToNewList(listId, cardId);
      }
    });
  });

  droppables.forEach((zone) => {
    // Event listener for when a draggable object is over the droppable object
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();

      // Get the current "is-dragging" object
      const curTask = document.querySelector(".is-dragging") as HTMLElement;

      // Append the dragged object to end of swim-lane
      zone.appendChild(curTask);

      listId = zone.id;
    });
  });
}

/**
 * Update Card to new list
 *
 * @param listId
 * @param cardId
 * @returns The updated card details
 */
export async function updateCardToNewList(listId: string, cardId: string) {
  const getCardList = await getCardByListId(listId);

  let priority;
  if (getCardList.length <= 0) {
    priority = 1;
  } else {
    priority = getCardList.length + 1;
  }
  const updatedCard = await updateCard(cardId, { listId, priority });
  return updatedCard;
}
