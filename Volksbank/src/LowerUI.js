import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import IconButton from '../src/IconButton'


class LowerUI extends React.Component {

advice(positive){
    if(positive){
        return(   
            <View>
        <View flexDirection='row' alignItems= 'center' justifyContent = 'center'>
            <IconButton
            onPress={() => this.minCircle()}
            name="check"
            fontSize = {50}
            alignItems = 'center'
            justifyContent = 'center'
            margin = {5}
            color = {'#3ae3bc'}
          />
        </View>
        <Text style = {{color: '#3ae3bc', fontSize: 16}}>You're fine bro. Go spend on chicks!</Text>
        </View>
        );
    }else{
        return (
        <View>
            <View flexDirection='row' alignItems= 'center' justifyContent = 'center'>
                <IconButton
                onPress={() => this.minCircle()}
                name="times"
                fontSize = {50}
                alignItems = 'center'
                justifyContent = 'center'
                margin = {5}
                color = {'#f05e69'}
                />
            </View>
          <Text style = {{color: '#f05e69', fontSize: 16}}>Get advice bro!</Text>
        </View>
        );
    }
}
  render() {
    return (
      <View flexDirection = 'row'>
           {this.advice(true)}
          </View>
    );
  }
}

let styles = StyleSheet.create({
  icon: {
    color: '#999',
    fontSize: 22,
    margin: 5
  }
});

export default LowerUI;