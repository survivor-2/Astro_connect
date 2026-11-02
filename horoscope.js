
/* =========================================
   ASTROVEDA — HOROSCOPE INTERACTIONS
   Demo content, not calculated predictions
   ========================================= */

   document.addEventListener("DOMContentLoaded", () => {
    const signs = {
      aries: {
        name: "Aries", symbol: "♈", dates: "March 21 – April 19",
        theme: "initiative",
        daily: "Make room for a fresh start.",
        weekly: "Turn your energy into steady progress.",
        monthly: "Build momentum without rushing ahead."
      },
      taurus: {
        name: "Taurus", symbol: "♉", dates: "April 20 – May 20",
        theme: "stability",
        daily: "Give yourself time to find your balance.",
        weekly: "Small, consistent steps can make a difference.",
        monthly: "Create space for the things that matter most."
      },
      gemini: {
        name: "Gemini", symbol: "♊", dates: "May 21 – June 20",
        theme: "curiosity",
        daily: "Let curiosity lead to a thoughtful conversation.",
        weekly: "Explore an idea before deciding where it leads.",
        monthly: "Make room for learning and meaningful connections."
      },
      cancer: {
        name: "Cancer", symbol: "♋", dates: "June 21 – July 22",
        theme: "emotional awareness",
        daily: "Give your feelings room without letting them rush your choices.",
        weekly: "Protect your time and nurture important connections.",
        monthly: "Find a healthier balance between care and personal space."
      },
      leo: {
        name: "Leo", symbol: "♌", dates: "July 23 – August 22",
        theme: "self-expression",
        daily: "Share your ideas with confidence and kindness.",
        weekly: "Let creativity support your next practical step.",
        monthly: "Make your ambitions meaningful, not merely visible."
      },
      virgo: {
        name: "Virgo", symbol: "♍", dates: "August 23 – September 22",
        theme: "thoughtful planning",
        daily: "Focus on progress instead of chasing perfection.",
        weekly: "Organize your priorities and leave room to adapt.",
        monthly: "Build routines that support the life you want."
      },
      libra: {
        name: "Libra", symbol: "♎", dates: "September 23 – October 22",
        theme: "balance",
        daily: "Seek balance without ignoring your own needs.",
        weekly: "Clear communication can help resolve a difference.",
        monthly: "Make decisions that reflect both fairness and your values."
      },
      scorpio: {
        name: "Scorpio", symbol: "♏", dates: "October 23 – November 21",
        theme: "self-awareness",
        daily: "Give yourself time to understand what matters to you.",
        weekly: "Use reflection to decide what deserves your attention.",
        monthly: "Let thoughtful change begin with an honest assessment."
      },
      sagittarius: {
        name: "Sagittarius", symbol: "♐", dates: "November 22 – December 21",
        theme: "exploration",
        daily: "Stay open to a new perspective or useful discovery.",
        weekly: "Pair your sense of adventure with a realistic plan.",
        monthly: "Choose experiences that support your longer-term growth."
      },
      capricorn: {
        name: "Capricorn", symbol: "♑", dates: "December 22 – January 19",
        theme: "long-term goals",
        daily: "A clear priority can make your next step easier.",
        weekly: "Measure progress by consistency, not speed.",
        monthly: "Strengthen the foundations of a goal that matters to you."
      },
      aquarius: {
        name: "Aquarius", symbol: "♒", dates: "January 20 – February 18",
        theme: "original thinking",
        daily: "Give an unconventional idea a thoughtful second look.",
        weekly: "Collaborate where different perspectives can help.",
        monthly: "Turn imaginative thinking into something practical."
      },
      pisces: {
        name: "Pisces", symbol: "♓", dates: "February 19 – March 20",
        theme: "imagination",
        daily: "Make room for creativity while staying grounded.",
        weekly: "Balance intuition with clear information and reflection.",
        monthly: "Find ways to turn inspiration into manageable steps."
      }
    };
  
    const signButtons = document.querySelectorAll(".horoscope-sign");
    const tabs = document.querySelectorAll(".forecast-tab");
  
    const symbolElement = document.getElementById("forecastSymbol");
    const nameElement = document.getElementById("forecastSign");
    const datesElement = document.getElementById("forecastDates");
    const dateElement = document.getElementById("forecastDate");
    const headlineElement = document.getElementById("forecastHeadline");
    const descriptionElement = document.getElementById("forecastDescription");
  
    const loveElement = document.getElementById("loveInsight");
    const careerElement = document.getElementById("careerInsight");
    const wellbeingElement = document.getElementById("wellbeingInsight");
  
    const periodContent = {
      daily: {
        label: "Daily reflection",
        description: (sign) =>
          `For ${sign.name}, consider how ${sign.theme} could shape your choices today. ` +
          `Take a moment to reflect, check the facts, and decide what feels constructive.`,
        love: "Honest conversations and thoughtful listening can help strengthen your connections.",
        career: "Focus on one meaningful priority rather than trying to complete everything at once.",
        wellbeing: "Make time for rest, movement, and routines that help you feel grounded."
      },
      weekly: {
        label: "Weekly reflection",
        description: (sign) =>
          `This week's theme for ${sign.name} is ${sign.theme}. ` +
          `Consider which commitments deserve your energy and where a little flexibility could help.`,
        love: "Make time for meaningful conversations and respect each other's boundaries.",
        career: "Break a larger task into smaller steps and review your progress along the way.",
        wellbeing: "Aim for a manageable routine that includes rest and time away from screens."
      },
      monthly: {
        label: "Monthly reflection",
        description: (sign) =>
          `For ${sign.name}, use this month's theme of ${sign.theme} as a prompt for reflection. ` +
          `Review your priorities and choose realistic actions that support your longer-term goals.`,
        love: "Think about the habits that build trust and make relationships feel supportive.",
        career: "Review your goals, strengthen useful skills, and plan your next achievable step.",
        wellbeing: "Consider which everyday habits help you maintain a sustainable balance."
      }
    };
  
    let selectedSign = "aries";
    let selectedPeriod = "daily";
  
    // Read a sign passed through a URL such as:
    // horoscope.html?sign=taurus
    const params = new URLSearchParams(window.location.search);
    const requestedSign = (params.get("sign") || "").toLowerCase();
  
    if (Object.prototype.hasOwnProperty.call(signs, requestedSign)) {
      selectedSign = requestedSign;
    }
  
    function renderForecast() {
      const sign = signs[selectedSign];
      const content = periodContent[selectedPeriod];
  
      if (!sign || !content) return;
  
      symbolElement.textContent = sign.symbol;
      nameElement.textContent = sign.name;
      datesElement.textContent = sign.dates;
      dateElement.textContent = content.label + " · Sample reading";
      headlineElement.textContent = sign[selectedPeriod];
      descriptionElement.textContent = content.description(sign);
  
      loveElement.textContent = content.love;
      careerElement.textContent = content.career;
      wellbeingElement.textContent = content.wellbeing;
  
      signButtons.forEach((button) => {
        const isSelected = button.dataset.sign === selectedSign;
  
        button.classList.toggle("selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });
  
      tabs.forEach((tab) => {
        const isSelected = tab.dataset.period === selectedPeriod;
  
        tab.classList.toggle("active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
      });
  
      // Keep the selected zodiac shareable in the page URL.
      const url = new URL(window.location.href);
      url.searchParams.set("sign", selectedSign);
      window.history.replaceState({}, "", url);
    }
  
    signButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const sign = button.dataset.sign;
  
        if (!Object.prototype.hasOwnProperty.call(signs, sign)) return;
  
        selectedSign = sign;
        renderForecast();
      });
    });
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const period = tab.dataset.period;
  
        if (!Object.prototype.hasOwnProperty.call(periodContent, period)) return;
  
        selectedPeriod = period;
        renderForecast();
      });
    });
  
    // Display the current date without implying that the sample
    // reflections were calculated from planetary positions.
    const today = new Date();
  
    if (dateElement) {
      dateElement.textContent = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) + " · Sample reading";
    }
  
    renderForecast();
  });
  