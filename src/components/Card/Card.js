import React from 'react'
import './Card.css'

const Card = ({ pokemon }) => {
  return (
    <div className="card-outline p-0 col-lg-3 col-md-4 col-sm-6 col-xs-6">
      <div className="card-inner m-3 py-3 px-2">
        <div className="card-top">
            <div>
              <img src={pokemon.sprites.front_default} alt="" />
              <img src={pokemon.sprites.back_default} alt="" />
            </div>
          </div>
        <div className="card-bottom mx-3">
          <div className="font-itim text-start">No.{pokemon.id}</div>
            <table className="table">
              <tr>
                <td className="text-start">なまえ</td>
                <td className="font-itim text-end">{pokemon.name}</td>
              </tr>
              <tr>
                <td className="text-start">たかさ</td>
                <td className="font-itim text-end">{pokemon.height}m</td>
              </tr>
              <tr>
                <td className="text-start">おもさ</td>
                <td className="font-itim text-end align-top">{pokemon.weight / 10}kg</td>
              </tr>
              <tr>
                <td className="text-start d-flex align-items-top">タイプ</td>
                <td className="font-itim text-end">
                  {pokemon.types.map((type, i) => {
                    return (
                      <div key={i} className="p-0">{type.type.name}</div>
                    );
                  })}
                </td>
              </tr>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Card