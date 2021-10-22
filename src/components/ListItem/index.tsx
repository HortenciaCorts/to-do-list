import * as C from './style'
import { Item } from '../../types/Item'
import { useState, KeyboardEvent } from 'react'

type Props = {
    item: Item
    editTaskCheck: (taskId: number, taskCheck: boolean) => void
    editTask: (taskId: number, taskName: string) => void
    removeTask: (taskId: number) => void
}

export const ListItem = ({ item, editTaskCheck, editTask, removeTask }: Props) => {
    const [isChecked, setIsChecked] = useState(item.done)
    const [inputText, setInputText] = useState(item.name)
    const [isReadOnly, setIsReadOnly] = useState(true)

    const editCheck = (e:boolean, id:number) => {
        setIsChecked(e)
        editTaskCheck(id, e)
    }
    
    const handleKeyUp = (e: KeyboardEvent, id: number) => {
        if(e.code === 'Enter' && inputText !== ''){
            editTask(id, inputText)
            setIsReadOnly(true)
        }
    }

    return(
        <C.Container>
            <div className="information">
                <input 
                    className="checkbox"
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={e => editCheck(e.target.checked, item.id)}
                />
                <C.InputText 
                    done={isChecked} 
                    type="text" 
                    value={isReadOnly === true ? item.name : inputText}
                    readOnly={isReadOnly === true ? true : false}
                    onChange={e => setInputText(e.target.value)}
                    onKeyUp={e => handleKeyUp(e, item.id)} 
                />
            </div>
            <div className="buttons">
                <svg onClick={e => setIsReadOnly(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <svg onClick={e => {removeTask(item.id)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
        </C.Container>
    )
}