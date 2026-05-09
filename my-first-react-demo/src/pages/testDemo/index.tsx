import { App as AntdApp } from 'antd'
import { useNavigate } from 'react-router-dom'
import AntdStarter from '../../components/antdStarter'
import RemakeButton from '../../components/remakeButton'
import '../pages.css'
import './testDemo.scss'
const titleLabelCardData = [
  {
    title: 'Button',
    contentValue: 'antd 的按钮支持 type、icon、loading、danger 等常见变体。',
  },
  {
    title: 'Form',
    contentValue: '配合 rules 与 layout 可以快速搭建表单校验和提交流程。',
  },
  {
    title: 'Table',
    contentValue: '适合列表、后台页和状态展示，和 Tag、Pagination 搭配很常见。',
  },
]

const TestDemo = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home')
  }

  const goContact = () => {
    navigate('/contact')
  }

  return (
    <AntdApp>
      <div className="testDemo">
        <div className="testDemoTitleBox">
          <div className="testDemoTitle">
            <p>Ant Design Demo</p>
            <RemakeButton
              backgroundColor="linear-gradient(90deg, #ffd8a8 0%, #ffb4a2 100%)"
              onClick={goContact}
              text="goContact"
              textColor="#7c2d12"
            />
          </div>
          <div className="testDemoTitleIntroduc" />
        </div>
        <div className="testDemoContentBox">
          <div className="testDemoContentTitle">
            <p>Component Starter</p>
            <RemakeButton
              backgroundColor="linear-gradient(90deg, #d4c1f6 0%, #c3d9fa 100%)"
              onClick={goHome}
              text="backHome"
              textColor="#ffffff"
            />
          </div>
          <div className="testDemoContentIntroductionContainer">
            {titleLabelCardData.map((item) => (
              <div className="introductionBox" key={item.title}>
                <div className="introductionTitle">{item.title}</div>
                <div className="introductionContent">{item.contentValue}</div>
              </div>
            ))}
          </div>
          <AntdStarter />
        </div>
      </div>
    </AntdApp>
  )
}

export default TestDemo
