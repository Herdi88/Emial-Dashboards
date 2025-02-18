document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    if (!loginButton) {
        console.error("Login button not found.");
        return;
    }

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const dashboard = document.getElementById('dashboard');
        const userDetails = document.getElementById('userDetails');
        const loginSection = document.getElementById('loginSection');

        // Example users object
        const users = {
            "Hardi": { password: "Pass123", floor: "3rd Floor", doctor: "Dr. Smith" },
            "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
            "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" }
        };

        const user = users[username];
        if (user && user.password === password) {
            dashboard.style.display = 'block';
            userDetails.innerText = `Logged in as ${username}, assigned to ${user.doctor} on ${user.floor}.`;
            loginSection.style.display = 'none';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});
