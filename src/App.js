import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PokedexItem from './component/PokedexItem';
import useFetch from './hook/useFetch';


function App() {

  const [page, setPage] = useState(13)
  const containerRef = useRef(null)

  const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${page}`

  const res = useFetch(URL)
  console.log(page);


  const handleScroll = () => {
    const isBottom = containerRef?.current?.getBoundingClientRect().bottom <= window.innerHeight;
    isBottom && setPage(prev => prev + 10)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="App">
      <h1 className='header'>Pokedex</h1>
      <div ref={containerRef} className='poke-container'>
        {res?.response?.results.map((item) => {
          return <PokedexItem
            key={item.name}
            name={item.name}
            url={item.url} />
        })}
      </div>
    </div>
  );
}

export default App;


