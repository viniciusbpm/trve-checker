import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './ui/components/button/Button'
import { spotifyApiService } from './service/spotifyApiService'
import { useNavigate } from 'react-router'

function App() {
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(!verified) {
      getCredentials()
    }
  }, [])

  const getCredentials = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    if(!codeParam) return

    try {
      await spotifyApiService.getToken(codeParam)
      console.log(localStorage.getItem('access_token'))
      navigate('/data-list')
    } catch(error) {
      console.log('ok')
    }
    
    setVerified(true)
  }

  return (
    <div>
      <h1>have you been trve this past 4 weeks?</h1>
      <Button />
    </div>
  )
}

export default App
