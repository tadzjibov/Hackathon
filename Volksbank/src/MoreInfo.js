import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Modal,
    ListView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';


const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid })
const tips = [
    { text: 'Add deficiency from your savings account'},//'Vul tekort aan uit je spaarrekening' },
    { text: 'Set the credit limit to zero' },
    { text: 'Request a personal loan' },
    { text: 'Use the \'Automatically complement balance\' feature' },
];


export default class MoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataSource.cloneWithRows(tips),
        }
    }

    createRow(text) {
        const widthScreen = Dimensions.get('window').width;
        const rowHeight = widthScreen * 0.2;
        const fontSize = rowHeight * 0.25;
        const radius = 10;
        return (
            <View style={{ backgroundColor: 'white', margin: 10, elevation: 7, borderRadius: radius }}>
                <StatusBar
                    backgroundColor='transparent'
                    translucent={true}
                />
                <TouchableOpacity onPress={() => { }}>
                    <View style={{ flexDirection: 'row', height: rowHeight }}>
                        <View style={{ flex: 0.05, borderBottomLeftRadius: radius, borderTopLeftRadius: radius, backgroundColor: this.props.color }} />
                        <View style={{ flex: 1, padding: 11, justifyContent: 'center',  }}>
                            <Text style={{ fontSize: fontSize, fontWeight: 'bold', fontFamily: 'sans-serif-thin' }}> {text} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>);
    }


    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={{flex:0.5, marginBottom: 25, elevation: 15 , backgroundColor: this.props.color, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontFamily: 'sans-serif-thin', fontSize: 40, color: '#e5eef9'}}>
                        Fix it now
                    </Text>
                </View>
                <ListView
                    style={{ flex: 1, }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.createRow(rowData.text)}
                />
            </Modal>
        );
    }
}

MoreInfo.defaultProps = {
    color: '#009cde',
}

MoreInfo.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    color: PropTypes.string,
}

