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

    const routinesDiv = document.getElementById("routine_div");
    routinesDiv.innerHTML = "";
    const data = await response.json();
    data.forEach(row => {
        const d = document.createElement("div");
        d.className = "routine_entry";
        d.id = `routine_${row.id}`;
        const content = Object.entries(row)
            .map(([key, value]) => `</strong> ${key}: </strong> ${value}`)
            .join(`<br>`)
        d.innerHTML = content;
        routinesDiv.appendChild(d);
    });

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

    const routineDiv = document.getElementById(`routine_div`);
    routineDiv.innerHTML = "";
    const data = await response.json();
    console.log(data);
    data.forEach(row => {
        const p = document.createElement("p");
        p.className = "routine_entry";
        const content = Object.entries(row)
            .map(([key, value]) => `</strong> ${key}: </strong> ${value}`)
            .join(`<br>`)
        p.innerHTML = content;
        routineDiv.appendChild(p);
    });
};

async function main(user) {
    const routineIds = await getRoutinesByUser(user);
    
    for (const id of routineIds) {
        await getRoutineById(id);
    }
}

main("viniciusrabello");