
/* =========================================
   ASTROVEDA — HOMEPAGE INTERACTIONS
   ========================================= */

   document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatically update the footer year
    const yearElement = document.getElementById("currentYear");
  
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    // 2. Mobile navigation menu
    const menuToggle = document.getElementById("menuToggle");
    const primaryNav = document.getElementById("primaryNav");
  
    if (menuToggle && primaryNav) {
      menuToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
  
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Close navigation" : "Open navigation"
        );
      });
  
      // Close the menu after selecting a link
      primaryNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          primaryNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open navigation");
        });
      });
  
      // Close the menu when the Escape key is pressed
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          primaryNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Open navigation");
        }
      });
    }
  
    // 3. Do not allow a future date of birth
    const birthDate = document.getElementById("birthDate");
  
    if (birthDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
  
      birthDate.max = `${year}-${month}-${day}`;
    }
  
    // 4. Handle the homepage birth details form
    const birthForm = document.getElementById("birthForm");
    const birthMessage = document.getElementById("birthMessage");
  
    if (birthForm && birthMessage) {
      birthForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        if (!birthForm.reportValidity()) {
          return;
        }
  
        const birthData = {
          name: document.getElementById("birthName").value.trim(),
          date: document.getElementById("birthDate").value,
          time: document.getElementById("birthTime").value,
          place: document.getElementById("birthPlace").value.trim(),
          system: document.getElementById("astroSystem").value
        };
  
        if (birthData.date > birthDate.max) {
          birthMessage.textContent =
            "Please select a date that is not in the future.";
          return;
        }
  
        // Demo only: keep the details in this browser tab's session.
        // No server or database is connected yet.
        try {
          sessionStorage.setItem(
            "astroVedaBirthDetails",
            JSON.stringify(birthData)
          );
  
          birthMessage.textContent =
            "Your details are ready for the next step. " +
            "The personalized birth chart will be added in the next stage.";
        } catch (error) {
          birthMessage.textContent =
            "Your browser could not save this session's details. " +
            "Please try again.";
        }
      });
    }
  });
  