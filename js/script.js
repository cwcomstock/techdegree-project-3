/******************************************
Treehouse FSJS Techdegree:
project 3 - Interactive Form
******************************************/

/********  global variables  *****************************/
// Basic Info Section
const jobRoleSelect = document.querySelector('select#title');
// T-Shirt Section
const firstColorOptionText = 'Cornflower Blue (JS Puns shirt only)';
const designSelect = document.querySelector('select#design');
const colorSelect = document.querySelector('select#color');
const colorOptions = colorSelect.children;
const colorDiv = document.querySelector('div#colors-js-puns');
// Activities Section
const activityFieldset = document.querySelector('fieldset.activities');
const activityDiv = document.createElement('div');
// Payment Section
const paymentSelect = document.querySelector('select#payment');
const creditCardDiv = document.querySelector('div#credit-card');
const payPalDiv = document.querySelector('div#paypal');
const bitcoinDiv = document.querySelector('div#bitcoin');
// Validation
const form = document.querySelector('form');
const usernameInput = document.querySelector("input#name");
const emailInput = document.querySelector("input#mail");
const invalidEmailText = "Please Enter a Valid Email Address";
const blankEmailText = "Email Cannot Be Blank";
const creditCardInput = document.querySelector("input#cc-num");
const zipInput = document.querySelector("input#zip");
const cvvInput = document.querySelector("input#cvv");
const mainConfInput = document.querySelector("input[name='all']");


/***
 * Form Loaded Tasks
 * 1) Call function to Setup T-Shirt Section of form
 * 2) Call function to Create Activty Total Elements and Setup
 * 3) Call function to Setup Payment Section of Form
 * 4) Call function to Setup Form Validation
 * 1) Call fuction to Setup Job Role Section of form
 ***/
window.onload = () => {

    setupTShirtHtml();
    createActivityTotalElements();
    setupPaymentSection();
    setupFormValidation();
    setupJobRoleSection();
}

//#region - Job Role Section

/***
 * `setupJobRoleSection` function
 * Setup Job Role Section of form once loaded
 * 1) Set focus to Name Element (1st element on form)
 * 2) Hide the Other Job Role Input elment
 ***/
const setupJobRoleSection = () => {

    usernameInput.focus();
    document.querySelector('input#other-title').className = 'is-hidden';
}

/***
 * Job Role Select event listener - change event
 * 1) If selected Role is Other - display text input box
 * 2) If selected Role is not Other - hide text input box
 * @param {event} e - object/interface representing the click event
 ***/
jobRoleSelect.addEventListener('change', e => {

    if (e.target.value === 'other') {
        document.querySelector('input#other-title').className = '';
    } else {
        document.querySelector('input#other-title').className = 'is-hidden';
    }
})

//#endregion - Job Role Section

//#region - T-Shirt Info Section

/***
 * `setupTShirtHtml` function
 * Setup T-Shirt Section of form once loaded
 * 1) Hide Select Theme option in Design Menu so it can't be selected
 * 2) Hide entire Color Section until a theme is chosen
 ***/
const setupTShirtHtml = () => {

    designSelect.firstElementChild.className = 'is-hidden';
    hideColorOptions('all');
}

/***
 * `hideColorOptions` function
 * Hide Color Select Options according to the theme
 * 1) all: hide entire Color section until a theme is chosen
 * 2) js puns: hide "I 'heart' JS" options
 * 3) js shirt only: hide "JS puns" options
 * 4) Set Color Select text and selected index to force user to select a color
 * @param {string} hideOption - all, or 2 different theme types
 ***/
const hideColorOptions = hideOption => {

    if (hideOption.toLowerCase() === 'all') {
        colorDiv.className = 'is-hidden';
    } else {
        colorDiv.className = ''; //unhide color div

        for (let i = 0; i < colorOptions.length; i++) {
            if (colorOptions[i].textContent.toLowerCase().includes(hideOption.toLowerCase())) {
                colorOptions[i].className = '';
            } else {
                colorOptions[i].className = 'is-hidden';
            }
        }
        colorOptions[0].textContent = 'Please Select a Color';
        colorOptions[0].className = 'is-hidden';
        colorSelect.selectedIndex = 0;
    }
}

/***
 * Design Select event listener - change event
 * 1) selected theme is 'js puns' hide other options
 * 2) selected theme is 'i heart js' hide other options
 * @param {event} e - object/interface representing the click event
 ***/
designSelect.addEventListener('change', e => {

    switch (e.target.value) {
        case 'js puns':
            hideColorOptions('js puns');
            break;
        case 'heart js':
            hideColorOptions('js shirt only');
            break;
        default:
            //do nothing, only two options in html for now
            console.log("new design option value");
            break;
    }
})

