import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Home.css';
import Card from '../Card';
import axios from 'axios'

import Autosuggest from 'react-autosuggest';
import { connect } from "react-redux";
import { addArticle } from "../../actions/index";
import { updateMovie } from "../../actions/index";
import startMovies from "../../constants/startMovies"

const getSuggestionValue = suggestion => suggestion.original_title;


const renderSuggestion = suggestion => (
  <div>
    {suggestion.original_title}
  </div>
);


class Home extends Component {

  state={
    value: "",
    description: "pending",
    poster: "http://placehold.it/185x277",
    name: "asdf",
    test: [],
    suggestions: [],
    isLoading: false
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    console.log(inputValue)
    var params={
      api_key: this.props.apiKey,
      language: this.props.language,
      query: inputValue,
      page: 1,
      include_adult: false
    }
    axios.get("https://api.themoviedb.org/3/search/movie?"+this.serialize(params))
    .then(res => {
      let result;
      res.data.results.length>5 ? result=res.data.results.slice(0,5) : result = res.data.results
      this.setState({
        suggestions: result,
        isLoading: false
      });
 
    })
  };

  onSuggestionsFetchRequested = ({ value }) => {

    this.setState({
      isLoading: true
    });

    this.getSuggestions(value)
    console.log(this.state.suggestions)
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  onSuggestionSelected = (event, {suggestion}) =>{
    console.log(suggestion)

    var params={
      api_key: this.props.apiKey,
      language: this.props.language,
      append_to_response: 'credits'

    }
    axios.get('https://api.themoviedb.org/3/movie/'+suggestion.id+'?'+this.serialize(params))
    .then(res => {
      console.log(res.data)
      this.setMovie(res.data)
    })
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };


  componentDidMount(){

    var startMovie = startMovies[Math.floor(Math.random()*startMovies.length)];

    console.log(startMovie)


    var params={
      api_key: this.props.apiKey,
      language: this.props.language,
      append_to_response: 'credits'
    }

    axios.get('https://api.themoviedb.org/3/movie/'+startMovie.id+'?'+this.serialize(params))
    .then(res => {
      console.log(res.data)
      this.setMovie(res.data)
    })

  }

  
  setMovie=(movie)=>{
    console.log(movie.original_title)
    var directors = [];
    movie.credits.crew.forEach(function(entry){
        if (entry.job === 'Director') {
            directors.push(entry.name);
        }
    })
    movie.directors=directors.join(", ")
    this.props.updateMovie(movie)
  }

  
  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  
  render() {

    const { value, suggestions } = this.state;


    const inputProps = {
      placeholder: 'E.j.: Apocalypse Now',
      value,
      onChange: this.onChange,
      onKeyUp: this.onKeyUp
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Kinoseum</h1>
          <h3>Ingresa una película para empezar</h3>
        </header>

        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />

        <Card 
          name={this.state.name}
          description={this.state.description}
          poster={this.state.poster} />
      </div>
    );
  }
}

  const mapStateToProps = state => {
    return { 
      articles: state.articles,
      movie: state.movie,
      apiKey: state.apiKey,
      language: state.language
     };
    
  };

  const mapDispatchToProps = dispatch => {
    return {
      addArticle: article => dispatch(addArticle(article)),
      updateMovie: movie => dispatch(updateMovie(movie))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Home);