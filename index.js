
const APIKey ="163b843bc877835c10998f67c66302eb"

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
} 
else 
{
    x.innerHTML = "Geolocation is not supported by this browser.";
}
    
function getPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    let defaultLink= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`;
    let startda= weatherReport(defaultLink)
    startda.then((dat)=>{
    console.log(dat)
    })
}
function getSelectedCity(city){
    let selectedCityLink= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
    let selectedCityData= weatherReport(selectedCityLink)
    selectedCityData.then((dat)=>{
    console.log(dat)
    })
}

// document.getElementById("search").addEventListener("onkeyup",function(){
//     readValue(event);
// });
let cityName="";
function readValue(){
    let cityName =document.getElementById("search").value;
    console.log(cityName)
    if(cityName!=""){
        console.log("inside city")
        let searchedCityLink= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
        let searchedCityData= weatherReport(searchedCityLink)
        searchedCityData.then((dat)=>{
        console.log(dat)
        })
        cityName="";
    }
    else{
        document.getElementById("tooltip").style.display="block";
        document.getElementById("tooltip_message").innerText="Enter City Name";
    }
}
function enterCheck(event){
    if(event.key==="Enter"){
        console.log(event)
        readValue();
    }
}





// get url response for weather
async function weatherReport(url){
    let res=await fetch(url,
        {
            method:"GET"
        }
    )
    let data = await res.json();
    if(data.cod==200){
        document.getElementById("tooltip").style.display="none";
        let weekDay= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        document.getElementById("temp").innerText=data.main.temp+"°C";
        document.getElementById("area_name").innerText=data.name;
        let unixTime = data.dt;
        let d= new Date(unixTime*1000);
        let date_detail =d.toDateString("en-US").split(" ");
        document.getElementById("date_id").innerText=`${date_detail[2]}-${date_detail[1]}-${date_detail[3]}-${date_detail[0]}`;
        let time_detail = d.toLocaleTimeString("en-US");
        document.getElementById("icon_id").src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        document.getElementById("time_id").innerText=time_detail;
        document.getElementById("humidity_id").innerText=data.main.humidity+"%";
        document.getElementById("max_temp_id").innerText=data.main.temp_max+"°C";
        document.getElementById("min_temp_id").innerText=data.main.temp_min+"°C";
        document.getElementById("wind_id").innerText=data.wind.speed+"meter/sec";
        document.getElementById("description_id").innerText=data.weather[0].description;
        document.getElementById("search").value="";

        return data;
    }
    else{
        console.log(data.message)
        document.getElementById("tooltip").style.display="block";
        document.getElementById("tooltip_message").innerText=data.message;
    }
    
   
   
    

}


// function TimeDate(){
//     let weekDay= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//     let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     let date_detail= new Date();
//     let date_value=date_detail.getDate();
//     let month_vaue=months[date_detail.getMonth()];
//     let year_value=date_detail.getFullYear();
//     let week_value=weekDay[date_detail.getDay()];
//     let hour_value= date_detail.getHours();
//     let minute_value= date_detail.getMinutes();
//     console.log("time "+months[date_detail.getMonth()]);
//     document.getElementById("date_id").innerText=`${date_value}-${month_vaue}-${year_value} ${week_value}`;
//     document.getElementById("time_id").innerText=`${hour_value}:${minute_value}`
// }

// TimeDate()
// let weatherData=weatherReport()
// weatherData.then((response)=>{
//     console.log(response)
//     document.getElementById("temp").innerText=response.main.temp+"°C";
// })

// let url ="https://api.openweathermap.org/data/2.5/weather?"
// let queryParam ={
//     q=
// }





