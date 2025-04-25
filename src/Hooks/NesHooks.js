import {useEffect, useState} from "react"

function useCurrencyInfo(currency) {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=50411704e9714150a000caafa851731b`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((res) => {
        if (res && res.rates) {
          setData(res.rates)
        } else {
          setData({})
          setError('Currency data not found in response')
        }
      })
      .catch((err) => {
        setData({})
        setError(err.message)
        console.error('Failed to fetch currency data:', err)
      })
  }, [])

  return { data, error }
}
export default useCurrencyInfo