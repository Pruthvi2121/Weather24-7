import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import {TiWeatherWindy, TiWeatherCloudy, TiWeatherDownpour} from 'react-icons/ti'
import {WiHumidity} from 'react-icons/wi'
import {CgCompressV} from 'react-icons/cg'
import {MdOutlineVisibility} from 'react-icons/md'
import {GiTempleDoor} from 'react-icons/gi'
import axios from "axios";

const Weather = ()=>{
    const token = process.env.weather_token
    const [location, setLocation] = useState("")
    const [temp, setTemp] = useState("")
    const [wind, setWind] = useState("")
    const [humidity, setHumidity] = useState("")
    const [climate, setClimate] = useState("")
    const [pressure, setPressure] = useState("")
    const [feel, setFeel] = useState("")
    const [visibility, setVisibility] = useState("")
   
    const [visible, setVisible]= useState()

    const myRef = useRef();
    console.log("is visible", visible)
    useEffect(()=>{
        console.log('myRef', myRef.current)
        const observer = new IntersectionObserver( (entries)=>{
            const entry = entries[0];
            
            setVisible(entry.isIntersecting)
        })
        observer.observe(myRef.current);
    },[])


    const handlesubmit =async e=>{
        e.preventDefault();
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${token}=metric`)
        .then((res)=>{
            console.log(res)
            setTemp(res.data.main.temp)
            setHumidity(res.data.main.humidity)
            setPressure(res.data.main.pressure)
            
            setClimate(res.data.weather[0].description)
            setWind(res.data.wind.speed)
            setFeel(res.data.main.feels_like)
            setVisibility(res.data.visibility)
            
            
        })
        .catch((err)=>{
            console.log(err)
        })
          
    }
    return <>
        <div className="weather"> 
            <form onSubmit={handlesubmit}>
                <div className="in">
                    <input  type="text" placeholder="Enter Location" onChange={(e)=>{setLocation(e.target.value)}}/>
                    <button className="btn" type="submit">Get</button>
                </div>
            </form>


            <div className="temp">
                <div>
                    <h1>{temp}<span className="deg">°C</span></h1>
                    <p>{location}</p>
                </div>
            </div>

            <div className={`${visible?"container":""}`}  ref={myRef}   >
                <Card icon={<TiWeatherCloudy size={"2rem"}/>}name="Climate" value={`${climate}`}/>
                <Card icon={<WiHumidity size={"2rem"}/>}  name="Humidity" value={`${humidity}%`}/> 
                <Card icon={<TiWeatherWindy size={"2rem"}/>}  name="wind speed" value={`${wind} m/s`}/> 
                <Card icon={<CgCompressV size={"2rem"}/>}   name="Pressure" value={`${pressure} N/m2`}/> 
                <Card icon={<GiTempleDoor size={"2rem"}/>}   name="feels like" value={`${feel} °C`}/>
                <Card icon={<MdOutlineVisibility size={"2rem"}/>}   name="visibility" value={`${visibility} MSL`}/> 
            
            
              
            </div>

           
           
        </div>
        
    </>
}

export default Weather
