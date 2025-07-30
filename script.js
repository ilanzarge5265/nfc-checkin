// This function is called when the user signs in with Google
function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);  // decode the JWT token from Google
  const name = data.name;
  const email = data.email;

  // Show user confirmation on the page
  document.getElementById("response").innerText =
    `✅ Welcome, ${name}! You’ve been signed in.`;

  // OPTIONAL: Send data to Google Sheets or Firebase (add below if needed)
  // fetch("https://your-logging-endpoint.com", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     name: name,
  //     email: email,
  //     timestamp: new Date().toISOString()
  //   })
  // });
}

// Helper function to decode JWT (ID token)
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}
