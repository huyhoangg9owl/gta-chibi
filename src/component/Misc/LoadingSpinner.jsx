
import { Ellipsis } from 'react-spinners-css';


export default function LoadingSpinner({size = 180}) {
    return (
        <div style={{

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Ellipsis  size={size} color="#bcbcbc"/>
        </div>

    )
}

