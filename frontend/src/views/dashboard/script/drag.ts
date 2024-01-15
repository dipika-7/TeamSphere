let listId = "";
let cardId = "";

import { getCardByListId, updateCard } from "../../../services/cardService";

export async function dragFunction() {
  const draggables = document.querySelectorAll(
    ".task"
  ) as NodeListOf<HTMLElement>;
  const droppables = document.querySelectorAll(
    ".swim-lane"
  ) as NodeListOf<HTMLElement>;

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
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const curTask = document.querySelector(".is-dragging") as HTMLElement;

      zone.appendChild(curTask);

      listId = zone.id;
    });
  });
}

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
