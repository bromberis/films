import React from "react";
import { useGlobalUserContext } from "../context/UserContext";
import FilmsTable from "./FilmsTable";
import "./Films.css";

function Films() {
  const { userData } = useGlobalUserContext();

  if (Object.keys(userData).length !== 0) {
    var userFilmsData = userData.films.map((item) => {
      return (
        <FilmsTable
          key={item._id}
          title={item.name}
          category={item.category}
          date={item.date}
          filmID={item._id}
        />
      );
    });
  }
  return (
    <table className="films-table">
      <thead>
        <tr>
          <th className="smaller-th">Filmas įvestas</th>
          <th>Pavadinimas</th>
          <th className="smaller-th">Žanras</th>
          <th className="smaller-th">Veksmai</th>
        </tr>
      </thead>
      <tbody>{userFilmsData}</tbody>
    </table>
  );
}

export default Films;
