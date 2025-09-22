import { StyleSheet } from 'react-native';
import CustomNavigationContainer from './src/utils/CustomNavigationContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/Stores';

function App() {
  return (
    <>
      <Provider store={store}>
        <CustomNavigationContainer />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default App;
