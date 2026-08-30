/* =========================================================
   TASKLY
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   DATA
========================================================= */

let tasks =
    JSON.parse(localStorage.getItem("tasklyTasks")) || [];

let profiles =
    JSON.parse(localStorage.getItem("tasklyProfiles")) || [
        {
            id: 1,
            name: "Your Profile",
            type: "Productivity User"
        }
    ];

let currentProfile =
    JSON.parse(localStorage.getItem("tasklyCurrentProfile")) ||
    profiles[0];

let currentFilter = "all";


/* =========================================================
   MOTIVATION
========================================================= */

const motivationQuotes = [

    "Small steps still move you forward.",

    "One task at a time. You've got this.",

    "Progress doesn't have to be perfect.",

    "Start where you are. Do what you can.",

    "Your future self will thank you.",

    "Make today a little better than yesterday.",

    "You don't need motivation. Just begin.",

    "Done is better than perfect.",

    "A little progress is still progress.",

    "Keep going. You're closer than you think.",

    "Your pace is still a pace.",

    "Focus on what you can do today."

];


/* =========================================================
   DOM
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const enterTaskly =
    document.getElementById("enterTaskly");

const introQuote =
    document.getElementById("introQuote");

const themeToggle =
    document.getElementById("themeToggle");

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationDot =
    document.getElementById("notificationDot");

const notificationList =
    document.getElementById("notificationList");

const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskPriority =
    document.getElementById("taskPriority");

const taskCategory =
    document.getElementById("taskCategory");

const taskTiming =
    document.getElementById("taskTiming");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");


/* =========================================================
   OPENING SCENE
========================================================= */

function setIntroQuote() {

    if (!introQuote) return;

    const quote =
        motivationQuotes[
            Math.floor(
                Math.random() *
                motivationQuotes.length
            )
        ];

    introQuote.textContent =
        `“${quote}”`;
}

setIntroQuote();


