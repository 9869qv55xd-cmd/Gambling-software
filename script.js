// Local Multiplayer Players
let players = [
  { name: "Player 1", balance: 100 },
  { name: "Player 2", balance: 100 }
];

let currentPlayer = 0;

// Render Players
function renderPlayers() {
  document.getElementById("players").innerHTML =
    players.map((p, i) =>
      `<p ${i === currentPlayer ? 'style="color:gold"' : ''}>
        ${p.name}: 💰 ${p.balance}
      </p>`
    ).join("");
}

// Switch Player Turn
function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % players.length;
  renderPlayers();
}

// Output helper
function output(text) {
  document.getElementById("output").innerText = text;
  renderPlayers();
}

// 🎲 Dice Game
function diceGame() {
  const bet = 10;
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

// 🎰 Slot Machine
function slotGame() {
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
    players[currentPlayer].balance -= 10;
    output(`🎰 ${spin.join(" ")} — Lost 10`);
  }

  switchPlayer();
}

function rand() {
  return Math.floor(Math.random() * 4);
}

// 🃏 Blackjack (Simplified)
function blackjack() {
  const player = Math.floor(Math.random() * 11) + 16;
  const dealer = Math.floor(Math.random() * 11) + 16;

  if (player > 21 || (dealer <= 21 && dealer >= player)) {
    players[currentPlayer].balance -= 20;
    output(`🃏 You: ${player} | Dealer: ${dealer}\nLOST 20`);
  } else {
    players[currentPlayer].balance += 20;
    output(`🃏 You: ${player} | Dealer: ${dealer}\nWON 20`);
  }

  switchPlayer();
}

// 🎡 Roulette (European)
function roulette() {
  const betAmount = 20;
  const number = Math.floor(Math.random() * 37); // 0–36
  const color = getColor(number);

  const bets = ["red", "black", "green"];
  const chosenBet = bets[Math.floor(Math.random() * bets.length)];

  let text = `🎡 Roulette Spin\nNumber: ${number} (${color})\nBet: ${chosenBet}\n`;

  if (chosenBet === color) {
    const win = color === "green" ? betAmount * 14 : betAmount * 2;
    players[currentPlayer].balance += win;
    text += `WON ${win}`;
  } else {
    players[currentPlayer].balance -= betAmount;
    text += `LOST ${betAmount}`;
  }

  output(text);
  switchPlayer();
}

function getColor(number) {
  if (number === 0) return "green";
  return number % 2 === 0 ? "black" : "red";
}

// Initial render
renderPlayers();
