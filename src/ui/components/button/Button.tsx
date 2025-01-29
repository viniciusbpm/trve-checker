import { spotifyApiService } from '../../../service/spotifyApiService'

export const Button = () => {
  const handleClick = async () => {
    await spotifyApiService.getCode()
  }

  return (
    <>
      <button onClick={handleClick}>
        check
      </button>
    </>
  )
}