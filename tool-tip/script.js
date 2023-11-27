const tooltipElms = document.querySelectorAll("[data-tooltip]");
const createTooltip = (data, e) => {
  let x = e.target.clientX;
  let y = e.target.clientY;
  const tooltipBox = document.createElement("div");
  tooltipBox.classList.add("tooltip");
  tooltipBox.innerText = data;
  tooltipBox.style.top = `${y}px`;
  tooltipBox.style.left = `${x}px`;
  return tooltipBox;
};

const removeTooltip = () => {
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    tooltip.remove();
  });
};

removeTooltip();
tooltipElms.forEach((element) => {
  element.style.position = "relative";
  const data = element.dataset.tooltip;
  element.addEventListener("mouseover", (e) => {
    const tooltip = createTooltip(data, e);
    setTimeout(() => {
      element.appendChild(tooltip);
    }, 1000);
    element.addEventListener("mousemove", () => {
      setTimeout(removeTooltip);
    });
  });
});
