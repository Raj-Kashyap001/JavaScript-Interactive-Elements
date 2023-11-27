const modal = document.querySelector("[data-modal]");
const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = modal.querySelector("[data-close-modal]");
openModalBtn.addEventListener("click", () => {
  modal.showModal();
  modal.style.opacity = 1;
  modal.style.top = "50%";
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
  modal.style.opacity = 0;
  modal.style.top = "40%";
});
