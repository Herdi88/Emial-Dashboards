// Simulated user database for demonstration
const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" },
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Username:', username); // Debug output
    console.log('Password:', password); // Debug output

    // Check if the username exists and if so, compare the password
    if (users[username]) {
        if (users[username].password === password) {
            document.getElementById('loginPanel').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            alert(username + ' from ' + users[username].floor + ' logged in successfully!');
        } else {
            console.log('Password incorrect for user:', username); // Debug output
            alert('Invalid credentials. Please try again.');
        }
    } else {
        console.log('Username not found:', username); // Debug output
        alert('Invalid credentials. Please try again.');
    }
}

function displayUserSpecificInfo(username) {
    var userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `<p>You are logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.</p>`;
    loadUserMessages(username);
}

document.addEventListener('DOMContentLoaded', function() {
    var sendMessageButton = document.getElementById('sendMessageButton');
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    } else {
        console.error('Send Message button not found.');
    }
});

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
