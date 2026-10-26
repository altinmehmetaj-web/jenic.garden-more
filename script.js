
const WA_NUMBER = "393286990941";

document.getElementById("year").textContent =
  new Date().getFullYear();

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Chiudi menu" : "Apri menu"
  );
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// MODULO PREVENTIVO - INVIO A FORMSPREE
const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
    quoteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = quoteForm.querySelector('button[type="submit"]');

        let feedback = quoteForm.querySelector(".form-feedback");

        if (!feedback) {
            feedback = document.createElement("p");
            feedback.className = "form-feedback";
            feedback.setAttribute("role", "status");
            quoteForm.appendChild(feedback);
        }

        if (button) {
            button.disabled = true;
            button.textContent = "Invio in corso...";
        }

        try {
            const response = await fetch(
                "https://formspree.io/f/mwlllbwk",
                {
                    method: "POST",
                    body: new FormData(quoteForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Invio non riuscito");
            }

            feedback.textContent =
                "Grazie! La tua richiesta è stata inviata correttamente.";
            feedback.style.color = "green";

            quoteForm.reset();

        } catch (error) {
            feedback.textContent =
                "Errore durante l'invio. Riprova oppure contattaci su WhatsApp.";
            feedback.style.color = "red";

        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = "Invia richiesta";
            }
        }
    });
}
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const text =
    `Ciao Marko, sono ${name}.` +
    (phone ? ` Il mio numero è ${phone}.` : "") +
    `\nServizio: ${service}.` +
    (message ? `\nDettagli: ${message}` : "") +
    "\nVorrei ricevere informazioni e un preventivo.";

  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener"
  );
});

// Preferenze cookie
const banner = document.getElementById("cookieBanner");
const prefs = document.getElementById("cookiePreferences");
const consentKey = "jenic_cookie_consent_v1";

function showCookieBanner() {
  banner.hidden = false;
}

function saveConsent(value) {
  localStorage.setItem(
    consentKey,
    JSON.stringify({
      ...value,
      savedAt: new Date().toISOString()
    })
  );
  banner.hidden = true;
}

if (!localStorage.getItem(consentKey)) {
  showCookieBanner();
}

document.getElementById("acceptAll").addEventListener("click", () => {
  saveConsent({
    necessary: true,
    analytics: true,
    marketing: true
  });
});

document.getElementById("necessaryOnly").addEventListener("click", () => {
  saveConsent({
    necessary: true,
    analytics: false,
    marketing: false
  });
});

document.getElementById("customizeCookies").addEventListener("click", () => {
  prefs.hidden = !prefs.hidden;
});

document.getElementById("savePreferences").addEventListener("click", () => {
  saveConsent({
    necessary: true,
    analytics: document.getElementById("analyticsCookies").checked,
    marketing: document.getElementById("marketingCookies").checked
  });
});

// Riapertura preferenze dal footer
document.querySelectorAll("[data-open-cookie]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    banner.hidden = false;
  });
});
