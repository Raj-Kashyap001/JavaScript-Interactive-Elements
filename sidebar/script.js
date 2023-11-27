const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle-btn");
console.log(toggleBtn);
toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    sidebar.classList.toggle("active");
    toggleBtn.innerText === "☰" ?
        toggleBtn.innerText = "x" :
        toggleBtn.innerText = "☰";
})

sidebar.addEventListener("focusout",()=>{
    sidebar.classList.toggle("active");
    toggleBtn.classList.toggle("active");
toggleBtn.innerText === "☰" ?
        toggleBtn.innerText = "x" :
        toggleBtn.innerText = "☰";
})