import { render, fireEvent } from '@testing-library/react';
import { handleToggle } from './AchievementsPage'; 

describe('handleToggle', () => {
  it('should toggle the showWeek state', () => {
    // Arrange
    const setShowWeek = jest.fn(); 
    const showWeek = false; 

    // Act
    handleToggle(setShowWeek, showWeek);

    // Assert
    expect(setShowWeek).toHaveBeenCalledWith(true); 
  });

  it('should update the data with the initial data based on the updated showWeek state', () => {
    // Arrange
    const setShowWeek = jest.fn();
    const showWeek = false;
    const getInitialData = jest.fn().mockReturnValueOnce('newData'); 

    // Act
    handleToggle(setShowWeek, showWeek, getInitialData);

    // Assert
    expect(getInitialData).toHaveBeenCalledWith(true); 
    expect(setData).toHaveBeenCalledWith('newData'); 
  });
});
