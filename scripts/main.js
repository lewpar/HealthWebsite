async function setDailyTip()
{
    try {
        let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const d = new Date();
        let day = d.getDay();
        let file = `/dailytips/${days[day - 1]}.html`

        let result = await fetch(file);
        if(result.ok)
        {
            let page = document.getElementsByClassName("page")[0];
            let tipHTML = await result.text();
    
            page.innerHTML = tipHTML;
        }
    }
    catch(exception) {
        console.log(exception);
    }
}