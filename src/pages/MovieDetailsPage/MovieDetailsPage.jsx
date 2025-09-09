import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div className={css.loading}>Loading...</div>;
  if (error) return <div className={css.error}>Error: {error}</div>;
  if (!movie) return null;

  const backLink = backLinkLocationRef.current || '/movies';

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.movieInfo}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={css.poster}
          />
        ) : (
          <div className={css.noPoster}>
            <span>No Image Available</span>
          </div>
        )}
        <div className={css.details}>
          <h1 className={css.title}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <p className={css.score}>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2 className={css.sectionTitle}>Overview</h2>
          <p className={css.overview}>{movie.overview}</p>
          <h2 className={css.sectionTitle}>Genres</h2>
          <p className={css.genres}>{movie.genres.map((genre) => genre.name).join(' ')}</p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3 className={css.additionalTitle}>Additional information</h3>
        <nav className={css.nav}>
          <NavLink to="cast" className={css.navLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={css.navLink}>
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
