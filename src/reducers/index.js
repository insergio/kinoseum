import { ADD_ARTICLE } from "../constants/action-types";
import { UPDATE_MOVIE } from "../constants/action-types";

const initialState = {
    articles: ["test"],
    movie: {},
    apiKey: '06e590e3160fe2ade8df4051574e71f2',
    language: "es-ES"
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ARTICLE:
        return { ...state, articles: [...state.articles, action.payload] };

      case UPDATE_MOVIE:
      console.log("entra2")
      console.log(action.payload)
        return { ...state, 
            movie:{
                ...action.payload 
            }
        }
      default:
        return state;
    }
  };

export default rootReducer;