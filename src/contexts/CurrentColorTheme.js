import * as React from 'react';

const currentColorContext = React.createContext({
    currentColor: '',
    handleColorChange: () => {}
})

export { currentColorContext }