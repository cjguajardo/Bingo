import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import routes from './routes/main';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <View style={styles.container}>
      <RouterProvider router={router} />
      <Outlet />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'top',
    justifyContent: 'top',
  },
});
