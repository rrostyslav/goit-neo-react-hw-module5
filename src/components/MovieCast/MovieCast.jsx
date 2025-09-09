import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        });
        setCast(response.data.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) return <div className={css.loading}>Loading cast...</div>;
  if (error) return <div className={css.error}>Error: {error}</div>;
  if (!cast || !cast.length)
    return <div className={css.noInfo}>We don't have any cast information for this movie.</div>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={actor.name}
            className={css.photo}
          />
          <p className={css.name}>{actor.name}</p>
          <p className={css.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
