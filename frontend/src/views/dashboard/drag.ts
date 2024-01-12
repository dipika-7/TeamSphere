export function dragFunction() {
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
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });
  });

  droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      // console.log("zone", zone);
      // console.log(zone.id);
      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging") as HTMLElement;

      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }
    });
  });

  const insertAboveTask = (
    zone: HTMLElement,
    mouseY: number
  ): HTMLElement | null => {
    const els = zone.querySelectorAll(
      ".task:not(.is-dragging)"
    ) as NodeListOf<HTMLElement>;

    let closestTask: HTMLElement | null = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
      const { top } = task.getBoundingClientRect();

      const offset = mouseY - top;

      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });

    return closestTask;
  };
}
