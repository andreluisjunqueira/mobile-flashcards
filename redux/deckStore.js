import { createActions, createTypes, createReducer } from 'reduxsauce';

import _ from 'lodash';

const Types = createTypes(`
    ADD_CARD_TO_DECK
    SAVE_DECK_TITLE
    DELETE_DECK
`)


/** Actions */
const addCardToDeckAction = (title, card)=>(dispatch)=>{
    dispatch({
        type : Types.ADD_CARD_TO_DECK,
        title,
        card
    })
}

const saveDeckTitleAction = (title)=>(dispatch)=>{
    dispatch({
        type : Types.SAVE_DECK_TITLE,
        title 
    })
}
const deleteDeckAction = (title)=>(dispatch)=>{
    dispatch({
        type : Types.DELETE_DECK,
        title 
    })
}

const { Creators } = createActions({
    addCardToDeck : addCardToDeckAction,
    saveDeckTitle : saveDeckTitleAction,
    deleteDeck : deleteDeckAction,
})

export default Creators;
export const deckTypes = Types;

/** Selectors */
export const getDecks = (state)=>{
    return Object.values(state.decks);
}
export const getDeck = (state, id)=>{
    return state.decks[id];
}

const INITIAL_STATE = {}

/** Reducers */
const addCardToDeck = (state, action)=>{
    const { title, card } = action;
    return {
        ...state,
        [title]:{
            title,
            'questions' : [...state[title]['questions'], card]
        } 
    }
}

const saveDeckTitle = (state, action)=>{
    const { title } = action;
    return {
        ...state,
        [title] : { 
            title,
            'questions' : []
         }
    }
}

const deleteDeck = (state, action)=>{
    const { title } = action;
    console.log('Opaa',_.omit(state, title))
    return {
        ..._.omit(state, title)
    }
}


export const reducer = createReducer(INITIAL_STATE,{
    [Types.ADD_CARD_TO_DECK] : addCardToDeck,
    [Types.SAVE_DECK_TITLE] : saveDeckTitle,
    [Types.DELETE_DECK] : deleteDeck,

})


    // const _card = {
    //     React: {
    //         title: 'React',
    //         questions: [
    //           {
    //             question: 'What is React?',
    //             answer: 'A library for managing user interfaces'
    //           },
    //           {
    //             question: 'Where do you make Ajax requests in React?',
    //             answer: 'The componentDidMount lifecycle event'
    //           }
    //         ]
    //       }
    // }