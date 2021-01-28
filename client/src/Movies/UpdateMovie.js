import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import MovieCard from './MovieCard';


const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars:[],
}


const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const {push} = useHistory();
    const {id} = useParams();
    
    
    useEffect((props) => {
        const getMovies = () => {

            axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // console.log(res.data)
                setMovie(res.data)
            })

        }
        getMovies();
    }, [])
    
const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'metascore'){
        value = parseInt(value, 10)
    };
    setMovie({
        ...movie,
        [e.target.name]: value
    });
}

const handleSubmit = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res => {
        console.log(res.data)
        props.getMovieList()
        push(`/`)
    })
    .catch(err => {
        console.log(err)
    })
}




    return(
        <div className='update-movie-card'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
            <input 
            type='text'
            name='title'
            onChange={changeHandler}
            placeholder='Movie name...'
            value={movie.title}
            />
            <br/>
            <br/>
            <input
            type='text'
            name='director'
            onChange={changeHandler}
            placeholder='Director name...'
            value={movie.director}/>
            <br/>
            <br/>
            <input 
            type='number'
            name='metascore'
            onChange={changeHandler}
            placeholder='Metascore number...'
            value={movie.metascore}
            />
            <br/>
            <br/>
            {movie.stars.map(star => {
                return (<input key={star} name='stars' type='text' onChange={changeHandler} value={star} />)
            })}
            <button>Submit Updates</button>
            </form>
        </div>
    )

}

export default UpdateMovie;