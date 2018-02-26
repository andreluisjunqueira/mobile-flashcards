import React from 'react';
import { connect } from 'react-redux';
import { View, Text,Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import  deckActions from '../redux/deckStore';

const addImage = require('../imgs/add.png');

const { width, height } = Dimensions.get('window');

class NewDeck extends React.Component{

    state = {
        title : ''
    }

    onChangeText = (title)=>{
        this.setState({title});
    }

    onSaveDeck = ()=>{
        const { title } = this.state;
        
        if(title){
            this.props.saveDeckTitle(title);
            this.setState({title:''});
        }else{
            this.input.shake();
        }
    }


    render(){
        const { deck } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <FormLabel>Title</FormLabel>
                    <FormInput 
                        ref={(input)=>this.input = input}
                        onChangeText={this.onChangeText} 
                        value={this.state.title}  
                        containerStyle={{borderBottomColor : 'blue'}}
                        placeholder = 'Type the deck title...'/>
                </View>

                <TouchableOpacity 
                    activeOpacity={.7}
                    style={styles.quizzButton} 
                    onPress={this.onSaveDeck}>
                    <Image source={addImage} style={{width : 80, height : 80}}/>
                    <Text style={styles.buttonTitle}>Add Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveDeckTitle : (title)=>dispatch(deckActions.saveDeckTitle(title)),
    }
}


export default connect(null,mapDispatchToProps)(NewDeck);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6f5ff',
      alignItems: 'center',
      paddingTop : 65,
    },
    inputContainer : {
        width : width * 0.8,
        marginBottom : 30
    },
    buttonTitle : {
        paddingTop : 8,
        fontWeight : 'bold'
    }
    
  });