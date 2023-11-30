import React from "react";

import PremierLogo from "../../../assets/images/clubs/premier.png";

const TableBody = ({ clubData, handleOpenModal, setModalData }) => {
  const ClubList = () => (
    <tbody>
      {clubData.map((el, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td
            className="teams"
            onClick={() => {
              handleOpenModal(idx);
              setModalData(el);
            }}
          >
            <span>
              <img src={PremierLogo} alt={el.name} />
            </span>
            <span>{el.name}</span>
          </td>

          <td>{el.won}</td>
          <td>{el.draw}</td>
          <td>{el.lost}</td>
          <td>
            <strong>{el.points}</strong>
          </td>
          <td>
            <ul className="game_forms">
              {el.form.map((elm, idx) => {
                if (elm == 3) {
                  return (
                    <li key={idx} className="win">
                      W
                    </li>
                  );
                } else if (elm == 1) {
                  return (
                    <li key={idx} className="draw">
                      D
                    </li>
                  );
                } else {
                  return (
                    <li key={idx} className="lost">
                      L
                    </li>
                  );
                }
              })}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return <ClubList />;
};

const Headers = [
  {
    id: 0,
    title: "Position",
  },
  {
    id: 1,
    title: "Club",
  },
  {
    id: 2,
    title: "Played",
  },
  {
    id: 3,
    title: "Won",
  },
  {
    id: 4,
    title: "Drawn",
  },
  {
    id: 5,
    title: "Lost",
  },
 
  {
    id: 6,
    title: "Points",
  },

  {
    id: 7,
    title: "Form",
  },
];

const TableHead = () => {
  return (
    <thead>
      <tr>
        {Headers.map((el) => (
          <th key={el.id}>{el.title}</th>
        ))}
      </tr>
    </thead>
  );
};


export default Table;
