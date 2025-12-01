const floating = document.getElementById("floatingInfo");

  document.querySelectorAll(".hover-info").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      floating.textContent = btn.dataset.info;
      floating.style.opacity = "1";
    });

    btn.addEventListener("mouseleave", () => {
      floating.style.opacity = "0";
    });
  });