//#endregion - T-Shirt Info Section

//#region - Register for Activies Section

/***
 * `createActivityTotalElements` function
 * Create the HTML elements to report the Activity Total
 * 1) Create paragraph to go in the div
 * 2) Give textContent initial value of $0
 * 3) Hide Element (CSS hides the element by its class)
 * 3) Append to the end of the Activity Fieldset
 ***/
const createActivityTotalElements = () => {

    activityDiv.id = 'total';
    const activityP = document.createElement('p');
    activityP.id = 'total';
    activityP.textContent = "Total: $0";
    activityDiv.appendChild(activityP);
    activityDiv.className = 'is-hidden';
    activityFieldset.appendChild(activityDiv);
}

/***
 * `disableActivities` function
 * Disable activities that conflict with day/time
 * 1) Clear the Total Div for Activies so it is visible
 * 2) Enable/Disable conflicting dates/times
 *      If checkbox is checked disable conflicts
 *      If checkbox is unchecked enabled previous conflicts
 * @param {input} currentCheckedBox - checkbox that was clicked
 * @param {html collection} checkBoxes - all checkboxes
 ***/
const disableActivities = (currentCheckedBox, checkBoxes) => {

    activityDiv.className = '';
    if (currentCheckedBox.hasAttribute('data-day-and-time')) {
        for (let i = 0; i < checkBoxes.length; i++) {
            const checkBox = checkBoxes[i];
            if (checkBox.hasAttribute('data-day-and-time')) {
                if (currentCheckedBox.getAttribute('data-day-and-time') === checkBox.getAttribute('data-day-and-time')) {
                    if (currentCheckedBox.checked) {
                        if (!checkBox.checked) {
                            checkBox.labels[0].className = 'disabled';
                            checkBox.disabled = true;
                        }
                    } else {
                        checkBox.labels[0].className = '';
                        checkBox.disabled = false;
                    }
                }
            }
        }
    }
}

/***
 * `reportTotalCost` function
 * Calculate and Write to the page the total Activity Cost
 * 1) if a box is checked add to total
 * 2) write total to the page
 * @param {string} hideOption - all, or 2 different theme types
 ***/
const reportTotalCost = checkBoxes => {

    let totalCost = 0;
    for (let i = 0; i < checkBoxes.length; i++) {
        const checkBox = checkBoxes[i];

        if (checkBox.checked) {
            let cost = parseInt(checkBox.getAttribute('data-cost'));
            if (!Number.isNaN(cost)) {
                totalCost += cost;
            }
        }
    }
    activityDiv.firstElementChild.textContent = `Total: $${totalCost}`;
}



/***
 * Activity Selection event listener - change event
 * 1) enable/disable Activies with conflicting date/times
 * 2) Calculate and Report the current Activity cost
 * @param {event} e - object/interface representing the click event
 ***/
activityFieldset.addEventListener('change', e => {

    const checkBoxes = activityFieldset.querySelectorAll('input');
    disableActivities(e.target, checkBoxes);
    reportTotalCost(checkBoxes);
})

//#endregion - Register for Activies Section

//#region - Payment Info

/***
 * `setupPaymentSection` function
 * Setup Payment Section of form once loaded
 * 1) Hide Select Payment Method option in Payment Menu so it can't be selected
 * 2) Select Credit Card and hide other Payment Methods Divs
 * ***/
const setupPaymentSection = () => {

    paymentSelect.firstElementChild.className = 'is-hidden';

    payPalDiv.className = 'is-hidden';
    bitcoinDiv.className = 'is-hidden';
    paymentSelect.selectedIndex = 1;
}

/***
 * Payment Selection event listener - change event
 * 1) enable/disable Payment Divs when one is chosen
 * @param {event} e - object/interface representing the click event
 ***/
paymentSelect.addEventListener('change', e => {

    const paymentOptions = paymentSelect.children;

    for (let i = 0; i < paymentOptions.length; i++) {
        const paymentOption = paymentOptions[i];
        if (paymentOption.value === e.target.value) {
            switch (e.target.value) {
                case 'credit card':
                    creditCardDiv.className = '';
                    payPalDiv.className = 'is-hidden';
                    bitcoinDiv.className = 'is-hidden';
                    break;
                case 'paypal':
                    creditCardDiv.className = 'is-hidden';
                    payPalDiv.className = '';
                    bitcoinDiv.className = 'is-hidden';
                    break;

                case 'bitcoin':
                    creditCardDiv.className = 'is-hidden';
                    payPalDiv.className = 'is-hidden';
                    bitcoinDiv.className = '';
                    break;
                default:
                    //do nothing, only three options in html for now
                    console.log("new payment option value");
                    break;
            }
        }
    }

})

