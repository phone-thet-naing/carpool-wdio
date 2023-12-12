import carpoolPage from "../pageobjects/carpool.page.js"
import jsonData from '../data/carpool-data.json' assert { type: "json"}

const carpoolUrl = "https://apps.powerapps.com/play/e/default-94497156-7639-49a3-a872-4f8f281742b3/a/ebdc7813-5583-4c31-8eb9-405a28893aab?tenantId=94497156-7639-49a3-a872-4f8f281742b3&hint=18df2f88-b64a-4c8f-aa64-231c83b400c9&sourcetime=1702011939183&source=portal"

const credentials = jsonData.credentials

class PowerApp {
    get addBtn() {
        return $('.powerapps-icon[data-control-part="icon"]')
    }

    get title() {
        // Carpool Tracking
        return $('div*=Carpool Tracking')
    }

    async submitForm() {
        // console.log(`addBtn => ${$('.powerapps-icon[data-control-part="icon"]')}`)
        const addBtn = $('div[class="react-knockout-control"]');
        await addBtn.waitForExist({ timeout: 5000, timeoutMsg: "add button not found", addBtn })
        await addBtn.click()
        console.log('in submitForm')
    }
}

const powerApp = new PowerApp()

describe("Automating Power App Submission", function () {
    it("Submit form on PowerApp", async function () {
        await browser.maximizeWindow()
        await browser.url(carpoolUrl)

        await carpoolPage.loginToMicrosoft(credentials.email, credentials.password)
        await expect(await powerApp.title).toExist({ timeoutMsg: "Carpool Tracking title not found" })

        await powerApp.submitForm()

        await browser.pause(5000)
    })
})