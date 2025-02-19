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
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const user = users[username];

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    if (user && user.password === password) {
        currentUserRole = user.role;
        currentUserName = username;
        localStorage.setItem('userRole', currentUserRole);
        localStorage.setItem('userName', currentUserName);
        showDashboard();
    } else {
        alert('Invalid credentials. Please try again.');
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
    updatePerformanceMetrics();
}

function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
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
        id: Date.now(),
        callerName,
        contactInfo,
        mrn,
        inquiryReason,
        selectedDoctor,
        timestamp: new Date(),
        isUrgent: false,
        isDelayed: false,
        replies: [],
        repliedAt: null,
        sender: currentUserName
    };

    messages.push(newMessage);
    displayMessages();
    addNotification(`New Message from ${callerName} for ${selectedDoctor}`);
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

        if (currentUserRole === 'clinicStaff' && message.selectedDoctor === users[currentUserName]?.doctor) {
            clinicStaffMessages.appendChild(messageElement);
        }

        if (currentUserRole === 'teamLeader' || currentUserRole === 'admin') {
            teamLeaderMessages.appendChild(messageElement);
        }
    });
    updatePerformanceMetrics();
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const now = new Date();
    const oneHour = 60 * 60 * 1000;

    if (!message.repliedAt && (now - new Date(message.timestamp)) > oneHour) {
        message.isUrgent = true;
    }

    messageDiv.innerHTML = `
        <p><strong>Caller:</strong> ${message.callerName}</p>
        <p><strong>Doctor:</strong> ${message.selectedDoctor}</p>
        <p><strong>Sent at:</strong> ${new Date(message.timestamp).toLocaleTimeString()}</p>
        ${message.repliedAt ? `<p><strong>Replied At:</strong> ${new Date(message.repliedAt).toLocaleTimeString()}</p>` : '<p style="color: red;">Pending Reply</p>'}
    `;
    return messageDiv;
}

function updatePerformanceMetrics() {
    const performanceMetricsDiv = document.getElementById(PERFORMANCE_METRICS_ID);
    performanceMetricsDiv.innerHTML = '<p>Performance data will go here.</p>';
}

function addNotification(message) {
    const notificationArea = document.getElementById(NOTIFICATION_AREA_ID);
    const notificationDiv = document.createElement('div');
    notificationDiv.textContent = message;
    notificationArea.appendChild(notificationDiv);
}

window.onload = function () {
    const savedRole = localStorage.getItem('userRole');
    const savedUserName = localStorage.getItem('userName');
    if (savedRole && savedUserName) {
        currentUserRole = savedRole;
        currentUserName = savedUserName;
        showDashboard();
    }
};
