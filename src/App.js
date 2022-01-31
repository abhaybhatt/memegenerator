import React from 'react'
import { useState, useEffect } from 'react'
import LandingPage from './components/landingPage/LandingPage'
import TemplatePage from './components/templatePage/TemplatePage'
import EditPage from './components/editPage/EditPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const[templates, setTemplates] = useState([])
  const[selectedTemplate, setSelectedTemplate] = useState({})
  return(
    <Router>
      <Routes>
        <Route path='/templates' element={<TemplatePage templates={templates} setTemplates={setTemplates} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />}  />
        <Route path='/edit' element={ <EditPage selectedTemplate={selectedTemplate}/>} />
        <Route path='/' element={ <LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App