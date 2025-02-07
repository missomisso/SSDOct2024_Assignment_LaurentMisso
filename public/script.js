// ✅ Load Airlines and Populate Dropdown Automatically
function loadAirlines() {
    fetch("/api/airlines")
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // ✅ Debugging log
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                let dropdown = document.getElementById("airlineDropdown");
                dropdown.innerHTML = '<option value="">Select an Airline</option>'; // Reset

                data.data.forEach(airline => {
                    if (!airline || !airline.AirlineName) return; // ✅ Skip undefined values

                    let option = document.createElement("option");
                    option.value = airline.AirlineName.trim();
                    option.textContent = airline.AirlineName;
                    dropdown.appendChild(option);
                });
            } else {
                alert("No airlines found.");
            }
        })
        .catch(error => {
            console.error("Error loading airlines:", error);
            alert("Error loading airlines. Please try again.");
        });
}

// ✅ Ensure dropdown auto-loads on page load
window.onload = loadAirlines;

// ✅ Load airlines automatically when page loads
window.onload = loadAirlines;

function fetchPolicy() {
    const dropdown = document.getElementById("airlineDropdown");
    const airlineName = dropdown.value ? dropdown.value.trim() : null; // ✅ Ensure value is valid

    if (!airlineName || airlineName === "Select an Airline") {
        document.getElementById("result").innerHTML = "<p>Please select an airline.</p>";
        return;
    }

    // Show Spinner
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("result").innerHTML = "";
    document.getElementById("restrictions").innerHTML = "";

    // Simulated delay for UI effect (3s)
    setTimeout(() => {
        fetch(`/api/airlines/bicycle-policy/name/${encodeURIComponent(airlineName)}`)
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
            .catch(error => {
                document.getElementById("spinner").classList.add("hidden");
                console.error("Fetch Error:", error);
                document.getElementById("result").innerHTML = `<p>❌ Error retrieving data: ${error.message}</p>`;
            });
    }, 3000); // 3-second delay
}


// ✅ Dark Mode Toggle (Same as Before)
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// ✅ Ensure Dark Mode Persists
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
