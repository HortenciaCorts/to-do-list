import styled from "styled-components";

type InputProps = {
    done: boolean
}


export const InputText = styled.input(({ done }: InputProps) => (
    `
    background: transparent;
    color: #fff;
    width: 100%;
    border: none;
    font-size: 18px;
    text-decoration: ${done ? 'line-through' : 'initial'};
    
    :read-only{
        outline: none;
    }

`
))
export const Container = styled.div
    `
    display: flex;
    justify-content: space-between;
    background-color: #20212C;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;

    div {
        display: flex;
        align-items: center;
    }
    
    div.information{
        width: 100%;
        margin: 0 5px;
    }

    input.checkbox {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    svg {
        cursor: pointer;
    }

    svg:last-child {
        margin-left: 6px;
    }

`
