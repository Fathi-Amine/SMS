import React, {useEffect, useState} from 'react';

const DebouncedInput = ({value:initValue, debounce = 500,onChange, ...props}) => {
    const [value, setValue] = useState(initValue);
    useEffect(()=>{
        setValue(initValue)
    },[initValue])

    useEffect(() => {
        const handler = setTimeout(() => {
            onChange(value)
        }, debounce);
        return () => {
            clearTimeout(handler);
        };

    }, [value]);
    return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
};

export default DebouncedInput;