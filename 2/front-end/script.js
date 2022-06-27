const outputEl = document.getElementById("output");


const getData = async () => await (await fetch("//localhost:3000/cars")).json();

const displayCars = async () => {

    cars = await getData();
    console.log(cars.body);
}
displayCars();