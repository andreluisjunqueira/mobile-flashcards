import React from 'react';
import { connect } from 'react-redux';

import { View, Text, FlatList,Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';

import { FormInput, Button, Card, Icon } from 'react-native-elements'
import  deckActions, { getDecks }  from '../redux/deckStore';
const deckImage = require('../imgs/deck.png');

const { width, height } = Dimensions.get('window');

class Home extends React.Component{

    static navigationOptions = ({navigation})=>({
        headerRight :(
            <TouchableOpacity 
                style={styles.addButton}
                onPress={()=>navigation.navigate('NewDeck')}>
                <Icon type='ionicons' name='add' color='#0099ff'/>
                <Text style={styles.addButtonText}>New deck</Text>
            </TouchableOpacity>
        )  
    })

    state = {
        title : '',
        question : '',
        answer : ''
    }

    onChangeText = (campo, text)=>{
        this.setState({[campo] : text});
    }

    onPressButtom = ()=>{
        const { title } = this.state;

        if(title)
            this.props.saveDeckTitle(title);
    }

    deleteDeck(title){
        Alert.alert('Caution', 'Are you sure to delete this deck',[
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => this.props.deleteDeck(title)},
        ])
    }

    onCardPress = (id)=>{
        this.props.navigation.navigate('SingleDeck',{id});
    }

    renderItem = ({item})=>{
        return(
            <TouchableOpacity 
                activeOpacity={.7}
                style={styles.deckContainer}
                onPress={()=>this.onCardPress(item.title)}
                onLongPress={()=>this.deleteDeck(item.title)}
                >
                <View style={styles.card}>
                    <View tyle={{backgroundColor : 'blue'}}>
                        <Image style={{width : 40, height:40}} source={deckImage}/>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.questions.length} cards</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        console.log(this.props.decks)
        return(
            <View style={styles.container}>
                <FlatList 
                    data = { this.props.decks }
                    horizontal={false}
                    numColumns={3}
                    renderItem = {this.renderItem}
                    keyExtractor= {(item,index)=>index} 
                />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveDeckTitle : (title)=>dispatch(deckActions.saveDeckTitle(title)),
        addCardToDeck : (title, card)=>dispatch(deckActions.addCardToDeck(title, card)),
        deleteDeck : (title)=>dispatch(deckActions.deleteDeck(title)),
    }
}

const mapStateToProps = (state)=>{
    return{
        decks : getDecks(state)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection : 'row',
      backgroundColor: '#e6f5ff',
      padding : 10,
      justifyContent : 'space-between'
    },
    deckContainer : {
        marginBottom : 5,
        marginRight : 2
    },
    card:{
        width : width * .30,
        height : height * .15,
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
        fontSize : 15,
        fontWeight : '500'
    },
    cardSubtitle:{
        color : '#8c8c8c',
        fontStyle : 'italic'
    },
    separator : {
        height : 1,
        backgroundColor : '#c9c9c9'
    },
    addButton : {
        flexDirection : 'row',
        marginRight : 10,
        alignItems : 'center',
        // borderWidth : 1,
        // borderColor : '#0099ff',
        padding : 3,

    },
    addButtonText : {
        color : '#0099ff',
        fontWeight : '600'
    }
  });