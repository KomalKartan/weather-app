import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TemperatureAndDetails = ({weather:{
    main, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like
}, units}) => {

    const verticalDetails = [
        {
            id:1,
            Icon: FaThermometerEmpty,
            title: "Feels like",
            value: `${feels_like.toFixed()}°`

        },
        {
            id:2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()}%`

        },
        {
            id:3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()} ${ units === 'metric' ? 'km/hr' : 'm/s'}`

        }
    ]

    const horizontalDetails = [
        {
            id:1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise

        },
        {
            id:2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset

        },
        {
            id:3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temp_max.toFixed()}°`

        },
        {
            id:4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temp_min.toFixed()}°`

        }
    ]
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-2xl font-medium text-blue-100">
            <p>{main}</p>
        </div>
        <div className="flex items-center justify-between py-3">
            <img
                src={icon}
                alt="weather icon"
                className="w-20"
            />
            <p className="text-5xl justify-center">{`${temp.toFixed()}°`}</p>
            <div className="flex flex-col  space-y-3 items-start">
                {
                    verticalDetails.map(({id, Icon, title, value})=>
                        <div key={id} className="flex items-center">
                            <Icon size={18} className="mr-1"/>
                            <p className="text-s font-medium">{`${title}:`} <span className="ml-1 font-normal">{value}</span></p>
                        </div>
                    )
                }
                
                
            </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-10 my-4">
                {
                    horizontalDetails.map(({id, Icon, title, value})=>
                        <div key={id} className="flex items-center">
                            <Icon size={30} className="mr-1"/>
                            <p className="text-s font-medium">{`${title} :`} <span className="ml-1 font-bold">{value}</span></p>
                        </div>
                    )
                }
        </div>
    </div>
  )
}

export default TemperatureAndDetails