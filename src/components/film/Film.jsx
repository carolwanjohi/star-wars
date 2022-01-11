import * as React from 'react';
import { Subject, from} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import Grid from '@mui/material/Grid';
import Search from '../search/Search';
import CharactersTable from '../character/CharactersTable';
import OpeningCrawl from '../openingCrawl/OpeningCrawl';

const destroy$ = new Subject();
const baseUrl = 'https://swapi.dev/api/people';

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = { people: [], openingCrawl: '' };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.getPeople = this.getPeople.bind(this);
  }

  componentWillUnmount() {
    destroy$.next();
    destroy$.complete();
  }

  handleOnChange(selectedFilm) {
    if(selectedFilm) {
      const { peopleIds, openingCrawl } = selectedFilm;

      this.setState({
        openingCrawl
      });

      this.getPeople(peopleIds);
    }
  }

  getPeople(peopleIds) {
    const { people } = this.state;
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
        .subscribe((person) => {
          people.push(person);
          this.setState({
            people
          });
        });
  }

  render() {
    const { people, openingCrawl } = this.state;

    return (
      <Grid container>
      <Grid  item xs={12}>
        <Search onChange={this.handleOnChange} />
      </Grid>

      <Grid item xs={6}>
        <OpeningCrawl openingCrawl={openingCrawl}/>
      </Grid>

      <Grid item xs={6}>

        <CharactersTable people={people}/>
      </Grid>

    </Grid>
      );
  }
}

export default Film;
