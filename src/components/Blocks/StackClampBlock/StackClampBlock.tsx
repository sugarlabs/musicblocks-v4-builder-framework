import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlockPosition } from '../../../redux/store/slices/blocks';
import { IStackClampBlockController } from '../../../@types/Components/stackClampBlock';

const StackClampBlock: React.FC<IStackClampBlockController> = (props) => {
  const block = useSelector((state: any) => state.blocks[props.id]);
  console.log(`Stack Clamp Block ${props.id} rerendered`);
  const dispatch = useDispatch();
  return (
    <div className="StackClamp Block" style={{ backgroundColor: block.color }}>
      {props.id}
      <button onClick={() => dispatch(updateBlockPosition({ id: props.id }))}>Update</button>
    </div>
  );
};

export default React.memo(StackClampBlock);
