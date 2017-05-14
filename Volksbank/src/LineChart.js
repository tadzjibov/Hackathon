import React from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  Text,
} from 'react-native';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  TextPath,

} from 'react-native-svg';

const dashMax = 1000;
var x = 1;
const xStep = 3;
export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    x = 1;
    this.state = {
      progress: new Animated.Value(dashMax),
      progressPred: new Animated.Value(dashMax),
      dash: dashMax,
      dashPred: dashMax,
      currentPointSizeAnim: new Animated.Value(0),
      currentPointSize: 0,
      offset: 0,
    };
    this.state.progress.addListener(({ value }) => {
      this.setState({ dash: value, offset: this.state.offset + 0.7 });
      this.scrollView.scrollTo({ x: x, y: 0, animated: true });
      x += xStep
    });
    this.state.progressPred.addListener(({ value }) => {
      this.setState({ dashPred: value });
      this.scrollView.scrollTo({ x: x, y: 0, animated: true });
      x += xStep;
    });
    this.state.currentPointSizeAnim.addListener(({ value }) => {
      this.setState({ currentPointSize: value });
    });
  }

  componentDidMount() {
    this.play(0, 5000);
  }

  play(toValue, duration) {
    Animated.sequence([
      Animated.timing(this.state.progress, {
        toValue: toValue,
        duration: duration,
        easing: Easing.linear,
      }),
      Animated.spring(this.state.currentPointSizeAnim, {
        toValue: 5,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.progressPred, {
        toValue: 5,
        duration: duration,
        easing: Easing.linear,
      }),
    ]).start();
  }

  createD(points) {
    const steps = points.length - 1;
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
    return path;
  }

  createPath(points) {
    return (
      <Path d={this.createD(points)} />
    );
  }

  /*createCircles() {
    var circles = this.props.realPoints.map(p => {
      (
        <Circle
          id={p.x+'_'+p.y}
          cx={p.x}
          cy={p.y}
          r={5}//{this.state.currentPointSize}
          stroke="none"
          fill={this.props.colorDown}
        />
      );
    });
    return circles;
  }*/

  render() {
    const lastPoint = this.props.realPoints[this.props.realPoints.length - 1];
    return (
      <View style={{flexDirection:'row', marginTop: 20, marginBottom: 10}}>
        <ScrollView
          horizontal={true}
          style={{ flex: 1 }}
          ref={component => this.scrollView = component}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
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
                <Path
                  id="path"
                  d={this.createD(this.props.realPoints)}
                />
              </Defs>
              <G id="cartesian" >
                <G id='realPath' stroke="url(#grad)" strokeLinecap='round' strokeWidth="1.5" strokeDasharray={[dashMax, dashMax]} strokeDashoffset={this.state.dash} fill="none">
                  {this.createPath(this.props.realPoints)}

                </G>
                <G id='predictedPath' stroke='#FE6847' strokeLinecap='round' strokeWidth="2" strokeDasharray={[dashMax, dashMax]} strokeDashoffset={this.state.dashPred} fill="none">
                  {this.createPath(this.props.predictedPoints)}
                </G>
                {/*{this.createCircles()}*/}
                <Circle
                  cx={lastPoint.x}
                  cy={lastPoint.y}
                  r={this.state.currentPointSize}
                  stroke="none"
                  fill={this.props.colorDown}
                />
              </G>
            </Svg>
          </View>
        </ScrollView>
        <View style={{position:'absolute', right:0, height:400,width: 60}}>
          <Text style={{fontFamily: 'sans-serif-thin', color: '#e5eef9', position:'absolute', top:0}}>€7707.40</Text>
          <Text style={{fontFamily: 'sans-serif-thin', color: '#e5eef9', position:'absolute', top:220}}>€5057.45</Text>
        </View>
      </View>
    );
  }
}

LineChart.defaultProps = {
  colorUp: '#ffffff',//'#066ad2',
  colorDown: '#ffffff',
  realPoints: [{x: 20, y: 400.0}, {x: 50, y: 40.0}, {x: 80, y:40.0}, {x: 110, y:40.2649106586916332}, {x: 140, y: 40.2649106586916332}, {x:170, y: 40.2649106586916332}, {x: 200, y: 40.2649106586916332}, {x: 230, y: 43.234627068435202}, {x:260, y:43.234627068435202}, {x: 290, y: 94.22924960848309}, {x: 320, y: 94.22924960848309}, {x: 350, y: 94.22924960848309}, {x:380, y: 94.22924960848309}, {x: 410, y: 94.22924960848309}, {x:440, y: 98.298005622747496}],
  // [{ x: 100, y: 100 }, { x: 160, y: 119 }, { x: 220, y: 48 }, { x: 280, y: 112 }, { x: 340, y: 28 }, { x: 400, y: 119 }, { x: 460, y: 142 }, { x: 520, y: 22 }, { x: 580, y: 33 }, { x: 640, y: 61 }],
  predictedPoints: [{ x: 440, y: 98.3 }, { x: 470, y: 120 }, { x: 510, y: 261 }]
}

//[{x: 20, y: 380.0}, {x: 50, y: 20.0}, {x: 80, 20.0}, {x: 110, y:20.2649106586916332}, {x: 140, y: 20.2649106586916332}, {x:170, y: 20.2649106586916332}, {x: 200, y: 20.2649106586916332}, {x: 230, y: 23.234627068435202}, {x:260, y:23.234627068435202}, {x: 290, y: 74.22924960848309}, {x: 320, y: 74.22924960848309}, {x: 350, y: 74.22924960848309}, {x:380, y: 74.22924960848309}, {x: 410, y: 74.22924960848309}, {x:440, y: 78.298005622747496}]