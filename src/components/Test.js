import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

function Test() {
  const [fragor, setFragor] = useState([])

  useEffect(() => {
    async function getFragor() {
      const { data: fragor } = await supabase.from('fraga').select()

      if (fragor.length > 1) {
        setFragor(fragor)
      }
    }

    getFragor()
  }, [])

  return (
    <div>
      {fragor.map((fraga) => (
        <li key={fraga.nummer}>{fraga.fraga}</li>
      ))}
    </div>
  )
}
export default Test