const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

function fetchWithThen() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      cryptoData = data;
      renderTable(data);
    })
    .catch(err => console.log("Error:", err));
}

async function fetchWithAsync() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    cryptoData = data;
    renderTable(data);
  } catch (err) {
    console.log("Error:", err);
  }
}

function renderTable(data) {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  data.forEach(coin => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><img src="${coin.image}" /></td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price}</td>
      <td>$${coin.total_volume}</td>
      <td>${coin.market_cap_change_percentage_24h?.toFixed(2)}%</td>
    `;

    tbody.appendChild(row);
  });
}

  const input = document.getElementById("search").value.toLowerCase();

  const filtered = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(input) ||
    coin.symbol.toLowerCase().includes(input)
  );

  renderTable(filtered);
}

function sortByMarketCap() {
  const sorted = [...cryptoData].sort((a, b) =>
    b.market_cap - a.market_cap
  );

  renderTable(sorted);
}

function sortByPercentage() {
  const sorted = [...cryptoData].sort((a, b) =>
    b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h
  );

  renderTable(sorted);
}

fetchWithAsync();
