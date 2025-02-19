// Constants
const LOGIN_PANEL_ID = 'loginPanel';
const DASHBOARD_ID = 'dashboard';
const CALL_CENTER_MESSAGES_ID = 'callCenterMessages';
const CLINIC_STAFF_MESSAGES_ID = 'clinicStaffMessages';
const TEAM_LEADER_MESSAGES_ID = 'teamLeaderMessages';
const PERFORMANCE_METRICS_ID = 'performanceMetrics';
const NOTIFICATION_AREA_ID = 'notificationsContainer';

// User Data (expanded for roles)
const users = {
    "hardi": { password: "hardiPass123", role: "teamLeader", doctor: "Dr. Smith" },
    "alice": { password: "alicePass123", role: "clinicStaff", doctor: "Dr. Jones" },
    "bob": { password: "bobPass123", role: "clinicStaff", doctor: "Dr. Brown" },
    "charlie": { password: "charliePass123", role: "callCenter" },
    "admin": { password: "adminPass123", role: "admin" }
};

let messages = [];
let currentUserRole = null;
let currentUserName = null;
// Functions

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users[username];

    if (user && user.password === password) {
        currentUserRole = user.role;
        currentUserName = username;
        localStorage.setItem('userRole', currentUserRole);
        localStorage.setItem('userName', currentUserName);
        showDashboard();
    } else {
        alert('Invalid credentials');
    }
}
function logout() {
    localStorage.clear();
    currentUserRole = null;
    currentUserName = null;
    document.getElementById(LOGIN_PANEL_ID).style.display = 'block';
    document.getElementById(DASHBOARD_ID).style.display = 'none';
}

function showDashboard() {
    document.getElementById(LOGIN_PANEL_ID).style.display = 'none';
    document.getElementById(DASHBOARD_ID).style.display = 'block';
    displayMessages();
}
   function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

function sendCallCenterMessage() {
    const message = {
        id: Date.now(),
        callerName: document.getElementById('callerName').value,
        contactInfo: document.getElementById('contactInfo').value,
        mrn: document.getElementById('mrn').value,
        inquiryReason: document.getElementById('inquiryReason').value,
        selectedDoctor: document.getElementById('doctorSelect').value,
        replies: []
    };

    messages.push(message);
    displayMessages();
}

function displayMessages() {
    updatePerformanceMetrics();
}

function updatePerformanceMetrics() {
    document.getElementById(PERFORMANCE_METRICS_ID).innerHTML = `
        <p>Total Messages: ${messages.length}</p>
    `;
}

function clearNotifications() {
    document.getElementById(NOTIFICATION_AREA_ID).innerHTML = '';
}

window.onload = function() {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
        currentUserRole = savedRole;
        showDashboard();
    }
};



