import React, { useState, useEffect } from "react";
import avatar from "../images/avatar.jpg";
import api from "../utils/api.js";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditInfo,
  onAddPlace,
  onCardClick,
  onDeleteClick,
}) {
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [userName, setUserName] = useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = useState(
    "Исследователь океана"
  );
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getAllData()
      .then(([data, userData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile page__profile">
        {/* ПОПАП АВАТАРА */}
        <div className="profile__avatar-container">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={onEditAvatar}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="button profile__edit-button"
            type="button"
            onClick={onEditInfo}
          ></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить еще одно место"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places page__places">
        <ul className="places__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
