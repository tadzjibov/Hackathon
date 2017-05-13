import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome  from 'react-native-vector-icons/EvilIcons';

class IconButton extends React.Component {

  render() {
    return (
      <TouchableOpacity style={styles.iconButton} onPress={this.props.onPress}>
        <FontAwesome name={this.props.name} style={{ color: this.props.color, fontSize: this.props.fontSize, margin: this.props.margin}}/>
      </TouchableOpacity>
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

export default IconButton;