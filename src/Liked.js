import React, {useContext} from 'react'
import {StateHolder} from './StateHolder'
import './App.css'

const Liked = () => {
  const {
    movies,
    imageFirstPart,
    addToCart,
    reduceFromCart,
    toggleLike,
    modalIsOpen,
    setModalIsOpen,
    cartArray,
    likesArray
  } = useContext(StateHolder) // sharing these functions,variables and states with this component.

  return (
    <div className="container">
      <h5>Items you've liked</h5>
      {likesArray.map((movie, index) => (
        <div key={index} className="card ">
          <img
            src={imageFirstPart + movie.movieObject.poster_path}
            alt="bla"
            className="card-img-top"
          />
          <div className="card-body">
            <h6 className="card-title">{movie.movieObject.title}</h6>
            <p>
              <i
                onClick={() => toggleLike(movie)}
                className={movie.like ? 'fas fa-heart' : 'far fa-heart'}
              ></i>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Liked
