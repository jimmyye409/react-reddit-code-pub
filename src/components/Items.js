import React from 'react';
import ShowItem from './showitem';

const Items = ({files}) => {
    return (
        <div className="row">
            {files.map((file) => (
                    <ShowItem key={file.data.id} file={file} />  
            ))}
        </div>
    );
}

export default Items;