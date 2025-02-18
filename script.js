// Constants
const LOGIN_PANEL_ID = 'loginPanel';
const DASHBOARD_ID = 'dashboard';
const USER_DETAILS_ID = 'userDetails';
const CLINIC_MESSAGES_ID = 'clinicMessages';
const LEADER_MESSAGES_ID = 'leaderMessages';

// data file

// Sample user data (in reality, this would come from a secure backend)
const users = {
    "Hardi": { password: "hardiPass123", floor: "3rd Floor", doctor: "Dr. Smith", clinicStaff: "Alice" },
    "Alice": { password: "alicePass123", floor: "2nd Floor", doctor: "Dr. Jones", clinicStaff: "Bob" },
    "Bob": { password: "bobPass123", floor: "1st Floor", doctor: "Dr. Brown", clinicStaff: "Charlie" },
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        displayLoginError('Please enter both username and password.');
        return;
    }
    if (users[username] && users[username].password === password) {
        showDashboard(username);
    } else {
        displayLoginError('Invalid credentials. Please try again.');
    }
}

function showDashboard(username) {
    document.getElementById(LOGIN_PANEL_ID).style.display = 'none';
    document.getElementById(DASHBOARD_ID).style.display = 'block';
    document.getElementById(USER_DETAILS_ID).innerText = `Logged in as ${username}, assigned to ${users[username].doctor} on ${users[username].floor}.`;
}

// Helper function to display error messages
function displayLoginError(message) {
    alert(message);
}

function selectStaffBasedOnDoctor() {
    const selectedDoctor = document.getElementById('doctorSelect').value;
    const staffName = Object.keys(users).find(key => users[key].doctor === selectedDoctor);
    alert('Messages will be handled by ' + users[staffName].clinicStaff);
}

function sendCallCenterMessage() {
    const callerName = document.getElementById('callerName').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const mrn = document.getElementById('mrn').value;
    const inquiryReason = document.getElementById('inquiryReason').value;
    const selectedDoctor = document.getElementById('doctorSelect').value;

    const message = `${callerName} - ${contactInfo} - ${mrn} - ${inquiryReason} - ${selectedDoctor}`;
    
    // Basic input validation
    if (!callerName || !contactInfo || !mrn || !inquiryReason) {
        alert("Please fill in all fields.");
        return;
    }

    displayMessage(CLINIC_MESSAGES_ID, message);
    displayMessage(LEADER_MESSAGES_ID, message);
}

function displayMessage(panelId, message) {
    const panel = document.getElementById(panelId);
    if (!panel) {
        console.error(`Panel with ID ${panelId} not found.`);
        return;
    }
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    panel.appendChild(messageDiv);
}
