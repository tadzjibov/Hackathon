/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

import LineChart from './src/LineChart'
import CashFlowItem from './src/CashFlowItem'
import GradientBackground from './src/GradientBackground'
import LowerUI from './src/LowerUI'

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid })

export default class Volksbank extends Component {
  constructor(props) {
    super(props);
    data = [
      { cash: 15, name: 'bank1' },
      { cash: -20, name: 'bank2' },
      { cash: -100, name: 'bank3' },
      { cash: 100, name: 'bank4' },
      { cash: 50, name: 'bank5' },
      { cash: 60, name: 'bank6' },
    ]
    this.state = {
      dataSource: dataSource.cloneWithRows(data),
      day: 1,
      dayAnim: new Animated.Value(1),
    }
    this.state.dayAnim.addListener(({ value }) => {
      this.setState({ day: value });
    });
  }

  componentDidMount() {
    Animated.timing(this.state.dayAnim, {
      toValue: 31,
      duration: 4500,
      easing: Easing.linear,
    }).start();
  }

  createRow(rowData) {
    return (
      <CashFlowItem cashData={rowData} />
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar
          backgroundColor='transparent'
          translucent={true}
          style={{ elevation: 15, }}
        />
        {/*<GradientBackground />*/}
        <View style={[styles.container, { marginTop: -50, flex: 1, elevation: 15, }]}>
          <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 40, color: '#e5eef9' }}>
            {Math.round(this.state.day)} May 2016
        </Text>
          <LineChart style={{}} width={600} height={500} />
        </View>
        <LowerUI />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009cde',//'#25bdab',//'#F5FCFF',
    paddingTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Volksbank', () => Volksbank);
