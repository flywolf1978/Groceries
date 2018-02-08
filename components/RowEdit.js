import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Image,View } from "react-native";
import PropTypes from "prop-types";

class RowEdit extends Component {
  render() {
    return (
        <TouchableOpacity
          style={{flex: 1, flexDirection:'row',alignItems: 'center'}}
          onPress={() => this.props.handleDestroyItem(this.props.rowData.id)}
        >
        <Image style={{height: 45}} source={require('../img/remove.png')} />
          <Text style={{flex: 1,fontSize: 18}}>{this.props.rowData.item}</Text>
        </TouchableOpacity>
    );
  }
}

RowEdit.propTypes = {
  handleDestroyItem: PropTypes.func,
  rowData: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default RowEdit;
