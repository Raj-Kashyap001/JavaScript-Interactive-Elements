const initSlider = () => {
  const sliderBtns = document.querySelectorAll(".slider-btn");
  const imgContainer = document.querySelector(".img-container");
  const sliderScrollbar = document.querySelector(".slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imgContainer.scrollWidth - imgContainer.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      scrollbarThumb.style.left = `${boundedPosition}px`;
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      imgContainer.scrollLeft = scrollPosition;
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  sliderBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "previous-btn" ? -1 : 1;
      const scrollAmount = imgContainer.clientWidth * direction;
      imgContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    const handleSliderbuttons = () => {
      sliderBtns[0].style.display =
        imgContainer.scrollLeft <= 0 ? "none" : "block";
      sliderBtns[1].style.display =
        imgContainer.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateThumbPosition = () => {
      const scrollPosition = imgContainer.scrollLeft;
      const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    imgContainer.addEventListener("scroll", () => {
      handleSliderbuttons();
      updateThumbPosition();
    });
  });
};

addEventListener("load", initSlider);
