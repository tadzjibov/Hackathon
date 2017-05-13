import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Easing} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/EvilIcons';
import IconButton from '../src/IconButton'


class LowerUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'spinner-3',
      spinValue: ""
    };

// Second interpolate beginning and end values (in this case 0 and 1)
const spin = this.state.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
  }

componentDidMount() {
    this.play(0, 5000);
  }

   play(toValue, duration) {
  Animated.timing(
    this.state.spinValue,
  {
    toValue: 0,
    duration: 5000,
    easing: Easing.linear
  }
  ).start()
  }

advice(positive){
    if(positive){
        return(   
            <View>
        <View flexDirection='row' alignItems= 'center' justifyContent = 'center'>
            <IconButton
            onPress={() => this.minCircle()}
            name="check"
            fontSize = {70}
            alignItems = 'center'
            justifyContent = 'center'
            margin = {5}
            color = {'#59CD90'}
          />
        </View>
        <Text style = {{color: '#59CD90', fontSize: 16}}>You're fine bro. Go spend on chicks!</Text>
        </View>
        );
    }else{
        return (
        <View>
            <View flexDirection='row' alignItems= 'center' justifyContent = 'center'>
                <Animated.IconButton
                style={{transform: [{rotate: spin}] }}
                onPress={() => this.minCircle()}
                name = {this.state.icon}
                fontSize = {70}
                alignItems = 'center'
                justifyContent = 'center'
                margin = {5}
                color = {'#EE6352'}
                />
            </View>
          <Text style = {{color: '#EE6352', fontSize: 16}}>Get advice bro!</Text>
        </View>
        );
    }
}
  render() {
    return (
      <View flexDirection = 'row'>
           {this.advice(false)}
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