function sendCallCenterMessage() {
    const callerName = document.getElementById('callerName').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const mrn = document.getElementById('mrn').value;
    const inquiryReason = document.getElementById('inquiryReason').value;
    const selectedDoctor = document.getElementById('doctorSelect').value;

    if (!callerName || !contactInfo || !mrn || !inquiryReason || !selectedDoctor) {
        alert("Please fill in all fields.");
        return;
    }
    const newMessage = {
        callerName,
        contactInfo,
        mrn,
        inquiryReason,
        selectedDoctor,
        timestamp: new Date(),
        isUrgent: false,
        isDelayed: false,
        replies: [],
        sender: currentUserName,
        id: Date.now() // Unique ID for the message
    };

    messages.push(newMessage);
    displayMessages();
    addNotification(`New Message from ${callerName} for ${selectedDoctor}`);

}
function displayMessages() {
    // Clear existing messages
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);
    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

    // Display messages based on role
    messages.forEach(message => {
        const messageElement = createMessageElement(message);

        if (currentUserRole === 'callCenter' || currentUserRole === 'admin') {
            callCenterMessages.appendChild(messageElement);
        }

        if (currentUserRole === 'clinicStaff' || currentUserRole === 'admin') {
            if (message.selectedDoctor === users[currentUserName].doctor) {
                clinicStaffMessages.appendChild(messageElement);
            }
        }

        if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
            teamLeaderMessages.appendChild(messageElement);
        }
    });
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.id = `message-${message.id}`;

    if (message.isUrgent) {
        messageDiv.classList.add('urgent');
    }
    if (message.isDelayed) {
        messageDiv.classList.add('delayed');
    }

    messageDiv.innerHTML = `
        <p><strong>Caller:</strong> ${message.callerName}</p>
        <p><strong>Contact:</strong> ${message.contactInfo}</p>
        <p><strong>MRN:</strong> ${message.mrn}</p>
        <p><strong>Inquiry:</strong> ${message.inquiryReason}</p>
        <p><strong>Doctor:</strong> ${message.selectedDoctor}</p>
        <p><strong>Sent by:</strong> ${message.sender}</p>
    `;

    // Display replies
    if (message.replies.length > 0) {
        const repliesDiv = document.createElement('div');
        repliesDiv.classList.add('replies');
        message.replies.forEach(reply => {
            const replyP = document.createElement('p');
            replyP.textContent = `Reply: ${reply}`;
            repliesDiv.appendChild(replyP);
        });
        messageDiv.appendChild(repliesDiv);
    }

    // Clinic Staff Reply
    if (currentUserRole === 'clinicStaff' && message.replies.length === 0 && message.selectedDoctor === users[currentUserName].doctor ) {
        const replyButton = document.createElement('button');
        replyButton.textContent = 'Call completed';
        replyButton.onclick = () => replyToMessage(message.id, 'Call completed');
        messageDiv.appendChild(replyButton);

        const replyButton2 = document.createElement('button');
        replyButton2.textContent = 'unreachable';
        replyButton2.onclick = () => replyToMessage(message.id, 'unreachable');
        messageDiv.appendChild(replyButton2);

        const replyButton3 = document.createElement('button');
        replyButton3.textContent = 'appointment booked';
        replyButton3.onclick = () => replyToMessage(message.id, 'appointment booked');
        messageDiv.appendChild(replyButton3);
    }
        // Add flag buttons for team leaders
        if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
            if (!message.isUrgent) {
            const urgentButton = document.createElement('button');
            urgentButton.textContent = 'Flag Urgent';
            urgentButton.onclick = () => flagMessage(message.id);
            messageDiv.appendChild(urgentButton);
            }
            if (!message.isDelayed) {
                const delayButton = document.createElement('button');
                delayButton.textContent = 'Mark Delayed';
                delayButton.onclick = () => markDelay(message.id);
                messageDiv.appendChild(delayButton);
            }
        }

    return messageDiv;
}

function replyToMessage(messageId, reply) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.replies.push(reply);
        const messageElement = document.getElementById(`message-${messageId}`);
        messageElement.classList.add("replied")
        displayMessages()
        addNotification(`Message for ${message.selectedDoctor} has been replied with: ${reply}`);
    }
}

function flagMessage(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.isUrgent = true;
        const messageElement = document.getElementById(`message-${messageId}`);
        messageElement.classList.add("urgent")
        displayMessages();
        addNotification(`Message for ${message.selectedDoctor} marked as urgent!`);
    }
}

function markDelay(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.isDelayed = true;
        const messageElement = document.getElementById(`message-${messageId}`);
        messageElement.classList.add("delayed")
        displayMessages();
        addNotification(`Message for ${message.selectedDoctor} marked as delayed!`);
    }
}
function filterMessages() {
    const selectedDoctor = document.getElementById('filterDoctor').value;
    const filteredMessages = selectedDoctor === 'all' ? messages : messages.filter(msg => msg.selectedDoctor === selectedDoctor);
    // Clear and display messages
    document.getElementById(TEAM_LEADER_MESSAGES_ID).innerHTML = '';
    filteredMessages.forEach(message => {
        const messageElement = createMessageElement(message);
        document.getElementById(TEAM_LEADER_MESSAGES_ID).appendChild(messageElement);
    });
}
function addNotification(message) {
    const notificationArea = document.getElementById(NOTIFICATION_AREA_ID);
    const notificationDiv = document.createElement('div');
    notificationDiv.classList.add('notification-item');
    const timestamp = new Date().toLocaleTimeString();

    notificationDiv.innerHTML = `<strong>${timestamp}</strong> - ${message}`;
    notificationArea.appendChild(notificationDiv);
}

// Check LocalStorage for saved login role
window.onload = function () {
    const savedRole = localStorage.getItem('userRole');
    const savedUserName = localStorage.getItem('userName');
    if (savedRole && savedUserName) {
        currentUserRole = savedRole;
        currentUserName = savedUserName;
        showDashboard();
    }
};
