import * as React from 'react';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function Search({ onChange }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const destroy$ = new Subject();
  const baseUrl = 'https://swapi.dev/api/films';

  const handleAutocompleteOnChange = (selectedFilm) => {
    onChange(selectedFilm);
  };

  const handleIsOptionEqualToValue = (option, value) => option?.title === value?.title || '';

  const handleGetOptionLable = (option) => option?.title || '';

  const searchMovie = (searchTerm) => {
    ajax
      .get(`${baseUrl}/?search=${searchTerm}`)
      .pipe(
        map((ajaxResponse) =>
          ajaxResponse.response.results.map((film) => {
            const { characters, title } = film;
            /*
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/
            Reference/Global_Objects/String/replace
            */
            const peopleIds = characters.map(
              (character) => character.replace(/\D/g, "")
            );
            return {
            title,
            peopleIds,
            openingCrawl: film.opening_crawl,
            }
        }),
        ),
        takeUntil(destroy$),
      )
      .subscribe((filmTitles) => {
        setOptions(filmTitles);
      });
  };

  const handleTextFieldOnChange = (event) => {
    const { value } = event.target;
    const trimedValue = value ? value.trim() : null;

    if (trimedValue && trimedValue.length) {
      searchMovie(trimedValue);
    } else {
      setOpen(false);
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

  return (
    <Autocomplete
      id="movie-search"
      freeSolo
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => handleAutocompleteOnChange(value)}
      isOptionEqualToValue={(option, value) => handleIsOptionEqualToValue(option, value)}
      getOptionLabel={(option) => handleGetOptionLable(option)}
      options={options}
      loading={loading}
      renderInput={(params) => renderTextField(params)}
    />
  );
}

export default Search;
