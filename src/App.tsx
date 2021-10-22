import { useState } from 'react';
import * as C from './App-style';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';

const App = () => {
  
  const Storage = {
    get(){
      return JSON.parse(localStorage.getItem('todolist:') || '[]');
    },
    set(list:object){
      localStorage.setItem('todolist:', JSON.stringify(list))
    }
  }
  const [list, setList] = useState<Item[]>(Storage.get());

  const handleAddTask = (taskName: string) => {
    const newList = [...list]
    newList.push({
      id: list.length ===  0 ? 1 : list[list.length -1].id + 1,
      name: taskName,
      done: false
    });
    setList(newList)
  }

  const handleEditTaskCheck = (taskId: number, taskCheck: boolean) => {
    const newList: Item[] = [];
    list.map((item) => {
      newList.push({
        id: item.id,
        name: item.name,
        done: taskId === item.id ? taskCheck : item.done
      })
      return setList(newList)
    })    
  }

  const handleEditTask = (taskId: number, taskName: string) => {
    const newList: Item[] = []
    list.map((item) => {
      newList.push({
        id: item.id,
        name: taskId === item.id ? taskName : item.name,
        done: item.done
      })
      return setList(newList)
    }) 
  }

  const handleRemoveTask = (taskId: number) => {
    const newList = [...list];
    list.map((item, index) => {
      if(item.id === taskId){
        newList.splice(index, 1);
      }
      return setList(newList)
    })
  }

  Storage.set(list)
  
  return (
    <C.Container>
      <C.Area>
        <C.Header> Lista de Tarefas </C.Header>
        <AddArea onEnter={handleAddTask} />
        {list.map((item, index) =>(
         <ListItem key={index} item={item} 
          editTaskCheck={handleEditTaskCheck}
          editTask={handleEditTask}
          removeTask={handleRemoveTask} 
        />
        ))}
      </C.Area>
    </C.Container>
  );
}

export default App;