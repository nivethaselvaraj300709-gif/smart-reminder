```javascript
const form = document.getElementById("reminderForm");
const reminderList = document.getElementById("reminderList");

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

function saveReminders() {
    localStorage.setItem("reminders", JSON.stringify(reminders));
}

function displayReminders() {
    reminderList.innerHTML = "";

    reminders.forEach((reminder, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${reminder.task}</strong><br>
            Category: ${reminder.category}<br>
            Date: ${reminder.date}<br>
            Time: ${reminder.time}<br><br>

            <button onclick="completeReminder(${index})">
                ${reminder.completed ? "Completed ✓" : "Mark Complete"}
            </button>

            <button onclick="deleteReminder(${index})">
                Delete
            </button>
        `;

        if (reminder.completed) {
            li.style.opacity = "0.6";
        }

        reminderList.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = document.getElementById("task").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const newReminder = {
        task: task,
        category: category,
        date: date,
        time: time,
        completed: false
    };

    reminders.push(newReminder);

    saveReminders();
    displayReminders();

    form.reset();
});

function completeReminder(index) {
    reminders[index].completed = !reminders[index].completed;

    saveReminders();
    displayReminders();
}

function deleteReminder(index) {
    reminders.splice(index, 1);

    saveReminders();
    displayReminders();
}

displayReminders();
```