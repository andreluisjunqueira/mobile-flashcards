import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList,Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { getDeck } from '../redux/deckStore';
const deckImage = require('../imgs/deck.png');
const playImage = require('../imgs/play.png');
const addImage = require('../imgs/add.png');

const { width, height } = Dimensions.get('window');

class SingleDeck extends React.Component{

    static navigationOptions = ({navigation})=>({
        title : navigation.state.params.id,
        headerTintColor : 'blue',
        headerStyle : {
            backgroundColor : '#e6f5ff'
        }
    });

    onAddCard = (title)=>{
        this.props.navigation.navigate('AddCard',{title});
    }

    onQuizPressed = (title)=>{
        const { deck } = this.props;
        if(deck.questions.length < 1)
            return Alert.alert('Ops !','This deck does not have any card yet. Add some cards to continue.');

        this.props.navigation.navigate('Quiz',{title});
    }

    render(){
        console.log('O DECK', this.props.deck);
        const { deck } = this.props;
        const { length } = deck.questions;
        const cardsTitle = length > 1 || length == 0 ? 'cards':'card';
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <View tyle={{backgroundColor : 'blue'}}>
                        <Image style={{width : 100, height:100}} source={deckImage}/>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Text style={styles.cardTitle}>{deck.title}</Text>
                        <Text style={styles.cardSubtitle}>{length} {cardsTitle}</Text>
                    </View>
                </View>

                <View style={styles.containerButtons}>
                    <TouchableOpacity 
                        activeOpacity={.7}
                        style={styles.quizzButton} 
                        onPress={()=>this.onAddCard(deck.title)}>
                        <Image source={addImage} style={{width : 80, height : 80}}/>
                        <Text style={styles.buttonTitle}>Add Card</Text>
                    </TouchableOpacity>
                    <View style={{marginVertical : 25}}>
                        <TouchableOpacity
                            activeOpacity={.7} 
                            style={styles.quizzButton} 
                            onPress={()=>this.onQuizPressed(deck.title)}>
                            <Image source={playImage} style={{width : 80, height : 80}}/>
                            <Text style={styles.buttonTitle}>Start Quizz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state,{navigation})=>{
    return{
        deck : getDeck(state, navigation.state.params.id)
    }
}
export default connect(mapStateToProps)(SingleDeck);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6f5ff',
      alignItems: 'center',
      paddingTop : 80
    },
    containerButtons:{
        flex:1,
        paddingTop : 25,
        //justifyContent : 'space-around'
    },
    card:{
        width : width * .70,
        height : width * .70,
        alignItems : 'flex-start',
        backgroundColor :'#fff', 
        //justifyContent : 'flex-end',
        padding : 10,
        borderWidth : 1,
        borderColor : '#0099ff',
        borderRadius : 10,
        marginRight : 5

    },
    cardTitle : {
        fontSize : 23,
        fontWeight : '500'
    },
    cardSubtitle:{
        color : '#8c8c8c',
        fontStyle : 'italic',
        fontSize : 16,
    },
    quizzButton : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonTitle : {
        paddingTop : 8,
        fontWeight : 'bold'
    }
  });