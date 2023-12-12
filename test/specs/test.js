import jsonData from "../data/carpool-data.json" assert { type: "json" }

const carpoolData = jsonData.carpoolData

const submittedDate = jsonData.submittedDate
const paidTo = jsonData.paidTo

console.table({
    submittedDate,
    paidTo
})

for (const data of carpoolData) {
    const { date, pickupLocation, dropoffLocation, person1, person2, person3, person4, price, priceWord } = { ...data }

    console.table({ date, pickupLocation, dropoffLocation, person1, person2, person3, person4, price, priceWord })
}

