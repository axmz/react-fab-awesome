import React from 'react';
import './Styles.scss'

const SmallButton: React.FC = ({children}) => {
  return (
    <div className={'fab__button--small'}>{children}</div>
  )
}

export default SmallButton

