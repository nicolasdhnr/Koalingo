import React from 'react';
import ReactDOM from 'react-dom';
import Progress_bar from "C:/Users/labas/Documents/GitHub/Koalingo/koalingo/src/components/progressBar/progressbar";
import { directiveLiteral, isTSAnyKeyword } from '@babel/types';
import { render, cleanup, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import rendered from "react-test-renderer"

afterEach(cleanup);

it ("progress Bar render without crashing", () => {
    render(<Progress_bar/>);
    const bar = screen.getByTestId("progressBar");
    expect(bar).toBeInTheDocument();
})
