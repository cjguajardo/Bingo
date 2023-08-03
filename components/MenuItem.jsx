import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Link } from 'react-router-native';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const MenuItem = ({ label, id }) => {
  const [hover, setHover] = useState(false);
  const [MenuItemStyle, setMenuItemStyle] = useState(styles.MenuItem);
  const location = useLocation();

  const getStyling = () => {
    let style = { ...styles.MenuItem };
    if (hover) {
      style = { ...style, ...styles.MenuItemHover };
    }
    if (location.pathname === id) {
      style = { ...style, ...styles.MenuItemSelected };
    }
    return style;
  };

  useEffect(() => {
    setMenuItemStyle(getStyling());
  }, [hover, location]);

  return (
    <Link
      to={id}
      style={MenuItemStyle}
      onTouchMove={() => setHover(true)}
      onPointerEnter={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      onPointerLeave={() => setHover(false)}
    >
      <Text style={styles.MenuItemLabel}>{label}</Text>
    </Link>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  MenuItem: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    cursor: 'pointer',
  },
  MenuItemHover: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#000000AC',
    color: '#FFFFFF',
  },
  MenuItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  MenuItemLabel: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
  },
});

export default MenuItem;
