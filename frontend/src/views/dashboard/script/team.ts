const aboutTeamElement = document.getElementById("about-team") as HTMLElement;
const teamDetailElement = document.getElementById("team-detail") as HTMLElement;

import {
  checkTeamCreateByUser,
  createTeam,
  getTeamById,
  getTeamMemberByTeamId,
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
import { getCardByAssigneeId } from "../../../services/cardService";
import { renderNotAvailable, renderSearchedCard } from "./search";

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
const mainContainer = document.getElementById("main-container") as HTMLElement;
const teamMemberContainer = document.getElementById(
  "team-members"
) as HTMLElement;
const teamActionElement = document.getElementById("about-team") as HTMLElement;

export let activeTeam: string;

export async function renderTeamDetail(teamId: string) {
  aboutTeamElement.classList.remove("d-none");
  const teamDetail = await getTeamById(teamId);
  teamDetailElement.innerHTML = "";
  const teamNameElement = document.createElement("p");
  teamNameElement.classList.add("heading");
  teamNameElement.innerHTML = teamDetail.name ? teamDetail.name : "";
  teamDetailElement.appendChild(teamNameElement);
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

    const teamList = await getTeamListByUserId();

    if (teamList.length > 0) {
      activeTeam = teamList[0].teamId;
      renderTeamDetail(teamList[0].teamId);
      await renderList(activeTeam);
      await checkTeam(activeTeam);
      await getTeamMembersByTeamId();
    } else {
      const noTeamCardElement = document.createElement("div");
      noTeamCardElement.classList.add("card", "p-5", "mx-auto", "my-5");

      const noTeamElement = document.createElement("p");
      noTeamElement.innerHTML = "You are not added to any teams";
      teamActionElement.innerHTML = "";
      noTeamCardElement.appendChild(noTeamElement);
      teamActionElement.appendChild(noTeamCardElement);
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
        await getTeamMembersByTeamId();
      });
      teamListElement.appendChild(teamElement);
    });
    return activeTeam;
  } catch (e) {
    console.log(e);
  }
}

export async function getTeamMembersByTeamId() {
  const members = await getTeamMemberByTeamId(activeTeam);
  if (members) {
    teamMemberContainer.innerHTML = "";
    members.forEach((member: IUserTeam) => {
      const createUlElement = document.createElement("ul");

      const createMemberItem = document.createElement("li");
      createMemberItem.classList.add("pb-2", "team-member-item");

      createMemberItem.innerHTML = member.userName || "";
      createUlElement.appendChild(createMemberItem);
      teamMemberContainer.appendChild(createUlElement);
      createMemberItem.addEventListener(
        "click",
        async (e) => await handleToFilterCard(e, member)
      );
    });
  }
}

export async function handleToFilterCard(e: Event, member: IUserTeam) {
  e.preventDefault();
  const getCardsByAssignedId = await getCardByAssigneeId(
    member.userId,
    member.teamId
  );
  if (getCardsByAssignedId.length <= 0 || !getCardsByAssignedId) {
    renderNotAvailable();
  } else {
    renderSearchedCard(getCardsByAssignedId);
  }
}

addTeamCloseButton?.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();

  //reset form
  teamNameInput.value = "";
  teamDescriptionInput.value = "";
});

teamFormElement?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    teamNameInput.classList.remove("is-invalid");
    teamDescriptionInput.classList.remove("is-invalid");

    const name = teamNameInput.value;
    const description = teamDescriptionInput.value;
    const data = {
      name,
      description,
    };
    const validateData = await validateFormData(createTeamSchema, data);
    if (validateData) {
      await createTeam(data);
      teamFormElement.classList.add("d-none");
      await renderTeam();
      mainContainer.style.filter = "blur(0px)";
      mainContainer.style.pointerEvents = "auto";
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

addTeamButton?.addEventListener("click", (e) => {
  e.preventDefault();
  teamFormElement.classList.remove("d-none");
  mainContainer.style.filter = "blur(5px)";
  mainContainer.style.pointerEvents = "none";
});

teamNameInput?.addEventListener("input", () => {
  teamNameInput.classList.remove("is-invalid");
});

teamDescriptionInput?.addEventListener("input", () => {
  teamDescriptionInput.classList.remove("is-invalid");
});
