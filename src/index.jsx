import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './fonts/Sequel/Sequel100Black-75.ttf';
import './fonts/Sequel/Sequel100Black-65.ttf';
import './fonts/Sequel/Sequel100Black-55.ttf';
import './fonts/Syke Mono/Syke Mono/syke_mono_regular.otf';
import './fonts/Syke Mono/Syke Mono/syke_mono_thin.otf';
import './fonts/Syke Mono/Syke Mono/syke_mono_medium.otf';
import './fonts/Decima/Decima+ Bold.ttf';

render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);
