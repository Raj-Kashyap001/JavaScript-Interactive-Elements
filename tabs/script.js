const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".content");
const tabLine = document.querySelector(".line");
tabLine.style.left = `${tabButtons[0].offsetLeft}px`;
tabLine.style.width = `${tabButtons[0].offsetWidth}px`;

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".content");
  const tabLine = document.querySelector(".line");

  function setActiveTab(index) {
    tabContents.forEach((content, contentIndex) => {
      const isActive = contentIndex === index;

      content.style.transform = isActive ? "translateX(0)" : "translateX(100%)";
      content.style.opacity = isActive ? "1" : "0";

      if (isActive) {
        tabButtons.forEach((btn, btnIndex) => {
          btn.style.color = btnIndex === index ? "#2c4af1" : "black";
        });

        tabLine.style.left = `${tabButtons[index].offsetLeft}px`;
        tabLine.style.width = `${tabButtons[index].offsetWidth}px`;
      }
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      setActiveTab(index);
    });

    if (index === 0) {
      button.style.color = "#2c4af1";
    }
  });
});
