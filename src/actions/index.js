import { ADD_ARTICLE } from "../constants/action-types";
import { UPDATE_MOVIE } from "../constants/action-types";
import { UPDATE_LANGUAGE } from "../constants/action-types";


export const addArticle = article => ({ 
    type: ADD_ARTICLE, 
    payload: article 
});

export const updateMovie = movie =>({
    type: UPDATE_MOVIE,
    payload: movie
})

export const updateLanguage = language =>({
    type: UPDATE_LANGUAGE,
    payload: language
})