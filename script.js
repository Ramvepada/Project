// Contact form handler
const owlForm = document.getElementById("owlForm");
if (owlForm) {
  owlForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("formMessage").textContent =
      "🦉 Your owl has been dispatched!";
  });
}

// Admission form handler
const admissionForm = document.getElementById("admissionForm");
if (admissionForm) {
  // Word counter for essay
  const essayField = document.getElementById("essay");
  const wordCountDisplay = document.getElementById("wordCount");

  if (essayField && wordCountDisplay) {
    essayField.addEventListener("input", function () {
      const text = this.value.trim();
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      wordCountDisplay.textContent = `Word count: ${wordCount}`;

      if (wordCount < 100 && wordCount > 0) {
        wordCountDisplay.style.color = "#721c24";
      } else if (wordCount >= 100) {
        wordCountDisplay.style.color = "#155724";
      } else {
        wordCountDisplay.style.color = "#8b6f47";
      }
    });
  }

  // Form submission handler
  admissionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate essay word count
    const essay = document.getElementById("essay").value.trim();
    const words = essay.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length < 100) {
      showFormMessage("Please write at least 100 words in your personal statement.", "error");
      return;
    }

    // Validate terms agreement
    const termsChecked = document.getElementById("terms").checked;
    const parentalConsentChecked = document.getElementById("parentalConsent").checked;

    if (!termsChecked || !parentalConsentChecked) {
      showFormMessage("Please agree to all terms and consent requirements.", "error");
      return;
    }

    // Get form data
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const housePreference = document.getElementById("housePreference").value;

    // Simulate form submission
    const submitBtn = admissionForm.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    setTimeout(() => {
      let message = `🦉 Dear ${firstName} ${lastName}, your application has been received! `;
      
      if (housePreference) {
        const houseName = housePreference.charAt(0).toUpperCase() + housePreference.slice(1);
        message += `The Sorting Hat has noted your preference for ${houseName}. `;
      }
      
      message += "You will receive your admission letter via owl post within 2-3 weeks. Welcome to the magical world!";
      
      showFormMessage(message, "success");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Application";
      
      // Reset form after successful submission
      setTimeout(() => {
        admissionForm.reset();
        wordCountDisplay.textContent = "Word count: 0";
        wordCountDisplay.style.color = "#8b6f47";
      }, 3000);
    }, 1500);
  });

  // Helper function to show form messages
  function showFormMessage(message, type) {
    const formMessage = document.getElementById("formMessage");
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}