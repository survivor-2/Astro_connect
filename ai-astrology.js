
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("aiChatForm");
    const input = document.getElementById("aiQuestion");
    const messages = document.getElementById("chatMessages");
    const clearButton = document.getElementById("clearChat");
  
    if (!form || !input || !messages) return;
  
    const welcomeMessage = `
      <p>Namaste! Welcome to AstroVeda. ✨</p>
      <p>
        I'm here to help you explore astrology concepts,
        zodiac signs, birth-chart basics, and traditional
        interpretations.
      </p>
      <p>What would you like to discover today?</p>
    `;
  
    const responses = [
      {
        keywords: ["vedic", "jyotish", "indian astrology"],
        answer: `
          <p><strong>Vedic astrology</strong>, also known as Jyotish,
          is a traditional Indian system of astrology.</p>
          <p>It studies the positions of celestial bodies using a
          sidereal zodiac and traditionally interprets planetary
          placements, signs, houses, and dashas.</p>
          <p>Would you like to learn about Navagrahas or the twelve houses?</p>
        `
      },
      {
        keywords: ["zodiac", "signs", "aries", "taurus", "gemini", "leo", "pisces"],
        answer: `
          <p>The Western zodiac has twelve signs: Aries, Taurus,
          Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius,
          Capricorn, Aquarius, and Pisces.</p>
          <p>Each sign is traditionally associated with particular
          symbolic qualities and one of the four elements:
          fire, earth, air, or water.</p>
        `
      },
      {
        keywords: ["birth chart", "kundli", "kundali", "natal chart"],
        answer: `
          <p>A birth chart, also called a Kundli in Vedic astrology,
          is a map of the sky for a particular date, time, and place.</p>
          <p>It can include planetary positions, zodiac signs,
          houses, and the Ascendant. An accurate chart needs
          reliable astronomical calculations and a correct birth time.</p>
        `
      },
      {
        keywords: ["moon sign", "moon"],
        answer: `
          <p>In astrology, the Moon sign is traditionally associated
          with emotions, instinctive responses, and inner life.</p>
          <p>In Vedic astrology, the Moon's sidereal zodiac placement
          is especially important in many traditional interpretations.</p>
        `
      },
      {
        keywords: ["sun sign", "sun"],
        answer: `
          <p>The Sun sign is associated in astrology with identity,
          vitality, and a sense of purpose.</p>
          <p>Western and Vedic astrology can use different zodiac
          reference systems, so their sign labels may differ.</p>
        `
      },
      {
        keywords: ["ascendant", "rising sign", "lagna"],
        answer: `
          <p>The Ascendant, or Lagna in Vedic astrology, is the
          zodiac sign rising on the eastern horizon at the birth
          location and time.</p>
          <p>It is important in many chart interpretations.
          Accurate birth time and location are needed to calculate it.</p>
        `
      },
      {
        keywords: ["compatibility", "relationship", "love", "marriage"],
        answer: `
          <p>Astrology traditions explore relationships through
          factors such as Moon signs, planetary placements,
          and chart comparisons.</p>
          <p>Vedic matching may include Guna Milan, while Western
          astrology often uses synastry. These are traditional
          interpretations, not reliable tests of relationship success.</p>
        `
      },
      {
        keywords: ["navagraha", "nine planets", "planets"],
        answer: `
          <p>The Navagrahas in Vedic astrology are Surya, Chandra,
          Mangala, Budha, Guru, Shukra, Shani, Rahu, and Ketu.</p>
          <p>They are traditionally interpreted as symbolic influences
          in a person's birth chart.</p>
        `
      },
      {
        keywords: ["horoscope", "daily prediction", "today"],
        answer: `
          <p>A horoscope is an astrological interpretation based on
          zodiac signs or planetary placements.</p>
          <p>Daily horoscopes are usually general readings.
          They should be treated as entertainment or reflection,
          rather than certain predictions of future events.</p>
        `
      }
    ];
  
    function escapeHTML(value) {
      return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]);
    }
  
    function addMessage(content, sender) {
      const message = document.createElement("div");
      message.className = sender === "user"
        ? "ai-message ai-user-message"
        : "ai-message ai-bot-message";
  
      const avatar = sender === "user"
        ? ""
        : '<div class="ai-message-avatar">✧</div>';
  
      const senderName = sender === "user" ? "YOU" : "ASTROVEDA GUIDE";
  
      message.innerHTML = `
        ${avatar}
        <div class="ai-message-content">
          <span class="ai-sender">${senderName}</span>
          <div class="ai-message-bubble">${content}</div>
          <span class="ai-message-time">${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}</span>
        </div>
      `;
  
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    }
  
    function getResponse(question) {
      const normalized = question.toLowerCase();
  
      const match = responses.find((item) =>
        item.keywords.some((keyword) => normalized.includes(keyword))
      );
  
      if (match) return match.answer;
  
      return `
        <p>That's an interesting question! ✨</p>
        <p>I can currently help with general information about
        Vedic astrology, zodiac signs, birth charts, Moon signs,
        Ascendants, Navagrahas, horoscopes, and compatibility.</p>
        <p>Try asking about one of these topics.</p>
      `;
    }
  
    function sendQuestion(question) {
      const cleaned = question.trim();
  
      if (!cleaned) return;
  
      addMessage(`<p>${escapeHTML(cleaned)}</p>`, "user");
  
      input.value = "";
      input.disabled = true;
  
      const typing = document.createElement("div");
      typing.className = "ai-message ai-bot-message";
      typing.innerHTML = `
        <div class="ai-message-avatar">✧</div>
        <div class="ai-message-content">
          <span class="ai-sender">ASTROVEDA GUIDE</span>
          <div class="ai-message-bubble">
            <span class="ai-typing">Exploring your question...</span>
          </div>
        </div>
      `;
  
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
  
      // Demo delay, not a real AI request.
      window.setTimeout(() => {
        typing.remove();
        addMessage(getResponse(cleaned), "bot");
        input.disabled = false;
        input.focus();
      }, 650);
    }
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendQuestion(input.value);
    });
  
    document.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        sendQuestion(button.dataset.question);
      });
    });
  
    clearButton.addEventListener("click", () => {
      messages.innerHTML = `
        <div class="ai-message ai-bot-message">
          <div class="ai-message-avatar">✧</div>
          <div class="ai-message-content">
            <span class="ai-sender">ASTROVEDA GUIDE</span>
            <div class="ai-message-bubble">${welcomeMessage}</div>
            <span class="ai-message-time">New conversation</span>
          </div>
        </div>
      `;
  
      input.value = "";
      input.disabled = false;
      input.focus();
    });
  });
  