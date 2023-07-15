<h4>Todo App In ReactJs</h4>
<br/>
Project Link -- https://master--sensational-rolypoly-52464a.netlify.app/
<br/>
1) For Add Item In the list -- <br/>
<code>
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
</code>
<br/>
2) To reflect data into the localStoarge-- <br/>
<code>
   useEffect(() =>{
      localStorage.setItem("todo",JSON.stringify(itemList));
  }, [itemList]);
</code>
