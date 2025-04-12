document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded admin credentials (replace with proper backend authentication in production)
    const adminCredentials = {
      username: "admin",
      password: "admin123"
    };

    // Check if credentials match
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Store login status in local storage (optional, for persistent login state)
      localStorage.setItem("isAdminLoggedIn", "true");

      // Redirect to the student list page
      window.location.href = "submissions.html"; // Change this URL to your student list page
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });