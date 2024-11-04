const selectedExercises = [];
const created_by = "viniciusrabello";

async function displaySelectedExercises(selectedExercises) {
    const response = await fetch("http://localhost:3000/exercises/get_exercises_by_ids", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ids": selectedExercises
        })
    });

    const exerciseDiv = document.getElementById("selected_exercises");
    exerciseDiv.innerHTML = "";
    const data = await response.json();
    for (const row of data) {
        const d = document.createElement("div");
        d.id = `exercise_${row.id}`
        d.value = row.id;
        const inp_s = document.createElement("input");
        inp_s.className = "nSetsInput"
        inp_s.id = `sets_${row.id}`
        inp_s.type = "text";
        inp_s.value = null;
        const inp_r = document.createElement("input");
        inp_r.className = "nRepsInput"
        inp_r.id = `reps_${row.id}`
        inp_r.type = "text";
        inp_r.value = null;
        d.className = "exercise_entry";
        d.textContent = row.name;
        d.appendChild(inp_s);
        d.appendChild(inp_r);
        exerciseDiv.appendChild(d);
    }
}

async function addExercise(id, button) {
    if (!selectedExercises.includes(id)) {
        selectedExercises.push(id);
        button.textContent = "-"
        displaySelectedExercises(selectedExercises);
    } else {
        const index = selectedExercises.indexOf(id);
        selectedExercises.splice(index, 1);
        button.textContent = "+";
    }
}

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
    for (const row of data) {
        const d = document.createElement("div");
        d.className = "exercise_entry";
        d.textContent = row.name;
        const b = document.createElement("button");
        b.textContent = "+";
        b.className = "add_exercise_button"
        b.onclick = () => {addExercise(row.id, b)};
        d.appendChild(b);
        exerciseDiv.appendChild(d);
    }
};

async function searchExercises(value) {
    if (!value) {
        getAllExercises();
        return;
    }
    const response = await fetch("http://localhost:3000/exercises/search_exercise", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "value": value
        })
    });

    const data = await response.json();
    const exerciseDiv = document.getElementById("exercise_div");
    exerciseDiv.innerHTML = "";
    try {
        for (const row of data) {
            const d = document.createElement("div");
            d.className = "exercise_entry";
            d.textContent = row.name;
            const b = document.createElement("button");
            b.textContent = "+";
            b.className = "add_exercise_button"
            b.onclick = () => {addExercise(row.id, b)};
            d.appendChild(b);
            exerciseDiv.appendChild(d);
        }
    } catch (err) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.className = "no-results";
        noResultsMessage.textContent = "Nenhum exercício encontrado.";
        exerciseDiv.appendChild(noResultsMessage);
        console.log(err);
    }
}

async function getMaxRoutineId() {
    const response = await fetch("http://localhost:3000/routines/get_max_routine_id", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data.max_id;
}

async function saveRoutine() {
    const routine_name = document.getElementById("routine_name").value;
    const routine_id = await getMaxRoutineId() + 1;
    for (const id of selectedExercises) {
        const exercise_id = document.getElementById(`exercise_${id}`).value;
        const n_sets = document.getElementById(`sets_${id}`).value;
        const n_reps = document.getElementById(`reps_${id}`).value;
        const req_body = {
            "id": routine_id,
            "name": routine_name, 
            "created_by": created_by, 
            "exercise_id": exercise_id, 
            "n_sets": n_sets, 
            "n_reps": n_reps
        };

        await fetch("http://localhost:3000/routines/insert_exercise_into_routine", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(req_body)
        });
    }
    window.location.href = '/';
}

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

searchExercises();
displaySelectedExercises(selectedExercises);