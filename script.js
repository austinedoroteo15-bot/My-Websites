let currentImageIndex = 0;

function getGalleryImages() {
    return Array.from(
        document.querySelectorAll(".thumbnail")
    );
}


function openLightbox(index = 0) {
    let a = getGalleryImages();
    if (!a.length) return;

    currentImageIndex = index;

    let lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.style.display = "flex";

    showImage(index);
}

function closeLightbox() {
    let x = document.getElementById("lightbox");

    if (x) {
        x.style.display = "none";
    }
}

function showImage(i) {
    let a = getGalleryImages();

    if (!a.length) return;

    currentImageIndex = i;

    document.getElementById("lightboxImage").src = a[i].src;
}

function changeImage(d) {
    let a = getGalleryImages();

    if (!a.length) return;

    currentImageIndex += d;

    if (currentImageIndex < 0) {
        currentImageIndex = a.length - 1;
    }

    if (currentImageIndex >= a.length) {
        currentImageIndex = 0;
    }

    showImage(currentImageIndex);
}

function confirmLogout() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("isLoggedIn");

        location.href = "login.html";
    }
}

function openTab(e, n) {
    document.querySelectorAll(".tabcontent").forEach(x => {
        x.style.display = "none";
    });

    document.querySelectorAll(".tablinks").forEach(x => {
        x.classList.remove("active");
    });

    document.getElementById(n).style.display = "block";

    e.currentTarget.classList.add("active");
}

function toggleGoalDetails(i) {
    let x = document.getElementById("goal" + i + "-details");

    if (x) {
        x.classList.toggle("active");
    }
}

document.addEventListener("keydown", e => {
    let box = document.getElementById("lightbox");
    if (!box || box.style.display !== "flex") return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".close, .prev, .next").forEach(x => {
        x.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                x.click();
            }
        });
    });

    // Tap to flip fun-fact cards on touch screens
    document.querySelectorAll(".funfact-card").forEach(x => {
        x.addEventListener("click", () => x.classList.toggle("flipped"));
    });

    document.querySelectorAll(".thumbnail").forEach((x, i) => {
        x.addEventListener("click", () => {
            openLightbox(i);
        });
    });

    let b = document.getElementById("lightbox");

    if (b) {
        b.addEventListener("click", e => {
            if (e.target === b) {
                closeLightbox();
            }
        });
    }

    let f = document.getElementById("contactForm");

    if (f) {
        f.addEventListener("submit", e => {
            e.preventDefault();

            let n = document.getElementById("name");
            let m = document.getElementById("message");
            let em = document.getElementById("email");
            let v = true;

            document.querySelectorAll(".error").forEach(x => {
                x.textContent = "";
            });

            if (!n.value.trim()) {
                nameError.textContent = "Name is required";
                v = false;
            }

            if (!em.value.trim()) {
                emailError.textContent = "Email is required";
                v = false;
            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())
            ) {
                emailError.textContent = "Please enter a valid email";
                v = false;
            }

            if (!m.value.trim()) {
                messageError.textContent = "Message is required";
                v = false;
            }

            if (v) {
                alert("Your message has been sent successfully!");

                f.reset();
            }
        });
    }

});


// Highlight the current page in the navigation
document.addEventListener("DOMContentLoaded", () => {
    let page = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a[href]").forEach(a => {
        if (a.getAttribute("href") !== page) return;

        a.classList.add("current");

        let parent = a.closest(".dropdown");
        if (parent) parent.querySelector(":scope > a").classList.add("current");
    });
});
