import React, { Component } from 'react';
import FilmRow from './FilmRow';
import { connect } from 'react-redux';
import { toggleFave, clickDetails } from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    toggleFave: film => dispatch(toggleFave(film)),
    clickDetails: film => dispatch(clickDetails(film))
  }
}
const mapStateToProps = state => {
  return {
    films: state.films,
    faves: state.faves
  }
}

class ConnectedFilmListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: "all",
    }
  }

  handleFilterClick = (filter) => {
    this.setState({
      filter: filter
    })
    console.log("setting filter to: " + filter);
  }

  render() {
    // this will still work because of mapping to props
    const { faves, films } = this.props

    var allFilter = (this.state.filter === 'all' ? 'is-active' : '')
    var favesFilter = (this.state.filter === 'faves' ? 'is-active' : '')

    if (this.state.filter === 'all') {
      var filmsToShow = films
    } else {
      var filmsToShow = faves
    }

    let allFilms = filmsToShow.map( (film,index) => {
      return(
        <FilmRow onFaveToggle={() => this.props.toggleFave(film)}
          onDetailsClick={() => this.props.clickDetails(film)}
          title={film.title}
          date={film.release_date}
          key={film.id}
          url={film.poster_path}
          isFave={ faves.includes(film) } />
      )
    })

    return (
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">

          <div className={'film-list-filter ' + allFilter}  onClick={() => this.handleFilterClick('all')}>
            <span>ALL</span>
            <span className="section-count">{films.length}</span>
          </div>

          <div className={'film-list-filter ' + favesFilter} onClick={() => this.handleFilterClick('faves')}>
            <span>FAVES</span>
            <span className="section-count">{faves.length}</span>
          </div>

        </div>
        {allFilms}
      </div>
    );
  }
}

const FilmListing = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilmListing)

export default FilmListing;
