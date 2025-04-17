import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import humidity from './images/humidity.png'
import pressure from './images/pressure.png'
import wind from './images/wind.png'
import timezone from './images/timezone.jpeg'
import visibility from './images/visibility.png'
// import { useState } from 'react';
function App() {
  const [city, setcity] = useState("")
  const [cityWeather, setcityWeather] = useState("")
  const [error, seterror] = useState(false)
  const [api, setapi] = useState(false)

  useEffect(() => {
 
    axios
      .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : "karachi"}%20&APPID=7bb98e4d3736c3bef260278894975717`
    )
      .then((res) => {
        setcityWeather(res.data)
        console.log(res)
        seterror(false)
      })
      .catch((err) => {
        console.log(error)
        seterror(true)
      })
  }, [api])
  
  const date = Date().toLocaleString()
  const handleform = (e) => {
    e.preventDefault();
    console.log(city)
    if (city === "") {
      alert("empty")
    }
    setapi(!api)
  }
  
  return (
    <div className="App">
      <div className='weather-div'>
        <div className='search-weather'>
          <h1 className='heading'>WEATHER APP</h1>
          <form onSubmit={handleform}>
            <input type="text"
              className='type'
              value={city}
              onChange={(e) => { setcity(e.target.value) }}
            />
            
          </form>
        </div>
      </div>
      {error === false ? (
        
        <div className='weather-update'>
          <span className='date'>{date}</span>
          <br />
          <span className='degree'>{`${Math.floor(cityWeather?.main?.temp - 273)}°C`}</span>
          <span className='info'>{` | ${cityWeather ?cityWeather.weather[0].description : ""}`}</span>
          <p>
          {cityWeather ? cityWeather.name : "name"} , {cityWeather ? cityWeather.sys.country : "country"}
          </p>
          <span>
            WEATHER INFORMATION
          </span>
          <ul>
            <li> <img src={humidity} alt = "a" className = "humidity"/> {cityWeather ? cityWeather.main.humidity : "humidity"}</li>
            <li> <img src={pressure} alt = "a" className = "pressure"/> {cityWeather ? cityWeather.main.pressure : "pressure"}</li>
            <li> <img src={wind} alt = "a" className = "wind"/> {cityWeather ? cityWeather.wind.speed : "speed"}</li>
            <li> <img src={timezone} alt = "a" className = "timezone"/> {cityWeather ? cityWeather.timezone : "timezone"}</li>
            <li> <img src={visibility} alt = "a" className = "visibility"/> {cityWeather? cityWeather.visibility : "visibility"}</li>
            {/* <li>{cityWeather ? cityWeather.sys.sunset : "sunset"}</li> */}
            </ul>
        </div>) :
        (
          <img src="" alt="404" className='error'/>
        )
      }

    </div>
  );
}

export default App;
