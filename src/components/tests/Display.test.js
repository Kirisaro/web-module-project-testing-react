import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');


const testShow = {
    name: "Test Show",
    image:{
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
        original: "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
        },
    seasons: [{id: 0, name: "Test Season 1", episodes: []},
                {id: 1, name: "Test Season 2", episodes: [{
                   
                    id:1,
                    name: "",
                    image: null,
                    season: 1,
                    number: 1,
                    summary: "Text to test if correct content is passed.",
                    runtime: 1
                }]},
                {id: 2, name: "Test Season 3", episodes: []}],
    summary: "Test summary text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi pariatur ratione quos itaque, tempore dolore iste aut veritatis provident dolorem debitis, amet accusamus, quam adipisci distinctio quod eligendi similique ipsum!" 
}

test('Display component renders without any passed in props', ()=>{
    render(<Display />);
    const imageSelector = screen.queryByAltText("header image");
    expect(imageSelector).toBeInTheDocument();
});


test("calls displayFunc when button is clicked", async ()=>{
    mockFetchShow.mockResolvedValue(testShow);
    const mockDisplayFunc = jest.fn();

    render(<Display displayFunc={mockDisplayFunc}/>)

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(()=>{
        expect(mockDisplayFunc.mock.calls.length === 1).toBeTruthy();
        expect(mockDisplayFunc.mock.calls.length).toBe(1);
        expect(mockDisplayFunc.mock.calls).toHaveLength(1);
        expect(mockDisplayFunc).toHaveBeenCalled();
    });
});