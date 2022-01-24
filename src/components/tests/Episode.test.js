import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


const testEpisode = {
    id:1,
    name: "Alieze",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "This is the summary",
    runtime: 1
}

const testEpisodeWithoutImage = {
    id:1,
    name: "",
    season: 1,
    number: 1,
    summary: "",
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>);
});

test("renders the summury test passed as prop", ()=>{
    render(<Episode episode={testEpisode}/>);
    let summary = screen.getByText(/this is the summary/i);
    expect(summary).toHaveTextContent('This is the summary');
    expect(summary).not.toBeNull();
    expect(summary).toBeInTheDocument();
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisodeWithoutImage}/>);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
})
