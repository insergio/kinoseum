import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Home.css';
import '../../components/SearchInput';
import SearchInput from '../../components/SearchInput';
import Card from '../Card';
import axios from 'axios'

import Autosuggest from 'react-autosuggest';

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
      query: inputValue
    }
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=06e590e3160fe2ade8df4051574e71f2&language=es-ES&"+this.serialize(params)+"&page=1&include_adult=false")
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
    console.log("asdf");
    console.log(suggestion)
    this.setState({
      name: suggestion.original_title,
      description: suggestion.overview,
      poster: "http://image.tmdb.org/t/p/w342/"+suggestion.poster_path
    })
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onKeyUp = (event) => {
    if (event.key === 'Enter') {
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
  };






  componentDidMount(){

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=06e590e3160fe2ade8df4051574e71f2&language=es-ES&query=apocalypse%20now&page=1&include_adult=true`)
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

  export default Home;