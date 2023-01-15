import React from 'react';
import ReactDOM from 'react-dom';
import RecWrapper from "C:/Users/labas/Documents/GitHub/Koalingo/koalingo/src/components/rectangleWrapper/Wrapper.js";
import { directiveLiteral, isTSAnyKeyword } from '@babel/types';
import { render, cleanup, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import rendered from "react-test-renderer"
import stylesLobby from "C:/Users/labas/Documents/GitHub/Koalingo/koalingo/src/pages/host/HostLobby.js";


afterEach(cleanup);

it ("wrapper render without crashing", () => {
    render(<RecWrapper/>);
    const wrap = screen.getByTestId("recWrapper");
    expect(wrap).toBeInTheDocument();
})

it ("wrapper renders text correctly", () => {
    render(<RecWrapper content = {"hello"} />);
    const wrap = screen.getByTestId("recWrapper");
    expect(wrap).toHaveTextContent("hello");
})

it ("wrapper renders size correctly", () => {
    render(<RecWrapper size = "small" />);
    const wrap = screen.getByTestId("recWrapper");
    expect(wrap).toHaveClass ("landscape undefined small undefined");
})

it ("wrapper renders shading correctly", () => {
    render(<RecWrapper shading={"shaded"} />);
    const wrap = screen.getByTestId("recWrapper");
    expect(wrap).toHaveClass ("landscape shaded undefined undefined");
})

it ("wrapper renders color correctly", () => {
    render(<RecWrapper color={"red"} />);
    const wrap = screen.getByTestId("recWrapper");
    expect(wrap).toHaveClass ("landscape undefined undefined red");
})

it ("wrapper matches snapshot", () => {
    const wrap = rendered.create (<RecWrapper
        content={
          <div className={stylesLobby.cardWrapper}>
            Set Timer
            <div className={stylesLobby.timerWrapper}>
              <b className={stylesLobby.timer}> 05 </b>
              <b className={stylesLobby.timer}> 00 </b>
            </div>
          </div>
        }
        size="medium"
      />).toJSON();
    expect (wrap).toMatchSnapshot();
})
