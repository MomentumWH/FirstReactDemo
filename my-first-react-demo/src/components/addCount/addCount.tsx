import './addCount.scss'
type MyComponentProps = {
    title: string
    count: number
    disabled: boolean
    onClick: () => void
}


export const AddCount=({ title, count, disabled, onClick }: MyComponentProps)=>{
    return  (
        <div    className="addCountButtonBox">
            <button disabled={disabled} onClick={onClick}   className="addCount">
                {title}：{count}
            </button>
        </div>
    )
}

