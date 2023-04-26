const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.querySelector('.city_name');
const temp = document.getElementById('temp_real');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');


const top_layer = document.querySelector('.top_layer');

const getCurrentTime = () => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let currentTime = new Date();
    let month = months[currentTime.getMonth()];
    let day = weekday[currentTime.getDay()];
    let date = currentTime.getDate();
    

    return `<p id="day">${day}</p>
    <p id="today_data">${date} ${month}</p>`;
  };

top_layer.innerHTML = getCurrentTime();

const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = "Please write the name before search"
        dataHide.classList.add('data_hide');
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=d31e9a71fe00fe8e28533cc38ff1ec38`;
            const data = await fetch(url).then(response => response.json());
            const arrData = [data];
            console.log(data);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;

            if(tempMood === 'Clear'){
                temp_status.innerHTML = `<i class="fa-solid fa-sun" style='color:#eccc68;'></i>`;
            } else if(tempMood === "Clouds"){
                temp_status.innerHTML = `<i class="fa-solid fa-cloud" style='color:#f1f2f6;'></i>`;
            } else if(tempMood === 'Rain'){
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-rain" style='color:#a4b0be;'></i>`
            } else {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud" style='color:#f1f2f6;'></i>`;
            }

            dataHide.classList.remove('data_hide');

        }
        catch{
            city_name.innerText = "Please enter the city name properly."
            dataHide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getInfo);

