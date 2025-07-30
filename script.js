// This function is called when the user signs in with Google
function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);  // decode the JWT token from Google
  const name = data.name;
  const email = data.email;

  // Show user confirmation on the page
  document.getElementById("response").innerText =
    `✅ Welcome, ${name}! You’ve been signed in.`;

fetch("https://script.google.com/macros/s/AKfycbwfyndRDH1amvxlEPtSN2fatvtoC_41QF3Z9HSjLbxEWU3mIt_Wc3OuSG-lPGernT9hNg/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    email: email,
    timestamp: new Date().toISOString()
  })
});
}

// Helper function to decode JWT (ID token)
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}
