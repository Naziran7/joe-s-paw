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

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!hamburger || !navMenu) return;

  // Toggle mobile menu
  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  // Close mobile menu when clicking a link
  function closeMobileMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event Listeners
  hamburger.addEventListener("click", toggleMobileMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu when clicking outside on overlay
  navMenu.addEventListener("click", (e) => {
    if (e.target === navMenu) {
      closeMobileMenu();
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Close menu when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}

// Initialize mobile nav when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  // Your existing code continues here...
});

// Google Sheets Integration
// ============================================
// GOOGLE SHEETS BOOKING SYSTEM
// ============================================

// YOUR WEB APP URL (Replace with your actual URL)
const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbz8KqIfTu4lgzmz-uxXzVJcTw11VUw2iBEqh6Uvhztk32cPdzAcPqVOmcLMb4PqPCBA2Q/exec";

// Initialize booking form
function initBookingForm() {
  const bookingForm = document.getElementById("bookingForm");
  if (!bookingForm) return;

  // Set minimum date to today
  const dateInput = document.getElementById("bookingDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    // Set default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }

  // Set business hours (9 AM to 6 PM)
  const timeInput = document.getElementById("bookingTime");
  if (timeInput) {
    timeInput.min = "09:00";
    timeInput.max = "18:00";
    timeInput.value = "10:00";
  }

  // Handle form submission
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const bookingData = {
      name: document.getElementById("bookingName").value.trim(),
      email: document.getElementById("bookingEmail").value.trim(),
      phone: document.getElementById("bookingPhone").value.trim(),
      service: document.getElementById("bookingService").value,
      date: document.getElementById("bookingDate").value,
      time: document.getElementById("bookingTime").value,
      notes: document.getElementById("bookingNotes").value.trim(),
    };

    // Validate
    if (!validateBooking(bookingData)) {
      return;
    }

    // Show loading
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
      // Send to Google Sheets
      const response = await submitBookingToSheets(bookingData);

      if (response.success) {
        // Show success message
        showNotification(
          "✅ Booking confirmed! Check your email for details.",
          "success"
        );

        // Reset form
        bookingForm.reset();

        // Set default date/time again
        if (dateInput) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          dateInput.value = tomorrow.toISOString().split("T")[0];
        }
        if (timeInput) timeInput.value = "10:00";

        // Close popup after delay
        setTimeout(() => {
          closePopup();
        }, 2000);

        // Send confirmation to customer
        sendCustomerConfirmation(bookingData, response.bookingId);
      } else {
        throw new Error(response.error || "Submission failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      showNotification(
        "❌ Failed to submit. Please try again or contact us directly.",
        "error"
      );
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Submit to Google Sheets
async function submitBookingToSheets(bookingData) {
  try {
    const response = await fetch(GOOGLE_SHEETS_API, {
      method: "POST",
      mode: "no-cors", // Important for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    // With no-cors, we can't read the response
    // So we assume success if no network error
    return { success: true, bookingId: Date.now() };
  } catch (error) {
    console.error("Network error:", error);
    return { success: false, error: "Network error" };
  }
}

// Validate booking data
function validateBooking(data) {
  if (!data.name || data.name.length < 2) {
    showNotification("Please enter a valid name", "error");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }

  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, "");
  if (!phoneRegex.test(cleanPhone)) {
    showNotification("Please enter a valid phone number", "error");
    return false;
  }

  if (!data.service) {
    showNotification("Please select a service", "error");
    return false;
  }

  if (!data.date) {
    showNotification("Please select a date", "error");
    return false;
  }

  if (!data.time) {
    showNotification("Please select a time", "error");
    return false;
  }

  return true;
}

// Send confirmation to customer
function sendCustomerConfirmation(data, bookingId) {
  const subject = `Booking Confirmation #${bookingId} - Joe's Paws and Walks`;
  const body = `
Dear ${data.name},

Thank you for booking with Joe's Paws and Walks!

📋 Booking Summary:
-------------------
🔢 Booking ID: #${bookingId}
🐾 Service: ${data.service}
📅 Date: ${data.date}
⏱️ Time: ${data.time}
📞 Phone: ${data.phone}

📝 Notes:
${data.notes || "None provided"}

-------------------
We will contact you within 24 hours to confirm your appointment.

For any changes, please contact us:
📧 contact@joespawwalks.com
📞 (555) 123-4567

Best regards,
🐾 Joe's Paws and Walks
    `;

  // Open email client with pre-filled email
  const mailtoLink = `mailto:${data.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink, "_blank");
}

// Add this to your existing DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // ... your existing code ...

  // Initialize booking form
  initBookingForm();

  // ... rest of your code ...
});
