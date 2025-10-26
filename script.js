// ----------------------
// 1. Dynamic Greeting
// ----------------------
window.addEventListener("DOMContentLoaded", () => {
  const hours = new Date().getHours();
  let greeting;

  if (hours < 12) {
    greeting = "Good Morning ☀️";
  } else if (hours < 18) {
    greeting = "Good Afternoon 🌤️";
  } else {
    greeting = "Good Evening 🌙";
  }

  const greetElement = document.createElement("h2");
  greetElement.innerText = greeting;
  greetElement.style.color = "#3498db";
  greetElement.style.textAlign = "center";
  greetElement.style.marginTop = "10px";

  document.querySelector("header").appendChild(greetElement);
});

// ----------------------
// 2. Skill Bar Animation
// ----------------------
window.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-fill");
  skills.forEach(skill => {
    const level = skill.getAttribute("data-level") || "0%";
    setTimeout(() => {
      skill.style.width = level;
    }, 400); // delay so it feels smoother
  });
});

// ----------------------
// 3. Fun Easter Egg: Confetti
// ----------------------
function launchConfetti() {
  const colors = ["#3498db", "#ffdd59", "#2ecc71", "#e74c3c", "#9b59b6"];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);

    const size = Math.random() * 8 + 5 + "px";
    confetti.style.width = size;
    confetti.style.height = size;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = "fixed";
    confetti.style.top = "-10px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.opacity = 0.7;
    confetti.style.borderRadius = "50%";
    confetti.style.animation = "fall 3s linear forwards";

    setTimeout(() => confetti.remove(), 3000);
  }
}

// Trigger confetti when profile picture is clicked
window.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.querySelector(".profile-pic");
  if (profilePic) {
    profilePic.addEventListener("click", launchConfetti);
  }
});
