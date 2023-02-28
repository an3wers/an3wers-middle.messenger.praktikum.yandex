import { renderDom } from "./core/router";

window.addEventListener('DOMContentLoaded', () => {
    renderDom('#root', 'home')
})

// import { Modal } from './components/Modal/modal'

// // const Modal = require('./components/Modal/modal')


// const modalEditProfile = new Modal('#modal_edit_profile')
// const modalChangePassword = new Modal('#modal_edit_password')

// /*
//     Обработчики для модальных окон сделны временно,
//     на этапе первого спринта для того чтобы показать верстку
// */
// // Обработчики для модального окна изменения профиля
// document
//     .querySelector('#btn_edit_profile')
//     .addEventListener('click', () => modalEditProfile.open())

// document
//     .querySelector('#modal_edit_profile .modal__close')
//     .addEventListener('click', () => modalEditProfile.close())

// // Обработчики для модального окна изменения пароля
// document
//     .querySelector('#btn_edit_password')
//     .addEventListener('click', () => modalChangePassword.open())

// document
//     .querySelector('#modal_edit_password .modal__close')
//     .addEventListener('click', () => modalChangePassword.close())
