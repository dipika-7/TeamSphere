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
    // console.log("task", task);
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", async () => {
      console.log("dragend");
      task.classList.remove("is-dragging");
      cardId = task.id;
      console.log("cardId", cardId);
      console.log("listId", listId);
      if (cardId && listId) {
        await updateCardToNewList(listId, cardId);
      }
    });
  });

  droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      // console.log("zone", zone);
      // console.log(zone.id);
      // const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging") as HTMLElement;

      // if (!bottomTask) {
      zone.appendChild(curTask);
      // } else {
      // zone.insertBefore(curTask, bottomTask);
      // }

      listId = zone.id;
      // console.log("list", listId);
    });
  });
  /**
   * Returns the closest task HTMLElement below mouseY in zone
   *
   * @param zone
   * @param mouseY
   * @returns
   */
  // const insertAboveTask = (
  //   zone: HTMLElement,
  //   mouseY: number
  // ): HTMLElement | null => {
  //   const els = zone.querySelectorAll(
  //     ".task:not(.is-dragging)"
  //   ) as NodeListOf<HTMLElement>;

  //   let closestTask: HTMLElement | null = null;
  //   let closestOffset = Number.NEGATIVE_INFINITY;

  //   els.forEach((task) => {
  //     const { top } = task.getBoundingClientRect();

  //     const offset = mouseY - top;

  //     if (offset < 0 && offset > closestOffset) {
  //       closestOffset = offset;
  //       closestTask = task;
  //     }
  //   });

  //   return closestTask;
  // };
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
