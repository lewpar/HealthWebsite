async function setDailyTip()
{
    try 
    {
        let days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const now = new Date();
        let day = now.getDay();

        let filePath = `./dailytips/${days[day]}.html`

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