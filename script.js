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

function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % players.length;
  renderPlayers();
}

function canBet(amount) {
  return amount > 0 && players[currentPlayer].balance >= amount;
}

// ---------- Dice ----------
function diceGame() {
  const bet = 10;
  if (!canBet(bet)) return output("❌ Not enough balance");

  const roll = Math.floor(Math.random() * 6) + 1;
  if (roll >= 4) {
    players[currentPlayer].balance += bet;
    output(`🎲 Rolled ${roll} — WON ${bet}`);
  } else {
    players[currentPlayer].balance -= bet;
    output(`🎲 Rolled ${roll} — LOST ${bet}`);
  }
  switchPlayer();
}

// ---------- Slots ----------
function slotGame() {
  const bet = 10;
  if (!canBet(bet)) return output("❌ Not enough balance");

  const symbols = ["🍒", "🍋", "⭐", "🔔"];
  const spin = [
    symbols[rand()],
    symbols[rand()],
    symbols[rand()]
  ];

  if (spin[0] === spin[1] && spin[1] === spin[2]) {
    players[currentPlayer].balance += 30;
    output(`🎰 ${spin.join(" ")} — JACKPOT! +30`);
  } else {
    players[currentPlayer].balance -= bet;
    output(`🎰 ${spin.join(" ")} — LOST ${bet}`);
  }
  switchPlayer();
}

function rand() {
  return Math.floor(Math.random() * 4);
}

// ---------- Blackjack ----------
function blackjack() {
  const bet = 20;
  if (!canBet(bet)) return output("❌ Not enough balance");

  const player = Math.floor(Math.random() * 11) + 16;
  const dealer = Math.floor(Math.random() * 11) + 16;

  if (player > 21 || (dealer <= 21 && dealer >= player)) {
    players[currentPlayer].balance -= bet;
    output(`🃏 You: ${player} | Dealer: ${dealer}\nLOST ${bet}`);
  } else {
    players[currentPlayer].balance += bet;
    output(`🃏 You: ${player} | Dealer: ${dealer}\nWON ${bet}`);
  }
  switchPlayer();
}

// ---------- Roulette ----------
function openRoulette() {
  document.getElementById("roulette-area").classList.remove("hidden");
}

function playRoulette() {
  if (spinning) return;
  const bet = parseInt(document.getElementById("roulette-bet").value);
  let choice = document.getElementById("roulette-choice").value.toLowerCase();

  if (!canBet(bet)) return output("❌ Invalid bet");

  spinning = true;
  const wheel = document.getElementById("wheel");
  const spinDeg = Math.floor(Math.random() * 360) + 720;
  wheel.style.transform = `rotate(${spinDeg}deg)`;

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
      output(`🎡 ${number} (${color}) — WON ${payout}`);
    } else {
      players[currentPlayer].balance -= bet;
      output(`🎡 ${number} (${color}) — LOST ${bet}`);
    }

    spinning = false;
    switchPlayer();
  }, 3000);
}

function getColor(num) {
  if (num === 0) return "green";
  return num % 2 === 0 ? "black" : "red";
}

renderPlayers();
