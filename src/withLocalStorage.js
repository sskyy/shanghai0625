import React from 'react'

export default function withLocalStorage(ComponentToWrap, { keyName = 'data', propName = 'data', getDefaultValue = () => []}) {
    return class WrappedComponent extends React.Component{
        constructor() {
            super();
            this.state = {}
        }
        componentDidMount() {
            // 初始化的时候从 localStorage 读。
            // 如果是第一次，localStorage 里面还没有值，就用 getDefaultValue() 创建一个默认值。
            const lastData = localStorage.getItem(keyName)
            this.setState(() => {
                return {
                    data: lastData ? JSON.parse(lastData) : getDefaultValue()
                }
            })
        }
        saveToStorage = (nextData) => {
            localStorage.setItem(keyName, JSON.stringify(nextData))
        }
        render() {
            if (!this.state.data) return <div>Loading...</div>

            const props = {
                [propName] : this.state.data
            }
            // 每一次数据变化的时候都调用 saveToStorage 又存回 localStorage。
            return <ComponentToWrap {...props} onChange={this.saveToStorage}/>
        }
    }
}