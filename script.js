"use strict";

/*
====================================================
WEEK 5 MINI WEB APPLICATION
NITHYA ENGINEERING DASHBOARD
====================================================

Features:
- Fetch JSON data
- Dynamic DOM rendering
- Filtering
- Sorting
- Interactive modal
- Statistics
- Technology analytics
- Keyboard support
- Accessible UI
- Event delegation
- Error handling
====================================================
*/


// ================================================
// DOM CACHE
// ================================================

const elements = {

    menuToggle:
        document.getElementById("menu-toggle"),

    navLinks:
        document.getElementById("nav-links"),

    totalProjects:
        document.getElementById("total-projects"),

    completedProjects:
        document.getElementById("completed-projects"),

    activeProjects:
        document.getElementById("active-projects"),

    totalTechnologies:
        document.getElementById("total-technologies"),

    projectCount:
        document.getElementById("project-count"),

    projectsContainer:
        document.getElementById("projects-container"),

    sortSelect:
        document.getElementById("sort-select"),

    technologyChart:
        document.getElementById("technology-chart"),

    completedPercent:
        document.getElementById("completed-percent"),

    activePercent:
        document.getElementById("active-percent"),

    completedBar:
        document.getElementById("completed-bar"),

    activeBar:
        document.getElementById("active-bar"),

    modal:
        document.getElementById("project-modal"),

    modalOverlay:
        document.getElementById("modal-overlay"),

    modalClose:
        document.getElementById("modal-close"),

    modalCloseButton:
        document.getElementById("modal-close-button"),

    modalCategory:
        document.getElementById("modal-category"),

    modalTitle:
        document.getElementById("modal-title"),

    modalDescription:
        document.getElementById("modal-description"),

    modalDetails:
        document.getElementById("modal-details"),

    modalGithub:
        document.getElementById("modal-github")

};


// ================================================
// APPLICATION STATE
// ================================================

let projects = [];

let currentFilter = "all";

let currentSort = "name";

let previousFocusedElement = null;


// ================================================
// FETCH PROJECT DATA
// ================================================

