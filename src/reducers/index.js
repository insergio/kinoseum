import { UPDATE_MOVIE } from "../constants/action-types";
import { UPDATE_LANGUAGE } from "../constants/action-types";


const initialState = {
    articles: ["test"],
    movie: {},
    apiKey: '06e590e3160fe2ade8df4051574e71f2',
    language: "en-US"
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

      case UPDATE_MOVIE:
        return { ...state, 
            movie:{
                ...action.payload 
            }
        }

      case UPDATE_LANGUAGE:
        console.log(action.payload)
        return{
            ...state, ...{language: action.payload }
        }
      default:
        return state;
    }
  };

export default rootReducer;