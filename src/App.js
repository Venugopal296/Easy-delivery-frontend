import { Container } from '@material-ui/core';
import Header from './components/header/header';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './App.css';
import reducer from './store/reducer';
import MainArea from './screens/mainArea/mainArea';

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
	return (
		<Provider store={store}>
			<Container maxWidth='xl' id='cg-app-container'>
				<Header />
				<MainArea />
			</Container>
		</Provider>
	);
};

export default App;
