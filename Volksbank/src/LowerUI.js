import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Easing, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from 'react-native-vector-icons/EvilIcons';
import MoreInfo from '../src/MoreInfo'


class LowerUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      rotation: '0deg',
      rotationAnim: new Animated.Value(0),
      fadeLoader: 1,
      fadeLoaderAnim: new Animated.Value(1),
      fadeButton: 0,
      fadeButtonAnim: new Animated.Value(0),
    };
    this.state.rotationAnim.addListener(({ value }) => {
      this.setState({ rotation: value.toString() + 'deg' });
    });
    this.state.fadeLoaderAnim.addListener(({ value }) => {
      this.setState({ fadeLoader: value });
    });
    this.state.fadeButtonAnim.addListener(({ value }) => {
      this.setState({ fadeButton: value });
    });
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.rotationAnim, {
        toValue: 1200,
        duration: 5000,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.fadeLoaderAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.fadeButtonAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      }),
    ]).start();
  }

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

        <TouchableOpacity onPress={() => func()}>
          <View style={{flexDirection: 'row', opacity: this.state.fadeButton, borderWidth: 1, width: 300, borderRadius: 100, borderColor: buttonColor, alignItems: 'center', justifyContent: 'center', }}>
            {/*<FontAwesome name={name} style={{ color: color, fontSize: 40, margin: 8 }} />*/}
            <Text style={{ color: color, fontSize: 35, alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif-thin' }}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }} flexDirection='column' alignItems='center' justifyContent='center' backgroundColor='#E6E9ED' width={Dimensions.get('window').width}>
        <Text style={{ marginBottom: 50, color: '#656D78', fontSize: 64, fontFamily: 'sans-serif-thin' }}>€7278.27</Text>
        <Loading name='spinner-3' style={{ opacity: this.state.fadeLoader, top: 170, position: 'absolute', color: '#009cde', fontSize: 100, margin: 8, transform: [{ rotate: this.state.rotation }] }} />
        {this.advice('close', 'Advise me', '#Da4453', () => { this.setState({ modalVisible: true }) })}
        {/*{this.advice('check', 'Steady', '#59CD90', () => {})}*/}
        <MoreInfo
          modalVisible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

const buttonColor = '#Da4453';//'#59CD90';//
let styles = StyleSheet.create({
  icon: {
    color: '#999',
    fontSize: 22,
    margin: 5
  }
});

export default LowerUI;