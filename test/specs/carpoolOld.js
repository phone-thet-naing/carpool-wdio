import { credentials, carpoolUrl, carpoolData, submittedDate, paidTo } from "../data/carpool-data.js";
import carpoolPage from "../pageobjects/carpool.page.js";

function getFileNamingFriendlyDateTime() {
    const now = new Date();
  
    // Get a UTC-based ISO string (e.g., '2023-12-15T08:30:00.000Z')
    const isoDateTime = now.toISOString();
  
    // Remove characters that are not file naming friendly
    const formattedDateTime = isoDateTime
      .replace(/[-T:]/g, '') // Remove dashes, 'T', and colons
      .replace(/\.\d+Z$/, ''); // Remove milliseconds and 'Z' for UTC
  
    return formattedDateTime;
  }

function getHalfPage(row) {
    
    // Destructuring the data
    const { date, pickupLocation, dropoffLocation, person1, person2, person3, person4, price, priceWord} = { ...row }

    let description = `
    <u>${date}</u><br/>
    From <u>${pickupLocation}</u> to <u>${dropoffLocation}</u><br/>
    <span>${person1}</span><br/>
    <span>${person2}</span><br/>
    <span>${person3}</span><br/>
    `;

    description += person4 ? `<span></span><br/>` : '';

    return `
    <div class="half-a4">
    <div class="code">AC-010</div>
    <img src="https://hanamyanmar.com/wp-content/uploads/2020/10/logo.png"/>
    <h3>Internal Official Voucher</h3>
    <table style="width:98%;">
      <tr>
        <td style="width:80%;text-align:right;">Date:</td>
        <td class="bdrBtm">${submittedDate}</td>
      </tr>
    </table> 
    <table style="width:98%;">
      <tr>
        <td style="width:8%;text-align:left;">Paid to: </td>
        <td class="bdrBtm">${paidTo}</td>
      </tr>
    </table>  
    <div class="main">
    <table style="width:98%;">
      <tr>
        <th rowspan="2" style="width:5%">Sr.</th>
        <th rowspan="2">Description</th>
        <th rowspan="2" style="width:6%">Qty</th>
        <th rowspan="2" style="width:7%">Price</th>
        <th colspan="2">Amount</th>
      </tr>
      <tr>
        <td style="width:15%">Kyats</td>
        <td style="width:15%">USD</td>
      </tr>
      <tr class="morning">
        <td>&nbsp;</td>
        <td>${description}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>${price}</td>
        <td>&nbsp;</td>
      </tr>
      <tr class="evening">
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Total</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>${price}</td>
        <td>&nbsp;</td>
      </tr>
    </table> 
    </div>
    <table style="width:98%;margin-bottom:2mm">
      <tr>
        <td>(In Word Ks/<s>USD</s> </td>
        <td style="width:80%" class="bdrBtm">${priceWord}</td>
        <td>only)</td>
      </tr>
    </table>
    <em style="float:left;font-weight:bold">(Remark: Just for not receiving VOUCHER from supplier)</em>
    <table style="width:90%;margin: 3.5em auto;">
      <tr>
        <td class="bdrBtm"></td>
        <td style="width: 50%">&nbsp;</td>
        <td class="bdrBtm"></td>
      </tr>
      <tr>
        <td>Consumed By</td>
        <td>&nbsp;</td>
        <td>Approved By</td>
      </tr>
    </table>
    </div>
    `;
}

let i = 0;
let combinedHTML = '';

for (const data of carpoolData) {
    combinedHTML += i % 2 == 0 ? '<div class="a4-container">' : '';
    combinedHTML += getHalfPage(data); 
    i++;
    combinedHTML += i % 2 == 0 ? '</div>' : '';
}

combinedHTML += i % 2 == 0 ? '' : '</div>';

let pageContent = `
<!DOCTYPE html>
<html>
<head>
<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial;
}
h3 {
  margin-top: 1mm;
  margin-bottom: 0;
}
table, th, td {
    border-collapse: collapse;
  }
.a4-container {
  margin: 0 auto;
  width: 210mm; /* Width of A4 paper */
  max-height: 297mm; /* Height of A4 paper */
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 0.8em;
}
.half-a4 {
  flex: 1;
  min-height: 140mm;
  max-height: 148mm;
  overflow: hidden !important;
  position: relative;
  margin: 0;
}
.code {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
}
.bdrBtm {
  border-bottom: 1px dotted black;
}
.main {
  margin-top: 3mm;
  margin-bottom: 2mm;
}
.main table,.main th,.main td {
  border: 1px solid black;
}
tr.morning td {
  border-bottom: 0;
}
tr.evening td {
  border-top: 0;
}
</style>
</head>
<body>
${combinedHTML}
</body>
</html>
`;


// describe('my awesome website', () => {
//     it('should do some assertions', async () => {
//         await browser.url('https://webdriver.io')
//         await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
//     })
// })

const filenameDateTime = getFileNamingFriendlyDateTime();

describe('Multiple HTML pages to single PDF', () => {
  it('should convert multiple HTML pages to a single PDF', async () => {
    await browser.url('data:text/html;charset=utf-8,' + encodeURI(pageContent));

    // Wait for some time to ensure the pages are loaded
    await browser.pause(9000);

    await browser.savePDF('output'+filenameDateTime+'.pdf'); // Replace with the path where you want to save the output PDF
  });
});

/*
it('Case 1', async () => {
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

    // This is the counter to increment the date picker id
    let i = 0

    for (const data of carpoolData) {
        // Destructuring the data
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

        // await browser.pause(2000)
        const submitBtn = await $('button=Submit')
        await submitBtn.click()

        // One form successfull, Thanks! label will be seen
        const submitAnotherFormLink = await $('a=Submit another response')
        await submitAnotherFormLink.click()

        // await browser.reloadSession()
    }
    await browser.pause(10000)
})
*/