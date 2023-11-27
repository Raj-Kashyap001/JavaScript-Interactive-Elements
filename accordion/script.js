const contents = document.querySelectorAll(".content");

contents.forEach((content) => {
  const description = content.querySelector(".description");
  const header = content.querySelector("header");
  const headerIcon = header.querySelector(".icon");
  header.addEventListener("click", () => {
    content.classList.toggle("open");
    headerIcon.innerText === "+"
      ? (headerIcon.innerText = "-")
      : (headerIcon.innerText = "+");
    content.classList.contains("open")
      ? (description.style.height = `${description.scrollHeight}px`)
      : (description.style.height = "0px");
  });
});
