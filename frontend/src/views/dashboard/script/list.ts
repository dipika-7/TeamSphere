import { getListByTeamId } from "../../../services/listService";
import { renderButton } from "./common";
import { renderCard } from "./card";
import { dragFunction } from "./drag";
import { getUserTeamByTeamId } from "../../../services/teamService";
import { IUserTeam } from "../../../interfaces/user_team";

const listElement = document.getElementById("list") as HTMLElement;

/**
 * Render list by team
 *
 * @param teamId
 */
export async function renderList(teamId: string) {
  const getLists = await getListByTeamId(teamId);
  listElement.innerHTML = "";
  listElement.classList.add("list-sm");
  for await (const list of getLists) {
    const listGroupElement = document.createElement("div");
    listGroupElement.classList.add("list-group", "col-sm");

    // List heading
    const listNameElement = document.createElement("h3");
    listNameElement.classList.add("heading");
    listNameElement.innerHTML = list.title ? list.title : "";
    listGroupElement.appendChild(listNameElement);

    // Div to store list id
    const listDetailElement = document.createElement("div");
    listDetailElement.id = `list-${list.id}`;
    listGroupElement.appendChild(listDetailElement);

    listElement.appendChild(listGroupElement);
    const buttonElement = await renderButton(list.id);
    listGroupElement?.appendChild(buttonElement);
    await renderCard(list.id);
  }
  dragFunction();
}

/**
 * Get all team members of team as option tag and add them to element
 *
 * @param element
 * @param teamId
 */
export async function assignedToListInForm(
  element: HTMLElement,
  teamId: string
) {
  element.innerHTML = "";

  // Default option
  const defaultOptionElement = document.createElement("option");
  defaultOptionElement.innerHTML = "Choose...";
  defaultOptionElement.disabled = true;
  defaultOptionElement.selected = true;
  element.appendChild(defaultOptionElement);

  // Add all users in team as option
  const userList = await getUserTeamByTeamId(teamId);
  userList.forEach((team: IUserTeam) => {
    const optionElement = document.createElement("option");
    optionElement.value = team.userId;
    optionElement.innerHTML = team.userId;
    element.appendChild(optionElement);
  });
}
