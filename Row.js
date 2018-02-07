import React from 'react';
import { View, Text, StyleSheet, Image,TouchableHighlight } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view'; // 0.4.6

const Row = (props) => (
  <View style={styles.container}>
      <SwipeRow disableLeftSwipe={!props.incart?true:false}
        disableRightSwipe={props.incart?true:false}
        leftOpenValue={45} rightOpenValue={-45}>
        <View style={styles.rowBack}>
              <Image source={require('./img/cart.png')}/>
              <Image source={require('./img/home.png')}/>
        </View>
        <View style={props.incart?styles.rowLeft:styles.rowRight}>
          <View style={styles.inRow}>
              <Image source={props.incart?require('./img/cart.png'):null} />
              <View style={{flex: 1}}>
                <Text style={{padding: 10, fontSize: 18}}>{`${props.item}`}</Text>
              </View>
              <Image source={!props.incart?require('./img/home.png'):null} />
          </View>
        </View>
      </SwipeRow>
  </View>
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCC',
    flex: 1,
    padding: 1,
  },

  rowRight: {
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    height: 45,
  },
  rowLeft: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    height: 45,
  },
  inRow: {
    flex: 1,
    flexDirection: 'row',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export default Row;
