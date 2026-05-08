import { useNavigate } from 'react-router-dom'
import RemakeButton from '../../components/remakeButton'
import '../pages.css'
import './testDemo.scss'

const testDemo=()=>{
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/home')
    }
    const goContact = () => {
        navigate('/contact')
    }

    return (
        <div className="testDemo">
            <div    className=" testDemoTitleBox">
                <div className="  testDemoTitle">
                    <p>TestTitle</p>
                    <RemakeButton
                        backgroundColor="linear-gradient(90deg, #ffd8a8 0%, #ffb4a2 100%)"
                        text="goContact"
                        textColor="#7c2d12"
                        onClick={goContact}
                    />

                </div>
                <div    className="testDemoTitleIntroduc">

                </div>
            </div>
            <div    className="testDemoContentBox">
                <div    className="testDemoContentTitle">
                    <p>TestContent</p>
                    <RemakeButton
                        backgroundColor="linear-gradient(90deg, #d4c1f6 0%, #c3d9fa 100%)"
                        text="backHome"
                        textColor="#ffffff"
                        onClick={goHome}
                    />
                </div>
                <div>

                </div>
            </div>
        </div>
    )

}

export default testDemo
