import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoPage from './TodoPage';

describe('TodoPage', () => {
  test('should add a new item when the form is submitted', () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(<TodoPage />);

    const input = getByPlaceholderText('Add a new task');
    fireEvent.change(input, { target: { value: 'New task' } });

    const addButton = getByText('Add');
    fireEvent.click(addButton);

    const newItem = getByLabelText('New task');
    expect(newItem).toBeInTheDocument();
  });

  test('should toggle the done status of an item when clicked', () => {
    const { getByLabelText } = render(<TodoPage />);

    const input = getByLabelText('New task');
    fireEvent.click(input);

    expect(input).toBeChecked();
  });
});
