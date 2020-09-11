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
 * 3) Check if one or more Activies are selected
 * @param {event} e - object/interface representing the click event
 ***/
activityFieldset.addEventListener('change', e => {

    const checkBoxes = activityFieldset.querySelectorAll('input');
    checkBoxes
    disableActivities(e.target, checkBoxes);
    reportTotalCost(checkBoxes);
    oneOrMoreActivies();
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

/***
 * `wrapParagraphAroundInputs` function
 * Add Span below Input and add Paragraph - Wrap the new paragraph around input's supporting elements or do not if there is already a wrapped element
 * 1) create paragraph and span
 * 2) span:
 *      a) textContent to error message
 *      b) display hidden
 *      c) insert after input
 * 3) get label or div element (can be a div in credit card case)
 * 4) insert new paragraph before the label or div element reference in step 3
 * 5) append label or div to the paragraph (wraps it)
 * 6) if there isn't a previous wrapped element (paragraph or div)
 *      a) wrap the new paragraph around the input's supporting elements
 * @param {element} input - input to add span to and wrap paragraph around
 * @param {text} message - messsage to display
 * @param {boolean} labelWrapped - true don't wrap paragraph around other elements
 ***/
const wrapParagraphAroundInputs = (input, message, labelWrapped = false) => {

    const paragraph = document.createElement('p');
    const span = document.createElement('span');

    span.textContent = message;
    span.style.display = 'none';
    input.insertAdjacentElement('afterend', span);

    let labelOrDiv = '';
    if (labelWrapped) {
        labelOrDiv = input.parentElement;
    } else {
        labelOrDiv = input.previousElementSibling;
    }

    labelOrDiv.insertAdjacentElement('beforebegin', paragraph);

    paragraph.appendChild(labelOrDiv);
    if (!labelWrapped) {
        paragraph.appendChild(input);
        paragraph.appendChild(span);
    }
}

/***
 * `setupFormValidation` function
 * Setup HTML elements for displaying error messages
 * 1) call wrapParagraphAroundInputs for each element being checked
 ***/
const setupFormValidation = () => {

    wrapParagraphAroundInputs(usernameInput, "Name Cannot Be Blank");
    wrapParagraphAroundInputs(emailInput, "Please Enter a Valid Email Address");
    wrapParagraphAroundInputs(cvvInput, "Please Enter a 3 Digit CVV", true);
    wrapParagraphAroundInputs(zipInput, "Please Enter a 5 Digit Zip Code", true);
    wrapParagraphAroundInputs(creditCardInput, "Please Enter a Valid Credit Card Number", true);
    wrapParagraphAroundInputs(mainConfInput, "Please Select at least One Activity", true);
}

/***
 * `usernameHasValue` function
 * Validate User Name input element - Display or Hide error message
 * 1) check for empty value
 * 2) call showOrHideTip
 * @returns {boolean} - true if passed / false if failed
 ***/
const usernameHasValue = () => !showOrHideTip(!usernameInput.value.trim().length > 0, usernameInput.nextElementSibling);

/***
 * `isValidEmail` function
 * Validate Email input element for blank and correct format - Display or Hide appropriate error message
 * note: email regex from the Treehouse course Regular Expressions in JavaScript by Joel Kraft
 * 1) check for blank
 *      a) if empty: set span message to blank error message
 * 2) if not empty check for invalid email format
 *      a) if empty: set span message to invalid format message
 * 3) call showOrHideTip
 * @returns {boolean} - true if passed / false if failed
 ***/
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
}

/***
 * `oneOrMoreActivies` function
 * Validate Activities input checkbox elements - Display or Hide error message
 * 1) check for 1 or more checked
 * 2) call showOrHideTip
 * @returns {boolean} - true if passed / false if failed
const oneOrMoreActivies = () => !showOrHideTip(!(activityFieldset.querySelectorAll('input[type="checkbox"]:checked').length > 0), mainConfInput.nextElementSibling);

/***
 * `isValidCreditCardNumber` function
 * Validate Credit Card Number input element - Display or Hide error message
 * 1) check for Valid Credit Card # (14-16 digits)
 * 2) call showOrHideTip
 * @returns {boolean} - true if passed / false if failed
 ***/
const isValidCreditCardNumber = () => !showOrHideTip(!/^\d{13,16}$/.test(creditCardInput.value), creditCardInput.nextElementSibling);

/***
 * `isValidZip` function
 * Validate Zip input element - Display or Hide error message
 * 1) check for Valid Zip # (5 digits)
 * 2) call showOrHideTip
 * @returns {boolean} - true if passed / false if failed
 ***/
const isValidZip = () => !showOrHideTip(!/^\d{5}$/.test(zipInput.value), zipInput.nextElementSibling);

/***
 * `isValidCVV` function
 * Validate CVV input element - Display or Hide error message
 * 1) check for Valid CVV # (3 digits)
 * 2) call showOrHideTip
 * @returns {boolean} - true if passed / false if failed
 ***/
const isValidCVV = () => !showOrHideTip(!/^\d{3}$/.test(cvvInput.value), cvvInput.nextElementSibling);


/***
 * `validateAll` function - event listener
 * Form Submit event listener - submit event
 * Validate All elements required for errors - submit only if error free
 * 1) check User Name, Email, Activities for errors
 * 2) if Credit Card is the payment
 *      a) check Credit Card Number, Zip and CVV for errors
 * 3) errors = prevent sumission - else submit
 * @param {event} event - object/interface representing the click event
 ***/
const validateAll = (event) => {

    let nonCreditCardPassed = false;
    let creditCardAllPassed = true;

    let creditCardNumPassed = false;
    let zipPassed = false;
    let cVVPassed = false;

    const userNamePassed = usernameHasValue();
    const emailPassed = isValidEmail();
    const activitiesPassed = oneOrMoreActivies();

    if (userNamePassed && emailPassed && activitiesPassed) {
        nonCreditCardPassed = true;
    }

    if (paymentSelect.options[paymentSelect.selectedIndex].value === 'credit card') {
        cVVPassed = isValidCVV();
        zipPassed = isValidZip();
        creditCardNumPassed = isValidCreditCardNumber();

        if (!cVVPassed || !zipPassed || !creditCardNumPassed) {
            creditCardAllPassed = false;
        }
    }

    if (!nonCreditCardPassed || !creditCardAllPassed) {
        event.preventDefault();
    }
}

/***
 * `showOrHideTip` function
 * Show or Hide Error Messages and Input Box Red Outlines for Form Validation
 * Note: original code (modified by me) from the Treehouse course Regular Expressions in JavaScript by Joel Kraft
 * 1) Get the input of the span sent in
 * 2) If showing the error message
 *      a) set span to display
 *      b) if input is credit card set id so CSS can style it on the left (instead of right like other error messages)
 *          1) set span id to display for credit card (via CSS)
 *          else - set span id to regular error to display via CSS
 *      c) set input class to error (red box via CSS)
 * 3) If hiding the error messages
 *      a) set span display to hide
 *      b) set span id to empty
 *      c) set input class to empty
 * @param {boolean} show - show/hide error message and input error styling
 * @param {element} span - span of the input that has the error
 * @returns {boolean} - show = t / hide = f
 ***/
const showOrHideTip = (show, span) => {

    inputOfSpan = span.previousElementSibling;
    if (show) {
        span.style.display = "inherit";
        if (inputOfSpan.id === 'cc-num') {
            span.id = 'cc-error';
        } else {
            span.id = 'error';
        }
        inputOfSpan.className = 'error';
    } else {
        span.style.display = "none";
        span.id = '';
        inputOfSpan.className = '';
    }

    return show;
}

/***
 * User Name Input event listener - input event
 * 1) Calls usernameHasValue for realtime error checking
 ***/
usernameInput.addEventListener("input", usernameHasValue);

/***
 * Email Input event listener - input event
 * 1) Calls isValidEmail for realtime error checking
 ***/
emailInput.addEventListener("input", isValidEmail);

/***
 * Credit Card Input event listener - input event
 * 1) Calls isValidCreditCardNumber for realtime error checking
 ***/
creditCardInput.addEventListener("input", isValidCreditCardNumber);

/***
 * Credit Card Zip Input event listener - input event
 * 1) Calls isValidZip for realtime error checking
 ***/
zipInput.addEventListener("input", isValidZip);

/***
 * Credit Card CVV Input event listener - input event
 * 1) Calls isValidCVV for realtime error checking
 ***/
cvvInput.addEventListener("input", isValidCVV);

/***
 * Form event listener - submit event
 * 1) Calls validateAll for error checking before submit
 * @param {event} event - object/interface representing the click event
 ***/
form.addEventListener("submit", validateAll);

//#endregion - Form Validation
