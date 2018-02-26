import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { getDeck } from '../redux/deckStore';
import FlipCard from 'react-native-flip-card';

const okImage = require('../imgs/ok.png');
const errImage = require('../imgs/err.png');

const { width, height } = Dimensions.get('window');

class Quiz extends React.Component{

    // static navigationOptions = ({navigation})=>{
    //     const { state } = navigation;

    //     return {
    //         title : state.params.title
    //     } 
    // }

    state = {
        total : 0,
        done : 0, 
        currentCard : null,
        score : 0
    }

    setPercentage(){
        const { total, done } = this.state;
        const { navigation } = this.props;
        navigation.setParams({title : `${done} / ${total}`})
    }

    componentWillMount(){
        const { deck } = this.props;

        console.log('Showww',deck.questions[0])

        this.setState({
            total : deck.questions.length,
            currentCard : deck.questions[0]
        })
    }

    moveNextCard = (option)=>{
        const { deck } = this.props;
        const { total, done, score } = this.state;
        let _score = score;
        if(option == 'yes'){
            _score = score + 1;
            this.setState({score : _score});
        }

        if(done < total-1){
            const next = done + 1;
            this.setState((state)=>({
                done : next,
                currentCard : deck.questions[next]
            }));
        }else{
            let finalScore = (_score/total)*100;
            finalScore = finalScore.toFixed(2);
            const title = _score == total ? 'Congratulations !': _score == 0 ? 'You have to try more !' : 'Very good, you,re almost there !' 

            Alert.alert(title, `Your score is : ${finalScore}%`,[
                {text: 'OK', onPress: () =>this.props.navigation.goBack(null)},
            ]);
        }
    }

    render(){
        const { total, done, currentCard } = this.state;
        console.log('Opas', currentCard)
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.titlePercent}>{done+1} / {total}</Text>
                </View>
                <View style={styles.containerFlip}>
                    <FlipCard
                        style={styles.card}
                        flipHorizontal={true}
                        flipVertical={false}
                        useNativeDriver={true}
                        friction={8}
                        perspective={1000}
                    >
                        <View style={styles.face}>
                            <Text style={styles.title}>{ currentCard.question }</Text>
                        </View>

                        <View style={styles.back}>
                            <Text style={styles.title}>{ currentCard.answer }</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={()=>this.moveNextCard('yes')} style={styles.button}>
                                    <Image style={{width : 60, height : 60}} source={okImage}/>
                                    <Text>Correct</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>this.moveNextCard('no')} style={styles.button}>
                                    <Image style={{width : 50, height : 50}} source={errImage}/>
                                    <Text style={styles.textButton}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </FlipCard>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state,{navigation})=>{
    return{
        deck : getDeck(state, navigation.state.params.title)
    }
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container : {
        flex : 1,
             backgroundColor: '#e6f5ff',
    },
    containerFlip : {
        flex : 1,
        flexDirection : 'row'
    },
    card : {
        flex : 1, 
        borderColor : 'transparent',
        backgroundColor : '#fff',
    },
    face : {
        flex : 1,
        width,
        alignItems : 'center',
        paddingHorizontal : 20,
        paddingTop : 100,
        backgroundColor: '#e6f5ff',
    },
    back : {
        flex : 1,
        width,
        alignItems : 'center',
        paddingHorizontal : 20,
        paddingTop : 100,
        backgroundColor: '#e6f5ff',
    },
    title : {
        fontSize : 28,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    buttonContainer : {
        width,
        flexDirection : 'row',
        justifyContent : 'space-around',
        paddingTop : 30
    },
    button : {
        alignItems : 'center',
    },
    textButton : {
        paddingVertical : 8
    },
    titlePercent :{
        fontSize : 18
    }
}) 