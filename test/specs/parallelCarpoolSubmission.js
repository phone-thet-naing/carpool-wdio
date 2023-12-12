import { credentials, carpoolUrl, carpoolData } from "../data/carpool-data.js";
import carpoolPage from '../pageobjects/carpool.page.js'

carpoolData.forEach((data) => {
    describe('Parallel form submission', () => {
        it(`Form submission for ${data.date} way`, async () => {
            // Maximize Browser window
            await browser.maximizeWindow()

            // Go to carpool ms form 
            await browser.url(carpoolUrl)

            // Sign in into ms account if it was the first time
            // Make assertion about we are on the right page
            const labelElement = await $('div=Sign in')
            await labelElement.waitForExist({ timeoutMsg: 'Sign in was not found' })

            const { email, password } = { ...credentials }

            await carpoolPage.loginToMicrosoft(email, password)

            const { date, pickupLocation, dropoffLocation, person1, person2, person3, person4, price } = { ...data }

            // Actual Data Filling Part
            const inputBoxList = await $$('input[aria-label="Single line text"]')

            const [pickupLocationSelector, dropoffLocationSelector, person1Selector, person2Selector, person3Selector, person4Selector, priceSelector, distanceSelector] = [...inputBoxList]

            const datePicker = await $(`#DatePicker${i}-label`)
            await datePicker.setValue(date)
            i += 14
            await pickupLocationSelector.setValue(pickupLocation)
            await dropoffLocationSelector.setValue(dropoffLocation)
            await person1Selector.setValue(person1)
            await person2Selector.setValue(person2)
            if (person3) await person3Selector.setValue(person3)
            if (person4) await person4Selector.setValue(person4)
            await priceSelector.setValue(price)

            // const commentBox = await $('textarea[aria-label="Multi Line Text"]')
            // await commentBox.setValue('This is a test, please ignore')

            await browser.pause(10000)
            // const submitBtn = await $('button=Submit')
            // await submitBtn.click()
        })
    })
})