const getMemberships = async () => await fetch("//localhost:3000/api/memberships", {
    method: 'GET',
});


const pushData = async (userData) => await fetch("//localhost:3000/api/users", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
});

document.addEventListener("DOMContentLoaded", async () => {
    const membershipsElement = document.querySelector("#membership");
    const membershipsSelectElement = document.createElement("select");
    membershipsSelectElement.id = "membership_select";
    const memberships = await getMemberships();
    const membershipsJSON = await memberships.json();
    for (let membership of membershipsJSON) {

        const option = document.createElement("option");
        option.value = membership._id;
        option.textContent = membership.name;
        membershipsSelectElement.appendChild(option);
    }
    membershipsElement.appendChild(membershipsSelectElement);

});

document.querySelector("#user_form").addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(event.target);
    const name = event.target.querySelector("#name").value;
    const surname = event.target.querySelector("#surname").value;
    const email = event.target.querySelector("#email").value;
    const select = event.target.querySelector("#membership_select");
    const membershipId = select.options[select.selectedIndex].getAttribute('value');
    const user = {
        name: name,
        surname: surname,
        email: email,
        serviceId: membershipId,
    };
    try {
        await pushData(user);
        alert("User added successfully");
    } catch {
        alert("Failed to add user");
    }
    try {
        window.location.replace("./display_users.html");
    }
    catch {
        alert("Failed to redirect");
    }
});

