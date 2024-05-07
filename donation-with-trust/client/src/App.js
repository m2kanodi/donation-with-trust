import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Donator from './pages/Donator'
import Ngo from './pages/Ngo'
import NgoNewCampaign from './pages/NgoNewCampaign'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/donator' element={<Donator/>} />
        <Route path='/ngo' element={<Ngo />} />
        <Route path='/new' element={<NgoNewCampaign />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
