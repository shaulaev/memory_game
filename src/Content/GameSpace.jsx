import React from "react";
import Card from "./Card/Card";
import { useState, useEffect, useMemo } from "react";
import data from "./data.json";

export default function GameSpace() {
  const [card] = useState(data);

  const [randomizedCards, setRandomizedCards] = useState();

  useEffect(() => {
    setRandomizedCards(card.sort(() => Math.random() - 0.5));
  }, [card]);

  const [filterCards, setFilterCards] = useState([]);
  const [reaction, setReaction] = useState();
  const [final, setFinal] = useState([]);

  const checkingFunction = (card) => {
    setFilterCards([...filterCards, card]);
  };

  useMemo(() => {
    if (filterCards.length > 1) {
      if (
        filterCards[0].number === filterCards[1].number &&
        filterCards[0].id !== filterCards[1].id
      ) {
        setReaction(filterCards);
        setFinal([...final, filterCards]);
      } else {
        setReaction(false);
      }
      setFilterCards([]);
    }
  }, [filterCards, final]);

  const finals = final.flat();

  return (
    <div className="gameSpace">
      {randomizedCards &&
        randomizedCards.map((item) => {
          const isMatched =
            reaction &&
            reaction.find(({ number }) => {
              return number === item.number;
            }) !== undefined;
          const finalCards =
            finals &&
            finals.find(({ number }) => {
              return number === item.number;
            });
          return (
            <Card
              filter={filterCards}
              check={checkingFunction}
              key={item.id}
              card={item}
              isMatched={isMatched}
              final={finalCards}
            />
          );
        })}
    </div>
  );
}
