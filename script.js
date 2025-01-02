const encryptionKey = "simplekey123"; // Simple key for encryption (replace with a better mechanism)

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

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Example validation
    if (username === "admin" && password === "password123") {
        const encryptedData = encrypt(`${username}:${password}`);
        setCookie("userData", encryptedData, 7); // Set cookie for 7 days
        alert("Login successful!");
        window.location.reload(); // Simulate page reload to verify login state
    } else {
        document.getElementById("message").style.display = "block";
    }
}

// Check if the user is already logged in
function checkLoginStatus() {
    const cookieData = getCookie("userData");
    if (cookieData) {
        const userData = decrypt(cookieData);
        const [username, password] = userData.split(":");
        if (username === "admin" && password === "password123") {
            alert(`Welcome back, ${username}!`);
            document.querySelector(".login-container").innerHTML = `
                <h2>Welcome, ${username}</h2>
                <button onclick="logout()">Logout</button>
            `;
        }
    }
}

// Logout function
function logout() {
    setCookie("userData", "", -1); // Expire the cookie
    window.location.reload();
}

// Check login status on page load
checkLoginStatus();
