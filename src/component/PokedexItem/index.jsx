import React from 'react';
import loading from '../../assets/imgs/loadingGif.gif';
import useFetch from '../../hook/useFetch';
import './style.css';


const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

export default function PokedexItem(props) {

  const { name, url } = props

  const res = useFetch(url);
  if (!res.response) {
    return ''
    // return <img className='loadingPokemon' src={loading} alt="" />
  }

  const img = res.response.sprites.other.dream_world.front_default;
  const imgHover = res.response.sprites.other.home.front_default
  const type = res.response.types[0].type.name
  const order = res.response.order

  return (
    <div className='pokemon' style={{ backgroundColor: colors[type] }}>
      <div className="img-container">
        <img className='img-main' src={img || imgHover} alt="" />
        <img className='img-hover' src={imgHover} alt="" />
      </div>
      <div className="info">
        <span className='number'>#00{order}</span>
        <h3 className='name'>{name}</h3>
        <small className='type'>
          Type: <span>{type}</span>
        </small>
      </div>
    </div>
  )
}
