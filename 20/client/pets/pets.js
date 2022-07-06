const getPets = async () => await fetch("//localhost:3001/api/v1/pets", {
    method: 'GET',
});

const clearPets = () => {
    const petsDisplay = document.querySelector("div#contentContainer");
    petsDisplay.replaceChildren();
}

const displayPets = async (pets) => {
    const petsDisplay = document.querySelector("div#contentContainer");
    for (let pet of pets) {
        const petElement = document.createElement("div");
        petElement.classList.add("rounded", "border-solid", "border-2", "w-1/4", "p-6", "shadow-lg", "text-center");

        const nameElement = document.createElement("h3");
        nameElement.classList.add("mb-4");

        const dateOfBirthElement = document.createElement("p");
        const emailElement = document.createElement("p");

        nameElement.textContent = pet.name;
        dateOfBirthElement.textContent = pet.date_of_birth.split("T")[0];
        emailElement.textContent = pet.client_email;

        const buttonsContainerElement = document.createElement("div");
        buttonsContainerElement.classList.add("flex", "justify-evenly", "mt-6");

        const viewLogButtonElement = document.createElement("button");
        const deleteButtonElement = document.createElement("button");

        viewLogButtonElement.classList.add("bg-amber-600", "text-sm", "rounded", "w-2/5", "py-3", "shadow-lg", "hover:bg-amber-400", "active:bg-amber-300", "focus:outline-none", "text-gray-100");
        viewLogButtonElement.textContent = "VIEW LOG";
        deleteButtonElement.classList.add("bg-gray-100", "text-sm", "rounded", "w-2/5", "py-3", "shadow-lg", "hover:bg-amber-400", "active:bg-amber-300", "focus:outline-none", "text-amber-600")
        deleteButtonElement.textContent = "DELETE";

        buttonsContainerElement.append(viewLogButtonElement, deleteButtonElement);

        petElement.append(nameElement, dateOfBirthElement, emailElement, buttonsContainerElement);

        petsDisplay.appendChild(petElement);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    clearPets();
    const pets = await getPets();
    console.log(pets);
    const petsJSON = await pets.json();
    console.log(petsJSON);
    displayPets(petsJSON);
});