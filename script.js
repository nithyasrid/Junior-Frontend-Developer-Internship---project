"use strict";

/*
 * WEEK 4
 * Performance-optimized JavaScript
 *
 * Improvements:
 * - Uses event delegation
 * - Avoids duplicate document listeners
 * - Uses defer in HTML
 * - Minimizes unnecessary DOM queries
 * - Reuses DOM references
 */


// =========================================
// DOM REFERENCES
// =========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const modal = document.getElementById("project-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalCloseBottom = document.getElementById("modal-close-bottom");

const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalGithub = document.getElementById("modal-github");

let previousFocusedElement = null;


// =========================================
// PROJECT DATA
// =========================================

const projects = {

    shopflow: {
        category: "DATA ENGINEERING",

        title: "ShopFlow",

        description:
            "An intelligent e-commerce data platform designed to process and transform business data using modern data engineering technologies.",

        technologies: [
            "Java",
            "Spring Boot",
            "Kafka",
            "Spark",
            "Airflow",
            "BigQuery"
        ],

        github:
            "https://github.com/nithyasrid"
    },


    cargopulse: {
        category: "DATA ENGINEERING",

        title: "CargoPulse 2.0",

        description:
            "A smart supply-chain intelligence platform designed to process shipment, inventory and operational events through scalable data pipelines.",

        technologies: [
            "Python",
            "SQL",
            "Kafka",
            "Spark",
            "Airflow",
            "BigQuery"
        ],

        github:
            "https://github.com/nithyasrid"
    },


    meditrust: {
        category: "DATA RELIABILITY",

        title: "MediTrust",

        description:
            "A healthcare data reliability platform focused on identifying inconsistent records and improving the reliability of healthcare data.",

        technologies: [
            "Python",
            "SQL",
            "Kafka",
            "Spark",
            "Airflow"
        ],

        github:
            "https://github.com/nithyasrid"
    },


    flashscale: {
        category: "DISTRIBUTED SYSTEMS",

        title: "FlashScale",

        description:
            "A high-concurrency flash-sale platform designed around reliable inventory reservation and distributed event processing.",

        technologies: [
            "Java",
            "Spring Boot",
            "Kafka",
            "Redis"
        ],

        github:
            "https://github.com/nithyasrid"
    }

};


// =========================================
// MOBILE NAVIGATION
// =========================================

function closeMobileMenu() {

    if (!navLinks || !menuToggle) {
        return;
    }

    navLinks.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


function toggleMobileMenu() {

    if (!navLinks || !menuToggle) {
        return;
    }

    const isOpen =
        navLinks.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


// =========================================
// PROJECT MODAL
// =========================================

function renderTechnologies(technologies) {

    modalTech.replaceChildren();

    const fragment =
        document.createDocumentFragment();

    technologies.forEach((technology) => {

        const element =
            document.createElement("span");

        element.textContent = technology;

        fragment.appendChild(element);

    });

    modalTech.appendChild(fragment);
}


function openProjectModal(projectId, trigger) {

    const project = projects[projectId];

    if (!project || !modal) {

        console.error(
            "Unable to open project details."
        );

        return;
    }

    previousFocusedElement = trigger;

    modalCategory.textContent =
        project.category;

    modalTitle.textContent =
        project.title;

    modalDescription.textContent =
        project.description;

    modalGithub.href =
        project.github;

    renderTechnologies(
        project.technologies
    );

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    modalClose?.focus();
}


function closeProjectModal() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    previousFocusedElement?.focus();
}


// =========================================
// EVENT DELEGATION
// =========================================

document.addEventListener(
    "click",
    (event) => {

        const projectButton =
            event.target.closest(
                ".project-modal-btn"
            );


        if (projectButton) {

            const projectId =
                projectButton.dataset.project;

            openProjectModal(
                projectId,
                projectButton
            );

            return;
        }


        const navigationLink =
            event.target.closest(
                "#nav-links a"
            );


        if (navigationLink) {

            closeMobileMenu();

        }

    }
);


// =========================================
// MODAL CONTROLS
// =========================================

modalClose?.addEventListener(
    "click",
    closeProjectModal
);


modalCloseBottom?.addEventListener(
    "click",
    closeProjectModal
);


modalOverlay?.addEventListener(
    "click",
    closeProjectModal
);


// =========================================
// KEYBOARD ACCESSIBILITY
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Escape closes modal or mobile menu.
         */

        if (event.key === "Escape") {

            if (
                modal?.classList.contains("active")
            ) {

                closeProjectModal();

                return;
            }


            if (
                navLinks?.classList.contains("active")
            ) {

                closeMobileMenu();

                menuToggle?.focus();

            }

        }


        /*
         * Keep keyboard focus inside the modal.
         */

        if (
            event.key === "Tab" &&
            modal?.classList.contains("active")
        ) {

            const focusable =
                modal.querySelectorAll(
                    'a[href], button:not([disabled])'
                );


            if (!focusable.length) {
                return;
            }


            const first =
                focusable[0];

            const last =
                focusable[focusable.length - 1];


            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            }

            else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }

    }
);