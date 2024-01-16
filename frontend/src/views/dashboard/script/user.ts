const userCloseButton = document.getElementById(
  "add-user-close-btn"
) as HTMLElement;
import { getUserList } from "../../../services/userService";
import { IUser } from "../../../interfaces/auth";
import { closeCardForm } from "./common";
import { activeTeam } from "./team";
import { addUserInTeam } from "../../../services/teamService";
const userListElement = document.getElementById(
  "add-users-list"
) as HTMLSelectElement;
import { ValidationError } from "yup";
import { AxiosError } from "axios";
import { showToastMessage } from "../../../utils/responseUtil";
const addUserContainer = document.getElementById(
  "add-user-container"
) as HTMLElement;
const mainContainer = document.getElementById("main-container") as HTMLElement;
import {
  displayValidationError,
  validateFormData,
} from "../../../utils/validateUtil";
const userFormElement = document.getElementById(
  "add-user-form"
) as HTMLFormElement;
import { createUserTeamSchema } from "../../../schemas/userTeamSchema";
import { getUserByUsername } from "../../../services/userService";

/**
 * List of user to add in team
 *
 * @param element
 */
export async function listOfUserToAddInTeam(element: HTMLElement) {
  const userList = await getUserList(activeTeam);
  element.innerHTML = "";

  userList.forEach((user: IUser) => {
    const optionElement = document.createElement("option");
    optionElement.value = user.username;
    optionElement.innerHTML = user.username;
    element.appendChild(optionElement);
  });
}

userCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeCardForm();
  userListElement.selectedIndex = 0;
});

/**
 * Handle add user form submit
 *
 * @param e
 */
export async function handleAddUserFormSubmit(e: Event) {
  try {
    e.preventDefault();
    const userSelectElement = userFormElement.elements.namedItem(
      "user-list-to-add"
    ) as HTMLInputElement;
    const user = userSelectElement.value;

    const data = {
      userId: user,
      teamId: activeTeam,
    };

    // Validation form data
    const validateData = await validateFormData(createUserTeamSchema, data);

    const userDetail = await getUserByUsername(user);
    data.userId = userDetail.id;

    if (validateData) {
      // add user in team
      await addUserInTeam(data);
    }
    userListElement.selectedIndex = 0;

    closeCardForm();
  } catch (e) {
    if (e instanceof ValidationError) {
      e.inner.forEach((error) => {
        displayValidationError(userFormElement, error.path!, error.message);
      });
    }
    if (e instanceof AxiosError) {
      showToastMessage("error", e.response?.data.message);
    }
  }
}

/**
 * Handle add user btn
 *
 * @param e
 */
export async function handleAddUserBtn(e: Event) {
  e.preventDefault();
  listOfUserToAddInTeam(userListElement);

  addUserContainer?.classList.remove("d-none");
  mainContainer.style.filter = "blur(5px)";
  mainContainer.style.pointerEvents = "none";
}
