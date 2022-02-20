export default function Card({ card, onCardClick, onDeleteClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="place">
      <img
        className="place__photo popup__open-button"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button
            className="place__like-button"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        className="button place__remove-button"
        onClick={onDeleteClick}
      ></button>
    </li>
  );
}
