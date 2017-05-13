import React from 'react';
import { 
  StyleSheet, 
  Animated, 
  Easing, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Button,
} from 'react-native';
import Svg, { 
  G, 
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const dashMax = 1000;
var x = 1;
export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    x = 1;
    this.state = {
      progress: new Animated.Value(dashMax),
      dash: dashMax,
    };
    this.state.progress.addListener(({value}) => {
      this.setState({dash: value});
      this.scrollView.scrollTo({x: x, y: 0, animated: true});
      x += 3;
    });
  }

  componentDidMount() {
    this.play(0, 5000);
  }

  play(toValue, duration){
    Animated.timing(this.state.progress, {
      toValue: toValue,
      duration: duration,
      easing: Easing.linear,
    }).start();
  }

 createD(points) {
    const steps = points.length-1;
    var rightX = points[0].x;
    var rightY = points[0].y;
    var path = "M " + points[0].x + ' ' + points[0].y
    const alpha = 0.4; //alpha <= 0.5
    for (var i = 1; i < steps; i++) {
      const dy = points[i + 1].y - points[i - 1].y;
      const dx = points[i + 1].x - points[i - 1].x;
      const a = dy / dx;
      const b = points[i].y - a * points[i].x;

      const leftX = points[i].x - alpha * (points[i].x - points[i - 1].x);
      const leftY = a * leftX + b;

      path += " C " + rightX + "," + rightY + " "
                                  + leftX + "," + leftY + " "
                    + points[i].x + "," + points[i].y;

      rightX = points[i].x + alpha * (points[i].x - points[i - 1].x);
      rightY = a * rightX + b;
    }
    path += " C " + rightX + "," + rightY + " "
            + points[steps].x + "," + points[steps].y + " "
            + points[steps].x + "," + points[steps].y;
    return  path;
 }

 createPath(points) {
   return (
    <Path d = {this.createD(points)} />
   );
 }

createArrow(positive){
  var style={}
  var color='#3ae3bc'
  if(!positive){
    style={transform: [{scaleY: -1}]};
    color='#f05e69' 
  }
  return (
    <Svg height={14} width={30} style = {style}>
          <G id='arrow'  fill={color}>
            <Path d="M 15,0 L 0,14 L 30,14 Z" />
          </G>
        </Svg>
  );
}

 render() {
    return (
      <ScrollView
        horizontal={true} 
        style={{flex: 1, margin: 10}}
        ref = {component => this.scrollView = component}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{flex:1}}>
          <Svg
              height={this.props.height}
              width={this.props.width}
            style={{
                // backgroundColor: this.props.backgroundColor,
            }}
          >
              <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <Stop offset="0%" stopColor={this.props.colorUp} stopOpacity="1" />
                      <Stop offset="100%" stopColor={this.props.colorDown} stopOpacity="1" />
                  </LinearGradient>
              </Defs>
              <G id="cartesian" >
                <G stroke="url(#grad)" strokeLinecap='round' strokeWidth="3" strokeDasharray={[dashMax, dashMax]} strokeDashoffset={this.state.dash} fill="none">
                    {this.createPath(this.props.points)}
                </G>
              </G>
              {/*{this.state.paths}*/}
          </Svg>
        </View>
          {this.createArrow(true) }
          {this.createArrow(false)}
      </ScrollView>
    );
  }
}

LineChart.defaultProps = {
    colorUp: '#066ad2',
    colorDown: '#ffffff',
    points: [{x:100, y:100},{x:160, y:119},{x:220, y:48},{x:280, y:112},{x:340, y:28},{x:400, y:119},{x:460, y:142},{x:520, y:22},{x:580, y:33},{x:640, y:61}],
}