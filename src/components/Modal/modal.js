class Modal {
    constructor(el) {
        this.modal = document.querySelector(el);
        this.overlay = document.querySelector('.overlay');
    }

    open() {
        this.modal.classList.remove("hidden");
        this.overlay.classList.remove("hidden");
    }

    close() {
        this.modal.classList.add("hidden");
        this.overlay.classList.add("hidden");
    }
}

module.exports = Modal