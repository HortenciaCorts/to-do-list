import * as C from './style'
import { Item } from '../../types/Item'
import { useState } from 'react'

type Props = {
    item: Item
    editTaskCheck: (id: number, taskId: boolean) => void
    removeTask: (taskId: number) => void
}

export const ListItem = ({ item, editTaskCheck, removeTask }: Props) => {
    const [isChecked, setIsChecked] = useState(item.done)
    
    const editCheck = (e:boolean, id:number) => {
        setIsChecked(e)
        editTaskCheck(id, e)
    }

    return(
        <C.Container done={isChecked}>
            <div>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={e => editCheck(e.target.checked, item.id)}
                />
                <label>{item.name}</label>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <svg onClick={e => removeTask(item.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
        </C.Container>
    )
}