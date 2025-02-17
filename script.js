function sendMessage() {
    var message = document.getElementById('messageInput').value;
    if (message) {
        displayMessageInClinic(message);
        displayMessageInLeader(message);
        document.getElementById('messageInput').value = ''; // Clear input after sending
    } else {
        alert('Please enter a message.');
    }
}

function displayMessageInClinic(message) {
    var messagesDiv = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.textContent = "New message: " + message;
    messagesDiv.appendChild(messageElement);
}

function displayMessageInLeader(message) {
    var messagesDiv = document.getElementById('allMessages');
    var messageElement = document.createElement('div');
    messageElement.textContent = "Logged message: " + message;
    messagesDiv.appendChild(messageElement);
}
