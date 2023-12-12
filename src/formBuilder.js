"use strict"

// Array to store JSON objects
let dataArray = [
    {
        "id": 0,
        "date": "12/05/2023",
        "pickupLocation": "pickup",
        "dropoffLocation": "dropoff",
        "person1": "person1",
        "person2": "person2",
        "person3": "person3",
        "person4": "",
        "price": "1000",
        "priceWord": "One Thousand"
    },
    {
        "id": 1,
        "date": "12/05/2023",
        "pickupLocation": "pickup",
        "dropoffLocation": "dropoff",
        "person1": "person1",
        "person2": "person2",
        "person3": "person3",
        "person4": "",
        "price": "1000",
        "priceWord": "One Thousand"
    },
    {
        "id": 2,
        "date": "12/05/2023",
        "pickupLocation": "pickup",
        "dropoffLocation": "dropoff",
        "person1": "person1",
        "person2": "person2",
        "person3": "person3",
        "person4": "",
        "price": "1000",
        "priceWord": "One Thousand"
    },
    {
        "id": 3,
        "date": "12/05/2023",
        "pickupLocation": "pickup",
        "dropoffLocation": "dropoff",
        "person1": "person1",
        "person2": "person2",
        "person3": "person3",
        "person4": "",
        "price": "1000",
        "priceWord": "One Thousand"
    }
];

displayOutput();

function addData() {
    // Get values from the form
    const date = formatDate(document.getElementById('date').value);
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const person1 = document.getElementById('person1').value;
    const person2 = document.getElementById('person2').value;
    const person3 = document.getElementById('person3').value;
    const person4 = document.getElementById('person4').value;
    const price = document.getElementById('price').value;
    const priceWord = document.getElementById('priceWord').value;

    // Create JSON object
    const dataObject = {
        date: date,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        person1: person1,
        person2: person2,
        person3: person3,
        person4: person4,
        price: price,
        priceWord: priceWord
    };

    // Add the object to the array
    dataArray.push(dataObject);

    // Display the current array in JSON format
    displayOutput();
}

function displayOutput() {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = null

    for (let i = 0; i < dataArray.length; i++) {
        const divItem = document.createElement('div')
        divItem.textContent = JSON.stringify(dataArray[i], null, 2)

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", deleteData('hello'))

        divItem.appendChild(deleteBtn)

        outputDiv.appendChild(divItem)
    }

    // outputDiv.textContent = JSON.stringify(dataArray, null, 2);
}

function formatDate(inputDate) {
    const dateParts = inputDate.split("-");
    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
}

function deleteData(param) {
    console.log(param)
}

function downloadJSON() {
    const jsonContent = JSON.stringify(dataArray, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}