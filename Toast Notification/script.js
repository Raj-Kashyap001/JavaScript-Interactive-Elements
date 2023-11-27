const toast = document.querySelector(".toast");
const progress = document.querySelector(".progress");
const showToastBtn = document.querySelector(".show-toast");
const closeToastBtn = document.querySelector("#close-toast");
let timeoutId = 0;
showToastBtn.addEventListener("click", () => {
    clearTimeout(timeoutId);
    progress.classList.add("active");
    toast.classList.add("active");
    timeoutId = setTimeout(() => {
        toast.classList.remove("active");
        progress.classList.remove("active");
    }, 5000);
})

closeToastBtn.addEventListener("click", () => {
    toast.classList.remove("active")
    progress.classList.remove("active");
    clearTimeout(timeoutId);
})