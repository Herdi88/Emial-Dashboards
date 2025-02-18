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
