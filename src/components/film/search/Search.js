import * as React from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorSnackbar from '../../snackbar/ErrorSnackbar';
import styles from './Search.module.css';

function Search({ onChange }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [error, setError] = React.useState({ status: null});
  const [isErrorOpen, setIsErrorOpen] =  React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const destroy$ = new Subject();
  const baseUrl = 'https://swapi.dev/api/films';

  const handleAutocompleteOnChange = (selectedFilm) => {
    onChange(selectedFilm);
  };

  const handleIsOptionEqualToValue = (option, value) => option?.title === value?.title || '';

  const handleGetOptionLabel = (option) => option?.title || '';

  const sortByReleaseDate = (films) => (
    films.sort((filmA, filmB) => new Date(filmA.releaseDate) - new Date(filmB.releaseDate))
  );

  const searchMovie = (searchTerm) => {
    ajax
      .get(`${baseUrl}/?search=${searchTerm}`)
      .pipe(
        map((ajaxResponse) =>
          ajaxResponse.response.results.map((film) => {
            const { characters, title } = film;
            const peopleIds = characters.map(
              (character) => character.replace(/\D/g, "")
            );
            return {
            title,
            peopleIds,
            filmOpeningCrawl: film.opening_crawl,
            releaseDate: film.release_date
            }
        }),
        ),
        takeUntil(destroy$),
      )
      .subscribe({
        next: (films) => {
          setLoading(false);
          const sortedFilms = sortByReleaseDate(films);
          setOptions(sortedFilms);
        },
        error: (ajaxErrorResponse) => {
          setLoading(false);
          setIsErrorOpen(true);
          setError(ajaxErrorResponse);
          setOptions([]);
        }
      });
  };

  const handleTextFieldOnChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value ? value.trim() : null;

    if (trimmedValue && trimmedValue.length) {
      setLoading(true);
      searchMovie(trimmedValue);
    } else {
      setOpen(false);
      setOptions([]);
    }
  };

  /* eslint-disable react/jsx-props-no-spreading */
  const renderTextField = (params) => (
    <TextField
      {...params}
      label="Search for movie"
      onChange={(event) => handleTextFieldOnChange(event)}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );

  const handleErrorSnackbarClose = () => setIsErrorOpen(false);

  const renderErrorMessage = () => (
    <ErrorSnackbar error={error}
    isErrorOpen={isErrorOpen}
    handleErrorSnackbarClose={handleErrorSnackbarClose}/>
  );

  return (
    <>
    <Autocomplete
      id="movie-search"
      freeSolo
      className={styles.search}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => handleAutocompleteOnChange(value)}
      isOptionEqualToValue={(option, value) => handleIsOptionEqualToValue(option, value)}
      getOptionLabel={(option) => handleGetOptionLabel(option)}
      options={options}
      loading={loading}
      renderInput={(params) => renderTextField(params)}
    />
    {renderErrorMessage()}
    </>
  );
}


Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
