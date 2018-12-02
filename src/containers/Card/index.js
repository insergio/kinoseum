import React, { Component } from 'react';
import './styles.css';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {
    componentDidMount(){
        console.log(this.props.movie)
    }

    /* directorNumber(){
        if(this.props.movie.directors.includes(", ")){
            return "Directors"
        }else{
            return "Director"
        }

    } */

    render() {
        var directorPlural=false;
        const directors=this.props.movie.directors
        if(directors){
            if(directors.includes(", ")){
                directorPlural=true;
            }
        }
        return (
            <div className="movie-card">
                <div className="poster">
                    <img src={"http://image.tmdb.org/t/p/w342/"+this.props.movie.poster_path} />
                </div>

                <div className="name">
                    <h2>{this.props.movie.original_title}</h2>
                    <h4>{this.props.movie.tagline}</h4>
                </div>

                {/* <div className="name">
                    Dirigida por: {this.props.movie.name}
                </div> */}

                <div className="description">
                    {this.props.movie.overview}
                </div>
                
                <div className="movie-info">
                    <div className="attribute">
                        <FontAwesomeIcon className="fa-icon" icon="clock" />
                        <p>Runtime: {this.props.movie.runtime}</p> 
                    </div>
                    <div className="attribute">
                        <FontAwesomeIcon className="fa-icon" icon="chair" />
                        <p>{directorPlural ? 'Directores' : 'Director'}: {this.props.movie.directors}</p> 
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { movie: state.movie };
};
export default connect(mapStateToProps)(Card);