const pushData = async (petData) => await fetch("//localhost:3000/api/pets/create_one", {
    method: 'POST',
    // mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(petData) // body data type must match "Content-Type" header
});


document.getElementById("petsAdditionForm").addEventListener("submit", async (event) => {

    let pet;
    event.preventDefault();

    try {
        pet = {
            name: event.target.querySelector("#petName").value,
            type: event.target.querySelector("#petType").value,
            age: parseInt(event.target.querySelector("#petAge").value)
        };

    } catch (err) {

        alert("Please fill in all the fields  " + err);
    }

    console.log(pet);
    try {
        pushData(pet);
        alert("Pet added successfully");
    } catch (err) {
        alert("Failed to add pet : " + err);
    }


});