if (enterTaskly) {

    enterTaskly.addEventListener("click", function () {

        if (!introScreen) return;

        introScreen.classList.add("hide");

        setTimeout(function () {

            introScreen.style.display = "none";

        }, 850);

    });

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveTasks() {

    localStorage.setItem(
        "tasklyTasks",
        JSON.stringify(tasks)
    );
}


function saveProfiles() {

    localStorage.setItem(
        "tasklyProfiles",
        JSON.stringify(profiles)
    );

    localStorage.setItem(
        "tasklyCurrentProfile",
        JSON.stringify(currentProfile)
    );
}


/* =========================================================
   PROFILE
========================================================= */

function updateProfileUI() {

    const name =
        document.getElementById("profileName");

    const type =
        document.getElementById("profileType");

    const avatar =
        document.getElementById("profileAvatar");

    const welcome =
        document.getElementById("welcomeTitle");

    if (name) {

        name.textContent =
            currentProfile.name;
    }

    if (type) {

        type.textContent =
            currentProfile.type;
    }

    if (avatar) {

        avatar.textContent = "👤";
    }

    if (welcome) {

        welcome.textContent =
            `Good to see you, ${currentProfile.name}! 👋`;
    }

}

updateProfileUI();


/* =========================================================
   PROFILE MENU
========================================================= */

const profileMore =
    document.getElementById("profileMore");

const profileMenu =
    document.getElementById("profileMenu");


if (profileMore) {

    profileMore.addEventListener("click", function (event) {

        event.stopPropagation();

        profileMenu.classList.toggle("show");

    });

}


document.addEventListener("click", function () {

    if (profileMenu) {

        profileMenu.classList.remove("show");
    }

});


if (profileMenu) {

    profileMenu.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}


/* =========================================================
   PROFILE MODAL
========================================================= */

const profileModal =
    document.getElementById("profileModal");

const profileSettingsBtn =
    document.getElementById("profileSettingsBtn");

const closeProfileModal =
    document.getElementById("closeProfileModal");

const profileNameInput =
    document.getElementById("profileNameInput");

const profileTypeInput =
    document.getElementById("profileTypeInput");

const saveProfileBtn =
    document.getElementById("saveProfileBtn");


function openProfileModal() {

    profileNameInput.value =
        currentProfile.name;

    profileTypeInput.value =
        currentProfile.type;

    profileModal.classList.add("show");

}


function closeProfile() {

    profileModal.classList.remove("show");

}


if (profileSettingsBtn) {

    profileSettingsBtn.addEventListener(
        "click",
        openProfileModal
    );

}


if (closeProfileModal) {

    closeProfileModal.addEventListener(
        "click",
        closeProfile
    );

}


if (saveProfileBtn) {

    saveProfileBtn.addEventListener(
        "click",
        function () {

            const newName =
                profileNameInput.value.trim();

            if (!newName) {

                alert("Please enter your name.");

                return;
            }

            currentProfile.name =
                newName;

            currentProfile.type =
                profileTypeInput.value;

            const index =
                profiles.findIndex(
                    profile =>
                        profile.id ===
                        currentProfile.id
                );

            if (index !== -1) {

                profiles[index] =
                    currentProfile;
            }

            saveProfiles();

            updateProfileUI();

            closeProfile();

        }
    );

}


/* =========================================================
   ADD PROFILE
========================================================= */

const addProfileBtn =
    document.getElementById("addProfileBtn");

const addProfileModal =
    document.getElementById("addProfileModal");

const closeAddProfileModal =
    document.getElementById("closeAddProfileModal");

const newProfileName =
    document.getElementById("newProfileName");

const newProfileType =
    document.getElementById("newProfileType");

const createProfileBtn =
    document.getElementById("createProfileBtn");


if (addProfileBtn) {

    addProfileBtn.addEventListener(
        "click",
        function () {

            profileMenu.classList.remove("show");

            newProfileName.value = "";

            addProfileModal.classList.add("show");

        }
    );

}


if (closeAddProfileModal) {

    closeAddProfileModal.addEventListener(
        "click",
        function () {

            addProfileModal.classList.remove("show");

        }
    );

}


if (createProfileBtn) {

    createProfileBtn.addEventListener(
        "click",
        function () {

            const name =
                newProfileName.value.trim();

            if (!name) {

                alert("Please enter a profile name.");

                return;
            }

            const newProfile = {

                id:
                    Date.now(),

                name:
                    name,

                type:
                    newProfileType.value

            };

            profiles.push(newProfile);

            currentProfile =
                newProfile;

            saveProfiles();

            updateProfileUI();

            addProfileModal.classList.remove("show");

            alert(
                `Profile "${name}" created successfully!`
            );

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            profileMenu.classList.remove("show");

            const confirmed =
                confirm(
                    "Do you want to logout from Taskly?"
                );

            if (!confirmed) return;

            if (introScreen) {

                introScreen.style.display = "flex";

                setTimeout(function () {

                    introScreen.classList.remove("hide");

                }, 20);

            }

        }
    );

}


/* =========================================================
   THEME
========================================================= */

function updateThemeIcon() {

    if (!themeToggle) return;

    if (
        document.body.classList.contains("dark")
    ) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

}


function toggleTheme() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "tasklyTheme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

    updateThemeIcon();
}


const savedTheme =
    localStorage.getItem("tasklyTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");
}

updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* SETTINGS THEME */

const settingsThemeBtn =
    document.getElementById("settingsThemeBtn");

if (settingsThemeBtn) {

    settingsThemeBtn.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const pages = {

    dashboard:
        document.getElementById("dashboardPage"),

    tasks:
        document.getElementById("tasksPage"),

    important:
        document.getElementById("importantPage"),

    analytics:
        document.getElementById("analyticsPage"),

    settings:
        document.getElementById("settingsPage")

};


function showPage(pageName) {

    Object.values(pages).forEach(
        page => {

            if (page) {

                page.classList.remove(
                    "active-page"
                );

            }

        }
    );


    if (pages[pageName]) {

        pages[pageName].classList.add(
            "active-page"
        );

    }


    navItems.forEach(
        item => {

            item.classList.toggle(
                "active",
                item.dataset.page === pageName
            );

        }
    );


    if (pageName === "important") {

        renderImportant();
    }


    if (pageName === "analytics") {

        updateAnalytics();
    }

}


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            function () {

                showPage(
                    item.dataset.page
                );

            }
        );

    }
);


