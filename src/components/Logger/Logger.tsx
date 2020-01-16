import React from 'react'
import './Styles.scss'

interface Props  {
  val: string;
}

const Logger: React.FC<Props> = ({val}) => {
  return (
    <div className={'logger__container'}>
      <textarea defaultValue={val} rows={10}>
      </textarea>
    </div>
  )
}

export default Logger