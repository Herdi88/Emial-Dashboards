<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="loginPanel">
        <h1>Login Page</h1>
        <input type="text" id="username" placeholder="Enter Username">
        <input type="password" id="password" placeholder="Enter Password">
        <button id="loginButton">Login</button>
    </div>
    
    <div id="dashboard" style="display: none;">
        <h1>Email Dashboard</h1>
        <div id="userInfo"></div>
        <div id="callCenter" style="display: none;">
            <h2>Call Center Panel</h2>
            <input type="text" id="callerName" placeholder="Caller Name">
            <input type="text" id="contactInfo" placeholder="Contact Info">
            <input type="text" id="mrn" placeholder="MRN">
            <select id="inquiryReason">
                <option value="">Select Reason...</option>
                <option value="appointment">Appointment</option>
                <option value="billing">Billing Inquiry</option>
                <option value="generalInfo">General Information</option>
            </select>
            <select id="doctorSelect">
                <option value="">Select Doctor...</option>
                <option value="drSmith">Dr. Smith</option>
                <option value="drJones">Dr. Jones</option>
            </select>
            <button onclick="sendMessage()">Send Message</button>
        </div>
        <div id="clinicStaff" style="display: none;">
            <h2>Clinic Staff Panel</h2>
            <div id="clinicMessages"></div>
        </div>
        <div id="teamLeader" style="display: none;">
            <h2>Team Leader Panel</h2>
            <div id="leaderMessages"></div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