/* Any page buttons */

document.querySelectorAll(
    "[data-page]"
).forEach(
    button => {

        if (
            !button.classList.contains("nav-item")
        ) {

            button.addEventListener(
                "click",
                function () {

                    showPage(
                        button.dataset.page
                    );

                }
            );

        }

    }
);


/* =========================================================
   ADD TASK
========================================================= */

function addTask() {

    const title =
        taskInput.value.trim();

    if (!title) {

        alert("Write a task first ✨");

        taskInput.focus();

        return;
    }


    const task = {

        id:
            Date.now(),

        title:
            title,

        completed:
            false,

        important:
            false,

        priority:
            taskPriority.value,

        category:
            taskCategory.value,

        timing:
            taskTiming.value,

        created:
            new Date().toISOString()

    };


    tasks.unshift(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();

    updateStats();

    addNotification(
        `New task added: ${title}`
    );

}


if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        addTask
    );

}


if (taskInput) {

    taskInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                addTask();

            }

        }
    );

}


/* =========================================================
   TASK RENDER
========================================================= */

function getFilteredTasks() {

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    return tasks.filter(
        task => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search);


            let matchesFilter = true;


            if (currentFilter === "active") {

                matchesFilter =
                    !task.completed;

            }


            if (currentFilter === "completed") {

                matchesFilter =
                    task.completed;

            }


            return (
                matchesSearch &&
                matchesFilter
            );

        }
    );

}


function formatTiming(timing) {

    const names = {

        "whole-day":
            "🕐 Whole Day",

        "15-min":
            "⏱️ 15 min",

        "30-min":
            "⏱️ 30 min",

        "1-hour":
            "⏱️ 1 hour",

        "2-hours":
            "⏱️ 2 hours"

    };

    return names[timing] || timing;

}


function formatCategory(category) {

    const names = {

        study: "📚 Study",

        work: "💼 Work",

        personal: "🏠 Personal",

        project: "💡 Project",

        health: "🏃 Health",

        other: "⭐ Other"

    };

    return names[category] || category;

}


function formatPriority(priority) {

    const names = {

        normal:
            "🌱 Normal",

        high:
            "⚡ High",

        urgent:
            "🔥 Urgent",

        low:
            "💤 Low"

    };

    return names[priority] || priority;

}


function renderTasks() {

    if (!taskList) return;

    const filtered =
        getFilteredTasks();

    taskList.innerHTML = "";


    if (filtered.length === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";

    }


    filtered.forEach(
        task => {

            const li =
                document.createElement("li");

            li.className =
                "task-item";

            if (task.completed) {

                li.classList.add(
                    "completed"
                );

            }


            li.innerHTML = `

                <button
                    class="task-check"
                    data-action="complete"
                    data-id="${task.id}"
                    title="Mark complete">

                    ${task.completed ? "✓" : ""}

                </button>


                <div class="task-info">

                    <div class="task-title">
                        ${escapeHTML(task.title)}
                    </div>

                    <div class="task-meta">

                        <span class="task-tag">
                            ${formatCategory(task.category)}
                        </span>

                        <span class="task-tag">
                            ${formatTiming(task.timing)}
                        </span>

                        <span class="task-tag priority-${task.priority}">
                            ${formatPriority(task.priority)}
                        </span>

                    </div>

                </div>


                <div class="task-actions">

                    <button
                        class="task-action
                        ${task.important ? "starred" : ""}"
                        data-action="important"
                        data-id="${task.id}"
                        title="Important">

                        ${task.important ? "★" : "☆"}

                    </button>


                    <button
                        class="task-action"
                        data-action="delete"
                        data-id="${task.id}"
                        title="Delete">

                        🗑

                    </button>

                </div>

            `;


            taskList.appendChild(li);

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   TASK ACTIONS
========================================================= */

if (taskList) {

    taskList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-action]"
                );

            if (!button) return;

            const id =
                Number(button.dataset.id);

            const action =
                button.dataset.action;

            const task =
                tasks.find(
                    item =>
                        item.id === id
                );

            if (!task) return;


            if (action === "complete") {

                task.completed =
                    !task.completed;

                saveTasks();

                renderTasks();

                updateStats();

                if (task.completed) {

                    addNotification(
                        `Completed: ${task.title} 🎉`
                    );

                }

            }


            if (action === "important") {

                task.important =
                    !task.important;

                saveTasks();

                renderTasks();

            }


            if (action === "delete") {

                const confirmed =
                    confirm(
                        "Delete this task?"
                    );

                if (!confirmed) return;

                tasks =
                    tasks.filter(
                        item =>
                            item.id !== id
                    );

                saveTasks();

                renderTasks();

                updateStats();

            }

        }
    );

}


