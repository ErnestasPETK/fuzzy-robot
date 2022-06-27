
console.clear();

const displayTableEl = document.getElementById("petsTable");

const getData = async (searchQuery) => await (await fetch("//localhost:3000/api/pets/?" + new URLSearchParams({ ...searchQuery }))).json();

const resetTable = () => {
    displayTableEl.replaceChildren();
    const tableHead = document.createElement("thead");

    const rowEl = document.createElement("tr");
    const nameEl = document.createElement("td");
    const typeEl = document.createElement("td");
    const ageEl = document.createElement("td");

    nameEl.textContent = "Name";
    typeEl.textContent = "Type";
    ageEl.textContent = "Age";
    rowEl.append(nameEl, typeEl, ageEl);
    tableHead.append(rowEl);

    displayTableEl.appendChild(tableHead);

};
const displayData = (data) => {
    resetTable();
    const tableBody = document.createElement("tbody");

    data.map((pet) => {
        const rowEl = document.createElement("tr");
        const nameEl = document.createElement("td");
        const typeEl = document.createElement("td");
        const ageEl = document.createElement("td");

        nameEl.textContent = pet.name;
        typeEl.textContent = pet.type;
        ageEl.textContent = pet.age;
        rowEl.append(nameEl, typeEl, ageEl);
        tableBody.append(rowEl);


    });
    displayTableEl.appendChild(tableBody);
}
const getCurrentFilters = () => {
    const filters = document.querySelectorAll(".petType input");
    const filterValues = [];
    filters.forEach((filter) => { filter.classList.contains("active") ? filterValues.push(filter.value.toLowerCase()) : ""; });
    return filterValues;
};


document.addEventListener("DOMContentLoaded", async () => {
    // const pets = await getData(requestBody = { type: ["cat", "dog", "bunny"].toString() });
    // displayData(pets);
    const pets = await getData(requestBody = { type: getCurrentFilters().toString() });
    displayData(pets);

});


document.querySelectorAll(".petType input").forEach((element) => {
    element.addEventListener("click", async (event) => {
        event.preventDefault;

        const filterEl = event.target;
        if (filterEl.classList.contains("active")) {
            filterEl.classList.remove("active");
        }
        else if (!filterEl.classList.contains("active")) {
            filterEl.classList.add("active");
        }

        const pets = await getData(requestBody = { type: getCurrentFilters().toString() });
        displayData(pets);
    });
});


document.querySelectorAll(".petType input").forEach((element) => {
    element.addEventListener("click", async (event) => {
        event.preventDefault;

        const filterEl = event.target;
        if (filterEl.classList.contains("active")) {
            filterEl.classList.remove("active");
        }
        else if (!filterEl.classList.contains("active")) {
            filterEl.classList.add("active");
        }

        const pets = await getData(requestBody = { type: getCurrentFilters().toString() });
        displayData(pets);
    });
})