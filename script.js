document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    if (!loginButton) {
        console.error("Login button not found.");
        return;
    }

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const dashboard = document.getElementById('dashboard');
        const userDetails = document.getElementById('userDetails');
        const loginSection = document.getElementById('loginSection');

        if (!username || !password || !dashboard || !userDetails || !loginSection) {
            console.error("One or more elements are missing.");
            return;
        }

        const users = {
            "Hardi": {password: "Pass123", floor: "3rd Floor", doctor: "Dr. Smith", clinicStaff: "Alice"},
            // Define other users similarly
        };

        if (users[username.value] && users[username.value].password === password.value) {
            dashboard.style.display = 'block';
            userDetails.innerText = `Logged in as ${username.value}, assigned to ${users[username.value].doctor} on ${users[username.value].floor}.`;
            loginSection.style.display = 'none';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});

