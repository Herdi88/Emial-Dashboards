const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown" },
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('userInfo').innerHTML = `You are logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.`;
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value.trim();
    if (message) {
        var messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML += `<p>${message}</p>`;
        messageInput.value = ""; // Clear the input after sending
    } else {
        alert("Please type a message before sending.");
    }
}
