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

function loadUserMessages(username) {
    var messagesDiv = document.getElementById('messages');
    // Example message loading
    messagesDiv.innerHTML = `<h2>Messages for ${users[username].doctor}</h2>`;
    messagesDiv.innerHTML += `<p>No new messages at this time.</p>`;
    // Here you could fetch real messages from a server or simulate messages for demo purposes
}

// Example function to simulate sending a message
function sendMessage() {
    var messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>New message sent to ${users[username].doctor}.</p>`;
}
