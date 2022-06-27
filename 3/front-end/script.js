const outputEl = document.getElementById('output');

const getData = async () => await (await fetch("//localhost:3000/names")).json();

const displayNames = async () => {
    // outputEl.replaceChildren();

    const names = await getData();
    console.log(names.body);
    const name = document.createElement('h2');
    name.textContent = names.body;
    outputEl.append(name);
}
displayNames();