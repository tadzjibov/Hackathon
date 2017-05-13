import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Svg, {
    G,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from 'react-native-svg';

export default class CashFlowItem extends Component {
    constructor(props) {
        super(props);
    }

    createArrow(positive) {
        var style = {}
        var color = '#3ae3bc'
        if (!positive) {
            style = { transform: [{ scaleY: -1 }] };
            color = '#f05e69'
        }
        return (
            <Svg height={14} width={30} style={style}>
                <G id='arrow' fill={color}>
                    <Path d="M 15,0 L 0,14 L 30,14 Z" />
                </G>
            </Svg>
        );
    }

    render() {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row'}}
            >
                {this.createArrow(this.props.cashData.cash > 0)}
                <Text >
                    {this.props.cashData.cash} {this.props.cashData.name}
                </Text>
            </View>
        );
    }
}

CashFlowItem.defaultProps = {
    colorUp: '#3ae3bc',
    colorDown: '#f05e69',
}

CashFlowItem.propTypes = {
    cashData: PropTypes.object.isRequired,
}



