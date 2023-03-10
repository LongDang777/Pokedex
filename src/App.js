import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import loading from './assets/imgs/loadingGif.gif';
import PokedexItem from './component/PokedexItem';
import useFetch from './hook/useFetch';

function App() {

  const [page, setPage] = useState(18)
  const containerRef = useRef(null)

  const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${page}`

  const res = useFetch(URL)

  const handleScroll = () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage(prev => prev + 12)
    }
  }

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

return (
  <div  className="App">
    <h1 className='header'>Pokedex</h1>
    <div ref={containerRef} className='poke-container'>
      {res?.response?.results.map(({ name, url }) => {
        return <PokedexItem
          key={name}
          name={name}
          url={url} />
      })}
      {res.loading && <img className='loadingPokemon' src={loading} alt="" />}
    </div>
  </div>
);
}

export default App;


