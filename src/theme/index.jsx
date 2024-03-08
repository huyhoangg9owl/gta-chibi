import { ReactNode, useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
//
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';

export default function ThemeConfig({ children }: { children: ReactNode }) {
	const themeOptions = useMemo(
		() => ({
			palette,
			shape,
			typography,
			shadows,
			customShadows,
			breakpoints: {
				values: {
					xs: 0,
					sm: 600,
					md: 900,
					lg: 1200,
					xl: 1550,
				},
			},
		}),
		[]
	);

	const theme = createTheme(themeOptions);
	theme.components = componentsOverride(theme);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
