
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("compatibilityForm");
  
    if (!form) return;
  
    const $ = (id) => document.getElementById(id);
  
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");
  
    const dateOne = $("personOneDate");
    const dateTwo = $("personTwoDate");
  
    dateOne.max = localToday;
    dateTwo.max = localToday;
  
    const message = $("compatFormMessage");
    const result = $("compatResult");
  
    function getFormattedDate(value) {
      const date = new Date(`${value}T12:00:00`);
  
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  
    function getZodiac(dateString, system) {
      const date = new Date(`${dateString}T12:00:00`);
      const month = date.getMonth() + 1;
      const day = date.getDate();
  
      const westernSigns = [
        { name: "Capricorn", start: [12, 22], end: [1, 19] },
        { name: "Aquarius", start: [1, 20], end: [2, 18] },
        { name: "Pisces", start: [2, 19], end: [3, 20] },
        { name: "Aries", start: [3, 21], end: [4, 19] },
        { name: "Taurus", start: [4, 20], end: [5, 20] },
        { name: "Gemini", start: [5, 21], end: [6, 20] },
        { name: "Cancer", start: [6, 21], end: [7, 22] },
        { name: "Leo", start: [7, 23], end: [8, 22] },
        { name: "Virgo", start: [8, 23], end: [9, 22] },
        { name: "Libra", start: [9, 23], end: [10, 22] },
        { name: "Scorpio", start: [10, 23], end: [11, 21] },
        { name: "Sagittarius", start: [11, 22], end: [12, 21] }
      ];
  
      if (system === "vedic") {
        return "Birth details needed for a Vedic chart";
      }
  
      const sign = westernSigns.find((item) => {
        const [startMonth, startDay] = item.start;
        const [endMonth, endDay] = item.end;
  
        if (startMonth > endMonth) {
          return (
            (month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)
          );
        }
  
        const afterStart =
          month > startMonth ||
          (month === startMonth && day >= startDay);
  
        const beforeEnd =
          month < endMonth ||
          (month === endMonth && day <= endDay);
  
        return afterStart && beforeEnd;
      });
  
      return sign ? sign.name : "Unknown";
    }
  
    function getPersonName(inputId, fallback) {
      const value = $(inputId).value.trim();
      return value || fallback;
    }
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.textContent = "";
  
      const firstDate = dateOne.value;
      const secondDate = dateTwo.value;
      const firstName = getPersonName("personOneName", "Person One");
      const secondName = getPersonName("personTwoName", "Person Two");
      const system = $("compatSystem").value;
      const relationship = $("relationshipType").value;
  
      if (!firstDate || !secondDate) {
        message.textContent = "Please enter both dates of birth.";
        return;
      }
  
      if (firstDate > localToday || secondDate > localToday) {
        message.textContent = "Birth dates cannot be in the future.";
        return;
      }
  
      const relationshipNames = {
        romantic: "romantic connection",
        friendship: "friendship",
        family: "family connection",
        professional: "professional partnership"
      };
  
      const relationshipName = relationshipNames[relationship];
  
      const firstSign = getZodiac(firstDate, system);
      const secondSign = getZodiac(secondDate, system);
  
      $("compatResultTitle").textContent =
        `${firstName} & ${secondName}`;
  
      if (system === "western") {
        $("compatResultIntro").textContent =
          `${firstName} (${firstSign}) and ${secondName} (${secondSign}) ` +
          `are exploring their ${relationshipName}. These Sun-sign labels ` +
          "are a basic starting point, not a complete compatibility analysis.";
      } else {
        $("compatResultIntro").textContent =
          `${firstName} and ${secondName} are exploring their ${relationshipName} ` +
          "through a Vedic astrology-inspired experience. A traditional matching " +
          "would require additional chart calculations.";
      }
  
      $("communicationText").textContent =
        "Share expectations openly, ask questions without judgment, and make room for different communication styles.";
  
      $("emotionalText").textContent =
        "Take time to understand each other's needs. Emotional closeness develops through trust, empathy, and consistent care.";
  
      $("growthText").textContent =
        "Discuss your values and goals, respect each other's individuality, and treat challenges as opportunities to learn.";
  
      $("compatDisclaimer").textContent =
        `This is a general ${relationshipName} reflection, not a calculated compatibility score. ` +
        (system === "vedic"
          ? "No planetary positions, Moon signs, Guna Milan, or Manglik analysis has been calculated."
          : "No full natal charts, planetary aspects, or synastry calculations have been performed.");
  
      result.hidden = false;
      message.textContent = "Your compatibility demo is ready.";
  
      result.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  
    $("editCompatDetails").addEventListener("click", () => {
      result.hidden = true;
  
      $("compatibility-form").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
  