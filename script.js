// ===== DATA =====
const facts = [
  "Born in Atlanta in 1977, raised on Chicago's South Side by his mother Donda, a university English professor.",
  "Started as a producer for Roc-A-Fella Records, crafting sped-up soul samples for artists like Jay-Z before rapping himself.",
  "A 2002 car accident, and the jaw wired shut afterward, directly inspired the song 'Through the Wire'.",
  "Interned at Fendi in Rome early in his career, years before launching his own footwear and apparel lines.",
  "The Yeezy partnership with Adidas became one of the best-selling sneaker franchises in modern fashion history.",
  "Has won multiple Grammy Awards across his career, spanning production and performance categories.",
  "Founded the record label GOOD Music, home to a rotating roster of collaborators and proteges.",
  "Legally changed his name to Ye in 2021."
];

const timeline = [
  { year: "1996", code: "KW-001", desc: "Begins producing beats locally in Chicago, selling tracks to regional artists." },
  { year: "2000", code: "KW-002", desc: "Becomes a in-house producer at Roc-A-Fella Records, shaping the label's early-2000s sound." },
  { year: "2004", code: "KW-003", desc: "Releases debut album 'The College Dropout', shifting from producer to solo artist." },
  { year: "2010", code: "KW-004", desc: "Releases 'My Beautiful Dark Twisted Fantasy', widely regarded as a career high point." },
  { year: "2013", code: "KW-005", desc: "Releases 'Yeezus', a stripped-back, industrial turn away from his earlier maximalism." },
  { year: "2015", code: "KW-006", desc: "Yeezy Season begins, formalizing his fashion line alongside Adidas." },
  { year: "2021", code: "KW-007", desc: "Legally changes name to Ye and releases 'Donda', named for his mother." }
];

// ===== RENDER FACTS =====
const factsGrid = document.getElementById("factsGrid");
facts.forEach((fact, i) => {
  const card = document.createElement("div");
  card.className = "fact-card";
  card.innerHTML = `<span class="fact-id">NOTE ${String(i + 1).padStart(2, "0")}</span><p>${fact}</p>`;
  factsGrid.appendChild(card);
});

// ===== RENDER TIMELINE =====
const timelineEl = document.getElementById("timeline");
timeline.forEach((entry) => {
  const row = document.createElement("div");
  row.className = "timeline-item";
  row.innerHTML = `
    <span class="timeline-year">${entry.year}</span>
    <span class="timeline-code">${entry.code}</span>
    <span class="timeline-desc">${entry.desc}</span>
  `;
  timelineEl.appendChild(row);
});

// ===== RANDOM DISPATCH GENERATOR =====
const dispatchText = document.getElementById("dispatchText");
const dispatchBtn = document.getElementById("dispatchBtn");
let lastIndex = -1;

dispatchBtn.addEventListener("click", () => {
  dispatchText.classList.add("fading");
  setTimeout(() => {
    let index;
    do {
      index = Math.floor(Math.random() * facts.length);
    } while (index === lastIndex && facts.length > 1);
    lastIndex = index;
    dispatchText.textContent = facts[index];
    dispatchText.classList.remove("fading");
  }, 250);
});

// ===== AUDIO: AUTOPLAY + FIXED TOGGLE =====
const audioEl = document.getElementById("audioEl");
const audioToggle = document.getElementById("audioToggle");

const heroPlayLabel = document.getElementById("heroPlayLabel");

function setPlayingState(isPlaying) {
  audioToggle.classList.toggle("playing", isPlaying);
  audioToggle.setAttribute(
    "aria-label",
    isPlaying ? "Pause background track" : "Play background track"
  );
  heroPlayLabel.textContent = isPlaying ? "PAUSE TRACK 001" : "PLAY TRACK 001";
}

// Try to autoplay as soon as the page loads.
audioEl.play().then(() => {
  setPlayingState(true);
}).catch(() => {
  // Most browsers block unmuted autoplay until the user interacts with the
  // page at least once. Fall back to starting playback on the first
  // click/keydown/scroll anywhere on the page.
  setPlayingState(false);
  const startOnInteraction = () => {
    audioEl.play().then(() => setPlayingState(true)).catch(() => {});
    window.removeEventListener("click", startOnInteraction);
    window.removeEventListener("keydown", startOnInteraction);
    window.removeEventListener("scroll", startOnInteraction);
  };
  window.addEventListener("click", startOnInteraction);
  window.addEventListener("keydown", startOnInteraction);
  window.addEventListener("scroll", startOnInteraction, { passive: true });
});

audioToggle.addEventListener("click", () => {
  if (audioEl.paused) {
    audioEl.play().then(() => setPlayingState(true)).catch(() => {});
  } else {
    audioEl.pause();
    setPlayingState(false);
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const toggleState = document.getElementById("toggleState");

function applyTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light");
    toggleState.textContent = "BLUEPRINT";
  } else {
    document.body.classList.remove("light");
    toggleState.textContent = "CONCRETE";
  }
}

const savedTheme = localStorage.getItem("kanye-fanpage-theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("kanye-fanpage-theme", next);
});