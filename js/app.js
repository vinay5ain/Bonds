// Get form element
const loginForm = document.getElementById("loginForm");

// Listen for submit
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop form from refreshing page

  // Get values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple validation
  if (!email || !password) {
    alert("Please fill in both fields");
    return;
  }

  // Example: Fake login (replace with real API call)
  if (email === "test@example.com" && password === "123456") {
    alert("Login successful 🎉");
    window.location.href = "dashboard.html"; // redirect after login
  } else {
    alert("Invalid email or password ❌");
  }
});
