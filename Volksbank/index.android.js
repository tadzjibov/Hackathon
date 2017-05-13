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
} from 'react-native';

import LineChart from './src/LineChart'
import CashFlowItem from './src/CashFlowItem'
import IconButton from './src/IconButton'


const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid})

export default class Volksbank extends Component {
   constructor(props) {
    super(props);
      data= [
       {cash:15,    name:'bank1'},
       {cash: -20,  name:'bank2'},
       {cash: -100, name:'bank3'},
       {cash: 100,  name:'bank4'},
       {cash: 50,   name:'bank5'},
       {cash: 60,   name:'bank6'},
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
        <LineChart style={{}} backgroundColor='red' width={800} height={400} />
        <ListView
          style={{flex:1}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.createRow(rowData)}
        />
        <View flexDirection = 'row'>
        <IconButton
            name="user"
            fontSize = {45}
            margin = {5}
            color = {'#009CDE'}
          />
          <IconButton
            onPress={() => this.plusCircle()}
            name="plus-circle"
            fontSize = {22}
            margin = {5}
            color = {'#3ae3bc'}
          />
           <IconButton
            name="user"
            fontSize = {45}
            margin = {5}
            color = {'#009CDE'}
          />
          <IconButton
            onPress={() => this.minCircle()}
            name="minus-circle"
            fontSize = {22}
            margin = {5}
            color = {'#f05e69'}
          />
          </View>
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
