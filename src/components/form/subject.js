import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";


const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 20vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;



export default function Subject({type,setType}) {

  let[mydata ,setMydata] = useState([])

  useEffect(()=>{
    const content = async()=>{
    let quiz_types = await axios.get('/fetch_types') 
    
    if (quiz_types.data.length>0) {
    let result = quiz_types.data.map((item,index)=>{
    return {subject :item.subject, _id:item._id} })

    setMydata(result) }
    


  //   function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  //   }
    
  //   var unique = result.filter(onlyUnique);
  //   setMydata(unique)
  
  }
    content();
  },[])

  // const  options = ["asad","asad10"]



  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggling = () => setIsOpen(!isOpen);



  const onOptionClicked = value => () => {
    setSelectedOption(value.subject);
    setType(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  const onOptionClicked1 = () => {
  setType({subject:selectedOption})
  setIsOpen(false);
  };
  
  return (
    <Main>
      <DropDownContainer>
      
         
        <DropDownHeader onClick={toggling}>

    
          {  selectedOption || "Please choose subject " }
          {/* || mydata[0].subject */}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              
              { mydata.length > 0 &&  mydata.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option.subject}

                </ListItem>
          
              ))}

        
              <ListItem>

            <input name='subject' placeholder='please enter your subject' 
        value={selectedOption} onChange={e=>setSelectedOption(e.target.value)}/>
            <button onClick={onOptionClicked1}>Done</button>
              </ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>

  
  );
}




