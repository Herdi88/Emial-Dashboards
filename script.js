const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" },
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sendMessageButton').addEventListener('click', sendMessage);
});

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function sendMessage() {
    var message = document.getElementById('messageInput').value.trim();
    var inquiryReason = document.getElementById('inquiryReason').value;
    var doctor = document.getElementById('doctorSelect').value;

    if (!message) {
        alert('Please enter a message.');
        return;
    }

    var fullMessage = `Message: ${message}\nReason: ${inquiryReason}\nDoctor: ${doctor}`;
    displayMessage('clinicMessages', fullMessage);
    displayMessage('leaderMessages', fullMessage);

    document.getElementById('messageInput').value = '';
    document.getElementById('inquiryReason').selectedIndex = 0;
    document.getElementById('doctorSelect').selectedIndex = 0;
}

function displayMessage(panelId, message) {
    var panel = document.getElementById(panelId);
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}
