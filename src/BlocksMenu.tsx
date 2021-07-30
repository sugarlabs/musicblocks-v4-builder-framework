import React from 'react';

interface Props {
    width: number,
}

const BlocksMenu: React.FC<Props> = (props) => {
    return (
        <div className="BlocksMenu" style={{ width: props.width }}>

        </div>
    );
}

export default BlocksMenu;