/* =========================================================
   FILTERS
========================================================= */

document.querySelectorAll(
    ".filter"
).forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter")
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                currentFilter =
                    button.dataset.filter;

                renderTasks();

            }
        );

    }
);


/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderTasks
    );

}


/* =========================================================
   CLEAR COMPLETED
========================================================= */

function clearCompletedTasks() {

    const completedCount =
        tasks.filter(
            task =>
                task.completed
        ).length;


    if (completedCount === 0) {

        alert("There are no completed tasks.");

        return;
    }


    const confirmed =
        confirm(
            `Clear ${completedCount} completed task(s)?`
        );

    if (!confirmed) return;


    tasks =
        tasks.filter(
            task =>
                !task.completed
        );

    saveTasks();

    renderTasks();

    updateStats();

}


const clearCompleted =
    document.getElementById(
        "clearCompleted"
    );

if (clearCompleted) {

    clearCompleted.addEventListener(
        "click",
        clearCompletedTasks
    );

}


const settingsClearBtn =
    document.getElementById(
        "settingsClearBtn"
    );

if (settingsClearBtn) {

    settingsClearBtn.addEventListener(
        "click",
        clearCompletedTasks
    );

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;

    const pending =
        total - completed;


    const totalElement =
        document.getElementById(
            "totalTasks"
        );

    const completedElement =
        document.getElementById(
            "completedTasks"
        );

    const pendingElement =
        document.getElementById(
            "pendingTasks"
        );


    if (totalElement)
        totalElement.textContent =
            total;

    if (completedElement)
        completedElement.textContent =
            completed;

    if (pendingElement)
        pendingElement.textContent =
            pending;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    const progressText =
        document.getElementById(
            "progressText"
        );

    const progressFill =
        document.getElementById(
            "progressFill"
        );


    if (progressText)
        progressText.textContent =
            `${percentage}%`;

    if (progressFill)
        progressFill.style.width =
            `${percentage}%`;


    const progressMessage =
        document.getElementById(
            "progressMessage"
        );


    if (progressMessage) {

        if (total === 0) {

            progressMessage.textContent =
                "Start with one small task ✨";

        } else if (percentage === 100) {

            progressMessage.textContent =
                "You did it! What a day 🌟";

        } else if (percentage >= 75) {

            progressMessage.textContent =
                "Almost there. Keep going 💜";

        } else if (percentage >= 50) {

            progressMessage.textContent =
                "You're halfway there 🚀";

        } else {

            progressMessage.textContent =
                "Every completed task counts ✨";

        }

    }


    const taskCount =
        document.getElementById(
            "taskCount"
        );

    if (taskCount) {

        taskCount.textContent =
            `${pending} task${pending === 1 ? "" : "s"} remaining`;

    }

}


/* =========================================================
   DASHBOARD MOTIVATION
========================================================= */

function updateDashboardQuote() {

    const quoteElement =
        document.getElementById(
            "dashboardQuote"
        );

    if (!quoteElement) return;

    const quote =
        motivationQuotes[
            Math.floor(
                Math.random() *
                motivationQuotes.length
            )
        ];

    quoteElement.textContent =
        quote;

}


updateDashboardQuote();


/* =========================================================
   IMPORTANT PAGE
========================================================= */

