import React, { Component } from 'react';
import './styles.css';

class Card extends Component {

    render() {
      return (
        <div className="movie-card">
            <div className="poster">
                <img src={this.props.poster} />
            </div>

            <div className="name">
                <h2>{this.props.name}</h2>
            </div>

            {/* <div className="name">
                Dirigida por: {this.props.name}
            </div> */}

            <div className="description">
                {this.props.description}
            </div>

        </div>
      );
    }
  }

  export default Card;