document.getElementById("form").addEventListener('submit', (event) => {

    event.preventDefault();

    const name = event.target.querySelector("#name").value;
    const surname = event.target.querySelector("#surname").value;
    console.log(name, " ", surname);


});