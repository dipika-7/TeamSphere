const aboutTeamElement = document.getElementById("about-team") as HTMLElement;
const teamDetailElement = document.getElementById("team-detail") as HTMLElement;

import {
  checkTeamCreateByUser,
  createTeam,
  getTeamById,
} from "../../../services/teamService";
const buttonElement = document.getElementsByClassName(
  "add-card-btn"
) as HTMLCollectionOf<Element>;
const addUserBtn = document.getElementById("add-user");
import { getTeamListByUserId } from "../../../services/userService";
import { renderList } from "./list";
import { IUserTeam } from "../../../interfaces/user_team";
import { closeCardForm } from "./common";
const teamFormElement = document.getElementById("team-form") as HTMLElement;
const teamNameInput = document.getElementById("team-name") as HTMLInputElement;
const addTeamButton = document.getElementById("add-team-btn") as HTMLElement;

const addTeamCloseButton = document.getElementById(
  "add-team-close-btn"
) as HTMLElement;
const teamListElement = document.getElementById("team-list") as HTMLElement;
const teamDescriptionInput = document.getElementById(
  "team-description"
) as HTMLInputElement;

export async function renderTeamDetail(teamId: string) {
  aboutTeamElement.classList.remove("d-none");
  const teamDetail = await getTeamById(teamId);
  teamDetailElement.innerHTML = "";
  const teamNameElement = document.createElement("p");
  teamNameElement.classList.add("heading");
  teamNameElement.innerHTML = teamDetail.name ? teamDetail.name : "";
  teamDetailElement.appendChild(teamNameElement);
  // const teamDescElement = document.createElement("p");
  // teamDescElement.innerHTML = teamDetail.description
  //   ? teamDetail.description
  //   : "";
  // teamDetailElement.appendChild(teamDescElement);
}

export async function checkTeam(teamId: string) {
  const response = await checkTeamCreateByUser(teamId);
  if (!response) {
    [...buttonElement].forEach((btn) => {
      btn.classList.add("d-none");
    });
    addUserBtn?.classList.add("d-none");
  } else {
    [...buttonElement].forEach((btn) => {
      btn.classList.remove("d-none");
    });
    addUserBtn?.classList.remove("d-none");
  }
}

export async function renderTeam() {
  try {
    teamListElement.innerHTML = "";

    // const teamResponse = await http.get("/teams");
    const teamList = await getTeamListByUserId();
    let activeTeam;
    if (teamList.length > 0) {
      activeTeam = teamList[0].teamId;
      renderTeamDetail(teamList[0].teamId);
      await renderList(teamList[0].teamId, activeTeam);
      await checkTeam(activeTeam);
    } else {
      const noTeamElement = document.createElement("p");
      noTeamElement.innerHTML = "No Teams";
    }

    await teamList.forEach((team: IUserTeam) => {
      const teamElement = document.createElement("li");
      teamElement.classList.add("team-list", "p-2");
      if (team.teamName) {
        teamElement.innerHTML = team.teamName;
      }
      teamElement.addEventListener("click", async () => {
        activeTeam = team.teamId;
        renderTeamDetail(team.teamId);
        await renderList(team.teamId, activeTeam);
        await checkTeam(activeTeam);
      });
      teamListElement.appendChild(teamElement);
    });
    return activeTeam;
  } catch (e) {
    console.log(e);
  }
}

addTeamCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();
});

teamFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("create team form");
  teamNameInput.classList.remove("is-invalid");
  teamDescriptionInput.classList.remove("is-invalid");

  const name = teamNameInput.value;
  const description = teamDescriptionInput.value;
  const data = {
    name,
    description,
  };
  // if (validateInput(data)) {
  // console.log("Login success");
  await createTeam(data);
  teamFormElement.classList.add("d-none");
  await renderTeam();
  // }
  return;
});

addTeamButton.addEventListener("click", (e) => {
  e.preventDefault();
  teamFormElement.classList.remove("d-none");
});