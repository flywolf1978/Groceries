import React from 'react';
import {Text, Button, View, Image, ActivityIndicator, TouchableHighlight, ListView } from 'react-native';
import Row from './Row';
import ModalAdd from './ModalAdd';
import data from '../data';
import styles from '../styles';

class Main extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          showList: true,
          modalVisible: false,
        }
        this.arrayholder = [] ;
      }

  componentDidMount() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(data),
        }, function() {
          this.arrayholder = data ;
        });
  }

  filterIncart(){
    const newData = this.arrayholder.filter(function(item){
        return item.incart
    })
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData),
    })
  }

  getAll(){
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
    })
  }

  openEdit() {
      this.setState({showList: !this.state.showList});
    }

  renderContent() {
    if (this.state.showList) {
      return (
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
        />
      );
    }
    return (<View style={styles.container}>
                  <Image source={require('../img/remove.png')} />
            </View>);
  }

  renderAdd() {
    if (!this.state.showList) {
      return (
        <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => this.openModal()}>
          <Text style={{fontSize: 30,fontWeight: 'bold', paddingLeft: 20}}>+</Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  renderEdit() {
    if (this.state.showList) {
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
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
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
          <TouchableHighlight onPress={() => this.filterIncart()}>
            <Image  source={!this.state.incart?require('../img/cart_black.png'):require('../img/cart.png')} />
          </TouchableHighlight>
        </View>
        <ModalAdd closeModal={()=>this.setState({modalVisible: false})}
          modalVisible={this.state.modalVisible}
          />
      </View>
    );
  }
}


export default Main;
