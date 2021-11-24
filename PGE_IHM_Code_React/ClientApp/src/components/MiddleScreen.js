import '../styles/MiddleScreen.css'
import noCam from '../assets/NoCamera.png'

function MiddleScreen() {
    return (
        <div className='middle'>
            <img src={noCam} alt='noCamera' className='img-noCamera' />
        </div>
    )
}

export default MiddleScreen