const apikey = "25816bee71661fd4bd206449947af3cf";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchbox = document.querySelector(".first input");
const searchbutton = document.querySelector(".first button");
const weathericons= document.querySelector(".Weather-icons");

async function checkweather(city){
    const response=await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status==404){
        document.querySelector(".notfound").style.display="block";
        document.querySelector(".second").style.display="none";
    }
    else{
    var data=await response.json();


    // console.log(data); when we rin this we came to know where our all things present like city temp

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";

    if(data.weather[0].main=="Clouds"){
        weathericons.src="/images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weathericons.src="/images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weathericons.src="/images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weathericons.src="/images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        weathericons.src="/images/mist.png";
    }
    document.querySelector(".second").style.display="block";
    document.querySelector(".notfound").style.display="none";
    }   
}
searchbutton.addEventListener('click',()=>{
    checkweather(searchbox.value);
})