import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';

const Menu = ({ label, pages }) => {
  return (
    <View style={styles.Menu}>
      <Text style={styles.Label}>{label}</Text>
      {pages.map((item, index) => (
        <MenuItem key={index} label={item.name} id={item.path} />
      ))}
    </View>
  );
};

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  Menu: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#bada55',
    height: 48,
    width: '100%',
  },
  Label: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Menu;
