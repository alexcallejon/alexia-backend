// ==== CONTENEDOR ====
const widget = document.createElement("div");
widget.style.position = "fixed";
widget.style.bottom = "24px";
widget.style.right = "24px";
widget.style.zIndex = "9999";
widget.style.fontFamily = "'Segoe UI', sans-serif";
document.body.appendChild(widget);

// ==== BOTÓN FLOTANTE ====
const chatButton = document.createElement("button");
chatButton.innerHTML = "💬";
chatButton.style.width = "64px";
chatButton.style.height = "64px";
chatButton.style.borderRadius = "50%";
chatButton.style.border = "none";
chatButton.style.background = "#1a73e8";
chatButton.style.color = "#fff";
chatButton.style.fontSize = "28px";
chatButton.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
chatButton.style.cursor = "pointer";
widget.appendChild(chatButton);

// ==== VENTANA DEL CHAT ====
const chatWindow = document.createElement("div");
chatWindow.style.display = "none";
chatWindow.style.flexDirection = "column";
chatWindow.style.width = "360px";
chatWindow.style.height = "480px";
chatWindow.style.background = "#ffffff";
chatWindow.style.borderRadius = "12px";
chatWindow.style.boxShadow = "0 6px 24px rgba(0,0,0,0.2)";
chatWindow.style.overflow = "hidden";
chatWindow.style.position = "absolute";
chatWindow.style.bottom = "80px";
chatWindow.style.right = "0";
widget.appendChild(chatWindow);

// ==== CABECERA ====
const header = document.createElement("div");
header.style.background = "#1a73e8";
header.style.color = "#fff";
header.style.padding = "16px";
header.style.display = "flex";
header.style.flexDirection = "column";
header.style.alignItems = "flex-start";

const title = document.createElement("h2");
title.textContent = "AlexIA";
title.style.margin = "0";
title.style.fontSize = "20px";

const subtitle = document.createElement("span");
subtitle.textContent = "Tu asistente virtual empresarial";
subtitle.style.fontSize = "12px";
subtitle.style.opacity = "0.9";

header.appendChild(title);
header.appendChild(subtitle);
chatWindow.appendChild(header);

// ==== HISTORIAL ====
const messages = document.createElement("div");
messages.style.flex = "1";
messages.style.padding = "16px";
messages.style.overflowY = "auto";
messages.style.background = "#f8f9fa";
chatWindow.appendChild(messages);

// ==== FORMULARIO ====
const form = document.createElement("form");
form.style.display = "flex";
form.style.borderTop = "1px solid #ddd";

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Escribe tu mensaje...";
input.style.flex = "1";
input.style.padding = "12px";
input.style.border = "none";
input.style.outline = "none";

const send = document.createElement("button");
send.type = "submit";
send.textContent = "Enviar";
send.style.background = "#1a73e8";
send.style.color = "#fff";
send.style.border = "none";
send.style.padding = "0 16px";
send.style.cursor = "pointer";

form.appendChild(input);
form.appendChild(send);
chatWindow.appendChild(form);

// ==== LÓGICA ====
chatButton.onclick = () => {
  chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  const userDiv = document.createElement("div");
  userDiv.textContent = userMsg;
  userDiv.style.margin = "8px 0";
  userDiv.style.textAlign = "right";
  userDiv.style.color = "#1a73e8";
  messages.appendChild(userDiv);
  input.value = "";

  const botDiv = document.createElement("div");
  botDiv.textContent = "⏳ escribiendo...";
  botDiv.style.margin = "8px 0";
  botDiv.style.textAlign = "left";
  botDiv.style.color = "#555";
  messages.appendChild(botDiv);

  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });
    const data = await res.json();
    botDiv.textContent = data.reply;
  } catch (err) {
    botDiv.textContent = "❌ Error al contactar con el servidor.";
  }

  messages.scrollTop = messages.scrollHeight;
};
