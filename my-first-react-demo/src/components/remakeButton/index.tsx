import { CSSProperties, useState } from 'react'
import './remakeButton.scss'

type RemakeButtonProps = {
  activeBackgroundColor?: string
  activeTextColor?: string
  backgroundColor?: string
  onClick?: () => void
  text?: string
  textColor?: string
}

const RemakeButton = ({
  activeBackgroundColor = 'linear-gradient(90deg, #ff6a00 0%, #ee0979 50%, #6a11cb 100%)',
  activeTextColor = '#ffffff',
  backgroundColor = 'linear-gradient(90deg, #dbeafe 0%, #c7d2fe 100%)',
  onClick,
  text = 'Remake',
  textColor = '#1e293b',
}: RemakeButtonProps) => {
  const [active, setActive] = useState(false)
  const buttonStyle = {
    '--remake-button-active-bg': activeBackgroundColor,
    '--remake-button-active-color': activeTextColor,
    '--remake-button-bg': backgroundColor,
    '--remake-button-color': textColor,
  } as CSSProperties

  return (
    <button
      className={`remake-button ${active ? 'is-active' : ''}`}
      onClick={() => {
        setActive((current) => !current)
        onClick?.()
      }}
      style={buttonStyle}
      type="button"
    >
      <span className="remake-button__text">{active ? 'Remaking' : text}</span>
    </button>
  )
}

export default RemakeButton
