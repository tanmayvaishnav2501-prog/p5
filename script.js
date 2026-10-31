// ==========================================
// GRANDSTONE UNIVERSITY - JAVASCRIPT
// ==========================================


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        menuToggle.textContent =
            navLinks.classList.contains("open") ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });
}


// AUTOMATIC FOOTER YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// COURSE FILTERING

const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        courseCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || filter === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// ADMISSION FORM

const admissionForm = document.getElementById("admissionForm");
const admissionMessage = document.getElementById("admissionMessage");

if (admissionForm) {

    admissionForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const email = document.getElementById("studentEmail").value.trim();
        const phone = document.getElementById("studentPhone").value.trim();
        const course = document.getElementById("studentCourse").value;
        const qualification = document.getElementById("studentQualification").value;


        // NAME VALIDATION

        if (name.length < 3) {
            showMessage("Please enter your full name.", "error");
            return;
        }


        // EMAIL VALIDATION

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }


        // PHONE VALIDATION

        if (!/^[0-9]{10}$/.test(phone)) {
            showMessage("Enter a valid 10-digit mobile number.", "error");
            return;
        }


        // COURSE VALIDATION

        if (!course || !qualification) {
            showMessage("Please select your course and qualification.", "error");
            return;
        }


        // SAVE ADMISSION ENQUIRY

        const enquiry = {
            name: name,
            email: email,
            phone: phone,
            course: course,
            qualification: qualification,
            date: new Date().toLocaleString()
        };


        const enquiries = JSON.parse(
            localStorage.getItem("guAdmissionEnquiries") || "[]"
        );

        enquiries.push(enquiry);

        localStorage.setItem(
            "guAdmissionEnquiries",
            JSON.stringify(enquiries)
        );


        // SUCCESS MESSAGE

        showMessage(
            "Thank you " + name + "! Your enquiry has been submitted successfully to Grandstone University.",
            "success"
        );

        admissionForm.reset();

    });
}


// SHOW FORM MESSAGE

function showMessage(message, type) {

    if (admissionMessage) {

        admissionMessage.textContent = message;
        admissionMessage.className = "form-message " + type;

    }
}


// SMOOTH SCROLLING

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// SCROLL TO TOP BUTTON

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.setAttribute("aria-label", "Scroll to top");

topButton.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: #d71920;
    color: white;
    font-size: 26px;
    cursor: pointer;
    display: none;
    z-index: 999;
`;

document.body.appendChild(topButton);


window.addEventListener("scroll", () => {

    topButton.style.display =
        window.scrollY > 350 ? "block" : "none";

});


topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// SCROLL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".course-card, .campus-card, .faculty-card, .about-content, .about-image"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


// ACTIVE NAVIGATION

const sections = document.querySelectorAll("section[id]");

const navigationLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
);


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 150) {

            current = section.id;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );

    });

});


// IMAGE ERROR HANDLING

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function () {

        this.alt = "Grandstone University image unavailable";

    });

});


// WEBSITE LOADED MESSAGE

console.log("Grandstone University Website Loaded Successfully!");