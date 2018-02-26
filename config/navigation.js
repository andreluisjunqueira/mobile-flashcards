import { StackNavigator } from 'react-navigation';
import Home from '../views/Home';
import SingleDeck from '../views/SingleDeck';
import AddCard from '../views/AddCard';
import NewDeck from '../views/NewDeck';
import Quiz from '../views/Quiz';

const mainRoute = StackNavigator({
    Home : {
        screen : Home ,
        navigationOptions : {
            title : 'FlashCards',
            headerTintColor : 'blue',
            headerBackTitle : 'Home',
            headerStyle : {
                backgroundColor : '#e6f5ff'
            }
        }
    },
    SingleDeck : {
        screen : SingleDeck,
    },
    AddCard : {
        screen : AddCard,
        navigationOptions : {
            title : 'Add a card to deck', 
            headerTintColor : 'blue',
            headerStyle : {
                backgroundColor : '#e6f5ff'
            }
        }
    },
    NewDeck : {
        screen : NewDeck,
        navigationOptions : {
            title : 'Create new deck',
            headerTintColor : 'blue',
            headerStyle : {
                backgroundColor : '#e6f5ff'
            }
        }
    },
    Quiz : {
        screen : Quiz,
        navigationOptions : {
            title : 'Quiz',
            headerTintColor : 'blue',
            headerStyle : {
                backgroundColor : '#e6f5ff'
            }
        }
    }
},{
    navigationOptions : {
        gesturesEnabled : false
    }
})

export default mainRoute;