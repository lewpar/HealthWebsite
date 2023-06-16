async function setDailyTip()
{
    try 
    {
        let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const now = new Date();
        let day = now.getDay();
        let filePath = `./dailytips/${days[day - 1]}.html`

        let result = await fetch(filePath);
        if(result.ok)
        {
            let page = document.getElementsByClassName("page")[0];
            let tipHTML = await result.text();
    
            page.innerHTML = tipHTML;
        }
    }
    catch(exception) 
    {
        console.log(exception);
    }
}