//#endregion - Payment Info


//#region - Form Validation

const wrapParagraphAroundInputs = (input, message, labelWrapped = false) => {

    const paragraph = document.createElement('p');
    const span = document.createElement('span');
    span.textContent = message;
    span.style.display = 'none';
    input.insertAdjacentElement('afterend', span);

    let label = '';
    if (labelWrapped) {
        label = input.parentElement;
        // console.log(label);
    } else {
        label = input.previousElementSibling;
        // console.log(label);
    }

    const newSpan = input.nextElementSibling;

    label.insertAdjacentElement('beforebegin', paragraph);

    paragraph.appendChild(label);
    if (!labelWrapped) {
        paragraph.appendChild(input);
        paragraph.appendChild(newSpan);
    }
}

const setupFormValidation = () => {

    wrapParagraphAroundInputs(usernameInput, "Name Cannot Be Blank");
    wrapParagraphAroundInputs(emailInput, "Please Enter a Valid Email Address");
    wrapParagraphAroundInputs(creditCardInput, "Please Enter a Valid Credit Card Number", true);
    wrapParagraphAroundInputs(zipInput, "Please Enter a 5 Digit Zip Code", true);
    wrapParagraphAroundInputs(cvvInput, "Please Enter a 3 Digit CVV", true);
    wrapParagraphAroundInputs(mainConfInput, "Please Select at least One Activity", true);
}

const usernameHasValue = () => {

    return !showOrHideTip(!usernameInput.value.trim().length > 0, usernameInput.nextElementSibling);
}

// const emailHasValue = () => {

//     let passed = emailInput.value.trim().length > 0;

//     if (!passed) {
//         emailInput.nextElementSibling.textContent = blankEmailText;
//     }
//     return !showOrHideTip(!passed, emailInput.nextElementSibling);
// }

// regex from the Treehouse course Regular Expressions in JavaScript by Joel Kraft
const isValidEmail = () => {

    let passed = emailInput.value.trim().length > 0;
    if (!passed) {
        emailInput.nextElementSibling.textContent = blankEmailText;
    } else {
        passed = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
        if (!passed) {
            emailInput.nextElementSibling.textContent = invalidEmailText;
        }
    }

    return !showOrHideTip(!passed, emailInput.nextElementSibling);
    // return !showOrHideTip(!/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value), emailInput.nextElementSibling);
}


// const isValidEmail = () => {
//     // console.log(emailInput.value);
//     // console.log(!/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value));
//     let passed = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
//     if (!passed) {
//         emailInput.nextElementSibling.textContent = invalidEmailText;
//     }
//     return !showOrHideTip(!passed, emailInput.nextElementSibling);
//     // return !showOrHideTip(!/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value), emailInput.nextElementSibling);
// }

const isValidCreditCardNumber = () => {

    console.log(creditCardInput.value);
    console.log(/\d{13,16}/.test(creditCardInput.value));
    console.log('finished cc');
    !showOrHideTip(!/^\d{13,16}$/.test(creditCardInput.value), creditCardInput.nextElementSibling);
    !showOrHideTip(!/^\d{5}$/.test(zipInput.value), zipInput.nextElementSibling);
    !showOrHideTip(!/^\d{3}$/.test(cvvInput.value), cvvInput.nextElementSibling);
    return false;
    // return !showOrHideTip(!/\d{13,16}/.test(creditCardInput.value), creditCardInput.nextElementSibling);
}



const validateAll = (event) => {
    event.preventDefault();
    let allPassed = false;
    // console.log(event);
    // console.log('validateAll');
    allPassed = usernameHasValue();
    allPassed = isValidEmail();
    // allPassed = emailHasValue();
    // if (allPassed = emailHasValue()) {
    //     allPassed = isValidEmail();
    // }


    //TODO - check for Activities!!  ******************************

    // console.log(paymentSelect.options[paymentSelect.selectedIndex].value);
    if (paymentSelect.options[paymentSelect.selectedIndex].value === 'credit card') {
        //do credit card testing here
        console.log('ready for cc test');
        allPassed = isValidCreditCardNumber();
    }
    console.log(allPassed);
    //if all passed submit if not preventDefault();
}

// usernameInput.addEventListener("input", createRealTimeListener(isValidUsername));

emailInput.addEventListener("input", isValidEmail);

// emailInput.addEventListener("input", createListener(isValidPassword));

// creditCardInput.addEventListener("input", createListener(isValidTelephone));

// zipInput.addEventListener("input", createListener(isValidPassword));

