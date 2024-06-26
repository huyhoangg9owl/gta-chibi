import { merge } from 'lodash';
import Autocomplete from './Autocomplete';
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import IconButton from './IconButton';
import Input from './Input';
import Lists from './Lists';
import Paper from './Paper';
import Timeline from './Timeline';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
	return merge(
		Card(theme),
		Lists(theme),
		Paper(),
		Input(theme),
		Button(theme),
		Tooltip(theme),
		Backdrop(theme),
		Typography(theme),
		IconButton(theme),
		Autocomplete(theme),
		Timeline()
	);
}
