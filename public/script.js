function fetchPolicy() {
    const airlineName = document.getElementById("airlineInput").value.trim();
    if (!airlineName) {
        document.getElementById("result").innerHTML = "<p>Please enter an airline name.</p>";
        return;
    }

    // Show Spinner
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("result").innerHTML = "";
    document.getElementById("restrictions").innerHTML = "";

    fetch(`/api/airlines/bicycle-policy/name/${airlineName}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("spinner").classList.add("hidden");
            if (data.success) {
                document.getElementById("result").innerHTML = `
                    <h3>${data.data.airlineName}</h3>
                    <p><strong>Bicycle Policy:</strong> ${data.data.bicyclePolicy || "Not Available"}</p>
                `;
                fetchRestrictions(airlineName);
            } else {
                document.getElementById("result").innerHTML = `<p>No policy found for "${airlineName}".</p>`;
            }
        })
        .catch(() => {
            document.getElementById("spinner").classList.add("hidden");
            document.getElementById("result").innerHTML = "<p>❌ Error retrieving data. Try again later.</p>";
        });
}

function fetchRestrictions(airlineName) {
    fetch(`/api/restrictions/${airlineName}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                let tableHTML = `<table>
                    <tr><th>Max Weight</th><th>Max Length</th><th>Max Width</th><th>Max Height</th></tr>`;
                data.data.forEach(restriction => {
                    tableHTML += `<tr>
                        <td>${restriction.MaxWeight} kg</td>
                        <td>${restriction.MaxLength} cm</td>
                        <td>${restriction.MaxWidth} cm</td>
                        <td>${restriction.MaxHeight} cm</td>
                    </tr>`;
                });
                tableHTML += "</table>";
                document.getElementById("restrictions").innerHTML = tableHTML;
            }
        });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
