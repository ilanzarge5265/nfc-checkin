function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  const name = data.name;
  const email = data.email;
  const timestamp = new Date().toISOString();

  console.log("✅ Sending to Sheets:", name, email, timestamp); // Debugging line

  fetch("https://script.google.com/macros/s/AKfyc.../exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, timestamp })
  })
  .then(res => res.json())
  .then(res => {
    console.log("📋 Server response:", res);
    document.getElementById("status").innerHTML =
      `✅ Welcome, ${name}! You’ve been signed in.`;
  })
  .catch(err => {
    console.error("❌ Error submitting to Sheets:", err);
    document.getElementById("status").innerHTML =
      "❌ Something went wrong. Try again.";
  });
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
