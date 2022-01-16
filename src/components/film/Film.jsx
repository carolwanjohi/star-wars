import * as React from 'react';
import { Subject, from} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import Grid from '@mui/material/Grid';
import Search from './search/Search';
import CharactersTable from './characters/CharactersTable';
import OpeningCrawl from './openingCrawl/OpeningCrawl';
import ErrorSnackbar from '../snackbar/ErrorSnackbar';

const destroy$ = new Subject();
const baseUrl = 'https://swapi.dev/api/people';

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      openingCrawl: '',
      allCharacters: [],
      isErrorOpen: false,
      error: { status: null }
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleErrorSnackbarClose = this.handleErrorSnackbarClose.bind(this);
  }

  componentWillUnmount() {
    destroy$.next();
    destroy$.complete();
  }

  handleSearchChange(selectedFilm) {
    if(selectedFilm) {
      const { peopleIds, filmOpeningCrawl } = selectedFilm;

      this.setState({
        openingCrawl: filmOpeningCrawl
      });

      this.getCharacters(peopleIds);
    } else {
      this.setState({ characters: [], openingCrawl: '', allCharacters: [] });
    }
  }

  handleGenderChange(selectedGender) {
    const {characters, allCharacters} = this.state;
    if (selectedGender.checked === false) {
      this.setState({characters: allCharacters});
    } else {
      const filteredCharacters = characters.filter(
        (character) => character.gender === selectedGender.genderOption
      );
     this.setState({characters: filteredCharacters});
    }
  }

  handleErrorSnackbarClose(){
    this.setState({
      isErrorOpen: false
    })
  };


  getCharacters(peopleIds) {
    const { characters, allCharacters } = this.state;
      from(peopleIds)
        .pipe(
          mergeMap((id) => ajax.get(`${baseUrl}/${id}`)),
          map((ajaxResponse) => {
            const person =  ajaxResponse.response;
            const personId = person.url.replace(/\D/g, "")
            return {
              name: person.name,
              gender: person.gender,
              height: person.height,
              personId
            }
          }
          ),
          takeUntil(destroy$),
        )
        .subscribe({
          next: (person) => {
            characters.push(person);
            allCharacters.push(person)
            this.setState({
              characters,
              allCharacters
            });
          },
          error: (ajaxErrorResponse) => {
            this.setState({
              characters: [],
              openingCrawl: '',
              allCharacters: [],
              isErrorOpen: true,
              error: ajaxErrorResponse
            });
          }
        });
  }

  render() {
    const { characters, openingCrawl, allCharacters,
      error, isErrorOpen
     } = this.state;

    return (
      <>
      <Grid container>
        <Grid item xs={4} />

        <Grid  item xs={4}>
        <Search item xs={4} onChange={this.handleSearchChange} />
      </Grid>

        <Grid item xs={4} />

        <Grid item xs={6}>
        <OpeningCrawl openingCrawl={openingCrawl}/>
      </Grid>

      <Grid item xs={6}>
        <CharactersTable characters={characters}
        allCharacters={allCharacters}
        onSelectGender={this.handleGenderChange}/>
      </Grid>

    </Grid>
    <ErrorSnackbar error={error}
    isErrorOpen={isErrorOpen}
    handleErrorSnackbarClose={this.handleErrorSnackbarClose}/>
    </>
      );
  }
}

export default Film;
