import React, { useState, useEffect, useContext } from "react";
import { StateHolder } from "./StateHolder";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    movies,
    setMovies,
    imageFirstPart,
    addToCart,
    reduceFromCart,
    toggleLike,
    cartArray
  } = useContext(StateHolder); // sharing these functions,variables and states with this component.

  useEffect(() => {
    setTotalPrice(
      movies
        .map(movie => movie.movieObject.vote_average * movie.count)
        .reduce((a, c) => a + c, 0)
        .toFixed(2) // only two decimals
    );
  }, [movies]); // everytime the movies renders, this function calculates the total price of movies in bag

  const removeFromBag = movie => {
    movie.count = 0;
    setMovies([...movies]);
  };
  return (
    <div className="container">
      <h5>Shopping bag</h5>
      <div className="row">
        {cartArray.map((movie, idx) => (
          <div key={idx} className="card ">
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
                  className={movie.like ? "fas fa-heart" : "far fa-heart"}
                ></i>
              </p>
              <p>
                {movie.count}
                <i className="fas fa-cart-arrow-down"></i>
              </p>

              <p className="card-text">$ {movie.movieObject.vote_average}</p>
              <button
                className=" btn btn-primary"
                onClick={() => addToCart(movie)}
              >
                Add
              </button>
              <button
                className=" btn btn-secondary"
                onClick={() => {
                  reduceFromCart(movie);
                }}
              >
                -
              </button>
              <button
                className=" btn btn-danger"
                onClick={() => {
                  removeFromBag(movie);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <h5 className="p-price">Total price: ${totalPrice}</h5>
    </div>
  );
};
export default Cart;
