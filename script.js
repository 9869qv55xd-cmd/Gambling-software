let players = [
  { name: "Player 1", balance: 100 },
  { name: "Player 2", balance: 100 }
];

let currentPlayer = 0;
let spinning = false;

// ---------- Helpers ----------
function renderPlayers() {
  document.getElementById("players").innerHTML =
    players.map((p, i) =>
      `<p ${i === currentPlayer ? 'style="color:gold"' : ''}>
        ${p.name}: 💰 ${p.balance}
      </p>`
    ).join("");
}

function output(text) {
  document.getElementById("output").innerText = text;
  renderPlayers();
}

function getBet() {
  return parseInt(document.getElementById("betAmount").value);
}

function canBet(bet) {
  return bet > 0 && players[currentPlayer].balance >= bet;
}

function endCheck() {
  if (players[currentPlayer].balance <= 0) {
    alert(`${players[currentPlayer].name} is bankrupt! Game restarting.`);
    location.reload();
  }
}

function nextTurn() {
  endCheck();
  currentPlayer = (currentPlayer + 1) % players.length;
  renderPlayers();
}

// ---------- Dice ----------
function diceGame() {
  const bet = getBet();
  if (!canBet(bet)) return output("❌ Invalid bet");

  output("🎲 Rolling...");
  setTimeout(() => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll >= 4) {
      players[currentPlayer].balance += bet;
      output(`🎲 Rolled ${roll} — WON ${bet}`);
    } else {
      players[currentPlayer].balance -= bet;
      output(`🎲 Rolled ${roll} — LOST ${bet}`);
    }
    nextTurn();
  }, 800);
}

// ---------- Slots ----------
function slotGame() {
  const bet = getBet();
  if (!canBet(bet)) return output("❌ Invalid bet");

  output("🎰 Spinning...");
  setTimeout(() => {
    const symbols = ["🍒", "🍋", "⭐", "🔔"];
    const spin = [
      symbols[rand()],
      symbols[rand()],
      symbols[rand()]
    ];

    if (spin[0] === spin[1] && spin[1] === spin[2]) {
      players[currentPlayer].balance += bet * 3;
      output(`🎰 ${spin.join(" ")}\nJACKPOT +${bet * 3}`);
    } else {
      players[currentPlayer].balance -= bet;
      output(`🎰 ${spin.join(" ")}\nLOST ${bet}`);
    }
    nextTurn();
  }, 1000);
}

function rand() {
  return Math.floor(Math.random() * 4);
}

// ---------- Blackjack ----------
function blackjack() {
  const bet = getBet();
  if (!canBet(bet)) return output("❌ Invalid bet");

  output("🃏 Dealing cards...");
  setTimeout(() => {
    const player = Math.floor(Math.random() * 11) + 16;
    const dealer = Math.floor(Math.random() * 11) + 16;

    if (player > 21 || dealer >= player) {
      players[currentPlayer].balance -= bet;
      output(`🃏 You: ${player} | Dealer: ${dealer}\nLOST ${bet}`);
    } else {
      players[currentPlayer].balance += bet;
      output(`🃏 You: ${player} | Dealer: ${dealer}\nWON ${bet}`);
    }
    nextTurn();
  }, 1000);
}

// ---------- Roulette ----------
function toggleRoulette() {
  document.getElementById("roulette").classList.toggle("hidden");
}

function playRoulette() {
  if (spinning) return;

  const bet = getBet();
  const choice = document.getElementById("rouletteChoice").value.toLowerCase();

  if (!canBet(bet)) return output("❌ Invalid bet");

  spinning = true;
  const wheel = document.getElementById("wheel");
  wheel.style.transform = `rotate(${Math.random() * 360 + 720}deg)`;

  setTimeout(() => {
    const number = Math.floor(Math.random() * 37);
    const color = getColor(number);
    let win = false;
    let payout = bet;

    if (choice === color) {
      payout = color === "green" ? bet * 14 : bet * 2;
      win = true;
    }

    if (choice == number) {
      payout = bet * 35;
      win = true;
    }

    if (win) {
      players[currentPlayer].balance += payout;
      output(`🎡 ${number} (${color})\nWON ${payout}`);
    } else {
      players[currentPlayer].balance -= bet;
      output(`🎡 ${number} (${color})\nLOST ${bet}`);
    }

    spinning = false;
    nextTurn();
  }, 3000);
}

function getColor(n) {
  if (n === 0) return "green";
  return n % 2 === 0 ? "black" : "red";
}

renderPlayers();
