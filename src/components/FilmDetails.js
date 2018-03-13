import React, { Component } from 'react';
import TMDB from '../TMDB';
import { detailsFetchData } from '../actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    film: state.current,
    isFetching: state.isFetching,
    hasErrored: state.hasErrored
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url) => dispatch(detailsFetchData(url))
  }
}

class ConnectedFilmDetails extends Component {
  componentDidMount(){
    if (Object.keys(this.props.film).length > 0) {
      console.log(this.props.film.id)
      const url = `https://api.themoviedb.org/3/movie/${this.props.film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`
      this.props.fetchData(url)
    }
  }

  componentDidUpdate(){
    if (Object.keys(this.props.film).length > 0) {
      console.log(this.props.film.id)
      const url = `https://api.themoviedb.org/3/movie/${this.props.film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`
      this.props.fetchData(url)
    }
  }

  render() {
    const backdropUrl = `https://image.tmdb.org/t/p/w1280/${this.props.film.backdrop_path}`
    const posterUrl = `https://image.tmdb.org/t/p/w780/${this.props.film.poster_path}`
    let details

    if (this.props.film.id) {
      // there is a film selected
      details = (
        <div className="film-detail is-hydrated">
          <figure className="film-backdrop">
            <img src={backdropUrl} alt="" />
            <h1 className="film-title">{this.props.film.title}</h1>
          </figure>

          <div className="film-meta">
            <h2 className="film-tagline">{this.props.film.tagline}</h2>
            <p className="film-detail-overview">
              <img src={posterUrl} className="film-detail-poster" alt={this.props.film.title} />
              {this.props.film.overview}
            </p>
          </div>
        </div>
      )
    } else {
      // there ain't no film selected
      details = (
        <div className="film-detail">
          <p>
            <i className="material-icons">subscriptions</i>
            <span>No film selected</span>
          </p>
        </div>
      )
    }
    return (
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {details}
      </div>
    )
  }
}

const FilmDetails = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilmDetails)

export default FilmDetails;
