import React from 'react';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import DropdownList from './DropdownList';
import Input from './Input';

const destroy$ = new Subject();
class SearchDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.searchForMovie = this.searchForMovie.bind(this);
  }

  componentWillUnmount() {
    destroy$.next();
    destroy$.complete();
  }

  handleChange(option) {
    const trimedOption = option.trim();
    if (trimedOption && trimedOption.length) {
      this.searchForMovie(trimedOption);
    } else {
      this.setState({ value: '' });
    }
  }

  searchForMovie(search) {
    const baseUrl = 'https://swapi.dev/api/films';
    ajax
      .get(`${baseUrl}/?search=${search}`)
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
        this.setState({ value: filmTitles });
      });
  }

  render() {
    const { value, setState } = this.state;
    return (
      <div>
        <Input onChange={this.handleChange} />
        <DropdownList value={value} setState={setState} />
      </div>
    );
  }
}

export default SearchDropdown;
