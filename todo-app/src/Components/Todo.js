import React, { useState } from 'react'
import styled from "styled-components"

export default function Todo() {
    const [Tasks, setTasks] = useState([])
    const [NewTask, setNewTask] = useState([])
    const [ItemCount, setItemCount] = useState(0)

    let renderTask = () =>{
        return Tasks.filter((Task) => Task.is_completed === false).map((Task) =>(
            <ListItem key={Task.id}>
                <LeftContainer>
                    <CheckContainer onClick={() =>completeTask(Task.id)}></CheckContainer>
                    <ItemContent>{Task.id}, {Task.title}</ItemContent>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={() =>deleteTask(Task.id)}>
                        <ButtonImage src={require("../assets/delete.svg")} alt="delete"></ButtonImage>
                    </ActionButton>
                </RightContainer>
            </ListItem>
        ))
    }

    let renderCompleted = () =>{
        return Tasks.filter((Task) => Task.is_completed === true).map((Task) =>(
            <ListItem key={Task.id}>
                <LeftContainer>
                    <CheckContainerCompleted>
                        <TickImage src={require("../assets/tick-green.svg")} alt='tickImage'/>
                    </CheckContainerCompleted>
                    <ItemContentCompleted>{Task.id}, {Task.title}</ItemContentCompleted>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={() =>revertTask(Task.id)}>
                        <ButtonImage src={require("../assets/revert.svg")} alt="undo"></ButtonImage>
                    </ActionButton>
                    <ActionButton onClick={() =>deleteTask(Task.id)}>
                        <ButtonImage src={require("../assets/delete.svg")} alt="delete"></ButtonImage>
                    </ActionButton>
                </RightContainer>
            </ListItem>
        ))
    }

    let addNewTask = (e) =>{
        e.preventDefault()
        let new_task = {
            id: ItemCount + 1,
            title: NewTask,
            is_completed: false
        }
        setTasks([...Tasks, new_task])
        setNewTask("")
        setItemCount((prev) => prev + 1)
    }
    //Adding a item.....

    let deleteTask = (id) =>{
        let new_list = Tasks.filter((Task) => Task.id !== id)
        setTasks(new_list)
    }
    //Delete a task.....

    let completeTask = (id) =>{
        let current_task = Tasks.filter((Task) => Task.id === id).map((Task) =>(
        Task.is_completed = true
        ))
        setTasks(prevCompleted => [...prevCompleted,current_task])
    }
    //Compleat a task....
    
    let revertTask = (id) =>{
        let current_task = Tasks.filter((Task) => Task.id === id).map((Task) =>(
        Task.is_completed = false
        ))
        setTasks(prevCompleted => [...prevCompleted,current_task])
    }
    //revert or undo a task.......

  return (
        <Container>
            <Heading>ToDo List</Heading>
            <ToDoContainer>
                <SubHeading>Things To Be Done</SubHeading>
                <ToDoList>
                    {renderTask()}
                </ToDoList>
            </ToDoContainer>
            <NewToDoForm>
                <FromInput value={NewTask} onChange={(e) =>setNewTask(e.target.value)} placeholder="Type New Task...."/>
                <FormSubmitButton onClick={(e) =>addNewTask(e)}>Add New</FormSubmitButton>
            </NewToDoForm>
            <ToDoContainer>
                <SubHeading>Completed</SubHeading>
                <ToDoList>
                    {renderCompleted()}
                </ToDoList>
            </ToDoContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 1000px;
    text-align: center;
    margin: 0 auto;
    border-right: 2px solid rgba(3, 102, 214, 0.3);
    border-left: 2px solid rgba(3, 102, 214, 0.3);
    border-width: 0 5px;
    height: 100vh;
`
const Heading = styled.h1`
    font-size: 52px;
    font-weight: bold;
    margin-bottom: 40px;
    padding-top: 60px;
    color: darkblue;
`
const ToDoContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`
const SubHeading = styled.h3`
    font-size: 36px;
    color: #050241;
    margin-bottom: 40px;
`
const ToDoList = styled.ul`
    padding: 0px;
`
const ListItem = styled.li`
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`
const CheckContainer = styled.span`
    width: 22px;
    height: 22px;
    border: 3px solid #050505;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
    cursor: pointer;
`
const ItemContent = styled.span`
    font-size: 26px;
    font-weight: 700;
    cursor: pointer;
`
const RightContainer = styled.div``
const ActionButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`
const ButtonImage = styled.img``
const NewToDoForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    position: relative;
    margin-bottom: 40px;
    &::before{
        content: "";
        background-image: url(${require("../assets/plus.svg")});
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        left: 208px;
        top: 55px;
        bottom: -38px;
        right: 0;
    }
`
const FromInput = styled.input`
    padding: 10px 37px;
    width: 50%;
    height: 40px;
    border: none;
    box-shadow: 0px 0px 0px 3px rgba(3, 102, 214, 0.3);
    font-size: 18px;
    font-weight: 600;
`
const FormSubmitButton = styled.button`
    padding: 10px 15px;
    background-color: darkblue;
    border: 3px solid black;
    color: #fff;
    font-weight: 400;
    font-size: 18px;
`
const CheckContainerCompleted = styled(CheckContainer)`
   border-color: #06c692;
   display: flex;
   align-items: center;
   justify-content: center;
`
const TickImage = styled.img`
    width: 12px;
`
const ItemContentCompleted = styled(ItemContent)`
    color: #06c692;
`


