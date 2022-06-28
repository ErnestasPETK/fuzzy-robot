const getUsers = async (sortType = "asc") => await fetch(`//localhost:3000/api/users/${sortType}`, {
    method: 'GET',
});

const clearUsers = () => {
    const usersDisplay = document.querySelector("section.users_display div.content");
    usersDisplay.replaceChildren();
}

const displayUsers = async (users) => {
    const usersDisplay = document.querySelector("section.users_display div.content");
    for (let user of users) {

        const userElement = document.createElement("div");
        const containerTopElement = document.createElement("div");
        const containerBottomElement = document.createElement("div");

        userElement.classList.add("single_user");
        containerBottomElement.classList.add("container_bottom");
        containerTopElement.classList.add("container_top");

        const nameAndSurnameElement = document.createElement("h3");
        const nameElement = document.createElement("span");
        const surnameElement = document.createElement("span");
        const emailFullElement = document.createElement("p");
        const emailElement = document.createElement("span");
        const membershipFullElement = document.createElement("p");
        const membershipElement = document.createElement("span");

        nameElement.id = "name";
        surnameElement.id = "surname";
        emailElement.id = "email";
        membershipElement.id = "membership";


        nameElement.textContent = user.name;
        surnameElement.textContent = user.surname;
        nameAndSurnameElement.append(nameElement, " ", surnameElement);

        emailElement.textContent = user.email;
        emailFullElement.textContent = "Email address: ";
        emailFullElement.append(emailElement);

        membershipFullElement.textContent = "Membership: ";
        membershipElement.textContent = user.service_id;
        membershipFullElement.append(membershipElement);

        containerTopElement.append(nameAndSurnameElement);
        containerBottomElement.append(emailFullElement, membershipFullElement);
        userElement.append(containerTopElement, containerBottomElement);

        usersDisplay.appendChild(userElement);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    clearUsers();
    const users = await getUsers("asc");
    const usersJSON = await users.json();
    displayUsers(usersJSON);
});

document.querySelector("select#sort").addEventListener("change", async (event) => {
    event.preventDefault();
    clearUsers();
    const select = event.target;
    const sortOrder = select.options[select.selectedIndex].getAttribute('value');
    const users = await getUsers(sortOrder);
    const usersJSON = await users.json();
    displayUsers(usersJSON);
});