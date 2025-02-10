// ✅ Check if user is logged in
const token = localStorage.getItem("authToken");

if (!token) {
    alert("Access denied. Please log in.");
    window.location.href = "login.html"; // Redirect to login page
}

// ✅ Logout Function
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("authToken"); // Remove JWT token
    window.location.href = "login.html"; // Redirect to login page
});
