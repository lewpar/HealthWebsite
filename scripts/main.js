// The day index.
let dayIndex = 0;

// Decrease the day index by 1 and re-fetch the tips page.
function prevTip()
{
    dayIndex--;
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
    dayIndex++;
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