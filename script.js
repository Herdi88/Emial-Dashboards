// Constants
const LOGIN_PANEL_ID = 'loginPanel';
const DASHBOARD_ID = 'dashboard';
const CALL_CENTER_MESSAGES_ID = 'callCenterMessages';
const CLINIC_STAFF_MESSAGES_ID = 'clinicStaffMessages';
const TEAM_LEADER_MESSAGES_ID = 'teamLeaderMessages';
const PERFORMANCE_METRICS_ID = 'performanceMetrics';
const NOTIFICATION_AREA_ID = 'notificationArea';

// User Data (expanded for roles)
const users = {
    "hardi": { password: "hardiPass123", role: "teamLeader", floor: "3rd Floor", doctor: "Dr. Smith", clinicStaff: "Alice" },
    "alice": { password: "alicePass123", role: "clinicStaff", floor: "2nd Floor", doctor: "Dr. Jones", clinicStaff: "Bob" },
    "bob": { password: "bobPass123", role: "clinicStaff", floor: "1st Floor", doctor: "Dr. Brown", clinicStaff: "Charlie" },
    "charlie": { password: "charliePass123", role: "callCenter", floor: "1st Floor", doctor: null, clinicStaff: null },
    "admin": { password: "adminPass123", role: "admin", floor: "N/A", doctor: "N/A", clinicStaff: "N/A" },
};

// Data Storage (in a real app, this would be a database)
let messages = [];
let currentUserRole = null;
let currentUserName = null;

// Functions

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    currentUserName = username.toLowerCase();

    const user = users[currentUserName];

    if (!username || !password) {
        displayLoginError('Please enter both username and password.');
        return;
    }

    if (user && user.password === password) {
        currentUserRole = user.role;
        localStorage.setItem('userRole', currentUserRole);
        localStorage.setItem('userName', currentUserName);
        showDashboard();
    } else {
        displayLoginError('Invalid credentials. Please try again.');
    }
}

function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    currentUserRole = null;
    currentUserName = null;
    document.getElementById(LOGIN_PANEL_ID).style.display = 'block';
    document.getElementById(DASHBOARD_ID).style.display = 'none';
}

function showDashboard() {
    document.getElementById(LOGIN_PANEL_ID).style.display = 'none';
    document.getElementById(DASHBOARD_ID).style.display = 'block';

    const callCenterPanel = document.getElementById('callCenterPanel');
    const clinicStaffPanel = document.getElementById('clinicStaffPanel');
    const teamLeaderPanel = document.getElementById('teamLeaderPanel');
    const performancePanel = document.getElementById('performancePanel');
    const callCenterNav = document.getElementById('callCenterNav');
    const clinicStaffNav = document.getElementById('clinicStaffNav');
    const teamLeaderNav = document.getElementById('teamLeaderNav');
    const performanceNav = document.getElementById('performanceNav');

    callCenterPanel.classList.remove('active');
    clinicStaffPanel.classList.remove('active');
    teamLeaderPanel.classList.remove('active');
    performancePanel.classList.remove('active');
    callCenterNav.classList.remove('active');
    clinicStaffNav.classList.remove('active');
    teamLeaderNav.classList.remove('active');
    performanceNav.classList.remove('active');

    if (currentUserRole === 'callCenter') {
        callCenterPanel.classList.add('active');
        callCenterNav.classList.add('active');
    } else if (currentUserRole === 'clinicStaff') {
        clinicStaffPanel.classList.add('active');
        clinicStaffNav.classList.add('active');
    } else if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
        teamLeaderPanel.classList.add('active');
        teamLeaderNav.classList.add('active');
    }
    displayMessages();
}

function displayLoginError(message) {
    alert(message);
}

function showPanel(panelId) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

function displayMessages() {
    const callCenterMessages = document.getElementById(CALL_CENTER_MESSAGES_ID);
    const clinicStaffMessages = document.getElementById(CLINIC_STAFF_MESSAGES_ID);
    const teamLeaderMessages = document.getElementById(TEAM_LEADER_MESSAGES_ID);

    callCenterMessages.innerHTML = '';
    clinicStaffMessages.innerHTML = '';
    teamLeaderMessages.innerHTML = '';

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

    // THIS IS THE IMPORTANT LINE!
    updatePerformanceMetrics();
}


    updatePerformanceMetrics();
    <div id="performancePanel" class="panel">
    <h2>Performance Tracking</h2>
    <div id="performanceMetrics"></div>
</div>

}
function updatePerformanceMetrics() {
    const totalMessages = messages.length;
    const urgentMessages = messages.filter(msg => msg.isUrgent).length;
    const delayedMessages = messages.filter(msg => msg.isDelayed).length;
    const completedCalls = messages.filter(msg => msg.replies.includes('Call completed')).length;

    const performanceMetricsDiv = document.getElementById(PERFORMANCE_METRICS_ID);
    performanceMetricsDiv.innerHTML = `
        <p><strong>Total Messages:</strong> ${totalMessages}</p>
        <p><strong>Urgent Messages:</strong> ${urgentMessages}</p>
        <p><strong>Delayed Messages:</strong> ${delayedMessages}</p>
        <p><strong>Completed Calls:</strong> ${completedCalls}</p>
    `;
}



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
