// Google Sign-In callback
function handleCredentialResponse(response) {
  // Decode the JWT
  const data = parseJwt(response.credential);
  const name = data.name;
  const email = data.email;
  const timestamp = new Date().toISOString();

  console.log("✅ Sending to Sheets:", name, email, timestamp);

  const messageDiv = document.getElementById("checkin-message");
  if (!messageDiv) {
    console.warn("⚠️ Missing #checkin-message div in HTML.");
    return;
  }

  // Display success message immediately
  messageDiv.innerHTML = `✅ Welcome, <b>${name}</b>! You’ve been signed in.`;

  // POST to Google Apps Script
  fetch("https://script.google.com/macros/s/AKfycbwfyndRDH1amvxlEPtSN2fatvtoC_41QF3Z9HSjLbxEWU3mIt_Wc3OuSG-lPGernT9hNg/exec", {
    method: "POST",
    mode: "no-cors",  // Required for non-CORS-compatible Apps Script endpoints
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, timestamp })
  })
  .then(() => {
    console.log("📋 Check-in submitted to Google Sheets");
  })
  .catch((error) => {
    console.error("❌ Error submitting to Sheets:", error);
    messageDiv.innerHTML = "❌ Failed to check in. Please try again.";
  });
}

// JWT decoding
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(jsonPayload);
}
