let tipIndex = 0;

function prevTip()
{
    tipIndex--;
    setDailyTip();
}

function nextTip()
{
    tipIndex++;
    setDailyTip();
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
        let day = now.getDay() + tipIndex;
        console.log(day);

        if(day == days.length - 1)
        {
            next.setAttribute("disabled", "");
        }
        else 
        {
            next.removeAttribute("disabled");
        }

        if(day == 0)
        {
            prev.setAttribute("disabled", "");
        }
        else
        {
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