// Simulated user database for demonstration
const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" },
};

document.addEventListener('DOMContentLoaded', function() {
    var sendMessageButton = document.getElementById('sendMessageButton');
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }
});

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        alert(username + ' from ' + users[username].floor + ' logged in successfully!');
        displayUserSpecificInfo(username);
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function displayUserSpecificInfo(username) {
    // Display information relevant to the user's floor or doctor
    var userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `<p>You are logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.</p>`;
}

function sendMessage() {
    // Add logic here to handle sending a message based on the form inputs
    alert('Message sent');
}
