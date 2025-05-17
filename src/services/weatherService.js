import { DateTime } from "luxon";


const apiKey = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const iconToUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
const getWeatherData = (infoType, searchParams) =>{
    const url = new URL(BASE_URL + infoType)

    url.search = new URLSearchParams({...searchParams, appid: apiKey});

    return fetch(url).then((res)=> res.json());
}

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => 
    DateTime.fromSeconds(secs+offset, {zone: 'utc'}).toFormat(format);

const formatCurrent = (data) =>{

    const {
        coord:{lat, lon},
        dt,
        main:{feels_like, humidity, temp, temp_max, temp_min},
        name,
        sys:{country, sunrise, sunset},
        timezone,
        weather,
        wind:{speed}
    } = data

    const{main, description, icon} = weather[0]
    const formattedLocalTime = formatToLocalTime(dt, timezone)

    return {
        feels_like, 
        humidity, 
        temp, temp_max, temp_min, 
        name, 
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        main, 
        description, 
        icon: iconToUrl(icon), 
        speed, 
        dt, timezone, formattedLocalTime,
        lat, lon
    }
}

const formatForecastWeather = (secs, offset, data)=>{

    //hourly
    
    const hourly = data
        .filter((f)=>f.dt>secs)
        .slice(0,5)
        .map((f)=>({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: iconToUrl(f.weather[0].icon),
            date: f.dt_txt

        }));
    
    const daily = data.
        filter((f)=>f.dt_txt.slice(-8) === "00:00:00")
        .map((f)=>({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "ccc"),
            icon: iconToUrl(f.weather[0].icon),
            date: f.dt_txt
        }))
        
    
    return {hourly, daily}

    
}
const getFormattedWeatherData = async (searchParams)=>{

    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(formatCurrent);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat,
        lon,
        units: searchParams.units
    }).then((d)=>formatForecastWeather(dt, timezone, d.list))
    console.log({...formattedCurrentWeather, ...formattedForecastWeather})
    return {...formattedCurrentWeather, ...formattedForecastWeather};
}
export default getFormattedWeatherData;