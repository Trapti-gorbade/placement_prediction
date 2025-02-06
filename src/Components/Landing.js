import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { Features } from './features'
import { About } from './about'
import { Team } from './Team'
import { Contact } from './contact'
import jsonData from "./data/data.json"
import { Navigation } from './navigation'
import Profile from '../routes/Profile'
import {Route, Routes} from "react-router-dom"
function Landing() {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(()=>{
        setLandingPageData(jsonData)
    }, []) 
  return (
    <div>
        
        <Navigation />
        <Header data={landingPageData.Header} />
        <Features data={landingPageData.Features} />
        <About data={landingPageData.About} />
        <Team data={landingPageData.Team} />
        <Contact data={landingPageData.Contact} />
    </div>
  )
}

export default Landing
