import React from 'react'
export const ThemeContext = React.createContext()

// 以下时为了演示 render props
export class ThemeReceiver extends React.Component{
    static contextType = ThemeContext
    render() {
        return this.props.children(this.context)
    }
}
