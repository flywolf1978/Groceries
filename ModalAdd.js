/* @flow */

import React from 'react';
import styles from './styles';
import {
  View,
  Text,
  StyleSheet , Modal, TextInput, TouchableHighlight
} from 'react-native';

export default class ModalAdd extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          text:'',
        }
      }

  render() {
    return (
      <Modal
            visible={this.props.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.props.callbackFromParen()}
        >
          <View style={localStyles.modalContainer}>
            <View style={localStyles.innerContainer}>
                    <View style={styles.header}>
                      <TouchableHighlight style={{alignSelf: 'center'}} onPress={this.props.closeModal}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', paddingLeft: 8}}>Cancel</Text>
                      </TouchableHighlight>
                      <Text style={{flex: 4,alignSelf: 'center',textAlign: 'center',fontSize: 20}}>Groceries</Text>
                      <TouchableHighlight style={{alignSelf: 'center'}} onPress={this.props.closeModal}>
                        <Text style={{fontSize: 20 ,fontWeight: 'bold', paddingRight: 8}}>Done</Text>
                      </TouchableHighlight>
                    </View>
                      <Text style={{fontSize: 20}}>Add new list item</Text>
                      <TextInput
                        maxLength = {27}
                        style={{height: 40, alignSelf: 'stretch',fontSize: 20, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        />
                    <Text style={{fontSize: 20}}>
                       Characters Left: {this.state.text.length}/27
                    </Text>
              </View>
          </View>
        </Modal>
    );
  }
}

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  innerContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
