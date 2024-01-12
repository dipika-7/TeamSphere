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
fetchAndInsertNavBarContent();
