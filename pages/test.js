import { useEffect } from 'react'
import supabase from '../lib/supabase'

export default function Test() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('alevels')
        .select('*')

      if (error) {
        console.error('Error fetching data:', error.message)
      } else {
        console.log('Fetched data:', data)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Test Supabase Connection</h1>
      <p>Check the console for fetched data or error messages.</p>
    </div>
  )
}
