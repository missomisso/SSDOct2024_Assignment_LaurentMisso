// ✅ Load Airlines for Dropdown
function loadAirlines() {
    let dropdown = document.getElementById("airlineDropdown");
    let selectedValue = dropdown.value; // Save the current selection

    fetch("/api/airlines")
        .then(response => response.json())
        .then(data => {
            console.log("Airline Data", data);
            dropdown.innerHTML = '<option value="">Select an Airline</option>'; // Reset options

            data.data.forEach(airline => {
                console.log("Airline", airline);
                let option = document.createElement("option");
                option.value = airline.AirlineID.AirlineName;
                option.textContent = airline.AirlineID.AirlineName;
                
                if (option.value === selectedValue) {
                    option.selected = true;
                }

                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading airlines:", error));
}

// ✅ Fetch Bicycle Policy
function fetchPolicy(event) {
    event.preventDefault();
    let selectedAirline = document.getElementById("airlineDropdown").value;

    if (!selectedAirline) {
        alert("Please select an airline first!");
        return;
    }

    fetch(`/api/restrictions/name/${selectedAirline}`)
    .then(response => response.json())
    .then(data => {
        console.log("Policy Data:", data);

        if (!data || !data.restrictions) {
            document.getElementById("result").innerHTML = 
                `<p>No bicycle policy found for ${selectedAirline}.</p>`;
            return;
        }

        let airline = data.AirlineID || "N/A";
            let maxWeight = data.MaxWeight ? `${data.MaxWeight} kg` : "N/A";
            let maxLength = data.MaxLength ? `${data.MaxLength} cm` : "N/A";
            let maxWidth = data.MaxWidth ? `${data.MaxWidth} cm` : "N/A";
            let maxHeight = data.MaxHeight ? `${data.MaxHeight} cm` : "N/A";

            resultContainer.innerHTML = `
            <h3>${airline} Bicycle Policy</h3>
            <table border="1" class="policy-table">
                <tr>
                    <th>Max Weight</th>
                    <th>Max Length</th>
                    <th>Max Width</th>
                    <th>Max Height</th>
                </tr>
                <tr>
                    <td>${maxWeight}</td>
                    <td>${maxLength}</td>
                    <td>${maxWidth}</td>
                    <td>${maxHeight}</td>
                </tr>
            </table>
        `;
        resultContainer.style.display = "block";
    })
    .catch(error => {
        console.error("Error fetching policy:", error);
        document.getElementById("result").innerHTML = 
            `<p>Error fetching policy for ${selectedAirline}.</p>`;
    });
}
