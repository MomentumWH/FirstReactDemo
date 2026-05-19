import { useState } from 'react'
import './stateComposeDemo.scss'
import { AddCount } from '../../components/addCount/addCount'

const StateComposeDemo = () => {
    const [count, setCount] = useState(0)
    return(
        <div    className="contentDemoBox">
            <div    >1313</div>
            <div>{ count}</div>
            <AddCount
                title="count参数值"
                count={count}
                disabled={false}
                onClick={() =>setCount(current=>current+1)}
            ></AddCount>
        </div>
    )
}

export default StateComposeDemo
