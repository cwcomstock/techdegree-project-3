/******************************************
Treehouse FSJS Techdegree:
project 3 - Interactive Form
******************************************/

/********  global variables  *****************************/
const firstColorOptionText = 'Cornflower Blue (JS Puns shirt only)';
const firstColorTextBeforeThemeSelect = 'Please select a T-shirt theme';
const designSelect = document.querySelector('select#design');
const colorSelect = document.querySelector('select#color');
const colorOptions = colorSelect.children;


/***
 * Form Loaded Tasks
 * 1) Set focus to Name Element (1st element on form)
 * 2) Hide the Other Job Role Input elment
 * 3) Call function to Setup T-Shirt Section of form
 ***/
window.onload = () => {
    document.querySelector("input#name").focus();
    document.querySelector('input#other-title').style.display = 'none';
    setupTShirtHtml();
};

//#region - T-Shirt Info Section

/***
 * `setupTShirtHtml` function
 * Setup T-Shirt Section of form once loaded
 * 1) Hide Select Theme option in Design Menu
 * 2) Hide Color options
 * 3) Update 1st Color option to ensure users picks a theme first
 *      this will be reset once a theme is chosen
 ***/
const setupTShirtHtml = () => {

    designSelect.firstElementChild.style.display = 'none';

    hideColorOptions('all');

    colorOptions[0].textContent = firstColorTextBeforeThemeSelect;
}

const hideColorOptions = hideOption => {

    if (hideOption.toLowerCase() === 'all') {
        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].style.display = 'none';
        }
    }
    for (let i = 0; i < colorOptions.length; i++) {
        // console.log(colorOptions[i]);
        console.log(colorOptions[i].textContent.toLowerCase());
        console.log(hideOption.toLowerCase());
        console.log(colorOptions[i].textContent.toLowerCase().indexOf(hideOption.toLowerCase()));
        // console.log(colorOptions[i].style.display);

        if (colorOptions[i].textContent.toLowerCase().includes(hideOption.toLowerCase())) {
            // console.log(colorOptions[i].style.display + ' - visible');
            colorOptions[i].style.display = '';
        } else {
            // console.log(colorOptions[i].style.display + ' - NONE');
            colorOptions[i].style.display = 'none';
        }
        // console.log(colorOptions[i].style.display);
    }
}

/***
 * Design Select event listener - change event
 * 1) if selected is not active then remove active class from all buttons
 * 2) set selected element class to active
 * 3) call showPage function with the index value of the selected element
 * @param {event} e - object/interface representing the click event
 ***/
designSelect.addEventListener('change', e => {
    // console.log(e.target);
    // console.log(e.target.value);
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
    // if (e.target.value) {
    //     hideColorOptions(e.target.value);
    // }
})




//#endregion - T-Shirt Info Section
