// import { IUser } from "../../interfaces/auth";
import { ITeam } from "../../interfaces/team";
import { IList } from "../../interfaces/list";
import { http } from "../../services/httpService";
import { getListByTeamId } from "../../services/listService";
import {
  createTeam,
  getTeamById,
  getTeamsByUserId,
} from "../../services/teamService";
import { createCard, getCardByListId } from "../../services/cardService";
import { ICard } from "../../interfaces/card";
import { headers } from "../../utils/authHeaderUtil";
import { getUserByUsername } from "../../services/userService";
import {
  displayValidationError,
  validateFormData,
} from "../../utils/validateUtil";
import { createCardSchema } from "../../schemas/cardSchema";
import { ValidationError } from "yup";
import { AxiosError } from "axios";
import { showToastMessage } from "../../utils/responseUtil";
import { dragFunction } from "./drag";
// import {
//   displayValidationError,
//   validateFormData,
// } from "../../utils/validateUtil";
// import { showToastMessage } from "../../utils/responseUtil";
// import { AxiosError } from "axios";
// import { ValidationError } from "yup";

const userName = document.getElementById("user-name") as HTMLElement;
const designation = document.getElementById("user-designation") as HTMLElement;
const teamListElement = document.getElementById("team-list") as HTMLElement;
const addCardContainer = document.getElementById(
  "add-card-container"
) as HTMLElement;
const addTeamButton = document.getElementById("add-team-btn") as HTMLElement;
const teamFormElement = document.getElementById("team-form") as HTMLElement;
const teamNameInput = document.getElementById("team-name") as HTMLInputElement;
const teamDescriptionInput = document.getElementById(
  "team-description"
) as HTMLInputElement;

const mainContainer = document.getElementById("main-container") as HTMLElement;
const teamDetailElement = document.getElementById("team-detail") as HTMLElement;
const listElement = document.getElementById("list") as HTMLElement;
// const addCardDiv = document.getElementById("add-card") as HTMLElement;
const addCardForm = document.getElementById("add-card-form") as HTMLFormElement;
const aboutTeamElement = document.getElementById("about-team") as HTMLElement;

const cardCloseButton = document.getElementById(
  "card-close-btn"
) as HTMLElement;

window.onload = async () => {
  fetchAndInsertNavBarContent();
  renderProfile();
  renderTeam();
};

async function renderProfile() {
  const userResponse = await http.get("/users", {
    headers,
  });
  const userProfile = userResponse.data.data;
  if (userProfile) {
    userName.innerHTML = userProfile.username;
    designation.innerHTML = userProfile.designation;
  }
}

async function renderTeam() {
  try {
    teamListElement.innerHTML = "";

    const teamResponse = await http.get("/teams", {
      headers,
    });
    const teamList = teamResponse.data.data;
    console.log("here manual team and list");
    renderTeamDetail("b450e583-c15e-4991-95fd-bf0bf2b6efe0");
    renderList("b450e583-c15e-4991-95fd-bf0bf2b6efe0");

    await teamList.forEach((team: ITeam) => {
      const teamElement = document.createElement("li");
      teamElement.classList.add("team-list", "p-2");
      teamElement.innerHTML = team.name;
      teamElement.addEventListener("click", async () => {
        renderTeamDetail(team.id);
        renderList(team.id);
      });
      teamListElement.appendChild(teamElement);
    });
  } catch (e) {
    console.log(e);
  }
}

