document.querySelector("#membership_form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = event.target.querySelector("#name").value;
    const price = parseInt(event.target.querySelector("#price").value);
    const description = event.target.querySelector("#description").value;
    console.log("name: ", name);
    console.log("price: ", price);
    console.log("description: ", description);
    const membership = {
        name: name,
        price: price,
        description: description
    };
    try {
        await pushData(membership);
        alert("Membership added successfully");
    } catch {
        alert("Failed to add membership");
    }
    try {
        window.location.replace("./display_memberships.html");
    }
    catch {
        alert("Failed to redirect");
    }
});

const pushData = async (membershipData) => await fetch("//localhost:3000/api/memberships", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(membershipData)
});