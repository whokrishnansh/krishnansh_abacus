let targetNumber = 0;

let beads = {
  ones: 0,
  tens: 0,
  hundreds: 0,
  thousands: 0,
  tenThousands: 0
};

const beadColors = {
  tenThousands: "#90EE90",
  thousands: "#FF69B4",
  hundreds: "#4A90E2",
  tens: "#FFD700",
  ones: "#FF6B6B"
};

function generateNewQuestion() {
  targetNumber = Math.floor(Math.random() * 100000);
  beads = { ones: 0, tens: 0, hundreds: 0, thousands: 0, tenThousands: 0 };
  updateDisplay();
}

function calculateCurrentValue() {
  return (
    beads.ones +
    beads.tens * 10 +
    beads.hundreds * 100 +
    beads.thousands * 1000 +
    beads.tenThousands * 10000
  );
}

function handleAdd(place) {
  beads[place]++;
  if (beads[place] > 9) {
    beads[place] = 0;
    if (place === "ones") beads.tens++;
    else if (place === "tens") beads.hundreds++;
    else if (place === "hundreds") beads.thousands++;
    else if (place === "thousands") beads.tenThousands++;
  }
  updateDisplay();
}

function handleSubtract(place) {
  if (beads[place] > 0) beads[place]--;
  updateDisplay();
}

function renderRod(count, color) {
  return `
    <div class="rod-wrapper">
      <div class="rod">
        <div class="beads-container">
          ${Array.from({ length: count })
      .map(() => `<div class="bead" style="background:${color}"></div>`)
      .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderControls(place) {
  return `
    <div class="controls">
      <button class="control-btn" onclick="handleSubtract('${place}')">−</button>
      <button class="control-btn" onclick="handleAdd('${place}')">+</button>
    </div>
  `;
}

function updateDisplay() {
  document.getElementById("targetNumber").textContent = targetNumber;
  document.getElementById("currentValue").textContent = calculateCurrentValue();

  document.getElementById("rodsDisplay").innerHTML = `
    ${renderRod(beads.tenThousands, beadColors.tenThousands)}
    ${renderRod(beads.thousands, beadColors.thousands)}
    ${renderRod(beads.hundreds, beadColors.hundreds)}
    ${renderRod(beads.tens, beadColors.tens)}
    ${renderRod(beads.ones, beadColors.ones)}
  `;

  document.getElementById("controlsRow").innerHTML = `
    ${renderControls("tenThousands")}
    ${renderControls("thousands")}
    ${renderControls("hundreds")}
    ${renderControls("tens")}
    ${renderControls("ones")}
  `;
  const statusMessage = document.getElementById("statusMessage");

  if (calculateCurrentValue() === targetNumber) {
    statusMessage.textContent = "You matched the number!";
    statusMessage.style.color = "green";
    statusMessage.style.fontWeight = "bold";
  } else {
    statusMessage.textContent = "Adjust the beads to match the target number.";
    statusMessage.style.color = "#333";
    statusMessage.style.fontWeight = "normal";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  generateNewQuestion();
  document.getElementById("newQuestionBtn").addEventListener("click", generateNewQuestion);

  // Dark mode toggle
  const toggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", toggle.checked);
  });
});

