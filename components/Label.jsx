import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Label = ({ text }) => (
  <View>
    <Text style={styles.Label}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  Label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 11,
    color: '#263238',
  },
});

export default Label;
