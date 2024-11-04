const path = window.location.pathname;
const [_, __, created_by, id] = path.split('/');

document.getElementById('createdBy').textContent += created_by;
    
async function getRoutineById(id) {
    const response = await fetch("http://localhost:3000/routines/get_routine_by_id_with_exercise_name", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id
        })
    });

    const routineDiv = document.getElementById(`routine_div`);
    routineDiv.innerHTML = "";
    const data = await response.json();
    const routineName = document.getElementById("routineName");
    routineName.textContent = data[0].routine_name;
    for (const row of data) {
        const d = document.createElement("div");
        d.className = "exercise_entry";
        const exercise = document.createElement("p");
        const nSets = document.createElement("p");
        const nReps = document.createElement("p");
        exercise.textContent = row.name;
        nSets.textContent = `Sets: ${row.n_sets}`;
        nReps.textContent = `Reps: ${row.n_reps}`;
        exercise.className = "text_p";
        nSets.className = "number_p";
        d.appendChild(exercise);
        d.appendChild(nSets);
        d.appendChild(nReps);
        routineDiv.appendChild(d);
    };
};

getRoutineById(id);