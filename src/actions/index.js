import { UPDATE_MOVIE } from "../constants/action-types";
import { UPDATE_LANGUAGE } from "../constants/action-types";


export const updateMovie = movie =>({
    type: UPDATE_MOVIE,
    payload: movie
})

export const updateLanguage = language =>({
    type: UPDATE_LANGUAGE,
    payload: language
})