async function getAllExercises() {
    const response = await fetch("http://localhost:3000/exercises/get_all_exercises", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        }
    });

    const exerciseDiv = document.getElementById("exercise_div");
    exerciseDiv.innerHTML = "";
    const data = await response.json();
    data.forEach(row => {
        const p = document.createElement("p");
        p.className = "exercise_entry";
        const content = Object.entries(row)
            .map(([key, value]) => `</strong> ${key}: </strong> ${value}`)
            .join(`<br>`)
        p.innerHTML = content;
        exerciseDiv.appendChild(p);
    });
};


async function getExercisesByGroup(muscle_group) {
    const response = await fetch("http://localhost:3000/exercises/get_exercise_by_group", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "muscle_group": muscle_group
        })
    });

    const exerciseDiv = document.getElementById("exercise_div");
    exerciseDiv.innerHTML = "";
    const data = await response.json();
    data.forEach(row => {
        const p = document.createElement("p");
        p.className = "exercise_entry";
        const content = Object.entries(row)
            .map(([key, value]) => `</strong> ${key}: </strong> ${value}`)
            .join(`<br>`)
        p.innerHTML = content;
        exerciseDiv.appendChild(p);
    });
};

async function getAllGroups() {
    const response = await fetch("http://localhost:3000/exercises/get_all_groups", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        }
    });

    const filterDiv = document.getElementById("filter_div");
    const data = await response.json();
    data.forEach(row => {
        const b = document.createElement("button");
        b.className = "filter_button";
        const content = Object.entries(row)
            .map(([key, value]) => `</strong> ${value}`)
            .join(`<br>`)
        b.innerHTML = content;
        b.value = b.textContent.trim();
        b.onclick = () => getExercisesByGroup(b.value);

        filterDiv.appendChild(b);
    });
};

getAllGroups();
getAllExercises();