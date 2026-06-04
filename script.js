// Dom Selection Start

const cardContainer = document.querySelector(".cardContainer");
const addButton = document.querySelector(".addButton");
const myDialog = document.getElementById("myDialog");
const containerForm = document.getElementById("containerForm");
const closeDialog = document.getElementById("closeDialog");
const formCover = document.getElementById("formCover");
const formTitle = document.getElementById("formTitle");
const formAuthor = document.getElementById("formAuthor");
const formPages = document.getElementById("formPages");
const formStatus = document.getElementById("formStatus");

// Dom Selection End

// Book Constructor Start
function Book(title, author, pages, read, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover || "./c.logo.png";
  this.uId = crypto.randomUUID();
  this.info = console.log(
    `${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`,
  );
}
// Book Constructor End

// Book Prototype Start
Book.prototype.readTogle = function () {
  if (this.read === "yes") {
    this.read = "no";
  } else {
    this.read = "yes";
  }
};

Book.prototype.readStatus = function () {
  if (this.read === "yes") {
    return {
      text: "Already Read It",
      icon: `<img class="buttonIcon" src="./eye-remove-outline.svg">`,
    };
  } else {
    return {
      text: "Not Reading It",
      icon: `<img class="buttonIcon" src="./eye-check-outline.svg">`,
    };
  }
};
// Book Prototype End

// myLibrary Array Start
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
// myLibrary Array End

console.table(myLibrary);

// Function Store Book Start
function storeBook(title, author, pages, read, cover) {
  const newBook = new Book(title, author, pages, read, cover);
  myLibrary.push(newBook);
  return newBook;
}
// Function Store Book End

// Function Web Render and DOM Manipulation Start
function renderWeb() {
  cardContainer.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    // Create HTML element and its Class
    const cardContent = document.createElement("div");
    cardContent.className = "cardContent";
    const bookCover = document.createElement("img");
    bookCover.className = "bookCover";
    bookCover.src = myLibrary[i].cover;
    const bookTitle = document.createElement("div");
    bookTitle.className = "bookTitle";
    bookTitle.innerText = myLibrary[i].title;
    const bookAuthor = document.createElement("div");
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerText = myLibrary[i].author;
    const bookPages = document.createElement("div");
    bookPages.className = "bookPages";
    bookPages.innerText = myLibrary[i].pages + " pages";

    // Put Elemen On HTML
    cardContainer.appendChild(cardContent);
    cardContent.append(bookCover, bookTitle, bookAuthor, bookPages);

    // Initialize prototype readStatus
    const readStatus = myLibrary[i].readStatus();
    const statusBook = document.createElement("div");
    statusBook.className = "statusBook";
    statusBook.innerText = readStatus.text;
    const buttonBook = document.createElement("div");
    buttonBook.className = "buttonBook";
    cardContent.append(statusBook, buttonBook);

    // Button Book
    const statusButton = document.createElement("button");
    statusButton.className = "statusButton";
    statusButton.innerHTML = readStatus.icon;
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.innerHTML = `<img class="buttonIcon" src="./trash-can-outline.svg">`;
    buttonBook.append(statusButton, deleteButton);

    // Logic For uId
    if (!myLibrary[i].uId) {
      myLibrary[i].uId = crypto.randomUUID();
    }
    cardContent.dataset.id = myLibrary[i].uId;

    console.log("Buku ke-" + (i + 1) + " adalah " + myLibrary[i].title);
  }
}

renderWeb();
// Function Web Render and DOM Manipulation End

// Button Event Start
// CardContainer Button
cardContainer.addEventListener("click", (event) => {
  // Select button By id target
  const card = event.target.closest(".cardContent");
  if (!card) return;
  const targetId = card.dataset.id;
  const targetIndex = myLibrary.findIndex((book) => book.uId === targetId);

  // Delete Button
  if (event.target.classList.contains("deleteButton")) {
    if (targetIndex !== -1) myLibrary.splice(targetIndex, 1);
    card.remove();
  }
  //   Toggel Read Button
  if (event.target.classList.contains("statusButton")) {
    if (targetIndex !== -1) {
      myLibrary[targetIndex].readTogle();
      renderWeb();
    }
  }
});

// Container Button
containerForm.addEventListener("submit", (event) => {
  event.preventDefault();


 const title = formTitleElement.value;
  const author = formAuthorElement.value;
  const pages = formPagesElement.value;
  const status = formStatusElement.value

  //  Cover Default And Generator
  const fileCover = formCover.files[0];
  let endCover = "./c-logo.png";
  if (fileCover) {
    if (!fileCover.type.startsWith("image/")) {
      alert("Error: Hanya file gambar (.jpg, .png, .webp) yang dibolehkan!");
      formCover.value = "";
      return;
    }
    endCover = URL.createObjectURL(fileCover);
  }
  //Update Function for Store Book
  storeBook(title, author, pages, status, endCover);
  renderWeb();
  containerForm.reset();
  myDialog.closest();
});
// Close Dialog Button
closeDialog.addEventListener("click", () => {
  myDialog.close();
});

// Button Event End
