import React, { useContext } from 'react'
import LargeButton from './LargeButton'
import { Context } from '../../../context/Context';
import useLongPress from './longpress';
import { ReactComponent as Plus } from "../../../assets/plus.svg";

interface Props {
  Icon?: any
}
const LargeButtonContainer: React.FC<Props> = ({Icon=Plus}) => {
  const ctx = useContext(Context);
  const updateLog = ctx.updateLog!;

  const bind = useLongPress(
    () => updateLog("Short press"),
    () => updateLog("Long press"),
    1000
  );

  return (
    <LargeButton {...bind}>
      <Icon/>
    </LargeButton>
  )
}

export default LargeButtonContainer