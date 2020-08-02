import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import LoadingPage from './components/LoadingPage'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import configureStore from './store'
import { loadUser } from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  componentDidMount() {
      configureStore().store.dispatch(loadUser())
  }

  render() {
    const { store, persistor } = configureStore()
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingPage/>} persistor={persistor}>
          <div className="App">
          <AppNavBar/>
          <Container>
            <ItemModal/>
            <ShoppingList/> 
          </Container>
        </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
