// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");


if (!menuToggle || !navLinks) {

    console.error(
        "Navigation elements could not be found."
    );

} else {

    menuToggle.addEventListener(
        "click",
        () => {

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
    );


    const navigationLinks =
        navLinks.querySelectorAll("a");


    navigationLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        }
    );

}



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
// MODAL ELEMENTS
// =========================================

const modal =
    document.getElementById("project-modal");

const modalOverlay =
    document.getElementById("modal-overlay");

const modalClose =
    document.getElementById("modal-close");

const modalCloseBottom =
    document.getElementById(
        "modal-close-bottom"
    );

const modalCategory =
    document.getElementById(
        "modal-category"
    );

const modalTitle =
    document.getElementById(
        "modal-title"
    );

const modalDescription =
    document.getElementById(
        "modal-description"
    );

const modalTech =
    document.getElementById(
        "modal-tech"
    );

const modalGithub =
    document.getElementById(
        "modal-github"
    );



let previousFocusedElement = null;



// =========================================
// OPEN MODAL
// =========================================

function openProjectModal(projectId) {

    if (!modal) {

        console.error(
            "Project modal was not found."
        );

        return;

    }


    const project =
        projects[projectId];


    if (!project) {

        console.error(
            `Project "${projectId}" was not found.`
        );

        return;

    }


    previousFocusedElement =
        document.activeElement;


    modalCategory.textContent =
        project.category;


    modalTitle.textContent =
        project.title;


    modalDescription.textContent =
        project.description;


    modalGithub.href =
        project.github;


    modalTech.innerHTML = "";


    project.technologies.forEach(
        (technology) => {

            const element =
                document.createElement("span");

            element.textContent =
                technology;

            modalTech.appendChild(element);

        }
    );


    modal.classList.add("active");


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    if (modalClose) {

        modalClose.focus();

    }

}



// =========================================
// CLOSE MODAL
// =========================================

function closeProjectModal() {

    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    if (
        previousFocusedElement &&
        typeof previousFocusedElement.focus ===
            "function"
    ) {

        previousFocusedElement.focus();

    }

}



// =========================================
// PROJECT BUTTONS
// =========================================

const projectButtons =
    document.querySelectorAll(
        ".project-modal-btn"
    );


projectButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const projectId =
                    button.dataset.project;


                if (!projectId) {

                    console.error(
                        "Project ID is missing."
                    );

                    return;

                }


                openProjectModal(
                    projectId
                );

            }
        );

    }
);



// =========================================
// CLOSE BUTTONS
// =========================================

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


if (modalCloseBottom) {

    modalCloseBottom.addEventListener(
        "click",
        closeProjectModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}



// =========================================
// KEYBOARD SUPPORT
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Escape closes the modal.
         */

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            closeProjectModal();

        }

    }
);



// =========================================
// CLOSE MOBILE MENU WITH ESCAPE
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove(
                "active"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuToggle.focus();

            }

        }

    }
);



// =========================================
// MODAL FOCUS HANDLING
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Tab" ||
            !modal ||
            !modal.classList.contains("active")
        ) {

            return;

        }


        const focusableElements =
            modal.querySelectorAll(
                'a[href], button:not([disabled])'
            );


        if (!focusableElements.length) {

            return;

        }


        const firstElement =
            focusableElements[0];

        const lastElement =
            focusableElements[
                focusableElements.length - 1
            ];


        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {

            event.preventDefault();

            lastElement.focus();

        }


        else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {

            event.preventDefault();

            firstElement.focus();

        }

    }
);