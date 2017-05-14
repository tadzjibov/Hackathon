import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Easing, Dimensions} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/EvilIcons';
import IconButton from '../src/IconButton'


class LowerUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'spinner-3',
      spinValue: ""
    };

// // Second interpolate beginning and end values (in this case 0 and 1)
// const spin = this.state.spinValue.interpolate({
//   inputRange: [0, 1],
//   outputRange: ['0deg', '360deg']
// })
  }

// componentDidMount() {
//     this.play(0, 5000);
//   }

//    play(toValue, duration) {
//   Animated.timing(
//     this.state.spinValue,
//   {
//     toValue: 0,
//     duration: 5000,
//     easing: Easing.linear
//   }
//   ).start()
//   }

advice(positive){
    if(positive){
        return(   
          <View flexDirection='column' alignItems= 'center' justifyContent = 'center'>
            <IconButton
            onPress={() => this.minCircle()}
            name="check"
            fontSize = {40}
            alignItems = 'center'
            justifyContent = 'center'
            margin = {8}
            color = {'#59CD90'}
          />
        <Text style = {{color: '#59CD90', fontSize: 35, alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif-thin'}}>Steady</Text>
        </View>
        );
    }else{
        return (
            <View flexDirection='column' alignItems= 'center' justifyContent = 'center'>
                <IconButton
                onPress={() => this.minCircle()}
                name = "close"
                fontSize = {40}
                alignItems = 'center'
                justifyContent = 'center'
                margin = {8}
                color = {'#Da4453'}
                />
          <Text style = {{color: '#Da4453', fontSize: 35, alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif-thin'}}>Advise me</Text>
        </View>
        );
    }
}
  render() {
    return (
      <View flexDirection = 'column' alignItems = 'center' justifyContent = 'center' backgroundColor = '#E6E9ED' width = {Dimensions.get('window').width}>
            <Text style = {{color: '#656D78', fontSize: 64, fontFamily: 'sans-serif-thin'}}>€5000</Text>
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