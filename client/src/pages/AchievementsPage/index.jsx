import React, { useState, useCallback } from 'react';
import { useTable } from 'react-table';

const AchievementsPage = () => {
  const [showWeek, setShowWeek] = useState(false);
  const [data, setData] = useState(getInitialData(showWeek));

  const columns = React.useMemo(
    () => [
      { Header: showWeek ? 'Days' : 'Months', accessor: 'time' },
      { Header: 'Tasks Received', accessor: 'tasksRequired' },
      { Header: 'Tasks Completed', accessor: 'tasksCompleted' },
      { Header: 'Points Earned', accessor: 'pointsEarned' },
      {
        Header: 'Comments',
        accessor: 'comments',
        Cell: ({ row }) => (
          <input
            value={row.original.comments}
            onChange={handleChange(row)}
          />
        ),
      },
    ],
    [showWeek]
  );

  function getInitialData(showWeek) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (showWeek) {
      return daysOfWeek.map((day) => ({
        time: day,
        tasksRequired: 0,
        tasksCompleted: 0,
        pointsEarned: 0,
        comments: '',
      }));
    } else {
      return monthsOfYear.map((month) => ({
        time: month,
        tasksRequired: 0,
        tasksCompleted: 0,
        pointsEarned: 0,
        comments: '',
      }));
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleToggle = () => {
    setShowWeek(!showWeek);
    setData(getInitialData(!showWeek));
  };

  const handleChange = useCallback(
    (row) => (e) => {
      const { value } = e.target;
      setData((prevData) => {
        const newData = [...prevData];
        newData[row.index].comments = value;
        return newData;
      });
    },
    []
  );

  return (
    <div>
      <h1>Achievements</h1>
      <button onClick={handleToggle}>Toggle</button>
      <table {...getTableProps()} style={{ borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                //   style={{
                //     borderBottom: 'solid 3px',
                //     background: 'aliceblue',
                //     fontWeight: 'bold',
                //   }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    // style={{
                    //   padding: '10px',
                    //   border: 'solid 1px gray',
                    //   background: 'white',
                    // }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AchievementsPage;
