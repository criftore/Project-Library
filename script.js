const cardContainer = document.querySelector(".card-container");
const addBook = document.querySelector(".addBook");
const dialog = document.getElementById("my-dialog");
const bookForm = document.getElementById("bookForm");
const cDialog = document.getElementById("closeDialog");

function Book(title, author, pages, read, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover || "./c-logo.png";
  this.uId = crypto.randomUUID();
  this.info = console.log(
    `${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`,
  );
}

Book.prototype.isRead = function () {
  if (this.read === "yes") {
    this.read = "no";
  } else {
    this.read = "yes";
  }
};

Book.prototype.bookRead = function () {
  if (this.read === "yes") {
    return {
      text: "Already Read It",
      icon: `<img class="btnIcon" src="./eye-check-outline.svg">`,
    };
  } else {
    return {
      text: "Not Reading Yet",
      icon: `<img class="btnIcon" src="./eye-remove-outline.svg">`,
    };
  }
};

const myLibrary = [
  new Book(
    "Laskar Pelangi",
    "Andrea Hirata",
    529,
    "yes",
    "./Laskar_pelangi_sampul.jpg",
  ),
  new Book("Bumi", "Tere Liye", 440, "yes", "./bumi_sampul.jpg"),
  new Book(
    "Laut Bercerita",
    "Leila S. Chudori",
    379,
    "no",
    "./laut_bercerita_sampul.jpg",
  ),
];

function addBooktoLibrary(title, author, pages, read, cover) {
  const nBook = new Book(title, author, pages, read, cover);
  myLibrary.push(nBook);
  return nBook;
}

let displayLibrary = function (event) {
  console.table(event);
};

displayLibrary(myLibrary);

function render() {
  cardContainer.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const cardContent = document.createElement("div");
    cardContent.className = "cardContent";
    cardContainer.appendChild(cardContent);

    const bookCover = document.createElement("img");
    bookCover.className = "bookCover";
    cardContent.appendChild(bookCover);
    bookCover.src = myLibrary[i].cover;

    const bookTitle = document.createElement("div");
    bookTitle.className = "bookTitle";
    bookTitle.innerText = myLibrary[i].title;
    cardContent.appendChild(bookTitle);

    const bookAuthor = document.createElement("div");
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerText = myLibrary[i].author;
    cardContent.appendChild(bookAuthor);

    const bookPages = document.createElement("div");
    bookPages.className = "bookPages";
    bookPages.innerText = myLibrary[i].pages + " pages";
    cardContent.appendChild(bookPages);

    if (!myLibrary[i].uId) {
      myLibrary[i].uId = crypto.randomUUID();
    }
    cardContent.dataset.id = myLibrary[i].uId;

    const actionBtn = document.createElement("div");
    actionBtn.className = "actionBtn";
    const statusBook = document.createElement("div");
    statusBook.className = "statusBook";
    const statusBtn = document.createElement("button");
    statusBtn.className = "statusBtn";

    const statusRead = myLibrary[i].bookRead();

    statusBook.innerText = statusRead.text;
    statusBtn.innerHTML = statusRead.icon;

    cardContent.appendChild(statusBook);
    cardContent.appendChild(actionBtn);
    actionBtn.appendChild(statusBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = `<img class="btnIcon" src="./trash-can-outline.svg"/>`;
    actionBtn.appendChild(deleteBtn);

    console.log("Buku ke-" + (i + 1) + " adalah " + myLibrary[i].title);
  }
}

render();

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const bTitle = document.getElementById("bookTitle").value;
  const bAuthor = document.getElementById("bookAuthor").value;
  const bPages = document.getElementById("bookPages").value;
  const bStatus = document.getElementById("bookStatus").value;
  const bCover = document.getElementById("bookCover");
  const fileCover = bCover.files[0];

  let endCover = "./c-logo.png";

  if (fileCover) {
    if (!fileCover.type.startsWith("image/")) {
      alert("Eror: Hanya file gambar (.jpg, .png, .webp) yang diijinkan!");
      bCover.value = "";
      return;
    }
    endCover = URL.createObjectURL(fileCover);
  }

  addBooktoLibrary(bTitle, bAuthor, bPages, bStatus, endCover);
  render();
  bookForm.reset();
  dialog.close();
});

cDialog.addEventListener("click", () => {
  dialog.close();
});

cardContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".cardContent");
  if (!card) return;

  const targetId = card.dataset.id;
  const libraryIndex = myLibrary.findIndex((book) => book.uId === targetId);

  if (event.target.classList.contains("deleteBtn")) {
    if (libraryIndex !== -1) myLibrary.splice(libraryIndex, 1);
    card.remove();
  }
  if (event.target.classList.contains("statusBtn")) {
    if (libraryIndex !== -1) {
      myLibrary[libraryIndex].isRead();
      render();
    }
  }
});
