async function getExerciseById(id) {
    const response = await fetch("http://localhost:3000/exercises/get_exercise_by_id", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id
        })
    });
    const data = await response.json();
    return data.name;
}

async function getRoutinesByUser(user) {
    const response = await fetch("http://localhost:3000/routines/get_routines_by_user", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "created_by": user
        })
    });

    const divRoutines = document.getElementById("div_routines");
    divRoutines.innerHTML = "";
    const data = await response.json();

    data.forEach(row => {

        const nameElement = document.createElement("p");
        nameElement.textContent = row.name;
        nameElement.className = "routine_name"
    
        const createdByElement = document.createElement("footer");
        createdByElement.textContent = row.created_by;
        createdByElement.className = "routine_created_by"

        const a = document.createElement("a");

        a.className = "routine_entry";
        a.id = `routine_${row.id}`;

        a.appendChild(nameElement);
        a.appendChild(createdByElement);
        a.href = `http://localhost:3000/routine/${row.created_by}/${row.id}`

        divRoutines.appendChild(a);
    });
    const a = document.createElement('a');
    a.href = "http://localhost:3000/create_routine";
    a.textContent = "Criar Treino";
    a.id = "create_routine_a";
    divRoutines.appendChild(a);
    return data.map(row => row.id);
};

async function getRoutineById(id) {
    const response = await fetch("http://localhost:3000/routines/get_routine_by_id", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id
        })
    });

    const routineDiv = document.getElementById(`routine_${id}`);
    routineDiv.innerHTML = "";
    const data = await response.json();
    data.forEach(row => {
        const p = document.createElement("p");
        p.className = "routine_entry";
        const content = row.name;
        p.innerHTML = content;
        routineDiv.appendChild(p);
    });
};

getRoutinesByUser("viniciusrabello");