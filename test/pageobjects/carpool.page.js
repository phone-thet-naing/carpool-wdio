import { $, browser } from '@wdio/globals'
import Page from './page.js';

class CarpoolPage extends Page {

    get signInTitle() {
        return $('#loginHeader > div');
    }

    get carpoolFormTitle() {
        return $('#FormTitleId_titleAriaId > div > span > span');
    }

    get formTitle() {
        return $('//*[@text="Car Pool Tracking Form"]')
    }

    get date_picker() {
        return $('#DatePicker0-label');
    }

    get datePicker() {
        return $('#DatePicker22-label');
    }

    get pickup_location() {
        return $('#question-list > div:nth-child(2) > div.-dC-44 > div > span > input');
    }

    get dropoff_location() {
        return $('//*[@id="question-list"]/div[3]/div[2]/div/span/input');
    }

    get person1() {
        return $('//*[@id="question-list"]/div[4]/div[2]/div/span/input');
    }

    get person2() {
        return $('//*[@id="question-list"]/div[5]/div[2]/div/span/input');
    }

    get person3() {
        return $('//*[@id="question-list"]/div[6]/div[2]/div/span/input');
    }

    get price() {
        return $('//*[@id="question-list"]/div[8]/div[2]/div/span/input');
    }

    get continue_btn() {
        return $('#idSIButton9');
    }

    get email_input() {
        return $('#i0116');
    }

    get password_input() {
        return $('#i0118');
    }

    get submitBtn() {
        return $('#form-main-content1 > div > div > div.css-36 > div.css-191 > div > button');
    }

    get successMsg() {
        return $('#form-main-content1 > div > div > div.-jI-322 > div > div.-q-294 > span');
    }

    get dontShowAgainCheckbox() {
        return $('#KmsiCheckboxField');
    }

    async btnClick(selector) {
        const btn = $(selector);
        await btn.waitForClickable();
        await btn.click();
    }


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     */
    async loginOld(email, password) {
        // Fill mail and password
        await this.email_input.setValue(email);
        const nextBtn = await $('//*[@text="Next"]')
        await nextBtn.click()

        await this.password_input.setValue(password)
        const signInBtn = await $('//*[@text="Sign in"]')
        await signInBtn.click()

        // Stay signed in page
        const yesBtn = await $('//*[@text="Yes"]')
        await yesBtn.click()
        // (await this.dontShowAgainCheckbox).click();
        // (await this.continue_btn).click();

    }

    async loginToMicrosoft(email, password) {
        // Fill email
        const emailInput = await $('input[id="i0116"]')
        await emailInput.setValue(email)
        const nextBtn = await $('input[value="Next"]')
        await nextBtn.click()
        const passwordLabel = await $('div=Enter password')
        await expect(passwordLabel).toExist()

        // Fill password
        const passwordInput = await $('input[id="i0118"]')
        await passwordInput.setValue(password)
        const signInBtn = await $('input[value="Sign in"]')
        await signInBtn.click()
        const staySignedInLabel = await $('div=Stay signed in?')
        await expect(staySignedInLabel).toExist()

        // Confirming `Stay signed in?` page
        const yesBtn = await $('input[value="Yes"]')
        await yesBtn.click()
    }

    async submitForm() {
        // Actual Data Filling Part
        const inputBoxList = await $$('input[aria-label="Single line text"]')

        const [pickupLocationSelector, dropoffLocationSelector, person1Selector, person2Selector, person3Selector, person4Selector, priceSelector, distanceSelector] = [...inputBoxList]

        const datePicker = await $(`#DatePicker0-label`)
        await datePicker.setValue(date)
        
        await pickupLocationSelector.setValue(pickupLocation)
        await dropoffLocationSelector.setValue(dropoffLocation)
        await person1Selector.setValue(person1)
        await person2Selector.setValue(person2)
        if (person3) await person3Selector.setValue(person3)
        if (person4) await person4Selector.setValue(person4)
        await priceSelector.setValue(price)

        // await browser.pause(2000)
        const submitBtn = await $('button=Submit')
        await submitBtn.click()
    }
}

export default new CarpoolPage();