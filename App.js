document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        const formData = {
            name,
            email,
            phone,
            message,
            timestamp: new Date().toLocaleString()
        };

        // Get existing data
        let submissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];

        // Add new submission
        submissions.push(formData);

        // Save back to localStorage
        localStorage.setItem("formSubmissions", JSON.stringify(submissions));

        // Show success message
        document.querySelector(".success-message").classList.add("active");
        setTimeout(() => {
            document.querySelector(".success-message").classList.remove("active");
            form.reset(); // clear form
        }, 4000);
    });
});
