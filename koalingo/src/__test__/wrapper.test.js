import React from 'react';
import RecWrapper from "C:/Users/labas/Documents/GitHub/Koalingo/koalingo/src/components/rectangleWrapper/Wrapper.js";
import { render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import rendered from "react-test-renderer"

afterEach(cleanup);

// it ("render without crashing", () => {
//     const div = document.createElement("div");
//     createRoot.render(<RecWrapper></RecWrapper>, div)
// })

it ("renders wrapper size correctly", () => {
    const {getByTestId} = render(<RecWrapper size = "small"></RecWrapper>);
    expect(getByTestId('recWrapper')).toHaveClass("landscape undefined small undefined");
})

it ("renders wrapper shading correctly", () => {
    const {getByTestId} = render(<RecWrapper shading = "shaded"></RecWrapper>);
    expect(getByTestId('recWrapper')).toHaveClass("landscape shaded undefined undefined");
})

it ("matches snapshot 1", () => {
    const wrap = rendered.create (<RecWrapper content={"trial 1"}></RecWrapper> ).toJSON();
    expect(wrap).toMatchSnapshot();
})