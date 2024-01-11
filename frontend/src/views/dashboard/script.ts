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
const teamFormElement = document.getElementById("team-form") as HTMLElement;
const teamNameInput = document.getElementById("team-name") as HTMLInputElement;
const teamDescriptionInput = document.getElementById(
  "team-description"
) as HTMLInputElement;

const teamDetailElement = document.getElementById("team-detail") as HTMLElement;
const listElement = document.getElementById("list") as HTMLElement;
const addCardDiv = document.getElementById("add-card") as HTMLElement;
const addCardForm = document.getElementById("add-card-form") as HTMLFormElement;

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
    renderTeamDetail("623e76e0-2144-4197-a94b-8a5de5bcb546");
    renderList("623e76e0-2144-4197-a94b-8a5de5bcb546");

    teamList.forEach((team: ITeam) => {
      const teamElement = document.createElement("li");
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
  const teamDetail = await getTeamById(teamId);
  teamDetailElement.innerHTML = "";
  const teamNameElement = document.createElement("p");
  teamNameElement.innerHTML = teamDetail.name ? teamDetail.name : "";
  teamDetailElement.appendChild(teamNameElement);

  const teamDescElement = document.createElement("p");
  teamDescElement.innerHTML = teamDetail.description
    ? teamDetail.description
    : "";
  teamDetailElement.appendChild(teamDescElement);
}

async function renderList(teamId: string) {
  const getLists = await getListByTeamId(teamId);
  // console.log("t", getLists);
  listElement.innerHTML = "";
  getLists.forEach(async (list: IList) => {
    const listGroupElement = document.createElement("div");
    listGroupElement.classList.add("list-group");

    const listDetailElement = document.createElement("div");
    const listNameElement = document.createElement("p");

    listNameElement.innerHTML = list.title ? list.title : "";
    listDetailElement.id = `list-${list.id}`;
    renderCard(list.id);
    listDetailElement.appendChild(listNameElement);
    listGroupElement.appendChild(listDetailElement);

    listElement.appendChild(listGroupElement);
    // await renderAddCardElement();
  });
}

async function renderCard(listId: string) {
  const cards = await getCardByListId(listId);

  const listElement = document.getElementById(`list-${listId}`);
  const cardGroupElement = document.createElement("div");
  cardGroupElement.classList.add("card-group");

  const cardListElement = document.createElement("ul");
  cardListElement.classList.add("card-list");

  cards.forEach((card: ICard) => {
    const cardItemElement = document.createElement("li");
    cardItemElement.classList.add("card-item");

    const cardTitleElement = document.createElement("p");
    cardTitleElement.innerHTML = card.title;

    cardItemElement.appendChild(cardTitleElement);
    cardListElement.appendChild(cardItemElement);
  });

  cardGroupElement.appendChild(cardListElement);
  listElement?.appendChild(cardGroupElement);

  const buttonElement = await renderButton(listId);
  listElement?.appendChild(buttonElement);

  addCardToList(listId);
  // listElement?.appendChild(addCard);
}

async function renderButton(listId: string) {
  const addCardDivButton = document.createElement("div");

  const addCardButton = document.createElement("button");
  addCardButton.classList.add("btn", "btn-info");
  addCardButton.innerHTML = "Add Card";

  addCardButton.addEventListener("click", (e) => {
    e.preventDefault();
    addCardContainer.classList.remove("d-none");

    assignedToListInForm();
    addCardToList(listId);
  });

  addCardDivButton.appendChild(addCardButton);
  return addCardButton;
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
  console.log("create team form");
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
  await renderTeam();
  // }
  return;
});

// function renderAddCard(listId: string) {
//   const listIdElement =
//     document.getElementById(`list-${listId}`) || document.createElement("div");
//   const addCardElement = document.createElement("div");
//   addCardElement.classList.add("add-cards");

//   const formElement = document.createElement("form");
//   formElement.id = `form-${listId}`;

//   const titleDiv = document.createElement("div");
//   const cardTitleLabelElement = document.createElement("label");
//   cardTitleLabelElement.innerHTML = "Title";
//   const cardTitleInputElement = document.createElement("input");
//   cardTitleInputElement.type = "text";
//   cardTitleInputElement.name = "title";

//   titleDiv.appendChild(cardTitleLabelElement);
//   titleDiv.appendChild(cardTitleInputElement);

