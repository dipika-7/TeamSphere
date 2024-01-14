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
const addUserBtn = document.getElementById("btn-add-user");
import { getTeamListByUserId } from "../../../services/userService";
import { renderList } from "./list";
import { IUserTeam } from "../../../interfaces/user_team";
import { closeCardForm } from "./common";
import {
  displayValidationError,
  validateFormData,
} from "../../../utils/validateUtil";
import { createTeamSchema } from "../../../schemas/teamSchema";
import { ValidationError } from "yup";
import { AxiosError } from "axios";
import { showToastMessage } from "../../../utils/responseUtil";

const teamFormElement = document.getElementById("team-form") as HTMLFormElement;
const teamNameInput = document.getElementById("team-name") as HTMLInputElement;
const addTeamButton = document.getElementById("add-team-btn") as HTMLElement;

const addTeamCloseButton = document.getElementById(
  "add-team-close-btn"
) as HTMLElement;
const teamListElement = document.getElementById("team-list") as HTMLElement;
const teamDescriptionInput = document.getElementById(
  "team-description"
) as HTMLInputElement;

export let activeTeam: string;
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
    if (teamList.length > 0) {
      activeTeam = teamList[0].teamId;
      renderTeamDetail(teamList[0].teamId);
      await renderList(activeTeam);
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
        await renderList(activeTeam);
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

  //reset form
  teamNameInput.value = "";
  teamDescriptionInput.value = "";
});

teamFormElement.addEventListener("submit", async (e) => {
  try {
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
    const validateData = await validateFormData(createTeamSchema, data);
    console.log(validateData);
    if (validateData) {
      await createTeam(data);
      teamFormElement.classList.add("d-none");
      await renderTeam();
    }
    return;
  } catch (e) {
    if (e instanceof ValidationError) {
      e.inner.forEach((error) => {
        displayValidationError(teamFormElement, error.path!, error.message);
      });
    }
    if (e instanceof AxiosError) {
      showToastMessage("error", e.response?.data.message);
    }
  }
});

addTeamButton.addEventListener("click", (e) => {
  e.preventDefault();
  teamFormElement.classList.remove("d-none");
});

teamNameInput.addEventListener("input", () => {
  teamNameInput.classList.remove("is-invalid");
});

teamDescriptionInput.addEventListener("input", () => {
  teamDescriptionInput.classList.remove("is-invalid");
});
