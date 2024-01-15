import { getListByTeamId } from "../../../services/listService";
import { renderButton } from "./common";
import { renderCard } from "./card";
import { dragFunction } from "./drag";
import { getUserTeamByTeamId } from "../../../services/teamService";
import { IUserTeam } from "../../../interfaces/user_team";

const listElement = document.getElementById("list") as HTMLElement;

export async function renderList(teamId: string) {
  const getLists = await getListByTeamId(teamId);
  listElement.innerHTML = "";
  listElement.classList.add("list-sm");
  for await (const list of getLists) {
    const listGroupElement = document.createElement("div");
    listGroupElement.classList.add("list-group", "col-sm");

    const listNameElement = document.createElement("h3");
    listNameElement.classList.add("heading");
    listGroupElement.appendChild(listNameElement);

    const listDetailElement = document.createElement("div");
    listNameElement.innerHTML = list.title ? list.title : "";
    listDetailElement.id = `list-${list.id}`;

    listGroupElement.appendChild(listDetailElement);
    listElement.appendChild(listGroupElement);
    const buttonElement = await renderButton(list.id);
    listGroupElement?.appendChild(buttonElement);
    await renderCard(list.id);

    // await renderAddCardElement();
    // });
  }
  dragFunction();
}

export async function assignedToListInForm(
  element: HTMLElement,
  teamId: string
) {
  element.innerHTML = "";

  const defaultOptionElement = document.createElement("option");
  defaultOptionElement.innerHTML = "Choose...";
  defaultOptionElement.disabled = true;
  defaultOptionElement.selected = true;
  element.appendChild(defaultOptionElement);

  const userList = await getUserTeamByTeamId(teamId);
  userList.forEach((team: IUserTeam) => {
    const optionElement = document.createElement("option");
    optionElement.value = team.userId;
    optionElement.innerHTML = team.userId;
    element.appendChild(optionElement);
  });
}
