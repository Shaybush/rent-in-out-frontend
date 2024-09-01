import { Provider } from 'react-redux';
import AppRoutes from './appRoutes';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store.js';

function App() {
	const example: Record<string, string> = {
		hello: 'world',
	};
	console.log(example);

	return (
		<GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}`}>
			<Provider store={store}>
				<AppRoutes />
			</Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
