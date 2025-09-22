// ==== Dark/Light Mode Toggle ====
const toggleBtn = document.querySelector(".toggle-btn");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ==== Scroll Animation for Hidden Sections ====
const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
hiddenElements.forEach(el => observer.observe(el));

// ==== Contact Form Submission (Formspree JSON POST) ====
const form = document.getElementById("contactForm");

// Create styled success message
const successMsg = document.createElement("p");
successMsg.style.color = "#fff";
successMsg.style.backgroundColor = "#FAACCE";
successMsg.style.padding = "10px 15px";
successMsg.style.borderRadius = "10px";
successMsg.style.textAlign = "center";
successMsg.style.display = "none";
successMsg.style.marginTop = "15px";
form.appendChild(successMsg);

form.addEventListener("submit", function(e){
  e.preventDefault();

  // Prepare JSON data
  const data = {
    name: form.name.value.trim(),
    _replyto: form._replyto.value.trim(),
    message: form.message.value.trim()
  };

  // Send POST request to Formspree
  fetch(form.action, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if(response.ok){
      successMsg.textContent = `Thank you, ${data.name}! Your message has been sent.`;
      successMsg.style.display = "block";
      form.reset();
      setTimeout(() => successMsg.style.display = "none", 5000);
    } else {
      response.json().then(data => {
        if(data.errors) {
          alert(data.errors.map(error => error.message).join(", "));
        } else {
          alert("Oops! Something went wrong.");
        }
      });
    }
  })
  .catch(error => {
    alert("Error: " + error);
  });
});
