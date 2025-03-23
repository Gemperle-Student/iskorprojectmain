import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Landingpage } from './screens/Landingpage.jsx';
import { GetStarted } from './screens/GetStarted/GetStarted.jsx';
import { Desktop } from './screens/Desktop/Desktop.jsx';
import { Help } from './screens/Help/help.jsx';
import './index.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GetStarted/>
    <Landingpage/>
    <Help/>
    <App />
  </StrictMode>,
)

