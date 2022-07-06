class LogCard {
    constructor(log) {
        const { description, status } = log;
        this.description = description;
        this.status = status;
        this.createCardContainer();
    }
    createCardContainer() {
        this.cardContainer = document.createElement('div');
        this.cardContainer.classList.add("rounded", "border-solid", "border-2", "w-1/4", "p-6", "shadow-lg", "text-center");
        this.createStatusElement();
        this.createDescriptionElement();
        this.cardContainer.append(this.descriptionElement, this.statusElement);
    }
    createStatusElement() {

        this.statusElement = document.createElement("p");
        this.statusElement.textContent = this.status;
    }
    createDescriptionElement() {

        this.descriptionElement = document.createElement("h3");
        this.descriptionElement.classList.add("mb-4");
        this.descriptionElement.textContent = this.description;
    }
    getCardContainer() {
        return this.cardContainer;
    }

}
class PrescriptionCard {
    constructor() {
        this.height = height;
        this.width = width;
    }
}
const getLogs = async (petId) => await fetch("//localhost:3001/api/v1/logs?" + new URLSearchParams({
    pet_id: petId,
}), {
    method: 'GET',
});

const clearPets = () => {
    const petsDisplay = document.querySelector("div#contentContainer");
    petsDisplay.replaceChildren();
}

const displayLogs = async (logs) => {
    const contentContainer = document.querySelector("div#contentContainer");
    for (let log of logs) {
        const logCard = new LogCard(log);
        contentContainer.appendChild(logCard.getCardContainer());
    }
};

const getPetId = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.pet_id;
}


const displayPetHealthLog = async () => {

    const petId = getPetId()
    const logs = await (await getLogs(petId)).json();
    console.log(logs);
    displayLogs(logs);



};

document.addEventListener("DOMContentLoaded", async () => {

    console.log(getPetId());
    displayPetHealthLog()
    // let value = params.some_key;
    // clearPets();
    // const pets = await getPets();
    // console.log(pets);
    // const petsJSON = await pets.json();
    // console.log(petsJSON);
    // displayPets(petsJSON);
});