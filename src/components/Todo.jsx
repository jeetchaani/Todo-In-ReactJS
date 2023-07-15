import React, { useEffect, useState } from 'react'

const getData = ()=>{
     const data = localStorage.getItem("todo");
     if(data){
      return JSON.parse(data);
     } else{
         return [];
     }
};
function Todo() {
  const [ inputData, setInputData ] = useState("");
  const [ itemList, setItemList ] = useState(getData());
  const [ editId, setEditId ] =useState("");
  const [ handleToggle, setHandleToggle ] = useState(false);
  const addItem = ()=>{
             const itemArry ={
                id: new Date().getTime().toString(),
                name:inputData
             };
          if(inputData.trim()){
            setItemList([...itemList,itemArry]);
            setInputData("");
          }
  };
  const deleteItem = (id) =>{
         const updatedList = itemList.filter((currItem) =>{
          return currItem.id!==id;
         });
         setItemList(updatedList);
  };
  const editItem = (id) =>{
     const editableItem = itemList.find((currentItem) =>{
             return currentItem.id===id;
     });
     setInputData(editableItem.name);
    setEditId(id);
    setHandleToggle(true);
  };
  const editSubmit = () =>{
          setItemList(itemList.map((currentItem) =>{
              if(currentItem.id===editId)
              {

                return {...currentItem, name:inputData };
              }
              return currentItem
          }));
    setInputData("");
    setEditId("");
    setHandleToggle(false);
  };
  const deleteAll = () =>{
    setItemList([]);
  };
  useEffect(() =>{
      localStorage.setItem("todo",JSON.stringify(itemList));
  }, [itemList]);
  return (
    <>
    <div align="center">
                <input type='text' placeholder='Enter Task'
                 value={inputData}
                 onChange={(event) => setInputData(event.target.value)}
                />
                <br/>
                {
                    handleToggle ? <button onClick={editSubmit} style={{ cursor:'pointer'}}>Edit Task</button> : 
                    <button onClick={addItem} style={{ cursor:'pointer'}}>Add Task</button>
                }
                
                <br/> <br/> <br/> <br/>
                <button onClick={deleteAll} style={{ cursor:'pointer'}}>Delete All</button>
                <br/>
                <p>
                  <ul>
                    {
                        itemList.map((currentItem,index)=>{
                          return(
                            <>
                             <li key={index}>{currentItem.name} 
                      [<span style={ {color:'blue', cursor:'pointer'} }
                             onClick={() =>editItem(currentItem.id)}
                             >Edit</span>] 
                    [<span style={ {color:'blue', cursor:'pointer'} }
                    onClick={()=>deleteItem(currentItem.id)}
                    >Delete</span>] </li>
                            </>
                          )
                        })
                    }
                   
                  </ul>
                </p>
    </div>
     
    </>
  )
}
export default Todo;
