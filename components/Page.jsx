import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Menu from './Menu';
import { getRouteList } from '../routes/main';

const Page = ({ title, children }) => (
  <View style={styles.Page}>
    <Menu label="Bingo" pages={getRouteList()} />
    <Text style={styles.Title}>{`>> ${title}`}</Text>

    <View style={styles.PageContent}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  Page: {
    backgroundColor: '#fff',
  },
  PageContent: {
    paddingHorizontal: Dimensions.get('window').width > 720 ? 30 : 10,
    height: '100%',
  },
  Title: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 9,
    color: '#CCCCCC',
    fontFamily: 'monospace',
  },
});

export default Page;
