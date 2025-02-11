// ✅ Check if user is logged in
const token = localStorage.getItem("authToken");

if (!token) {
    alert("Access denied. Please log in.");
    window.location.href = "login.html"; // Redirect to login page
} else {
    // ✅ Extract user details from JWT token
    const user = parseJwt(token);
    document.getElementById("user-name").textContent = user.email; // Display user email

    console.log("Logged in as:", user);
}

// ✅ Logout Function
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("authToken"); // Remove JWT token
    window.location.href = "login.html"; // Redirect to login page
});

// ✅ Helper Function to Decode JWT
function parseJwt(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch (e) {
        return null;
    }
}
