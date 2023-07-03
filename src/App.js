import './App.css';
import { useEffect, useState } from "react";
import { getALLPokemon, getDetailPokemon } from './api/pokemon.js';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [nextPageURL, setNextPageURL] = useState('');
  const [prevPageURL, setPrevPageURL] = useState('');

  useEffect(() => {
    fetchPokemonList(initialURL);
  }, []);

  // メソッド
  // ポケモン取得(20件)
  const fetchPokemonList = async (initialURL) =>  {
    let res = await getALLPokemon(initialURL);
    loadPokemonDetail(res.results)
    setNextPageURL(res.next)
    setLoading(false);
  };
  // ポケモン詳細情報取得
  const loadPokemonDetail = async (data) => {
    let _pokemonDetails =  await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getDetailPokemon(pokemon.url);
        return pokemonRecord;
      })
      )
      setPokemonDetails(_pokemonDetails);
  };
  // 次へ、前へボタンのアクション
  const handleNextPage = async () => {
    // setLoading(true);
    let res = await getALLPokemon(nextPageURL);
    loadPokemonDetail(res.results)
    setNextPageURL(res.next)
    setPrevPageURL(res.previous)
    setLoading(false);
  };
  const handlePrevPage = async() => {
    // setLoading(true);
    let res = await getALLPokemon(prevPageURL);
    loadPokemonDetail(res.results)
    setNextPageURL(res.next)
    setPrevPageURL(res.previous)
    setLoading(false);
  };

  // 戻り値
  return (
    <div className="App">
      {loading ? (
         <h1>ロード中...</h1>  
      ) : (
        <>
          <Navbar />
          <div className="pokemon-card-container m-5">
            <div className="row">
              {pokemonDetails.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} /> ;
              })}
            </div>
            <div>
              <button className="btn m-2" onClick={handlePrevPage}>まえへ</button>
              <button className="btn m-2" onClick={handleNextPage}>つぎへ</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}



export default App;
