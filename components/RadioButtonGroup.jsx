import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const RadioButtonGroup = ({ buttons, disabled = false }) => {
  const [selected, setSelected] = React.useState('');
  const [hovered, setHovered] = React.useState(null);

  const handleClick = button => {
    setSelected(button.id);
    button.onPress(button.id);
  };

  const getStyling = button => {
    let style = { ...styles.Button };
    if (button.id === selected) {
      style = { ...style, ...styles.ButtonSelected };
    }
    if (button.id === hovered) {
      style = { ...style, ...styles.ButtonHovered };
    }
    return style;
  };

  return (
    <View style={styles.ButtonGroup}>
      {buttons.map((button, index) => (
        <Pressable
          onPress={() => handleClick(button)}
          onHoverIn={() => setHovered(button.id)}
          onHoverOut={() => setHovered(null)}
          key={button.id + index}
          style={getStyling(button)}
          disabled={disabled}
        >
          <Text style={styles.ButtonText}>{button.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  ButtonText: {
    fontWeight: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
  },
  Button: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 14,
  },
  ButtonSelected: {
    borderColor: '#000000',
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  ButtonHovered: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

RadioButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RadioButtonGroup;
