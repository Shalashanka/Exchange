document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '9675cd88a8cb4097a798f5c7adac6235';
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    const spinner = document.getElementById('spinner');

    const updateRates = () => {
        spinner.style.display = 'block'; // Show the spinner when loading starts
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const usdToAll = data.rates['ALL'];
                const commonCurrencies = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY'];
                const tbody = document.getElementById('rates').getElementsByTagName('tbody')[0];
                tbody.innerHTML = ''; // Clear previous rows

                const lastUpdated = document.getElementById('lastUpdated');
                const date = new Date(data.timestamp * 1000);
                lastUpdated.textContent = date.toLocaleString();

                commonCurrencies.forEach(currency => {
                    const usdToCurrency = data.rates[currency];
                    const allToCurrency = usdToCurrency / usdToAll;

                    const tr = document.createElement('tr');
					const flagCell = document.createElement('td');
					const rateCell = document.createElement('td');

					flagCell.innerHTML = `<img src="flags/${currency.toLowerCase()}.png" alt="${currency} flag" style="width: 32px; height: 20px;"> <span>${currency}</span>`;
					rateCell.textContent = (allToCurrency * 100).toFixed(2);

					tr.appendChild(flagCell);
					tr.appendChild(rateCell);
					tbody.appendChild(tr);
                });

                spinner.style.display = 'none'; // Hide the spinner once data is loaded
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                spinner.style.display = 'none'; // Hide the spinner in case of error
            });
    };

    updateRates(); // Update immediately on load
    setInterval(updateRates, 3600000); // Update every 60 minutes
});
