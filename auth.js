/* =====================
   SESSION HELPERS
===================== */
function getSession() {
  const s = localStorage.getItem("session");
  return s ? JSON.parse(s) : null;
}

/* =====================
   LOGIN (BACKEND AUTH)
===================== */
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("error").innerText =
      "Please enter username and password";
    return;
  }

  const res = await fetch("https://n8n.srv1140797.hstgr.cloud/webhook/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.error) {
    document.getElementById("error").innerText =
      "Invalid username or password";
    return;
  }

  // Session issued by backend (n8n)
  localStorage.setItem("session", JSON.stringify(data));
  window.location.href = "Input2.html";
}

/* =====================
   ENTER KEY SUPPORT
===================== */
function handleEnter(event) {
  if (event.key === "Enter") {
    login();
  }
}

/* =====================
   LOGOUT (BACKEND INVALIDATION)
===================== */
function logout() {
  const session = getSession();

  if (session?.sessionId) {
    fetch("https://n8n.srv1140797.hstgr.cloud/webhook/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.sessionId })
    });
  }

  localStorage.removeItem("session");
  window.location.href = "login.html";
}

/* =====================
   DARK MODE
===================== */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}


