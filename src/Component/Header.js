import React, { useEffect, useState } from "react";

const Header =()=>{
    const [today, setToday] = useState("")
    useEffect(()=>{
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date();
        let day = weekday[d.getDay()];
        let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() ;
        setToday(`${day} ${date}`)
    })
    return<>
        <div className="header" >
            <div className="nav">
                <h1 className="el1">WEATHER.</h1>
                <h3 className="el2">{today}</h3>
            </div>


            <div className="Heading">
                <h1 className="el1">Real time Weather Forcasting.</h1>
                <h1 className="el2">Get Ahead of the Weather.</h1>
                <h1 className="el3">Tool to get live weather details.</h1>
                <button className="btn" onClick={()=>{window.scrollBy(0,700);}}>Start</button>
            </div>
        </div>
    </>
}

export default Header

