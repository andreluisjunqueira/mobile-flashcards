import { combineReducers } from 'redux'

import deckActions, { reducer as deckReducer } from './deckStore';

export default combineReducers({
    decks : deckReducer
})

export {
    deckActions
}