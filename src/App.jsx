import React, { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'

const App = () => {

  const [query, setQuery] = useState({q: 'london'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async ()=>{
    await getFormattedWeatherData({...query, units}).then((data)=> {
        setWeather(data)
      });
      
    
  };

  useEffect(()=>{
    getWeather();
    
  }, [query, units]);

  const formatBackground = ()=>{

    if(!weather) return ' from-cyan-450 to-cyan-600';
    const threshold = units === "metric" ? 20 : 60;

    if(weather.temp <=threshold) return 'from-cyan-400 to-cyan-700';
    return "from-yellow-300 to-orange-600"

  }
  
  return (
    <div className="mx-auto max-w-screen-lg mt-6 pt-5 pb-8 px-30 bg-gradient-to-br
    shadow-xl shadow-gray-200 from-blue-300 to-blue-500 rounded-2xl">
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits = {setUnits}/>
      {weather && (
        <>
          <TimeAndLocation weather = {weather}/>
          <TemperatureAndDetails weather = {weather} units={units}/>
          <Forecast title = "3 hour forecast" forecast = {weather.hourly}/>
          <Forecast title = "daily forecast" forecast = {weather.daily}/>
        </>
      )
      
      }
      
    </div>
  )
}

export default App