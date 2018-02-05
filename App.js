import React from 'react';
import { StyleSheet, Text, Button, View, Image, ActivityIndicator, TouchableHighlight, ListView, Modal, TextInput } from 'react-native';
import Row from './Row';
import data from './data';

class App extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          showList: true,
          modalVisible: false,
          text:'',
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
      // update our state to indicate our "maybe" element show be shown
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
                  <Image style={{height: 90}} source={require('./img/remove.png')} />
            </View>);
  }

  renderAdd() {
    if (!this.state.showList) {
      return (
        <TouchableHighlight onPress={() => this.openModal()}>
          <Image style={{flex:1,height: 90}} source={require('./img/add.png')} />
        </TouchableHighlight>
      );
    }
    return null;
  }

  renderEdit() {
    if (this.state.showList) {
      return (
        <TouchableHighlight onPress={()=> this.openEdit()}>
          <Image style={{flex:1,height: 90}} source={require('./img/edit.png')} />
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

  closeModal() {
    this.setState({modalVisible:false});
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
            <Image source={require('./img/swipe.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.filterIncart()}>
            <Image  source={!this.state.incart?require('./img/cart_black.png'):require('./img/cart.png')} />
          </TouchableHighlight>
        </View>
        <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                      <View style={styles.header}>
                          <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => this.closeModal()}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', paddingLeft: 8}}>Cancel</Text>
                          </TouchableHighlight>

                            <Text style={{flex: 4,alignSelf: 'center',textAlign: 'center',fontSize: 20}}>Groceries</Text>
                            <TouchableHighlight style={{alignSelf: 'center'}} onPress={() => this.closeModal()}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    backgroundColor: '#f9f9f9',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 90,
    backgroundColor: '#f9f9f9',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  innerContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
export default App;
