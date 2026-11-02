
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".astro-filter");
    const astrologerCards = document.querySelectorAll(".astrologer-card");
    const noResults = document.getElementById("astroNoResults");
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;
        let visibleCount = 0;
  
        // Update selected filter button
        filterButtons.forEach((item) => {
          item.classList.remove("active");
        });
  
        button.classList.add("active");
  
        // Show matching astrologer cards
        astrologerCards.forEach((card) => {
          const specialties = card.dataset.specialties.split(" ");
  
          const shouldShow =
            selectedFilter === "all" ||
            specialties.includes(selectedFilter);
  
          card.hidden = !shouldShow;
  
          if (shouldShow) {
            visibleCount++;
          }
        });
  
        // Show message if no profiles match
        noResults.hidden = visibleCount !== 0;
      });
    });
  });
  