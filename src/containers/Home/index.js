import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Home.css';
import '../../components/SearchInput';
import SearchInput from '../../components/SearchInput';
import Card from '../Card';
import axios from 'axios'

import Autosuggest from 'react-autosuggest';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  
];




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
    value: "",
    suggestions: []
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.test.filter(movie =>
      movie.original_title.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };




  componentDidMount(){

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=06e590e3160fe2ade8df4051574e71f2&language=es-ES&query=fight%20club&page=1&include_adult=true`)
    .then(res => {
      console.log(res.data.results[0])
      console.log(res.data.results)
      
      this.setMovie(res.data.results[0])
      
      this.setState({
        test: res.data.results
      })
   
    })

  }

  
  setMovie=(movie)=>{
    console.log(movie.original_title)
    this.setState({
      name: movie.original_title,
      description: movie.overview,
      poster: "http://image.tmdb.org/t/p/w342/"+movie.poster_path
    })
    
  }
  
  
  handleWrite=(e)=>{
    this.setState({
      value: e.target.value
    })
  }
  
  handleSubmit=(e)=>{
    console.log(this.state.value)
    e.preventDefault();
    var params={
      query: this.state.value
    }
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=06e590e3160fe2ade8df4051574e71f2&language=es-ES&"+this.serialize(params)+"&page=1&include_adult=false")
    .then(res => {
      console.log(res.data.results[0])
      console.log(res.data.results)
      if(res.data.results.length>0){
        this.setMovie(res.data.results[0])

      }
  
    })
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
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Buscador</h1>
          <h3>Ingresa una película para empezar</h3>
        </header>
        <SearchInput onWrite={this.handleWrite} onSubmit={this.handleSubmit}/>

        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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

  export default Home;