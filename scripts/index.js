const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Elements

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector("#js-modal-form");

const addCardFormElement = addCardModal.querySelector("#js-card-form")

const modalPreviewImage = document.querySelector("#modal-image-preview");
const modalImagePreviewLink = modalPreviewImage.querySelector(
  ".modal__preview-image"
);
const modalPreviewTitle = modalPreviewImage.querySelector(
  ".modal__title-preview");


// Buttons and other DOM nodes 
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseModalButton = profileEditModal.querySelector("#modal-close-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardCloseModalButton = addCardModal.querySelector("#modal-close-button");
const buttonPreview = document.querySelector(".modal__close-preview");

// Profile Data 
const profileName = document.querySelector("#js-profile-title");
const profileSubtitle = document.querySelector("#js-profile-subtitle");

// Card Data 
const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");


// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModal();
}

function handleAddCardFormSubmit (e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({name, link}, cardsWrap);
  closeModal(addCardModal);
  addCardFormElement.reset();
}


//Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal){
   modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDescriptionEl = cardElement.querySelector(
    ".card__description-text"
  );
  const likeButton = cardElement.querySelector(".card__button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle('card__button_active');
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    deleteButton.classList.toggle("card__delete-button");
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImagePreviewLink.src = cardImageEl.src;
    modalImagePreviewLink.alt = cardImageEl.alt;
    modalPreviewTitle.textContent = cardDescriptionEl.textContent;
    openModal(modalPreviewImage);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardDescriptionEl.textContent = cardData.name;
  return cardElement;
}

//Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openModal(profileEditModal);
});
profileCloseModalButton.addEventListener("click",() => closeModal (profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Image Preview
buttonPreview.addEventListener("click", () => closeModal(modalPreviewImage));

// add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal))
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
addCardCloseModalButton.addEventListener("click", () => closeModal(addCardModal))


initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