async function loadProjects() {

    try {

        const response =
            await fetch("data.json");


        if (!response.ok) {

            throw new Error(
                `Unable to load project data: ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            !Array.isArray(data.projects)
        ) {

            throw new Error(
                "Invalid project data format."
            );

        }


        projects =
            data.projects;


        updateDashboard();

        renderProjects();

        renderAnalytics();

    }

    catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );


        showLoadingError();

    }

}


// ================================================
// ERROR STATE
// ================================================

function showLoadingError() {

    elements.projectsContainer.innerHTML = `

        <div class="error-message">

            <h3>
                Unable to load dashboard data
            </h3>

            <p>
                Please make sure data.json is available
                and the project is running through a local
                development server.
            </p>

        </div>

    `;

    elements.projectCount.textContent =
        "Data unavailable";

}


// ================================================
// DASHBOARD STATISTICS
// ================================================

function updateDashboard() {

    const total =
        projects.length;


    const completed =
        projects.filter(
            project =>
                project.status === "Completed"
        ).length;


    const active =
        projects.filter(
            project =>
                project.status === "Active"
        ).length;


    const technologies =
        new Set(
            projects.flatMap(
                project =>
                    project.technologies
            )
        );


    elements.totalProjects.textContent =
        total;


    elements.completedProjects.textContent =
        completed;


    elements.activeProjects.textContent =
        active;


    elements.totalTechnologies.textContent =
        technologies.size;

}


// ================================================
// FILTER PROJECTS
// ================================================

function filterProjects() {

    if (currentFilter === "all") {

        return [...projects];

    }


    return projects.filter(
        project =>
            project.category === currentFilter
    );

}


// ================================================
// SORT PROJECTS
// ================================================

function sortProjects(projectList) {

    const sorted =
        [...projectList];


    switch (currentSort) {

        case "status":

            sorted.sort(
                (a, b) =>
                    a.status.localeCompare(
                        b.status
                    )
            );

            break;


        case "year":

            sorted.sort(
                (a, b) =>
                    b.year - a.year
            );

            break;


        case "name":

        default:

            sorted.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

            break;

    }


    return sorted;

}


// ================================================
// RENDER PROJECTS
// ================================================

function renderProjects() {

    const filtered =
        filterProjects();


    const sorted =
        sortProjects(filtered);


    elements.projectsContainer.replaceChildren();


    elements.projectCount.textContent =
        `${sorted.length} project${sorted.length === 1 ? "" : "s"} displayed`;


    if (sorted.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.className =
            "empty-message";

        emptyMessage.textContent =
            "No projects found for this category.";

        elements.projectsContainer.appendChild(
            emptyMessage
        );

        return;

    }


    const fragment =
        document.createDocumentFragment();


    sorted.forEach(
        project => {

            const card =
                createProjectCard(project);


            fragment.appendChild(card);

        }
    );


    elements.projectsContainer.appendChild(
        fragment
    );

}


// ================================================
// CREATE PROJECT CARD
// ================================================

function createProjectCard(project) {

    const article =
        document.createElement("article");

    article.className =
        "project-card";


    article.dataset.projectId =
        project.id;


    const category =
        document.createElement("span");

    category.className =
        "project-category";

    category.textContent =
        project.category;


    const title =
        document.createElement("h3");

    title.textContent =
        project.name;


    const description =
        document.createElement("p");

    description.className =
        "project-description";

    description.textContent =
        project.description;


    const year =
        document.createElement("span");

    year.className =
        "project-year";

    year.textContent =
        project.year;


    const status =
        document.createElement("span");

    status.className =
        `project-status ${project.status.toLowerCase()}`;

    status.textContent =
        project.status;


    const technologyContainer =
        document.createElement("div");

    technologyContainer.className =
        "technology-list";


    project.technologies
        .slice(0, 4)
        .forEach(
            technology => {

                const tag =
                    document.createElement("span");

                tag.textContent =
                    technology;

                technologyContainer.appendChild(
                    tag
                );

            }
        );


    const button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "view-project";

    button.dataset.projectId =
        project.id;

    button.textContent =
        "View Details →";


    const top =
        document.createElement("div");

    top.className =
        "project-top";


    const visual =
        document.createElement("div");

    visual.className =
        "project-visual";

    visual.setAttribute(
        "aria-hidden",
        "true"
    );

    visual.textContent =
        project.name
            .substring(0, 2)
            .toUpperCase();


    top.appendChild(
        visual
    );


    const metadata =
        document.createElement("div");

    metadata.className =
        "project-meta";

    metadata.appendChild(
        status
    );

    metadata.appendChild(
        year
    );


    top.appendChild(
        metadata
    );


    article.appendChild(
        top
    );

    article.appendChild(
        category
    );

    article.appendChild(
        title
    );

    article.appendChild(
        description
    );

    article.appendChild(
        technologyContainer
    );

    article.appendChild(
        button
    );


    return article;

}


// ================================================
// FILTER BUTTONS
// ================================================

document.addEventListener(
    "click",
    event => {

        const filterButton =
            event.target.closest(
                ".filter-button"
            );


        if (filterButton) {

            document
                .querySelectorAll(
                    ".filter-button"
                )
                .forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                        button.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    }
                );


            filterButton.classList.add(
                "active"
            );


            filterButton.setAttribute(
                "aria-pressed",
                "true"
            );


            currentFilter =
                filterButton.dataset.filter;


            renderProjects();

        }

    }
);


// ================================================
// PROJECT MODAL
// ================================================

function openModal(projectId, trigger) {

    const project =
        projects.find(
            item =>
                item.id === Number(projectId)
        );


    if (!project) {

        console.error(
            "Project not found:",
            projectId
        );

        return;

    }


    previousFocusedElement =
        trigger;


    elements.modalCategory.textContent =
        project.category;


    elements.modalTitle.textContent =
        project.name;


    elements.modalDescription.textContent =
        project.description;


    elements.modalGithub.href =
        project.github;


    elements.modalDetails.replaceChildren();


    const status =
        document.createElement("p");

    status.innerHTML =
        `<strong>Status:</strong> ${project.status}`;


    const year =
        document.createElement("p");

    year.innerHTML =
        `<strong>Year:</strong> ${project.year}`;


    const techTitle =
        document.createElement("h3");

    techTitle.textContent =
        "Technologies";


    const techList =
        document.createElement("div");

    techList.className =
        "modal-tech-list";


    const fragment =
        document.createDocumentFragment();


    project.technologies.forEach(
        technology => {

            const tag =
                document.createElement("span");

            tag.textContent =
                technology;

            fragment.appendChild(
                tag
            );

        }
    );


    techList.appendChild(
        fragment
    );


    elements.modalDetails.appendChild(
        status
    );

    elements.modalDetails.appendChild(
        year
    );

    elements.modalDetails.appendChild(
        techTitle
    );

    elements.modalDetails.appendChild(
        techList
    );


    elements.modal.classList.add(
        "active"
    );


    elements.modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    elements.modalClose.focus();

}


// ================================================
// CLOSE MODAL
// ================================================

function closeModal() {

    elements.modal.classList.remove(
        "active"
    );


    elements.modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    if (previousFocusedElement) {

        previousFocusedElement.focus();

        previousFocusedElement = null;

    }

}


elements.modalClose.addEventListener(
    "click",
    closeModal
);


elements.modalCloseButton.addEventListener(
    "click",
    closeModal
);


elements.modalOverlay.addEventListener(
    "click",
    closeModal
);


// ================================================
// PROJECT CARD EVENT DELEGATION
// ================================================

elements.projectsContainer.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".view-project"
            );


        if (!button) {
            return;
        }


        openModal(
            button.dataset.projectId,
            button
        );

    }
);


// ================================================
// SORTING
// ================================================

elements.sortSelect.addEventListener(
    "change",
    event => {

        currentSort =
            event.target.value;


        renderProjects();

    }
);


// ================================================
// MOBILE NAVIGATION
// ================================================

elements.menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            elements.navLinks.classList.toggle(
                "active"
            );


        elements.menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        elements.menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    }
);


// ================================================
// CLOSE MOBILE NAVIGATION
// ================================================

elements.navLinks.addEventListener(
    "click",
    event => {

        if (
            event.target.matches(
                "a"
            )
        ) {

            elements.navLinks.classList.remove(
                "active"
            );


            elements.menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


// ================================================
// KEYBOARD SUPPORT
// ================================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (
                elements.modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }

    }
);


// ================================================
// ANALYTICS
// ================================================

function renderAnalytics() {

    renderTechnologyChart();

    renderStatusChart();

}


// ================================================
// TECHNOLOGY CHART
// ================================================

function renderTechnologyChart() {

    const technologyCounts =
        {};


    projects.forEach(
        project => {

            project.technologies.forEach(
                technology => {

                    technologyCounts[technology] =
                        (technologyCounts[technology] || 0) + 1;

                }
            );

        }
    );


    const sorted =
        Object.entries(
            technologyCounts
        )
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(0, 8);


    elements.technologyChart.replaceChildren();


    const max =
        sorted.length
            ? sorted[0][1]
            : 1;


    const fragment =
        document.createDocumentFragment();


    sorted.forEach(
        ([technology, count]) => {

            const row =
                document.createElement("div");

            row.className =
                "chart-row";


            const header =
                document.createElement("div");

            header.className =
                "chart-row-header";


            const name =
                document.createElement("span");

            name.textContent =
                technology;


            const value =
                document.createElement("strong");

            value.textContent =
                count;


            header.appendChild(
                name
            );

            header.appendChild(
                value
            );


            const track =
                document.createElement("div");

            track.className =
                "chart-track";


            const bar =
                document.createElement("div");

            bar.className =
                "chart-bar";


            const width =
                Math.round(
                    (count / max) * 100
                );


            bar.style.width =
                `${width}%`;


            track.appendChild(
                bar
            );


            row.appendChild(
                header
            );

            row.appendChild(
                track
            );


            fragment.appendChild(
                row
            );

        }
    );


    elements.technologyChart.appendChild(
        fragment
    );

}


// ================================================
// STATUS CHART
// ================================================

function renderStatusChart() {

    const total =
        projects.length;


    if (total === 0) {
        return;
    }


    const completed =
        projects.filter(
            project =>
                project.status === "Completed"
        ).length;


    const active =
        projects.filter(
            project =>
                project.status === "Active"
        ).length;


    const completedPercentage =
        Math.round(
            (completed / total) * 100
        );


    const activePercentage =
        Math.round(
            (active / total) * 100
        );


    elements.completedPercent.textContent =
        `${completedPercentage}%`;


    elements.activePercent.textContent =
        `${activePercentage}%`;


    elements.completedBar.style.width =
        `${completedPercentage}%`;


    elements.activeBar.style.width =
        `${activePercentage}%`;

}


// ================================================
// INITIALIZE APPLICATION
// ================================================

loadProjects();