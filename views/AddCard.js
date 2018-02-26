import React from 'react';
import { connect } from 'react-redux';
import { View, Text,Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import  deckActions from '../redux/deckStore';

const addImage = require('../imgs/add.png');

const { width, height } = Dimensions.get('window');

class AddCard extends React.Component{

    static navigationOptions = ({navigation})=>({
        title : navigation.state.params.id
    });

    state = {
        question : '',
        answer : ''
    }

    
    onChangeText = (campo, text)=>{
        this.setState({[campo] : text});
    }

    onSaveCard = ()=>{
        const { question, answer } = this.state;
        const { title } = this.props.navigation.state.params;
        
        if(question && answer){
            this.props.addCardToDeck(title, {question, answer});
            this.setState({question:'',answer:''});
        }else{
            this.input1.shake();
            this.input2.shake();
        }
    }


    render(){
        const { deck } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <FormLabel>Front</FormLabel>
                    <FormInput 
                        ref={(i1)=>this.input1 = i1}
                        onChangeText={(text)=>this.onChangeText('question', text)} 
                        value={this.state.question}  
                        containerStyle={{borderBottomColor : 'blue'}}
                        numberOfLines={1}
                        placeholder = 'Type the front card text'/>
                    
                    <FormLabel>Back</FormLabel>
                    <FormInput 
                        ref={(i2)=>this.input2 = i2}
                        onChangeText={(text)=>this.onChangeText('answer', text)} 
                        value={this.state.answer} 
                        containerStyle={{borderBottomColor : 'blue'}}
                        placeholder = 'Type the back card text'/>
                </View>

                <TouchableOpacity 
                    activeOpacity={.7}
                    style={styles.addButton} 
                    onPress={this.onSaveCard}>
                    <Image source={addImage} style={{width : 80, height : 80}}/>
                    <Text style={styles.buttonTitle}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCardToDeck : (title, card)=>dispatch(deckActions.addCardToDeck(title, card))
    }
}


export default connect(null,mapDispatchToProps)(AddCard);


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
    addButton : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonTitle : {
        paddingTop : 8,
        fontWeight : 'bold'
    }
  });