import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Easing, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/EvilIcons';
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

  // 1

  // Vraag de bank een seintje te geven als je rood staat, zuiver aan met spaargeld

  // 2

  // Laat de bank je tekort automatisch aanvullen uit je spaarrekening

  // 3

  // Leg een buffer aan voor onverwachte grote uitgaven

  // 4

  // Pas je uitgaven en/of inkomsten aan

  // 5

  // Zet je kredietlimiet op nul

  // 6

  // Ga een persoonlijke lening aan

  // 7

  advice(name, text, color, func) {
    // if(positive){
    return ( //Steady   // Advise me
      <View >
        {/*<IconButton
            onPress={() => func()}//this.minCircle()}
            name={name} //"check" //"close"
            fontSize = {40}
            alignItems = 'center'
            justifyContent = 'center'
            margin = {8}
            color = {color}//{'#59CD90'} //'#Da4453'
          />*/}

        <TouchableOpacity style={styles.iconButton} onPress={() => func()}>
          <View flexDirection='row' alignItems='center' justifyContent='center'>
            <FontAwesome name={name} style={{ color: color, fontSize: 40, margin: 8 }} />
            <Text style={{ color: color, fontSize: 35, alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif-thin' }}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={{  flex: 1 }} flexDirection='column' alignItems='center' justifyContent='center' backgroundColor='#E6E9ED' width={Dimensions.get('window').width}>
        <Text style={{marginBottom:50, color: '#656D78', fontSize: 64, fontFamily: 'sans-serif-thin' }}>€5000</Text>
        {this.advice('close', 'Advise me', '#Da4453', () => { })}
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