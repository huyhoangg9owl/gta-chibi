import { NavigateBeforeOutlined, NavigateNextOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
	},
	button: {
		margin: theme.spacing(2),
		color: '#CC66FF',
		border: '1px solid #CC66FF',
		boxShadow: 'none',
		backgroundColor: 'transparent',
		'&:hover': {
			boxShadow: 'none',
			color: '#CC66FF',
			border: '1px solid #CC66FF',
			backgroundColor: '#CC66FF10',
			transform: 'scale(1.05)',
		},
	},
}));

export default function MyPagination({ page, count, onChange }) {
	const handleClickPrev = (event) => {
		let newPage = parseInt(page) - 1;
		if (newPage < 1) newPage = 1;
		onChange(event, newPage);
	};

	const handleClickNext = (event) => {
		let newPage = parseInt(page) + 1;
		if (newPage > count) newPage = count;
		onChange(event, newPage);
	};

	const classes = useStyles();

	return (
		<Fragment>
			{count > 1 && (
				<div className={classes.root}>
					<Button
						variant="outlined"
						onClick={handleClickPrev}
						startIcon={<NavigateBeforeOutlined />}
						size="small"
						color="primary"
						disabled={page === 1}
						className={classes.button}
					>
						Prev Page
					</Button>

					<Button
						variant="outlined"
						onClick={handleClickNext}
						endIcon={<NavigateNextOutlined style={{ color: 'CC66FF' }} />}
						size="small"
						disabled={page === count}
						className={classes.button}
					>
						Next Page
					</Button>
				</div>
			)}
		</Fragment>
	);
}
