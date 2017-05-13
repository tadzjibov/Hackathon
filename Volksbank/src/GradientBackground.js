import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import Svg, {
    G,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from 'react-native-svg';

export default class GradientBackground extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const width = Dimensions.get('window').width.toString();
        const size = Math.max(Dimensions.get('window').height, Dimensions.get('window').width);
        
        const d = "M-"+size+",0 L"+size*2+",0 L"+size*2+","+size+" L0,"+size+" Z";
        return (
            <View style={{ position: 'absolute'  }}>
                <Svg height={size} width={size*3}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0%" stopColor={this.props.colorUp} stopOpacity="1" />
                            <Stop offset="100%" stopColor={this.props.colorDown} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Path fill="url(#grad)" d={d} />
                </Svg>
            </View>
        );
    }
}

GradientBackground.defaultProps = {
    colorUp: '#011c51',
    colorDown: '#1c7ce2',
}