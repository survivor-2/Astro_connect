
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("birthChartForm");
  
    if (!form) return;
  
    const nameInput = document.getElementById("fullName");
    const dateInput = document.getElementById("birthDate");
    const timeInput = document.getElementById("birthTime");
    const placeInput = document.getElementById("birthPlace");
    const systemInput = document.getElementById("astrologySystem");
    const message = document.getElementById("chartFormMessage");
  
    const previewTitle = document.getElementById("previewTitle");
    const previewSubtitle = document.getElementById("previewSubtitle");
  
    const resultName = document.getElementById("resultName");
    const resultDate = document.getElementById("resultDate");
    const resultTime = document.getElementById("resultTime");
    const resultPlace = document.getElementById("resultPlace");
  
    const chartResult = document.getElementById("chartResult");
    const resultDescription = document.getElementById("resultDescription");
  
    // Prevent future dates from being selected.
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");
  
    dateInput.max = localToday;
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.textContent = "";
  
      const name = nameInput.value.trim();
      const birthDate = dateInput.value;
      const birthTime = timeInput.value;
      const birthPlace = placeInput.value.trim();
      const system = systemInput.value;
  
      if (!birthDate || !birthTime || !birthPlace) {
        message.textContent = "Please complete your date, time, and place of birth.";
        return;
      }
  
      if (birthDate > localToday) {
        message.textContent = "Your birth date cannot be in the future.";
        return;
      }
  
      if (birthPlace.length < 2) {
        message.textContent = "Please enter a valid birthplace.";
        return;
      }
  
      const date = new Date(`${birthDate}T12:00:00`);
  
      const formattedDate = date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
  
      const [hours, minutes] = birthTime.split(":").map(Number);
      const formattedTime = new Date(2000, 0, 1, hours, minutes)
        .toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        });
  
      const systemName =
        system === "vedic" ? "Vedic astrology" : "Western astrology";
  
      // Update the preview with the visitor's submitted details.
      previewTitle.textContent = name ? `${name}'s Birth Chart` : "Your Birth Chart";
      previewSubtitle.textContent = `${systemName} · Demo preview`;
  
      resultName.textContent = name || "Not provided";
      resultDate.textContent = formattedDate;
      resultTime.textContent = formattedTime;
      resultPlace.textContent = birthPlace;
  
      resultDescription.textContent =
        `Your birth details have been added to this ${systemName} demo. ` +
        "A complete reading would calculate planetary positions, houses, " +
        "and other chart factors using your birth time and location.";
  
      chartResult.hidden = false;
  
      message.textContent = "Your demo preview has been updated.";
  
      chartResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    });
  });
  