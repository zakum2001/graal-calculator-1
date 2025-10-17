// 💰 Prices
const prices = {
  plainMushroom: 5, purpleMushroom: 5, redMushroom: 5, yellowMushroom: 5,
  aerolata: 3, sandDollar: 5, scallop: 5, starfish: 7, trochus: 3,
  bottle: 5, newspaper: 4, tire: 6, paper: 4,
  blackCrab: 6, blueCrab: 6, greenCrab: 6, redCrab: 6, yellowCrab: 6
};

const totalDisplay = document.getElementById("grandTotal");
const coin = document.querySelector(".gralat-icon");

// Select all item inputs
const itemInputs = Object.keys(prices).map(id => document.getElementById(id));

itemInputs.forEach(input => {
  input.addEventListener("input", calculateTotal);
});

// 🧮 Calculate Total
function calculateTotal() {
  let total = 0;

  for (let id in prices) {
    const el = document.getElementById(id);
    const value = parseInt(el?.value || 0);
    total += value * prices[id];
  }

  animateValue(totalDisplay, parseInt(totalDisplay.dataset.value || 0), total, 500);
  totalDisplay.dataset.value = total;

  // Animate
  totalDisplay.classList.add("animate-total");
  coin.classList.add("animate-coin");
  setTimeout(() => {
    totalDisplay.classList.remove("animate-total");
    coin.classList.remove("animate-coin");
  }, 500);

  // Update Trochus conversion
  updateTrochusTrade(total);
}

// ✨ Animate Number Transition
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.textContent = `${value.toLocaleString()} Gralats`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// 🧮 Trochus Trade Calculator
function updateTrochusTrade(totalGralats) {
  const rateInput = document.getElementById("rateInput");
  const trochusTotal = document.getElementById("trochusTotal");
  const rate = parseFloat(rateInput.value);

  if (rate && rate > 0) {
    const trochus = totalGralats / rate;
    trochusTotal.textContent = Math.floor(trochus).toLocaleString();
  } else {
    trochusTotal.textContent = "0";
  }
}

document.getElementById("rateInput").addEventListener("input", () => {
  const currentTotal = parseInt(totalDisplay.dataset.value || 0);
  updateTrochusTrade(currentTotal);
});

// 🧭 Tab functionality
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// 🧹 Reset per Category
document.querySelectorAll(".reset-button").forEach(btn => {
  btn.addEventListener("click", () => {
    const categoryId = btn.dataset.category;
    const category = document.getElementById(categoryId);
    category.querySelectorAll("input[type='number']").forEach(input => input.value = "");
    calculateTotal();

    // Feedback animation
    btn.textContent = "Reset ✓";
    btn.classList.add("clicked");
    setTimeout(() => {
      btn.textContent = `Reset ${btn.dataset.category.charAt(0).toUpperCase() + btn.dataset.category.slice(1)}`;
      btn.classList.remove("clicked");
    }, 800);
  });
});

// 🔁 Reset All Button
const resetAllButton = document.getElementById("resetAllButton");
if (resetAllButton) {
  resetAllButton.addEventListener("click", () => {
    document.querySelectorAll("input[type='number']").forEach(input => input.value = "");
    calculateTotal();

    // Animation feedback
    resetAllButton.textContent = "All Reset ✓";
    resetAllButton.classList.add("clicked");
    setTimeout(() => {
      resetAllButton.textContent = "Reset All Categories";
      resetAllButton.classList.remove("clicked");
    }, 1000);
  });
}
