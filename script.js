<!DOCTYPE html>
        <html>
        <head>
          <title>Email Dashboard</title>
        </head>
        <body>
          <div id="loginPanel">
            <!-- Your login form content goes here -->
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password">
            <button onclick="login()">Login</button>
          </div>

          <div id="dashboard" style="display: none;">
            <p id="userDetails"></p>
            <!-- Your dashboard content goes here -->
          </div>
        <script src="script.js"></script>
        </body>
        </html>

document.addEventListener('DOMContentLoaded', function() {
    const users = {
        "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
        "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
        "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" }
    };

    function login() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (users[username] && users[username].password === password) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('userDetails').textContent = `Logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.`;
        } else {
            alert('Invalid credentials.');
        }
    }

    document.getElementById('loginButton').onclick = login;

    function sendMessage() {
        // Logic to send message
        alert('Message sent!');
    }

    document.getElementById('sendMessageButton').onclick = sendMessage;
});


