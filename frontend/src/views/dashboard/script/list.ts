import { getListByTeamId } from "../../../services/listService";
import { renderButton } from "./common";
import { renderCard } from "./card";
import { dragFunction } from "./drag";
import { getUserTeamByTeamId } from "../../../services/teamService";
import { IUserTeam } from "../../../interfaces/user_team";

const listElement = document.getElementById("list") as HTMLElement;

export async function renderList(teamId: string) {
  const getLists = await getListByTeamId(teamId);
  // console.log("t", getLists);
  listElement.innerHTML = "";
  for await (const list of getLists) {
    const listGroupElement = document.createElement("div");
    listGroupElement.classList.add("list-group");

    const listNameElement = document.createElement("h3");
    listNameElement.classList.add("heading");
    listGroupElement.appendChild(listNameElement);

    const listDetailElement = document.createElement("div");
    listNameElement.innerHTML = list.title ? list.title : "";
    listDetailElement.id = `list-${list.id}`;

    listGroupElement.appendChild(listDetailElement);
    listElement.appendChild(listGroupElement);
    const buttonElement = await renderButton(list.id, teamId);
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
  const userList = await getUserTeamByTeamId(teamId);
  console.log(userList);
  userList.forEach((team: IUserTeam) => {
    const optionElement = document.createElement("option");
    optionElement.value = team.userId;
    optionElement.innerHTML = team.userId;
    element.appendChild(optionElement);
  });
}
