import { getUserProfile } from "../../services/userService";

const userName = document.getElementById("profile-username") as HTMLElement;
const email = document.getElementById("profile-email") as HTMLElement;
const designation = document.getElementById(
  "profile-designation"
) as HTMLElement;
import { fetchAndInsertNavBarContent } from "../dashboard/script/navbar";

window.onload = async () => {
  fetchAndInsertNavBarContent();
  renderProfile();
};

export async function renderProfile() {
  const userDetail = await getUserProfile();

  userName.innerHTML = userDetail.username;
  email.innerHTML = userDetail.email;
  designation.innerHTML = userDetail.designation;
}
