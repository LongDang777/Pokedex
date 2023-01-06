import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import PokedexItem from './component/PokedexItem';

const URL = `https://pokeapi.co/api/v2/pokemon`

function App() {
  const [nextApi, setNextApi] = useState('')
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(URL);
  }, [])

  const fetchData = async (url) => {
    try {
      setTimeout(async () => {
        const res = await axios.get(url);
        setData(() => {
          return [...data, ...res.data.results]
        });
        setNextApi(res.data.next)
      }, 500);
    } catch (error) {
      setError(error);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight) {
        console.log('log');
        nextApi && fetchData(nextApi)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextApi, data]);



  return (
    <div className="App">
      <h1 className='header'>Pokedex</h1>
      <div className='poke-container'>
        {data.length > 0 && data.map((item) => {
          return <PokedexItem
            key={item.name}
            name={item.name}
            numberItem={data.length}
            url={item.url} />
        })}
      </div>
    </div>
  );
}

export default App;


