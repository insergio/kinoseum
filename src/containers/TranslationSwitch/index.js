import React, { Component } from 'react';
import './styles.css';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateLanguage } from "../../actions/index";
import i18n from '../../i18n';

class TranslationSwitch extends Component {

	selectLang(lang) {
		this.props.updateLanguage(lang)
		i18n.changeLanguage(lang.substring(0, 2));
	}

	render() {
		return (
			<div className="switch">
				<p><a className={this.props.language == "es-ES" ? "active" : ""} onClick={(lang) => this.selectLang('es-ES')}>Español</a> | <a className={this.props.language == "en-US" ? "active" : ""} onClick={(lang) => this.selectLang('en-US')} >English</a></p>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		language: state.language
	};

};

const mapDispatchToProps = dispatch => {
	return {
		updateLanguage: language => dispatch(updateLanguage(language))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationSwitch);