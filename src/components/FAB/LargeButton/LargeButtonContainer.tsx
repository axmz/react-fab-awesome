import React, { useContext } from 'react'
import LargeButton from './LargeButton'
import { Context } from '../../../context/Context';
import useLongPress from './longpress';
import { Button } from '../Container/Button';

interface Props {
  largeButton: Button
}
const LargeButtonContainer: React.FC<Props> = ({largeButton}) => {
  const ctx = useContext(Context);
  const updateLog = ctx.updateLog!;

  const bind = useLongPress(
    () => updateLog("Short press"),
    () => updateLog("Long press"),
    1000
  );

  return (
    <LargeButton {...largeButton} {...bind}>
      <largeButton.icon/>
    </LargeButton>
  )
}

export default LargeButtonContainer