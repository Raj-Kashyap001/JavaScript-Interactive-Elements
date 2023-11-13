const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".content");
const tabLine = document.querySelector(".line");
tabLine.style.left = `${tabButtons[0].offsetLeft}px`;
tabLine.style.width = `${tabButtons[0].offsetWidth}px`;

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".content");
  const tabLine = document.querySelector(".line");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      tabContents.forEach((content, contentIndex) => {
        const isActive = contentIndex === index;

        content.style.transform = isActive
          ? "translateX(0)"
          : "translateX(100%)";
        content.style.opacity = isActive ? "1" : "0"; // Show selected content with opacity transition

        if (isActive) {
          button.style.color = "#2c4af1";
          tabLine.style.left = `${button.offsetLeft}px`;
          tabLine.style.width = `${button.offsetWidth}px`;
        } else {
          button.style.color = "black";
        }
      });
    });
  });
});
