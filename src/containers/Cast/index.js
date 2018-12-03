import React, { Component } from 'react';
import './styles.css';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import i18n from '../../i18n';
import { withNamespaces } from "react-i18next";

class Cast extends Component {

	/* imgStyle = {
		width: "100%",
		height: "400px",
		backgroundImage: "url("{actor.name}")" 
	}; */

	render() {
		var cast;
		if(this.props.movie.credits){
			cast=this.props.movie.credits.cast.slice(0,3);
		}else{
			cast=[]
		}
		return (
			<div className="cast">
				{cast.map(actor=>
					<div className="actor" key={actor.id}>
						<div className="picture" style={{	backgroundImage: "url(http://image.tmdb.org/t/p/w342"+actor.profile_path+")" }}></div>
						<div className="text">
							<h3 className="name">{actor.name}</h3>
							<p className="role">{i18n.t('Como')} {actor.character}</p>
						</div>	
					</div>
				)}
      {/* <button>{i18n.t('Ver mas')}</button>   */}   
			</div>

			)
	}
}

const mapStateToProps = state => {
	return { 
		movie: state.movie
	 };
	
};

export default connect(mapStateToProps)(withNamespaces('common')(Cast));