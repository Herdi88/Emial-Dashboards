function sendMessage() {
    var message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        displayMessageInClinic(message);
        displayMessageInLeader(message);
        document.getElementById('messageInput').value = ''; // Clear input after sending
    } else {
        alert('Please enter a message.');
    }
}

function displayMessageInClinic(message) {
    var messagesDiv = document.getElementById('clinicMessages'); // Ensure this ID exists in your HTML
    var messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}

function displayMessageInLeader(message) {
    var messagesDiv = document.getElementById('leaderMessages'); // Ensure this ID exists in your HTML
    var messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}

