import React, {createContext, useState, useEffect} from 'react'

import {MovieComplete} from './MovieClass'

export const StateHolder = createContext()

export const StateProvider = props => {
  const [movies, setMovies] = useState([])
  const [cartArray, setCartArray] = useState([])
  const [likesArray, setLikesArray] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(null)

  const imageFirstPart = 'https://image.tmdb.org/t/p/w200/'

  const addToCart = movie => {
    movie.count++
    setMovies([...movies])
  }

  const reduceFromCart = movie => {
    if (movie.count > 0) {
      movie.count--
      setMovies([...movies])
    }
  }

  const toggleLike = movie => {
    movie.like = !movie.like
    setMovies([...movies])
  }

  useEffect(() => {
    setCartArray(movies.filter(movie => movie.count > 0))
    setLikesArray(movies.filter(movie => movie.like === true))
  }, [movies])

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=45c558de41ced2373b930108825d0ef8&language=en-US&page=1'
      )
      const topRatedMovies = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=45c558de41ced2373b930108825d0ef8&language=en-US&page=1'
      )
      const popularMoviesData = await popularMovies.json()
      const topRatedMoviesData = await topRatedMovies.json()

      const popular = popularMoviesData.results.map(movie => {
        return new MovieComplete(0, false, movie)
      })

      const topRated = topRatedMoviesData.results.map(movie => {
        return new MovieComplete(0, false, movie)
      })

      setMovies(topRated.concat(popular))
    }

    fetchMovies()
  }, [])

  return (
    <StateHolder.Provider
      value={{
        movies,
        imageFirstPart,
        cartArray,
        likesArray,
        modalIsOpen,
        addToCart,
        reduceFromCart,
        toggleLike,
        setMovies,
        setCartArray,
        setModalIsOpen
      }}
    >
      {props.children}
    </StateHolder.Provider>
  )
}
