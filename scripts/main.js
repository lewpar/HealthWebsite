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

// Toggle the validation error.
function toggleInvalidField(field, state, message = "")
{
    if(state)
    {
        // Show the validation error.
        field.classList.add("dirty-form-item");
        let error = field.parentElement.lastElementChild;
        error.style.display = "flex";
        error.innerHTML = message;
    }
    else
    {
        // Hide the validation error.
        field.classList.remove("dirty-form-item");
        let error = field.parentElement.lastElementChild;
        error.style.display = "none";
    }
}

// Resets all of the register form input fields.
function resetRegister(resetValue, resetValidation)
{
    // Hide the success notification.
    let success = document.getElementById("form-success");
    success.style.display = "none";

    let formItems = document.getElementsByClassName("clean-form-item");

    // Loop through all of the inputs on the form.
    for(var i = 0; i < formItems.length; i++)
    {
        let formType = formItems[i].tagName;

        // Reset each input based on its type.
        switch(formType)
        {
            case "INPUT":
                if(resetValue)
                {
                    // Reset the input values.
                    formItems[i].value = "";
                    formItems[i].checked = false;
                }
                if(resetValidation)
                {
                    // Hide the failure notification.
                    toggleInvalidField(formItems[i], false);
                }
                break;

            case "SELECT":
                if(resetValidation)
                {
                    // Hide the failure notification.
                    toggleInvalidField(formItems[i], false);
                }
                break;
        }
    }
}

// Does input validation on the registration form before notify the user of success/failure.
function register()
{
    hasError = false;

    resetRegister(false, true);

    // Fetch all of the input elements.

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

    // Start of input validation.
    // Each input is tested and if it fails it will notify the user.
    
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
    // Regular expression to test if the email is valid.
    if(!new RegExp("[0-9a-zA-Z].*@[0-9a-zA-Z].*\\.[0-9a-zA-Z].*").test(fieldEmail.value))
    {
        toggleInvalidField(fieldEmail, true, "You must enter a valid email address.");
        hasError = true;
    }
    if(!new RegExp("^[0-9]+$").test(fieldPhone.value))
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
    if(!new RegExp("^[0-9]+$").test(fieldPostCode.value))
    {
        toggleInvalidField(fieldPostCode, true, "Your must enter a postcode.");
        hasError = true;
    }

    if(!fieldPrivacy.checked)
    {
        toggleInvalidField(fieldPrivacy, true, "Your must agree to the privacy policy.");
        hasError = true;
    }

    // If no error occured, notify the user that the account was created.
    if(!hasError)
    {
        let success = document.getElementById("form-success");
        success.style.display = "block";
        success.innerHTML = "Account Created!";
    }
}

// The events container which holds information about events.
let events = {
    0: {
        "Name": "Wellness Event",
        "Date": "01/01/2024",
        "Description": "🌟 Join us for an empowering wellness event like no other! 🌿✨ Immerse yourself in an atmosphere of positivity and connection as we bring together individuals who are passionate about holistic well-being. Discover a world of rejuvenation and personal growth through inspiring workshops, invigorating activities, and enlightening discussions led by experts in various wellness domains. From mindfulness practices to nutritional guidance, we aim to provide you with a diverse range of tools and knowledge to enhance your overall wellness journey. Embrace the opportunity to connect with like-minded individuals who share a common goal of nurturing their mind, body, and soul. Get ready to be uplifted, inspired, and discover your best self in the company of positive, supportive individuals. Don't miss out on this incredible experience designed to promote wellness and help you connect with an amazing community of individuals who are committed to living their best lives! 🌈💫"
    },
    1: {
        "Name": "Positivity Event",
        "Date": "27/07/2023",
        "Description": "🌟 Unlock the Power of Mental Positivity: Join us for a transformative event dedicated to cultivating a resilient and positive mindset. Discover the profound impact of mental well-being on every aspect of your life at this thought-provoking gathering. Through enlightening talks, interactive workshops, and engaging activities, we will explore practical strategies to nurture mental positivity and emotional resilience. Delve into the realms of mindfulness, self-compassion, and cognitive reframing, guided by experts in the field of positive psychology. Connect with a community of individuals who share a common desire to cultivate mental well-being and embrace a more positive outlook on life. Together, we will explore evidence-based techniques, gain practical tools, and foster connections with like-minded individuals who are committed to prioritizing their mental health. Don't miss this invaluable opportunity to empower yourself, ignite inner positivity, and embark on a transformative journey toward a life filled with joy, resilience, and mental well-being. Reserve your spot today and start paving the path to a brighter, more optimistic future. 🌈✨"
    }
}

// Populate the events page with events
function loadEvents()
{
    // Fetch the page-item container to store events into on the page.
    let page = document.getElementsByClassName("page-item")[0];

    // Loop through all of the events.
    for(var i = 0; i < Object.keys(events).length; i++)
    {
        // Inject the event into the page.
        page.innerHTML += `<div class="nice-form"><div class="nice-form-item"><span class="text-small">${events[i].Name}</span><span class="text-smaller">${events[i].Date}</span><span>${events[i].Description}</span></div></div>`;
    }
}