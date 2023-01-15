import React from 'react';
import {PlayerTracking} from "C:/Users/labas/Documents/GitHub/Koalingo/koalingo/src/components/Players.js";
import { render, cleanup, screen} from '@testing-library/react'
import '@testing-library/jest-dom'


afterEach(cleanup);

it ("player tracking render without crashing", () => {
    const n = ["Saab", "Volvo", "BMW"];
    const r = [0, 0, 0];
    render(<PlayerTracking names = {n} reported = {r} />);
    const play = screen.getByTestId("player");
    expect(play).toBeInTheDocument();
})

it ("Player tracking matches snapshot 1", () => {
    const n = ["Saab", "Volvo", "BMW"];
    const r = [0, 0, 0];
    render(<PlayerTracking names = {n} reported = {r} />);
    const play = screen.getByTestId("player");    
    expect(play).toMatchSnapshot();
})
