const calender = document.querySelector(".calendar");
const darkModeToggle = calender.querySelector(".dark-mode-switch");
const monthPicker = calender.querySelector(".month-picker");
const monthList = calender.querySelector(".month-list");
const prevYearBtn = calender.querySelector("#prev-year");
const nextYearBtn = calender.querySelector("#next-year");

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

const monthNames = [
  "January",
  "Fabruary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "December",
];

const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => (isLeapYear(year) ? 28 : 29);

const generateCalendar = (month, year) => {
  const calendarDays = document.querySelector(".calendar-days");
  const calendarHeaderYear = document.querySelector("#year");
  calendarDays.innerHTML = ``;
  const daysOfMonth = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentDate = new Date();
  monthPicker.innerText = monthNames[month];
  calendarHeaderYear.innerText = year;
  let firstDay = new Date(month, year, 1);

  for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
    let day = document.createElement("li");
    if (i >= firstDay.getDay()) {
      day.classList.add("calendar-day-hover");
      day.innerText = i - firstDay.getDay() + 1;
      day.innerHTML += `<span></span>
                        <span></span>
                        <span></span>
                        <span></span>`;
      if (
        i - firstDay.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-day");
      }
    }
    calendarDays.appendChild(day);
  }
};

monthNames.forEach((element, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${element}</div>`;
  month.addEventListener("click", () => {
    monthList.classList.remove("show");
    currentMonth = index;
    generateCalendar(currentMonth, currentYear);
  });
  monthList.appendChild(month);
});
generateCalendar(currentMonth, currentYear);

monthPicker.addEventListener("click", () => {
  monthList.classList.add("show");
});

prevYearBtn.addEventListener("click", () => {
  --currentYear;
  generateCalendar(currentMonth, currentYear);
});
nextYearBtn.addEventListener("click", () => {
  ++currentYear;
  generateCalendar(currentMonth, currentYear);
});
