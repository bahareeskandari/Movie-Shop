import React, {useContext, useState} from 'react'
import {StateHolder} from './StateHolder'
import ModalsComp from './ModalsComp'

const Home = () => {
  const {
    movies,
    imageFirstPart,
    addToCart,
    reduceFromCart,
    toggleLike,
    modalIsOpen,
    setModalIsOpen,
    cartArray
  } = useContext(StateHolder) // sharing these functions,variables and states with this component.

  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchFunction = event => {
    setSearchTerm(event.target.value)
  }
  const results = !searchTerm
    ? movies.map(movie => movie) // display my movie array
    : movies
        .map(movie => movie)
        .filter(movie =>
          movie.movieObject.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )

  return (
    <div className="container">
      <ModalsComp />
      <div className="row">
        <div className="col ">
          <div className="input-div">
            <input
              type="text"
              value={searchTerm}
              className="form"
              placeholder="Search for movie"
              onChange={handleSearchFunction}
            />
            <button className="input-button btn btn-sm">Search</button>
          </div>
        </div>
      </div>
      <div className="row">
        {results.map((movie, idx) => {
          return (
            <div key={idx} className="card">
              <img
                onClick={() => setModalIsOpen(movie)} // pass in the movie object which will be a truthy value and that way the modal opens
                src={imageFirstPart + movie.movieObject.poster_path}
                alt="bla"
                className="card-img-top "
              />
              <div
                type="button"
                className="img-btn card-body"
                onClick={() => setModalIsOpen(movie)}
              >
                <h6 className="card-title">{movie.movieObject.title}</h6>

                <p className="card-text">
                  {movie.count}
                  <i className="fas fa-cart-arrow-down"></i>
                </p>

                <p className="card-text">$ {movie.movieObject.vote_average}</p>
              </div>
              <p className="card-text font-p">
                {' '}
                <i
                  onClick={() => toggleLike(movie)}
                  className={movie.like ? 'fas fa-heart' : 'far fa-heart'}
                ></i>
              </p>
              <button className=" btn btn-primary" onClick={() => setModalIsOpen(movie)}>
                Add
              </button>
              <button
                className=" btn btn-secondary"
                onClick={() => {
                  reduceFromCart(movie)
                }}
              >
                -
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Home
