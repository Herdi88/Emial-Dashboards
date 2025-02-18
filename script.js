document.addEventListener('DOMContentLoaded', function() {
    const users = {
        "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
        "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
        "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" }
    };

    const loginButton = document.getElementById('loginButton');
    const loginSection = document.getElementById('loginSection');
    const dashboard = document.getElementById('dashboard');
    const userDetails = document.getElementById('userDetails');

    if (loginButton && loginSection && dashboard && userDetails) {
        loginButton.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (users[username] && users[username].password === password) {
                loginSection.style.display = 'none';
                dashboard.style.display = 'block';
                userDetails.textContent = `Logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.`;
            } else {
                alert('Invalid credentials.');
            }
        });
    } else {
        console.error("One or more elements are missing.");
    }
});
