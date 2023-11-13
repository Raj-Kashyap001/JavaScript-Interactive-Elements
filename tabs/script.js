const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".content");
const tabLine = document.querySelector(".line");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "home-btn":
        tabContents[0].style.transform = "translateX(0)";
        tabContents[1].style.transform = "translateX(100%)";
        tabContents[2].style.transform = "translateX(100%)";
        tabButtons[0].style.color = "#2c4af1";
        tabButtons[1].style.color = "black";
        tabButtons[2].style.color = "black";
        tabLine.style.left = `${button.offsetLeft}px`;
        tabLine.style.width = `${button.offsetWidth}px`;
        break;
      case "about-btn":
        tabContents[0].style.transform = "translateX(100%)";
        tabContents[1].style.transform = "translateX(0)";
        tabContents[2].style.transform = "translateX(100%)";
        tabButtons[0].style.color = "black";
        tabButtons[1].style.color = "#2c4af1";
        tabButtons[2].style.color = "black";
        tabLine.style.left = `${button.offsetLeft}px`;
        tabLine.style.width = `${button.offsetWidth}px`;
        break;
      case "more-btn":
        tabContents[0].style.transform = "translateX(100%)";
        tabContents[1].style.transform = "translateX(100%)";
        tabContents[2].style.transform = "translateX(0)";
        tabButtons[0].style.color = "black";
        tabButtons[1].style.color = "black";
        tabButtons[2].style.color = "#2c4af1";
        tabLine.style.left = `${button.offsetLeft}px`;
        tabLine.style.width = `${button.offsetWidth}px`;
      default:
        break;
    }
  });
});
