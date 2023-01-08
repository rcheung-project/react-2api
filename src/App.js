import React, { useState } from "react";    
import axios from "axios";
let city;
let once = 0;

const App = () => {
  const [temperature, setTemperature] = useState("");
  const [country, setCountry] = useState("australia");
  const [cdata, setCdata] = useState([]);
	
// Axios API request for weather 
  const getWeatherData = (city, country) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=f45cfce985ffc6c63d02f42453158767`)
      .then((res) => {
        setTemperature(Math.round(res.data.main.temp - 273.15));
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

// Axios REST API request for country facts
  const getCountryData = async(country) => {
    const url = "https://restcountries.com/v2/name/" + country
    await axios.get(url) 
      .then((res) => {
        setCdata(res.data);
        } 
      )
      .catch((error) => {
        console.log(error);
      });
};  

const arr = cdata.map((data) => {
  city = data.capital
  if (once === 0) {
    getWeatherData(city, country);
    once++;
}
    
return (
  <div>
  <div style={{
              height: 300,
              width: "60%",
              backgroundColor: "lightcyan",
              paddingLeft: 20,
              paddingRight: 20,
              marginLeft: 260,
              marginRight: 140,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 25,
             }}
        >
      <img src={data.flags.svg} alt="" style={{ height: 150, width: "25%", display: "flex", justifyContent: "space-between", alighItems: "center"}}/>

        Country : {data.name}
        <br></br>
        Capital : {data.capital}
        <br></br>
        Current temperature : {temperature}℃
        <br></br>
        Currency : {data.currencies[0].code}
        <br></br>
        Language : {data.languages[0].name}
    </div>
  </div>
  )
});

  return (
    <>
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 70,
          width: "100%",
          backgroundColor: "#226ba3",
          fontSize: 30,
          color: "#fff",
        }}
      >
        Country facts    
        <div style={{ marginLeft: "33%" }}>       
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button 
            onClick={() => {
              getCountryData(country);
              once = 0;
            }}
          >
            Search country 
          </button>         
        </div>
      </div>  
      <div>
        {arr}
    </div> 
    </>
  );
}; 

export default App;
