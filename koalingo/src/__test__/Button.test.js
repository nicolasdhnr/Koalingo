import React from 'react';
import ReactDOM from 'react-dom';
import Button from "C:/Users/labas/Documents/GitHub/Koalingo/koalingo/src/components/button/Button.js";
import { directiveLiteral, isTSAnyKeyword } from '@babel/types';
import { render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import rendered from "react-test-renderer"

afterEach(cleanup);

it ("render without crashing", () => {
    const {getByTestId} = render(<Button></Button>);
    expect(getByTestId('button')).toContainHTML("</button>")
})

it ("renders button text correctly", () => {
    const {getByTestId} = render(<Button btnText = "hello"></Button>);
    expect(getByTestId('button')).toHaveTextContent("hello")
})

it ("renders button style correctly", () => {
    const {getByTestId} = render(<Button btnText={"trial style"} btnStyle = "gold"></Button>);
    expect(getByTestId('button')).toHaveClass("gold btnLandscape undefined");
})

it ("renders button length correctly", () => {
    const {getByTestId} = render(<Button length = "btnMedium"></Button>);
    expect(getByTestId('button')).toHaveClass("white btnLandscape btnMedium");
})

it ("renders button length and style correctly", () => {
    const {getByTestId} = render(<Button btnStyle = "purple" length = "btnShort"></Button>);
    expect(getByTestId('button')).toHaveClass("purple btnLandscape btnShort");
})

it ("matches snapshot 1", () => {
    const tree = rendered.create (<Button btnText={"trial 1"}></Button> ).toJSON();
    expect(tree).toMatchSnapshot();
})

it ("matches snapshot 2", () => {
    const tree = rendered.create (<Button btnText={"trial 2"} btnStyle = "white"></Button> ).toJSON();
    expect(tree).toMatchSnapshot();
})

it ("matches snapshot 3", () => {
    const tree = rendered.create (<Button btnText={"trial 3"} 
    btnStyle = "purple" 
    length="btnMedium">
    </Button> ).toJSON();
    expect (tree).toMatchSnapshot();
})

it ("matches snapshot 4", () => {
    const tree = rendered.create (<Button 
        btnText={"trial 4"} 
        btnStyle="purple" 
        length="btnMedium">
    </Button>).toJSON();
    expect (tree).toMatchSnapshot();
})

