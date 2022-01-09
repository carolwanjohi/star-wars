import * as React from 'react';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function MovieSearch() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const destroy$ = new Subject();
  const baseUrl = 'https://swapi.dev/api/films';

  const searchMovie = (searchTerm) => {
    ajax
      .get(`${baseUrl}/?search=${searchTerm}`)
      .pipe(
        map((ajaxResponse) =>
          ajaxResponse.response.results.map((film) => ({
            episodeId: film.episode_id,
            title: film.title,
          })),
        ),
        takeUntil(destroy$),
      )
      .subscribe((filmTitles) => {
        setOptions(filmTitles);
      });
  };

  const handleOnChange = (event) => {
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
      onChange={(event) => handleOnChange(event)}
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

  const handleIsOptionEqualToValue = (option, value) => option?.title === value?.title || '';

  const handleGetOptionLable = (option) => option?.title || '';
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
      isOptionEqualToValue={(option, value) => handleIsOptionEqualToValue(option, value)}
      getOptionLabel={(option) => handleGetOptionLable(option)}
      options={options}
      loading={loading}
      renderInput={(params) => renderTextField(params)}
    />
  );
}

export default MovieSearch;
