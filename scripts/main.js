// The day index.
let dayIndex = 0;

// Decrease the day index by 1 and re-fetch the tips page.
function prevTip()
{
    // Change the page index to the previous.
    dayIndex--;

    // Update the prev/next controls.
    updateTipControls();

    let page = document.getElementsByClassName("page")[0];

    // Remove the old animations and fade out the current page.
    page.classList.remove("slide-in-left");
    page.classList.remove("slide-in-right");
    page.classList.add("opacity-fade-out");

    // After a 500ms delay, slide the new page in.
    setTimeout(function() {
        setDailyTip();
        page.classList.remove("opacity-fade-out");
        page.classList.add("slide-in-right");
    }, 500);
}

// Increase the day index by 1 and re-fetch the tips page.
function nextTip()
{
    // Change the page index to the next.
    dayIndex++;

    // Update the prev/next controls.
    updateTipControls();

    // Remove the old animations and fade out the current page.
    let page = document.getElementsByClassName("page")[0];
    page.classList.remove("slide-in-left");
    page.classList.remove("slide-in-right");
    page.classList.add("opacity-fade-out");

    // After a 500ms delay, slide the new page in.
    setTimeout(function() {
        setDailyTip();
        page.classList.remove("opacity-fade-out");
        page.classList.add("slide-in-left");
    }, 500);
}

function updateTipControls()
{
    let next = document.getElementById("tip-next");
    let prev = document.getElementById("tip-prev");

    // The days of the week collection.
    let days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const now = new Date();

    // Get the number day of the week, sunday:0, saturday:6
    // and add the day index (controlled by the previous and next buttons).
    let day = now.getDay() + dayIndex;

    // Check if its the last day of the week.
    if(day >= days.length - 1)
    {
        // Disable the next button so we don't try to fix a non-existent day.
        next.setAttribute("disabled", "");
    }
    else // It's not the last day of the week.
    {
        // Re-enable the next button.
        next.removeAttribute("disabled");
    }

    // Check if its the first day of the week.
    if(day == 0)
    {
        // Disable the previous button so we don't try to fix a non-existent day.
        prev.setAttribute("disabled", "");
    }
    else // It's not the first day of the week.
    {
        // Disable the previous button so we don't try to fix a non-existent day.
        prev.removeAttribute("disabled");
    }
}

/*
    Gets the day of the week page and injects it into the page element.
*/
async function setDailyTip()
{
    try 
    {
        let prev = document.getElementById("tip-prev");
        let next = document.getElementById("tip-next");

        // The days of the week collection.
        let days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const now = new Date();

        // Get the number day of the week, sunday:0, saturday:6
        // and add the day index (controlled by the previous and next buttons).
        let day = now.getDay() + dayIndex;

        updateTipControls();

        // Get the name of the day using the index location.
        let filePath = `./dailytips/${days[day]}.html`

        // Fetch the daily tip page content.
        let result = await fetch(filePath);

        // Check the HTTP response status is OK(200).
        if(result.ok)
        {
            // Get the page element.
            let page = document.getElementsByClassName("page")[0];

            // Get the HTML content from the daily tip page.
            let tipHTML = await result.text();
            
            // Inject the daily tip HTML into the current page element.
            page.innerHTML = tipHTML;
        }
    }
    catch(exception) 
    {
        // Log any exceptions caught into the browsers console.
        console.log(exception);
    }
}

function toggleInvalidField(field, state, message = "")
{
    if(state)
    {
        field.classList.add("dirty-form-item");
        let error = field.parentElement.lastElementChild;
        error.style.display = "flex";
        error.innerHTML = message;
    }
    else
    {
        field.classList.remove("dirty-form-item");
        let error = field.parentElement.lastElementChild;
        error.style.display = "none";
    }
}

function resetRegister(resetValue, resetValidation)
{
    let success = document.getElementById("form-success");
    success.style.display = "none";

    let formItems = document.getElementsByClassName("clean-form-item");
    for(var i = 0; i < formItems.length; i++)
    {
        let formType = formItems[i].tagName;

        switch(formType)
        {
            case "INPUT":
                if(resetValue)
                {
                    formItems[i].value = "";
                    formItems[i].checked = false;
                }
                if(resetValidation)
                {
                    toggleInvalidField(formItems[i], false);
                }
                break;

            case "SELECT":
                if(resetValidation)
                {
                    toggleInvalidField(formItems[i], false);
                }
                break;
        }
    }
}

function register()
{
    hasError = false;

    resetRegister(false, true);

    let fieldUsername = document.getElementById("form-username");
    let fieldPassword = document.getElementById("form-password");
    let fieldRepeatPassword = document.getElementById("form-repeat-password");

    let fieldFirstName = document.getElementById("form-first-name");
    let fieldLastName = document.getElementById("form-last-name");
    let fieldGender = document.getElementById("form-gender");

    let fieldEmail = document.getElementById("form-email");
    let fieldPhone = document.getElementById("form-phone");

    let fieldStreet = document.getElementById("form-street");
    let fieldSuburb = document.getElementById("form-suburb");
    let fieldState = document.getElementById("form-state");
    let fieldPostCode = document.getElementById("form-postcode");

    let fieldPrivacy = document.getElementById("form-privacy");
    
    if(fieldUsername.value === "")
    {
        toggleInvalidField(fieldUsername, true, "You must enter a username.");
        hasError = true;
    }

    if(fieldPassword.value === "")
    {
        toggleInvalidField(fieldPassword, true, "You must enter a password.");
        hasError = true;
    }
    if(fieldRepeatPassword.value === "")
    {
        toggleInvalidField(fieldRepeatPassword, true, "You must repeat your password.");
        hasError = true;
    }

    if(fieldRepeatPassword.value !== fieldPassword.value)
    {
        toggleInvalidField(fieldRepeatPassword, true, "Your passwords do not match.");
        hasError = true;
    }

    if(fieldFirstName.value === "")
    {
        toggleInvalidField(fieldFirstName, true, "You must enter your first name.");
        hasError = true;
    }
    if(fieldLastName.value === "")
    {
        toggleInvalidField(fieldLastName, true, "You must enter your last name.");
    }
    if(fieldGender.value === "select")
    {
        toggleInvalidField(fieldGender, true, "You must select a gender.");
        hasError = true;
    }

    if(fieldEmail.value === "")
    {
        toggleInvalidField(fieldEmail, true, "You must enter an email address.");
        hasError = true;
    }
    if(fieldPhone.value === "")
    {
        toggleInvalidField(fieldPhone, true, "You must enter a phone number.");
        hasError = true;
    }

    if(fieldStreet.value === "")
    {
        toggleInvalidField(fieldStreet, true, "You must enter a street address.");
        hasError = true;
    }
    if(fieldSuburb.value === "")
    {
        toggleInvalidField(fieldSuburb, true, "You must enter a suburb.");
        hasError = true;
    }
    if(fieldState.value === "")
    {
        toggleInvalidField(fieldState, true, "You must enter a state.");
        hasError = true;
    }
    if(fieldPostCode.value === "")
    {
        toggleInvalidField(fieldPostCode, true, "Your must enter a postcode.");
        hasError = true;
    }

    if(!fieldPrivacy.checked)
    {
        toggleInvalidField(fieldPrivacy, true, "Your must agree to the privacy policy.");
        hasError = true;
    }

    if(!hasError)
    {
        let success = document.getElementById("form-success");
        success.style.display = "block";
        success.innerHTML = "Account Created!";
    }
}