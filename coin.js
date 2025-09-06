document.addEventListener("DOMContentLoaded", () => {
    let originalData = [];

    async function fetchData() {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");

            const data = await response.json();
            console.log(data);
            originalData = data
            renderTable(data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }

        function renderTable(data) {
            const tableBody = document.getElementById("table-data");
            tableBody.innerHTML = "";

            data.forEach((coin) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toLocaleString()}</td>
                    <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'lightgreen' : 'red'};">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>$${coin.market_cap.toLocaleString()}</td>
                `;

                tableBody.appendChild(row);
            });
        }

        document.getElementById("search").addEventListener("input", () => {
            const query = document.getElementById("search").value.toLowerCase()

            const searchedData = originalData.filter(coin => {
                return coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
            })
            
            renderTable(searchedData)
        })

        document.getElementById("sort-mkt").addEventListener("click", () => {
        const sorted = [...originalData].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sorted);
        });

        document.getElementById("sort-percent").addEventListener("click", () => {
        const sorted = [...originalData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sorted);
    });
    }

    fetchData();
});
