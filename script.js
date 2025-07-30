// Called automatically after successful sign-in
function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);  // decode the JWT token
  const name = data.name;
  const email = data.email;

  // Display success message to user
  document.getElementById("response").innerText =
    `Welcome, ${name}! You've been signed in.`;

  // Send data to backend logger (Google Sheets)
  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      timestamp: new Date().toISOString()
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// Helper: Decode JWT token returned by Google
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}
