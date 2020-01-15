import React from 'react';
import './Styles.scss'

const LargeButton: React.FC = ({children}) => {

  return (
  <div className={'fab__button--large'}>{children}</div>
  )
}

export default LargeButton
