import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: '15px',
	},
	'& .MuiDialogTitle-root': {
		background: 'rgb(244, 244, 244)',
	},
	'& .MuiDialogContent-root': {
		padding: theme.spacing(4),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	apyExplainWrapper: {
		paddingTop: '15px',
		paddingBottom: '20px',
	},
}));

export const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};
