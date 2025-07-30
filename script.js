// Google Sign-In callback
function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    const name = data.name;
    const email = data.email;
    const timestamp = new Date().toISOString();

    console.log("✅ Sending to Sheets:", name, email, timestamp);

    // POST to Google Apps Script Web App
    fetch("https://script.google.com/macros/s/AKfycbzmIfTdchF0AffOhzdQFvfSF04QDhwKEzJheWKDWg3bVYt0iiYzIwJiWhIJUdpiIVqyGw/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, timestamp })
    })
    .then(res => res.text())
    .then(data => {
        console.log("✅ Response from Google Apps Script:", data);
        document.getElementById("checkin-message").innerHTML = "✅ Checked in!";
    })
    .catch(err => {
        console.error("❌ Error submitting to Sheets:", err);
        document.getElementById("checkin-message").innerHTML = "❌ Check-in failed.";
    });
}

// Decode JWT token from Google
function parseJwt(token) {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
    return JSON.parse(jsonPayload);
}