async function renderTeamDetail(teamId: string) {
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

async function renderList(teamId: string) {
  const getLists = await getListByTeamId(teamId);
  // console.log("t", getLists);
  listElement.innerHTML = "";
  getLists.forEach(async (list: IList) => {
    const listGroupElement = document.createElement("div");
    listGroupElement.classList.add("list-group");

    const listNameElement = document.createElement("h3");
    listNameElement.classList.add("heading");
    listGroupElement.appendChild(listNameElement);

    const listDetailElement = document.createElement("div");
    listNameElement.innerHTML = list.title ? list.title : "";
    listDetailElement.id = `list-${list.id}`;

    renderCard(list.id);
    listGroupElement.appendChild(listDetailElement);
    listElement.appendChild(listGroupElement);
    const buttonElement = await renderButton(list.id);
    listGroupElement?.appendChild(buttonElement);

    // await renderAddCardElement();
  });
}

// const dragValue;
// const dropValue;

async function renderCard(listId: string) {
  const cards = await getCardByListId(listId);

  const listElement = document.getElementById(`list-${listId}`);
  const cardGroupElement = document.createElement("div");
  cardGroupElement.classList.add("card-group");

  const cardListElement = document.createElement("ul");
  cardListElement.classList.add("card-list", "col-12", "swim-lane");

  cards.forEach((card: ICard) => {
    const cardItemElement = document.createElement("li");
    cardItemElement.classList.add("card-item", "task", "mb-2");

    cardItemElement.id = `card-item-${card.id}`;
    cardItemElement.draggable = true;

    const cardTitleElement = document.createElement("p");
    cardTitleElement.innerHTML = card.title;

    cardItemElement.appendChild(cardTitleElement);
    cardListElement.appendChild(cardItemElement);

    cardItemElement.addEventListener("drag", () => {
      // dropValue = card;
      console.log(listId, cardItemElement);
    });
  });

  cardGroupElement.appendChild(cardListElement);
  listElement?.appendChild(cardGroupElement);

  dragFunction();
  // renderButton(listId);
  // const buttonElement = await renderButton(listId);
  // listElement?.appendChild(buttonElement);
  // console.log("button");
  // listElement?.appendChild(addCard);
}

async function renderButton(listId: string) {
  const addCardDivButton = document.createElement("div");

  const addCardButton = document.createElement("button");
  addCardButton.classList.add("btn", "btn-info");
  addCardButton.innerHTML = "Add Card";

  addCardButton.addEventListener("click", (e) => {
    console.log("in event listener");
    e.preventDefault();
    addCardContainer.classList.remove("d-none");

    mainContainer.style.filter = "blur(5px)";
    mainContainer.style.pointerEvents = "none";

    assignedToListInForm();
    addCardToList(listId);
  });

  addCardDivButton.appendChild(addCardButton);
  return addCardButton;
}

cardCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();
});

async function closeCardForm() {
  addCardContainer.classList.add("d-none");

  mainContainer.style.filter = "blur(0px)";
  mainContainer.style.pointerEvents = "auto";
}

async function assignedToListInForm() {
  const assignedTo = document.getElementById(
    "card-assignedTo"
  ) as HTMLSelectElement;

  const teamList = await getTeamsByUserId();
  teamList.forEach((team: ITeam) => {
    const optionElement = document.createElement("option");
    optionElement.value = team.createdBy;
    optionElement.innerHTML = team.createdBy;
    assignedTo.appendChild(optionElement);
  });
}

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

function addCardToList(listId: string) {
  addCardForm.setAttribute("id", `form-${listId}`);
  addCardForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      // addCardForm.email.classList.remove("is-invalid");
      // addCardForm.password.classList.remove("is-invalid");
      const title = (
        addCardForm.elements.namedItem("title") as HTMLInputElement
      ).value;
      // console.log(title);
      const description = (
        addCardForm.elements.namedItem("description") as HTMLInputElement
      ).value;
      const deadline = (
        addCardForm.elements.namedItem("deadline") as HTMLInputElement
      ).value;
      const assignedTo = (
        addCardForm.elements.namedItem("assignedTo") as HTMLInputElement
      ).value;

      const data = {
        title,
        description,
        deadline,
        assignedTo,
        listId,
      };
      // console.log("data", data);
      const validateData = await validateFormData(createCardSchema, data);

      const userDetail = await getUserByUsername(assignedTo);
      data.assignedTo = userDetail.id;
      // console.log("userDetail", userDetail);

      // console.log(validateData);
      if (validateData) {
        // console.log("createWhy");
        await createCard(data);
      }
      closeCardForm();
      return;
    } catch (e) {
      // console.log(e);
      if (e instanceof ValidationError) {
        e.inner.forEach((error) => {
          displayValidationError(addCardForm, error.path!, error.message);
        });
      }
      if (e instanceof AxiosError) {
        showToastMessage("error", e.response?.data.message);
      }
    }
  });
}

async function fetchAndInsertNavBarContent() {
  try {
    const navBarElement =
      document.getElementById("navbar-container") ||
      document.createElement("div");

    const response = await fetch("../../components/navbar/navbar.html");
    const html = await response.text();
    navBarElement.innerHTML = html;

    // Fetch JavaScript file
    const jsResponse = await fetch("../../components/navbar/navbar.ts");
    const jsCode = await jsResponse.text();

    // Create a script element and append the fetched JavaScript code
    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = jsCode;
    document.body.appendChild(scriptElement);
  } catch (error) {
    console.error("Error fetching or inserting content:", error);
  }
}
