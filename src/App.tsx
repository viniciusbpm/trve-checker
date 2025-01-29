import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './ui/components/button/Button'
import { spotifyApiService } from './service/spotifyApiService'

function App() {
  const [verified, setVerified] = useState(false)

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
