import React from 'react';
import {Text, Button, View, Image, ActivityIndicator, TouchableHighlight, ListView } from 'react-native';
import Row from './Row';
import ModalAdd from './ModalAdd';
import data from '../data';
import styles from '../styles';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RowEdit from './RowEdit';
class Main extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          editMode: false,
          modalVisible: false,
        }
        this.arrayholder = [] ;
        this.handleDestroyItem = this.handleDestroyItem.bind(this);
        this.filterCart = this.filterCart.bind(this);
      }

      handleDestroyItem(id) {
        this.props.dispatch({ type: "REMOVE_ITEM", id });

      }

  filterCart(){
    const newData = this.arrayholder.filter(function(item){
        return item.incart
    })
    dataSource: dataSource.cloneWithRows(newData)
    this.setState({
        dataSource: this.props.dataSource.cloneWithRows(newData),
    })
  }

  getAll(){
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
    })
  }

  openEdit() {
      this.setState({editMode: !this.state.editMode});
    }

  renderContent() {
    if (!this.state.editMode) {
      return (
        <ListView
          style={styles.container}
          enableEmptySections={true}
          dataSource={this.props.dataSource}
          renderRow={
            rowData => {
            return (

              <Row
                rowData={rowData}
                handleDestroyItem={id => this.handleDestroyItem(id)}
              />

            );
          }}
        />
    );
    }
    return (<View style={styles.container}>
      <ListView
        style={styles.container}
        enableEmptySections={true}
        dataSource={this.props.dataSource}
        renderRow={
          rowData => {
          return (

            <RowEdit
              rowData={rowData}
              handleDestroyItem={id => this.handleDestroyItem(id)}
            />

          );
        }}
      />
  </View>);
  }

  renderAdd() {
    if (this.state.editMode) {
      return (
        <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => this.openModal()}>
          <Text style={{fontSize: 30,fontWeight: 'bold', paddingLeft: 20}}>+</Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  renderEdit() {
    if (!this.state.editMode) {
      return (
        <TouchableHighlight onPress={()=> this.openEdit()}>
          <Image style={{flex:1}} source={require('../img/edit.png')} />
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => this.openEdit()}>
        <Text style={{fontSize: 20,fontWeight: 'bold', paddingRight: 8}}>Done</Text>
      </TouchableHighlight>
    );
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.renderAdd()}
          <Text style={{flex: 4,alignSelf: 'center',textAlign: 'center',fontSize: 20}}>Groceries</Text>
          {this.renderEdit()}
        </View>
        {this.renderContent()}
        <View style={styles.footer}>
          <TouchableHighlight onPress={() => this.getAll()}>
            <Image source={require('../img/swipe.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.filterCart()}>
            <Image  source={!this.state.incart?require('../img/cart_black.png'):require('../img/cart.png')} />
          </TouchableHighlight>
        </View>
        <ModalAdd  closeModal={()=>this.setState({modalVisible: false})}
          modalVisible={this.state.modalVisible}
          />
      </View>
    );
  }
}

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps(state, props) {
    return {
      //  loading: state.dataReducer.loading,
      dataSource: dataSource.cloneWithRows(state.items)
    }
}

Main.propTypes = {
  dataSource: PropTypes.object,
  dispatch: PropTypes.func
};
export default  connect(mapStateToProps)(Main);
