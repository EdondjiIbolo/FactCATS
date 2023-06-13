/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true`
export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const getRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      }
      )
  }
  useEffect(getRandomFact, [])
  //
  useEffect(() => {
    if (!fact) return
    const firstwords = fact.split(' ').splice(0, 3).join(' ')
    fetch(`https://cataas.com/cat/says/${firstwords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        const newurl = `https://cataas.com${url}`
        setImageUrl(newurl)
      })
  }, [fact])
  const handleclick = () => {
    getRandomFact()
  }
  return (
    <main>
      <header>
        <h1>
          App de gatitos
        </h1>
        <picture>

          {imageUrl && <img src={imageUrl} alt='img fact word' />}
        </picture>
      </header>
      <div>
        {fact && <p>{fact}</p>}
        <button onClick={handleclick}>Get new fact</button>
      </div>

    </main>
  )
}
