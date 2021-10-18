import { useState } from 'react';
import * as C from './App-style';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';

const App = () => {
  
  const Storage = {
    get(){
      return JSON.parse(localStorage.getItem('todolist:') || '{}');
    },
    set(list:object){
      localStorage.setItem('todolist:', JSON.stringify(list))
    }
  }
  const [list, setList] = useState<Item[]>(Storage.get());
  
  const handleAddTask = (taskName: string) => {
    const newList = [...list]
    newList.push({
      id: list.length + 1,
      name: taskName,
      done: false
    });
    setList(newList)
  }

  const handleEditTaskCheck = (id: number, taskCheck: boolean) => {
    const newList: Item[] = [];
    list.map((item, index) => {
      newList.push({
        id: item.id,
        name: item.name,
        done: id === index +1 ? taskCheck : item.done
      })
    })
    setList(newList)
  }

  const handleRemoveTask = (taskId: number) => {
    const newList = [...list];
    newList.map((item, index) => {
      if(item.id === taskId){
        newList.splice(index, 1);
        setList(newList)
      }
    })
  }

  Storage.set(list)
  
  return (
    <C.Container>
      <C.Area>
        <C.Header> Lista de Tarefas </C.Header>
        <AddArea onEnter={handleAddTask} />
        {list.map((item, index) =>(
         <ListItem key={index} item={item} removeTask={handleRemoveTask} editTaskCheck={handleEditTaskCheck} />
        ))}
      </C.Area>
    </C.Container>
  );
}

export default App;