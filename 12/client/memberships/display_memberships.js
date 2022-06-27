const getMemberships = async () => await fetch("//localhost:3000/api/memberships", {
    method: 'GET',
});

const clearMemberships = () => {
    const membershipDisplay = document.querySelector("section.membership_display div.content");
    membershipDisplay.replaceChildren();
}

const displayMemberships = async (memberships) => {
    const membershipDisplay = document.querySelector("section.membership_display div.content");
    for (let membership of memberships) {
        const membershipElement = document.createElement("div");
        const containerTopElement = document.createElement("div");
        const containerBottomElement = document.createElement("div");

        membershipElement.classList.add("single_membership");
        containerBottomElement.classList.add("container_bottom");
        containerTopElement.classList.add("container_top");

        const nameAndPriceElement = document.createElement("h2");
        const desriptionElement = document.createElement("p");
        const imageElement = document.createElement("img");

        nameAndPriceElement.textContent = `$${membership.price} ${membership.name}`;
        desriptionElement.textContent = membership.description;
        imageElement.id = "membership_delete";
        imageElement.src = "https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png";

        containerTopElement.append(nameAndPriceElement, desriptionElement);
        containerBottomElement.append(imageElement);

        membershipElement.append(containerTopElement, containerBottomElement);

        membershipDisplay.appendChild(membershipElement);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    clearMemberships();
    const memberships = await getMemberships();
    console.log(memberships);
    const membershipsJSON = await memberships.json();
    console.log(membershipsJSON);
    displayMemberships(membershipsJSON);
});