//   const descDiv = document.createElement("div");
//   const cardDescLabelElement = document.createElement("label");
//   cardDescLabelElement.innerHTML = "Description";
//   const cardDescInputElement = document.createElement("input");
//   cardDescInputElement.type = "text";
//   cardDescInputElement.name = "description";

//   descDiv.appendChild(cardDescLabelElement);
//   descDiv.appendChild(cardDescInputElement);

//   const deadlineDiv = document.createElement("div");
//   const cardDeadlineLabelElement = document.createElement("label");
//   cardDeadlineLabelElement.innerHTML = "Deadline";
//   const cardDeadlineInputElement = document.createElement("input");
//   cardDeadlineInputElement.type = "date";
//   cardDeadlineInputElement.name = "deadline";

//   deadlineDiv.appendChild(cardDeadlineLabelElement);
//   deadlineDiv.appendChild(cardDeadlineInputElement);

//   const assignedToDiv = document.createElement("div");
//   const cardAssignedToLabelElement = document.createElement("label");
//   cardAssignedToLabelElement.innerHTML = "Assigned to";
//   const cardAssignedToInputElement = document.createElement("input");
//   cardAssignedToInputElement.type = "text";
//   cardAssignedToInputElement.name = "assignedTo";

//   assignedToDiv.appendChild(cardAssignedToLabelElement);
//   assignedToDiv.appendChild(cardAssignedToInputElement);

//   const addButtonDiv = document.createElement("div");
//   const addButton = document.createElement("button");
//   addButton.type = "submit";
//   addButton.innerHTML = "Add Card";
//   addButtonDiv.appendChild(addButton);

//   formElement.appendChild(titleDiv);
//   formElement.appendChild(descDiv);
//   formElement.appendChild(deadlineDiv);
//   formElement.appendChild(assignedToDiv);
//   formElement.appendChild(addButtonDiv);
//   addCardElement.appendChild(formElement);

//   listIdElement.appendChild(addCardElement);
//   renderCard(listId);
//   addCardToList(listId);
//   return addCardElement;
// }

function addCardToList(listId: string) {
  addCardForm.setAttribute("id", `form-${listId}`);

  // const addCardForm =
  //   (document.getElementById(`form-${listId}`) as HTMLFormElement) ||
  //   (document.createElement("form") as HTMLFormElement);
  addCardForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      // addCardForm.email.classList.remove("is-invalid");
      // addCardForm.password.classList.remove("is-invalid");
      const title = //   addCardForm.title as unknown as HTMLInputElement
        // ).value.trim();
        // console.log(title);
        // return;
        // (
        (addCardForm.elements.namedItem("title") as HTMLInputElement).value;
      console.log(title);
      // return;
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
      console.log("data", data);
      const validateData = await validateFormData(createCardSchema, data);

      const userDetail = await getUserByUsername(assignedTo);
      data.assignedTo = userDetail.id;
      console.log("userDetail", userDetail);

      console.log(validateData);
      if (validateData) {
        await createCard(data);
      }
      addCardContainer.classList.add("d-none");
      return;
    } catch (e) {
      console.log(e);
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

//check
// async function fetchAndInsertLoginContent() {
//   try {
//     const navBarElement =
//       document.getElementById("card-container") ||
//       document.createElement("div");

//     const response = await fetch("../../components/card/");
//     const html = await response.text();
//     navBarElement.innerHTML = html;

//     // Fetch JavaScript file
//     const jsResponse = await fetch("../../components/card/script.ts");
//     const jsCode = await jsResponse.text();

//     // Create a script element and append the fetched JavaScript code
//     const scriptElement = document.createElement("script");
//     scriptElement.innerHTML = jsCode;
//     scriptElement.type = "module";

//     document.body.appendChild(scriptElement);
//   } catch (error) {
//     console.error("Error fetching or inserting content:", error);
//   }
// }

// addCardForm.title.addEventListener("input", () => {
//   addCardForm.title.classList.remove("is-invalid");
// });
// addCardForm.username.addEventListener("input", () => {
//   addCardForm.username.classList.remove("is-invalid");
// });
// addCardForm.designation.addEventListener("input", () => {
//   addCardForm.designation.classList.remove("is-invalid");
// });
// addCardForm.password.addEventListener("input", () => {
//   addCardForm.password.classList.remove("is-invalid");
// });
// addCardForm.confirmPassword.addEventListener("input", () => {
//   addCardForm.confirmPassword.classList.remove("is-invalid");
// });
