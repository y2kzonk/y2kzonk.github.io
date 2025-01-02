const encryptionKey = "simplekey123";

// Encrypt function using Base64 (for demonstration purposes)
function encrypt(text) {
    return btoa(text + encryptionKey);
}

// Decrypt function using Base64
function decrypt(encryptedText) {
    const decoded = atob(encryptedText);
    return decoded.replace(encryptionKey, "");
}

// Set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Show sign-up form
function showSignUp() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";
}

// Show login form
function showLogin() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Sign-Up function
function signUp() {
    const username = document.getElementById("signUpUsername").value;
    const password = document.getElementById("signUpPassword").value;

    if (getCookie(username)) {
        document.getElementById("signUpMessage").style.display = "block";
    } else {
        const encryptedData = encrypt(password);
        setCookie(username, encryptedData, 7); // Save user credentials in cookies
        alert("Sign-Up successful! You can now log in.");
        showLogin();
    }
}

// Login function
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const encryptedPassword = getCookie(username);
    if (encryptedPassword && decrypt(encryptedPassword) === password) {
        alert(`Welcome, ${username}!`);
        setCookie("loggedInUser", username, 7); // Set logged-in user
        document.body.innerHTML = `<h2>Welcome, ${username}!</h2><button onclick="logout()">Logout</button>`;
    } else {
        document.getElementById("loginMessage").style.display = "block";
    }
}

// Logout function
function logout() {
    setCookie("loggedInUser", "", -1);
    window.location.reload();
}
