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
} from 'react-native';

import LineChart from './src/LineChart'
import CashFlowItem from './src/CashFlowItem'
<<<<<<< HEAD
import IconButton from './src/IconButton'

=======
import GradientBackground from './src/GradientBackground'
>>>>>>> origin/upperUIPart

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
    }
  }

  createRow(rowData) {
    return (
      <CashFlowItem cashData={rowData} />
    );
  }

  plusCircle(){

  }

   minCircle(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='transparent'
          translucent={true}
        />
        <GradientBackground />
        <LineChart style={{}} backgroundColor='red' width={800} height={400} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
