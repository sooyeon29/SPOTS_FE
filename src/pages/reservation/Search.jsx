const searchList = () =>{
    const filtered = sampleData.filter((itemList) => {
      return itemList.name.toUpperCase().includes(userInput.toUpperCase());
    return (
      <div className="cardList">
        {filtered.map((itemList) => {
          return <Card key={itemList.id} {...itemList} />;
        })}
      </div>
    )})}
    
    