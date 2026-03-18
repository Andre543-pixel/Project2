let calcBtn = document.getElementById("calc-btn");
let resultDisplay = document.getElementById("result-display");
let cryptoLogo = document.getElementById("crypto-logo");

calcBtn.addEventListener("click", async function () {
  let usd = document.getElementById("usd-amount").value;
  let cryptoId = document
    .getElementById("crypto-select")
    .selectedOptions[0].getAttribute("data-id");

  if (usd > 0) {
    resultDisplay.innerText = "Завантаження...";
    cryptoLogo.style.display = "none";

    try {
      let priceResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`,
      );
      let priceData = await priceResponse.json();
      let currentPrice = priceData[cryptoId].usd;

      let infoResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
      );
      let infoData = await infoResponse.json();

      let logoUrl = infoData.image.small;

      cryptoLogo.src = logoUrl;
      cryptoLogo.style.display = "block";
      let finalAmount = usd / currentPrice;
      resultDisplay.innerText = `Ви отримаєте: ${finalAmount.toFixed(6)} ${cryptoId.toUpperCase()}`;
    } catch (error) {
      resultDisplay.innerText = "Помилка оновлення курсу або лого ❌";
      console.error(error);
    }
  } else {
    alert("Введіть суму в USD!");
  }
});
