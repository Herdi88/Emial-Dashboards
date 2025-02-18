document.addEventListener('DOMContentLoaded', function() {
    const users = {
        "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
        "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
        "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" }
    };

    document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = {
            "Hardi": {password: "Pass123", floor: "3rd Floor", doctor: "Dr. Smith", clinicStaff: "Alice"},
            // Add other users similarly
        };

        if (users[username] && users[username].password === password) {
            const dashboard = document.getElementById('dashboard');
            if (dashboard) {
                dashboard.style.display = 'block';
                document.getElementById('userDetails').innerText = `Logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.`;
                document.getElementById('loginSection').style.display = 'none';
            }
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});

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
