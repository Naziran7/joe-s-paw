// DOM Elements
const bookNowBtn = document.getElementById("bookNowBtn");
const heroBookBtn = document.getElementById("heroBookBtn");
const bookingPopup = document.getElementById("bookingPopup");
const closeBtn = document.querySelector(".close-btn");
const bookingForm = document.getElementById("bookingForm");
const contactForm = document.getElementById("contactForm");
const dateInput = document.querySelector('#bookingForm input[type="date"]');

// Initialize the website
function initWebsite() {
  // Set minimum date for booking to today
  if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];

    // Set default date to tomorrow
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.type === "submit") {
        this.classList.add("loading");
        setTimeout(() => {
          this.classList.remove("loading");
        }, 1500);
      }
    });
  });
}

// Open popup with animation
function openPopup() {
  bookingPopup.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close popup
function closePopup() {
  bookingPopup.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Handle booking form submission
function handleBookingSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(bookingForm);
  const data = {
    name: formData.get("name") || formData.get(0)?.value || "",
    email: formData.get("email") || formData.get(1)?.value || "",
    phone: formData.get("phone") || formData.get(2)?.value || "",
    service:
      formData.get("service") || bookingForm.querySelector("select").value,
    date:
      formData.get("date") ||
      bookingForm.querySelector('input[type="date"]').value,
    notes:
      formData.get("notes") ||
      bookingForm.querySelector("textarea").value ||
      "",
  };

  // Validate form
  if (!data.name || !data.email || !data.phone || !data.service || !data.date) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Show loading state
  const submitBtn = bookingForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Booking...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    console.log("Booking submitted:", data);

    // Show success message
    showNotification(
      "Thank you! Your appointment has been booked. We will contact you soon to confirm.",
      "success"
    );

    // Reset form and close popup
    bookingForm.reset();
    closePopup();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Send confirmation email (simulated)
    sendConfirmationEmail(data);
  }, 1500);
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name:
      formData.get("name") ||
      contactForm.querySelector('input[type="text"]').value ||
      "",
    email:
      formData.get("email") ||
      contactForm.querySelector('input[type="email"]').value ||
      "",
    message:
      formData.get("message") ||
      contactForm.querySelector("textarea").value ||
      "",
  };

  // Validate form
  if (!data.name || !data.email || !data.message) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    console.log("Contact form submitted:", data);

    // Show success message
    showNotification(
      "Thank you for your message! We will get back to you within 24 hours.",
      "success"
    );

    // Reset form
    contactForm.reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// Show notification
function showNotification(message, type = "success") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add to page
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Send confirmation email (simulated)
function sendConfirmationEmail(data) {
  console.log("Sending confirmation email to:", data.email);
  console.log("Email content:", {
    subject: "Appointment Confirmation - Joe's Paws and Walks",
    body: `Dear ${data.name},\n\nThank you for booking ${data.service} on ${data.date}.\n\nWe will contact you at ${data.phone} to confirm details.\n\nBest regards,\nJoe's Paws and Walks Team`,
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links");
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }

        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize website
  initWebsite();

  // Initialize smooth scroll
  initSmoothScroll();

  // Event listeners for opening popup
  bookNowBtn.addEventListener("click", openPopup);
  heroBookBtn.addEventListener("click", openPopup);

  // Event listener for closing popup
  closeBtn.addEventListener("click", closePopup);

  // Close popup when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === bookingPopup) {
      closePopup();
    }
  });

  // Handle form submissions
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Add notification styles dynamically
  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-dark);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1002;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification.success {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            border-left: 4px solid #2E7D32;
        }
        
        .notification.error {
            background: linear-gradient(135deg, #f44336, #d32f2f);
            border-left: 4px solid #b71c1c;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .btn.loading {
            position: relative;
            color: transparent;
        }
        
        .btn.loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-left: -10px;
            margin-top: -10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  // Add scroll animation for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});

// Add animation styles
const animationStyle = document.createElement("style");
animationStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .card, .about-item {
        transition-delay: 0.1s;
    }
`;
document.head.appendChild(animationStyle);