function renderImportant() {

    const container =
        document.getElementById(
            "importantList"
        );

    if (!container) return;

    const importantTasks =
        tasks.filter(
            task =>
                task.important
        );


    container.innerHTML = "";


    if (importantTasks.length === 0) {

        container.innerHTML = `

            <div class="important-empty">

                ⭐

                <br><br>

                No important tasks yet.

                <br>

                Star a task from your task board.

            </div>

        `;

        return;
    }


    importantTasks.forEach(
        task => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "task-item";

            item.innerHTML = `

                <div class="task-info">

                    <div class="task-title">
                        ${escapeHTML(task.title)}
                    </div>

                    <div class="task-meta">

                        <span class="task-tag">
                            ⭐ Important
                        </span>

                        <span class="task-tag">
                            ${formatCategory(task.category)}
                        </span>

                    </div>

                </div>

            `;

            container.appendChild(item);

        }
    );

}


/* =========================================================
   ANALYTICS
========================================================= */

function updateAnalytics() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;

    const pending =
        total - completed;

    const percent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    document.getElementById(
        "analyticsTotal"
    ).textContent = total;


    document.getElementById(
        "analyticsCompleted"
    ).textContent = completed;


    document.getElementById(
        "analyticsPending"
    ).textContent = pending;


    document.getElementById(
        "analyticsPercent"
    ).textContent =
        `${percent}%`;

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

let notifications =
    JSON.parse(
        localStorage.getItem(
            "tasklyNotifications"
        )
    ) || [];


function saveNotifications() {

    localStorage.setItem(
        "tasklyNotifications",
        JSON.stringify(
            notifications
        )
    );

}


function addNotification(message) {

    notifications.unshift({

        id:
            Date.now(),

        message:
            message,

        read:
            false,

        time:
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

    });


    notifications =
        notifications.slice(
            0,
            10
        );

    saveNotifications();

    renderNotifications();

}


function renderNotifications() {

    if (!notificationList) return;

    notificationList.innerHTML = "";


    if (notifications.length === 0) {

        notificationList.innerHTML = `

            <div class="notification-empty">

                You're all caught up ✨

            </div>

        `;

        notificationDot.classList.add(
            "hidden"
        );

        return;
    }


    notifications.forEach(
        notification => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "notification-item";

            item.innerHTML = `

                <strong>
                    ${escapeHTML(
                        notification.message
                    )}
                </strong>

                <br>

                <small>
                    ${notification.time}
                </small>

            `;

            notificationList.appendChild(
                item
            );

        }
    );


    const unread =
        notifications.some(
            notification =>
                !notification.read
        );


    notificationDot.classList.toggle(
        "hidden",
        !unread
    );

}


renderNotifications();


if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );

}


document.addEventListener(
    "click",
    function () {

        if (notificationPanel) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


if (notificationPanel) {

    notificationPanel.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


const markNotificationsRead =
    document.getElementById(
        "markNotificationsRead"
    );


if (markNotificationsRead) {

    markNotificationsRead.addEventListener(
        "click",
        function () {

            notifications.forEach(
                notification => {

                    notification.read =
                        true;

                }
            );

            saveNotifications();

            renderNotifications();

        }
    );

}


/* =========================================================
   SETTINGS PROFILE
========================================================= */

const settingsProfileBtn =
    document.getElementById(
        "settingsProfileBtn"
    );


if (settingsProfileBtn) {

    settingsProfileBtn.addEventListener(
        "click",
        openProfileModal
    );

}


/* =========================================================
   CLOSE MODALS BY CLICKING OUTSIDE
========================================================= */

document.querySelectorAll(
    ".modal-overlay"
).forEach(
    overlay => {

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    overlay.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") return;

        document.querySelectorAll(
            ".modal-overlay"
        ).forEach(
            modal => {

                modal.classList.remove(
                    "show"
                );

            }
        );

        if (profileMenu) {

            profileMenu.classList.remove(
                "show"
            );

        }

        if (notificationPanel) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   INITIAL RENDER
========================================================= */

renderTasks();

updateStats();

updateAnalytics();


/* =========================================================
   FIRST-TIME NOTIFICATION
========================================================= */

if (
    !localStorage.getItem(
        "tasklyWelcomeNotification"
    )
) {

    setTimeout(
        function () {

            addNotification(
                "Welcome to Taskly! Let's make today count ✨"
            );

            localStorage.setItem(
                "tasklyWelcomeNotification",
                "true"
            );

        },
        1500
    );

}