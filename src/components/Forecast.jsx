import React from 'react'

const Forecast = ({title, forecast}) =>{

  return (
    <div className='pb-0.5 rounded-xl bg-blue-300/25'>
        <div className='flex items-center justify-start mt-6'>
            <p className='font-medium uppercase px-1.5 py-0.5'>{title}</p>
        </div>
        <hr className='my-1 px-1'/>
        <div className='flex items-center justify-between'>
            {forecast.map((d, index)=>(
                <div key={index} className=' flex flex-col items-center justify-center'>
                    <p className='font-light my-1 px-1.5'>{d.title}</p>
                    <img src={d.icon}
                        alt="weather icon"
                        className="w-12 my-1"
                    />
                    <p className='text-lg font-medium'>{`${d.temp.toFixed()}°`}</p>
                </div>
            ))

            }
        </div>
    </div>
  )
}

export default Forecast