// cvvInput.addEventListener("input", createListener(isValidTelephone));

// original code (modified by me) from the Treehouse course Regular Expressions in JavaScript by Joel Kraft
const showOrHideTip = (show, element) => {
    // show element when show is true, hide when false
    // console.log(show + " show");
    // paragraph = element.parentElement;
    // console.log('showOrHideTip');
    // console.log(show);
    // console.log(element);

    inputOfSpan = element.previousElementSibling;
    // console.log(inputOfSpan);
    // console.log(paragraph);
    // console.log(element.style.display);
    if (show) {
        // console.log(element);
        element.style.display = "inherit";
        inputOfSpan.className = 'error';
        // paragraph.className = 'error';
        // console.log(element);
    } else {
        element.style.display = "none";
        inputOfSpan.className = '';
        // paragraph.className = '';
    }

    return show;
    // console.log(element.previousElementSibling);
    // console.log(element);
    // console.log(element.style.display);
}

function showOrHideTipOriginal(show, element) {
    // show element when show is true, hide when false
    // console.log(show + " show");
    // paragraph = element.parentElement;
    // console.log('showOrHideTip');
    // console.log(show);
    // console.log(element);

    inputOfSpan = element.previousElementSibling;
    // console.log(inputOfSpan);
    // console.log(paragraph);
    // console.log(element.style.display);
    if (show) {
        // console.log(element);
        element.style.display = "inherit";
        inputOfSpan.className = 'error';
        // paragraph.className = 'error';
        // console.log(element);
    } else {
        element.style.display = "none";
        inputOfSpan.className = '';
        // paragraph.className = '';
    }
    // console.log(element.previousElementSibling);
    // console.log(element);
    // console.log(element.style.display);
}

// original code from the Treehouse course Regular Expressions in JavaScript by Joel Kraft
// function createRealTimeListener(validator) {
//     return e => {
//         console.log('createListener RealTime');
//         const text = e.target.value;
//         const valid = validator();
//         const showTip = !valid;
//         console.log(showTip + " showTip 2")
//         const tooltip = e.target.nextElementSibling;
//         showOrHideTip(showTip, tooltip);
//     };
// }

// function createSubmitListener(validator) {
//     return e => {

//         console.log('createListener Submit');
//         // const text = e.target.value; <- text is in the validator function
//         // const valid = validator(text);
//         const valid = validator();
//         // const showTip = text !== "" && !valid;
//         const showTip = !valid;
//         console.log(showTip + " showTip 1")
//         // const tooltip = e.target.nextElementSib?ling;
//         const tooltip = e.target.nextElementSibling;
//         showOrHideTip(showTip, tooltip);
//     };
//     e.preventDefault();
// }



// **************  Will be somethign like form.addEventListener("submit", createListener(validateAllFunction)); *******************

form.addEventListener("submit", validateAll);
// form.addEventListener("submit", createSubmitListener(validateAll));

// ************* TEST ************************************************
// form.addEventListener('submit', function (event) {
//     // if the email field is valid, we let the form submit
//     event.preventDefault(); //NOT SURE if this should be called first??
//     console.log('submit!');

//get each check working and then create one function and call it to check each one, one by one,
// will use createListener above to make this work:  form.addEventListener("submit", createListener(validateAllFunction));

//********I will have some input real-time handlers above
// 1) emailInput.addEventListener("input", createListener(isValidPassword));

//if credit card is chosen:
// 2) creditCardInput.addEventListener("input", createListener(isValidTelephone));

// 3) zipInput.addEventListener("input", createListener(isValidPassword));

// 4) cvvInput.addEventListener("input", createListener(isValidTelephone));

// *************and some submit only
//1) Name field can't be blank.
//2) Register for Activities checkboxes (at least one must be selected)





// if (!isValidUsername(event.target.value)) {
//     // If it isn't, we display an appropriate error message
//     // showError();
//     console.log("invalid!");
//     // Then we prevent the form from being sent by canceling the event
//     event.preventDefault();
// } else {
//     console.log("worked!");

// }

// });
//#endregion - Form Validation

// delete after finished testing.
/*
nameParagraph = document.createElement('p');
nameSpan = document.createElement('span');
nameSpan.textContent = "Name Cannot Be Blank";
nameSpan.style.display = 'none';
usernameInput.insertAdjacentElement('afterend', nameSpan);

nameLabel = usernameInput.previousElementSibling;
newNameSpan = usernameInput.nextElementSibling;

nameLabel.insertAdjacentElement('beforebegin', nameParagraph);
nameParagraph.appendChild(nameLabel);
nameParagraph.appendChild(usernameInput);
nameParagraph.appendChild(newNameSpan);
*/
