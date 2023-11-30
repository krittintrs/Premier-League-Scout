import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLUB_LIST } from "../Services/Actions/ClubAction";
import Table from "../Table";
import { clubListAction } from "../Services/Actions/clubListAction";


const ScoreBoard = () => {
  const clubData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CLUB_LIST());
  }, [dispatch]);

  var matches = clubData?.ClubData?.matches ?? [];

  if (matches.length > 0) {
    matches = matches.filter((x) => x.score);
  }

  let firstTeam = [];
  let secondTeam = [];

  for (let i = 0; i < matches.length; i++) {
    let score1 = matches[i].score.ft[0];
    let score2 = matches[i].score.ft[1];
    firstTeam.push({
      name: matches[i].team1,
      played: 1,
      won: score1 > score2 ? 1 : 0,
      lost: score1 < score2 ? 1 : 0,
      draw: score1 == score2 ? 1 : 0,
      points: score1 > score2 ? 3 : score1 == score2 ? 1 : 0,
      date: matches[i].date,
    });

    secondTeam.push({
      played: 1,
      name: matches[i].team2,
      won: score2 > score1 ? 1 : 0,
      lost: score2 < score1 ? 1 : 0,
      draw: score1 == score2 ? 1 : 0,
      points: score2 > score1 ? 3 : score1 == score2 ? 1 : 0,
      date: matches[i].date,
    });
  }

  let combinedTeam = [...firstTeam, ...secondTeam].sort(function (a, b) {
    return (
      a?.date?.split("-")?.join(",")?.replace(/,/g, "") -
      b?.date?.split("-")?.join(",")?.replace(/,/g, "")
    );
  });

  var result = [];

  combinedTeam.reduce(function (res, value) {
    if (!res[value.name]) {
      res[value.name] = {
        name: value.name,
        played: 0,
        won: 0,
        lost: 0,
        draw: 0,
        points: 0,
        form: [],
      };
      result.push(res[value.name]);
    }

    res[value.name].played += value.played;
    res[value.name].won += value.won;
    res[value.name].lost += value.lost;
    res[value.name].draw += value.draw;
    res[value.name].points += value.points;
    if (res[value.name].form.length == 5) {
      res[value.name].form.shift();
    }
    res[value.name].form.push(value.points);

    return res;
  }, {});

  const [isOpen, setIsOpen] = useState({
    show: false,
    id: null,
  });
 
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(CLUB_LIST());
    }
    return () => {
      mounted = false;
    };
  }, []);

  const sortedClub = Object.values(result).sort(function (a, b) {
    return b.points - a.points;
  });

  return (
    <>
      <div className="container">
        <div className="title">
          <img src={"/images/logo.png"} alt={clubData?.ClubData?.name} />
          <h1>{clubData?.ClubData?.name}</h1>
        </div>

        <table className="table">
            clubData={sortedClub}
          
          
        </table>
      </div>

      
      
    </>
  );
};

export default ScoreBoard;