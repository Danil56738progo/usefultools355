let currentSlideIndex = 0; // Текущий индекс слайда в презентации

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tablinks").click(); // Открываем первую вкладку по умолчанию
});

// Функция для открытия вкладки и скрытия остальных
function openTab(event, tabName) {
  const tabContents = document.querySelectorAll(".tabcontent");
  tabContents.forEach((tabContent) => {
    tabContent.style.display = "none";
  });

  const tabLinks = document.querySelectorAll(".tablinks");
  tabLinks.forEach((tabLink) => {
    tabLink.classList.remove("active");
  });

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");

  if (tabName === "subjects") {
    loadSubjectsAndHomework();
  } else if (tabName === "diary") {
    // Действия для вкладки "Дневник"
  } else if (tabName === "presentation") {
    currentSlideIndex = 0;
    showSlide(currentSlideIndex);
  }
}

// Функция для сохранения записи в дневнике
function saveDiaryEntry() {
  const title = document.getElementById("diaryTitle").value;
  let date = document.getElementById("diaryDate").value;
  const content = document.getElementById("diaryContent").value;

  if (!date) {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    date = `${year}-${month}-${day}`;
  }

  if (!title || !content) {
    alert("Заголовок и текст записи не могут быть пустыми!");
    return;
  }

  const diaryEntries = document.getElementById("diaryEntries");
  const entry = document.createElement("div");
  entry.classList.add("diary-entry");
  entry.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="entry-info">
            <span class="entry-date">${date}</span>
            <div class="entry-controls">
                <button onclick="editDiaryEntry(this)">Редактировать</button>
                <button onclick="deleteDiaryEntry(this)">Удалить</button>
            </div>
        </div>
    `;
  diaryEntries.appendChild(entry);

  document.getElementById("diaryTitle").value = "";
  document.getElementById("diaryDate").value = "";
  document.getElementById("diaryContent").value = "";
}

// Функция для редактирования записи в дневнике
function editDiaryEntry(button) {
  const entry = button.closest(".diary-entry");
  const title = entry.querySelector("h3").textContent;
  const content = entry.querySelector("p").textContent;
  const date = entry.querySelector(".entry-date").textContent;

  document.getElementById("diaryTitle").value = title;
  document.getElementById("diaryDate").value = date;
  document.getElementById("diaryContent").value = content;

  entry.remove();
}

// Функция для удаления записи из дневника
function deleteDiaryEntry(button) {
  const entry = button.closest(".diary-entry");
  if (confirm("Вы уверены, что хотите удалить эту запись?")) {
    entry.remove();
  }
}

// Функция для загрузки предметов и домашнего задания
function loadSubjectsAndHomework() {
  const subjectsGrid = document.getElementById("subjectsGrid");
  subjectsGrid.innerHTML = "";

  const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
  daysOfWeek.forEach((day) => {
    const column = document.createElement("div");
    column.classList.add("subjects-column");
    column.innerHTML = `
            <div class="column-date">${day}</div>
        `;
    for (let i = 1; i <= 10; i++) {
      column.innerHTML += `
                <div class="subject-item">
                    <input type="text" class="subject-name" value="Предмет ${i}">
                    <textarea class="homework-textarea" placeholder="Домашнее задание"></textarea>
                    <div class="subject-controls">
                        <button onclick="editSubject(this)">Редактировать</button>
                        <button onclick="deleteSubject(this)">Удалить</button>
                    </div>
                </div>
            `;
    }
    subjectsGrid.appendChild(column);
  });
}

// Функция для редактирования названия предмета
function editSubject(button) {
  const subjectItem = button.closest(".subject-item");
  const subjectNameInput = subjectItem.querySelector(".subject-name");
  const subjectName = subjectNameInput.value.trim();

  if (!subjectName) {
    alert("Название предмета не может быть пустым!");
    return;
  }

  subjectNameInput.value = subjectName;
}

// Функция для удаления предмета
function deleteSubject(button) {
  const subjectItem = button.closest(".subject-item");
  if (confirm("Вы уверены, что хотите удалить этот предмет?")) {
    subjectItem.remove();
  }
}

// Функция для перехода на предыдущий слайд
function prevSlide() {
  const slides = document.querySelectorAll(".slide");
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
  }
}

// Функция для перехода на следующий слайд
function nextSlide() {
  const slides = document.querySelectorAll(".slide");
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }
}

// Функция для показа определенного слайда
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

// Функция для добавления нового слайда в презентацию
function newSlide() {
  const slidesContainer = document.getElementById("slidesContainer");
  const newSlide = document.createElement("div");
  newSlide.classList.add("slide");
  newSlide.innerHTML = `
        <h2>Новый слайд</h2>
        <div class="slide-content">
            <textarea class="slide-textarea" placeholder="Введите текст слайда..."></textarea>
            <input type="file" accept="image/*" class="slide-image-upload" onchange="handleImageUpload(event)" />
            <div class="slide-image-preview"></div>
            <div class="slide-controls">
                <button onclick="deleteSlide(this)">Удалить слайд</button>
            </div>
        </div>
    `;
  slidesContainer.appendChild(newSlide);
  currentSlideIndex = slidesContainer.children.length - 1;
  showSlide(currentSlideIndex);
}

// Функция для удаления слайда с подтверждением
function deleteSlide(button) {
  const slide = button.closest(".slide");
  if (confirm("Вы уверены, что хотите удалить этот слайд?")) {
    slide.remove();
    currentSlideIndex--; // Уменьшаем текущий индекс, если удалили текущий слайд
    showSlide(currentSlideIndex);
  }
}

// Функция для обработки загрузки изображения в слайд
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const slide = event.target.closest(".slide");
    const imagePreview = slide.querySelector(".slide-image-preview");
    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" />`;
  };
  reader.readAsDataURL(file);
}

let canvas,
  ctx,
  isDrawing = false,
  currentColor = "#000000",
  currentTool = "brush",
  brushSize = 5;

document.addEventListener("DOMContentLoaded", function () {
  setupCanvas();
});

function setupCanvas() {
  canvas = document.getElementById("drawCanvas");
  ctx = canvas.getContext("2d");

  const colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("change", function () {
    currentColor = this.value;
    ctx.strokeStyle = currentColor;
  });

  const brushSizeInput = document.getElementById("brushSize");
  brushSizeInput.addEventListener("change", function () {
    brushSize = parseInt(this.value);
    ctx.lineWidth = brushSize;
  });

  const toolsSelect = document.getElementById("tools");
  toolsSelect.addEventListener("change", function () {
    currentTool = this.value;
  });

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
}

function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize;
  if (currentTool === "eraser") {
    ctx.globalCompositeOperation = "destination-out"; // для ластика
  } else {
    ctx.globalCompositeOperation = "source-over"; // для кисти
  }
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
  const galleryContainer = document.getElementById("galleryContainer");
  const imageURL = canvas.toDataURL();
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("gallery-item");

  galleryItem.innerHTML = `
    <img src="${imageURL}" alt="Drawing" />
    <div class="gallery-controls">
      <button onclick="deleteGalleryItem(this)">Удалить</button>
    </div>
  `;

  galleryContainer.appendChild(galleryItem);
}

function deleteGalleryItem(button) {
  const galleryItem = button.closest(".gallery-item");
  galleryItem.remove();
}
// Функция для создания таблицы
function createTable() {
  const tableContainer = document.getElementById("tableContainer");
  const numRows = 3; // начальное количество строк
  const numCols = 3; // начальное количество столбцов

  let tableHtml = '<table id="mainTable">';
  for (let i = 0; i < numRows; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < numCols; j++) {
      tableHtml += `<td contenteditable="true">Ячейка ${i + 1}-${j + 1}</td>`;
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";

  tableContainer.innerHTML = tableHtml;
}

// Функция для добавления новой строки в таблицу
function addRow() {
  const table = document.getElementById("mainTable");
  if (!table) return;

  const newRow = table.insertRow();
  const numCols = table.rows[0].cells.length;

  for (let j = 0; j < numCols; j++) {
    const newCell = newRow.insertCell();
    newCell.contentEditable = true;
    newCell.textContent = `Новая ячейка`;
  }
}

// Функция для добавления нового столбца в таблицу
function addColumn() {
  const table = document.getElementById("mainTable");
  if (!table) return;

  const numRows = table.rows.length;

  for (let i = 0; i < numRows; i++) {
    const newCell = table.rows[i].insertCell();
    newCell.contentEditable = true;
    newCell.textContent = `Новая ячейка`;
  }
}

// Функция для удаления таблицы
function deleteTable() {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = ""; // Очищаем контейнер с таблицей
}

let calculatorInput = document.getElementById("calculatorInput");

function addToInput(value) {
  calculatorInput.value += value;
}

function clearInput() {
  calculatorInput.value = "";
}

function calculate() {
  try {
    calculatorInput.value = eval(calculatorInput.value);
  } catch (error) {
    calculatorInput.value = "Ошибка";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Открываем первую вкладку по умолчанию
  document.querySelector(".tablinks").click();
});

// Функция для загрузки карточек слов на выбранном языке
function loadLanguageCards() {
  const languageSelect = document.getElementById("languageSelect");
  const selectedLanguage = languageSelect.value;
  const flashcardsContainer = document.getElementById("flashcardsContainer");

  // Очищаем контейнер с карточками перед загрузкой новых
  flashcardsContainer.innerHTML = "";

  // Загрузка карточек слов в зависимости от выбранного языка
  const languageData = getLanguageData(selectedLanguage); // Функция для получения данных по выбранному языку

  languageData.forEach((cardData) => {
    const card = createFlashcard(
      cardData.word,
      cardData.translation,
      cardData.audioUrl
    );
    flashcardsContainer.appendChild(card);
  });
}

// Функция для создания карточки слова
function createFlashcard(word, translation, audioUrl) {
  const card = document.createElement("div");
  card.classList.add("flashcard");
  card.innerHTML = `
      <div class="word">${word}</div>
      <div class="translation">${translation}</div>
 
    `;
  return card;
}

// Функция для проигрывания аудио
function playAudio(audioUrl) {
  // Здесь добавьте код для проигрывания аудио по переданному URL
}

// Функция для получения данных по выбранному языку
function getLanguageData(language) {
  // Верните данные слов для выбранного языка, например, массив объектов с полями word, translation и audioUrl
  if (language === "polish") {
    return [
      {
        word: "Dzień dobry",
        translation: "Добрый день",
        audioUrl: "path_to_polish_audio_1.mp3",
      },
      {
        word: "Jak się masz?",
        translation: "Как дела?",
        audioUrl: "path_to_polish_audio_2.mp3",
      },
      {
        word: "Dziękuję bardzo",
        translation: "Большое спасибо",
        audioUrl: "path_to_polish_audio_3.mp3",
      },
      {
        word: "Przepraszam",
        translation: "Извините",
        audioUrl: "path_to_polish_audio_4.mp3",
      },
      {
        word: "Proszę",
        translation: "Пожалуйста",
        audioUrl: "path_to_polish_audio_5.mp3",
      },
      {
        word: "Mam na imię Anna",
        translation: "Меня зовут Анна",
        audioUrl: "path_to_polish_audio_6.mp3",
      },
      {
        word: "Gdzie jest toaleta?",
        translation: "Где туалет?",
        audioUrl: "path_to_polish_audio_7.mp3",
      },
      {
        word: "Ile to kosztuje?",
        translation: "Сколько это стоит?",
        audioUrl: "path_to_polish_audio_8.mp3",
      },
      {
        word: "Możesz mi pomóc?",
        translation: "Ты можешь мне помочь?",
        audioUrl: "path_to_polish_audio_9.mp3",
      },
      {
        word: "Lubię czytać książki",
        translation: "Я люблю читать книги",
        audioUrl: "path_to_polish_audio_10.mp3",
      },
      {
        word: "To jest mój przyjaciel",
        translation: "Это мой друг",
        audioUrl: "path_to_polish_audio_11.mp3",
      },
      {
        word: "Mieszkam w Warszawie",
        translation: "Я живу в Варшаве",
        audioUrl: "path_to_polish_audio_12.mp3",
      },
      {
        word: "Kocham cię",
        translation: "Я люблю тебя",
        audioUrl: "path_to_polish_audio_13.mp3",
      },
      {
        word: "Jestem głodny",
        translation: "Я голоден",
        audioUrl: "path_to_polish_audio_14.mp3",
      },
      {
        word: "Chcę się napić wody",
        translation: "Я хочу выпить воды",
        audioUrl: "path_to_polish_audio_15.mp3",
      },
      {
        word: "Mam kota",
        translation: "У меня есть кот",
        audioUrl: "path_to_polish_audio_16.mp3",
      },
      {
        word: "Lubię spacerować",
        translation: "Мне нравится гулять",
        audioUrl: "path_to_polish_audio_17.mp3",
      },
      {
        word: "Czy możesz powtórzyć?",
        translation: "Можешь повторить?",
        audioUrl: "path_to_polish_audio_18.mp3",
      },
      {
        word: "Nie rozumiem",
        translation: "Я не понимаю",
        audioUrl: "path_to_polish_audio_19.mp3",
      },
      {
        word: "Mówisz po angielsku?",
        translation: "Ты говоришь по-английски?",
        audioUrl: "path_to_polish_audio_20.mp3",
      },
      {
        word: "Gdzie jest najbliższy bank?",
        translation: "Где ближайший банк?",
        audioUrl: "path_to_polish_audio_21.mp3",
      },
      {
        word: "Możemy spotkać się później?",
        translation: "Мы можем встретиться позже?",
        audioUrl: "path_to_polish_audio_22.mp3",
      },
      {
        word: "Jestem zmęczony",
        translation: "Я устал",
        audioUrl: "path_to_polish_audio_23.mp3",
      },
      {
        word: "To jest bardzo smaczne",
        translation: "Это очень вкусно",
        audioUrl: "path_to_polish_audio_24.mp3",
      },
      {
        word: "Czy mogę prosić o menu?",
        translation: "Можно меню, пожалуйста?",
        audioUrl: "path_to_polish_audio_25.mp3",
      },
      {
        word: "Jestem studentem",
        translation: "Я студент",
        audioUrl: "path_to_polish_audio_26.mp3",
      },
      {
        word: "Lubię muzykę",
        translation: "Мне нравится музыка",
        audioUrl: "path_to_polish_audio_27.mp3",
      },
      {
        word: "To jest moja mama",
        translation: "Это моя мама",
        audioUrl: "path_to_polish_audio_28.mp3",
      },
      {
        word: "Nie wiem",
        translation: "Я не знаю",
        audioUrl: "path_to_polish_audio_29.mp3",
      },
      {
        word: "Czy to jest twoje?",
        translation: "Это твое?",
        audioUrl: "path_to_polish_audio_30.mp3",
      },
      {
        word: "Mam pytanie",
        translation: "У меня есть вопрос",
        audioUrl: "path_to_polish_audio_31.mp3",
      },
      {
        word: "Czy mogę prosić o rachunek?",
        translation: "Можно счет, пожалуйста?",
        audioUrl: "path_to_polish_audio_32.mp3",
      },
      {
        word: "To jest mój brat",
        translation: "Это мой брат",
        audioUrl: "path_to_polish_audio_33.mp3",
      },
      {
        word: "Jestem zmęczony",
        translation: "Я устал",
        audioUrl: "path_to_polish_audio_34.mp3",
      },
      {
        word: "Lubię oglądać filmy",
        translation: "Мне нравится смотреть фильмы",
        audioUrl: "path_to_polish_audio_35.mp3",
      },
      {
        word: "Czy to jest daleko?",
        translation: "Это далеко?",
        audioUrl: "path_to_polish_audio_36.mp3",
      },
      {
        word: "Mam ochotę na kawę",
        translation: "Я хочу кофе",
        audioUrl: "path_to_polish_audio_37.mp3",
      },
      {
        word: "Gdzie jest najbliższy szpital?",
        translation: "Где ближайшая больница?",
        audioUrl: "path_to_polish_audio_38.mp3",
      },
      {
        word: "Chcę zamówić taksówkę",
        translation: "Я хочу заказать такси",
        audioUrl: "path_to_polish_audio_39.mp3",
      },
      {
        word: "Czy to jest twój samochód?",
        translation: "Это твоя машина?",
        audioUrl: "path_to_polish_audio_40.mp3",
      },
      {
        word: "Jestem gotowy",
        translation: "Я готов",
        audioUrl: "path_to_polish_audio_41.mp3",
      },
      {
        word: "Gdzie jest wyjście?",
        translation: "Где выход?",
        audioUrl: "path_to_polish_audio_42.mp3",
      },
      {
        word: "To jest bardzo interesujące",
        translation: "Это очень интересно",
        audioUrl: "path_to_polish_audio_43.mp3",
      },
      {
        word: "Lubię podróżować",
        translation: "Мне нравится путешествовать",
        audioUrl: "path_to_polish_audio_44.mp3",
      },
      {
        word: "Czy możesz mi pomóc?",
        translation: "Ты можешь мне помочь?",
        audioUrl: "path_to_polish_audio_45.mp3",
      },
      {
        word: "Jestem tutaj na wakacjach",
        translation: "Я здесь на каникулах",
        audioUrl: "path_to_polish_audio_46.mp3",
      },
      {
        word: "To jest mój numer telefonu",
        translation: "Это мой номер телефона",
        audioUrl: "path_to_polish_audio_47.mp3",
      },
      {
        word: "Mam rezerwację",
        translation: "У меня есть бронь",
        audioUrl: "path_to_polish_audio_48.mp3",
      },
      {
        word: "Chcę kupić bilet",
        translation: "Я хочу купить билет",
        audioUrl: "path_to_polish_audio_49.mp3",
      },
      {
        word: "Gdzie jest dworzec kolejowy?",
        translation: "Где находится железнодорожный вокзал?",
        audioUrl: "path_to_polish_audio_50.mp3",
      },
      {
        word: "Dzień dobry",
        translation: "Добрый день",
        audioUrl: "path_to_polish_audio_1.mp3",
      },
      {
        word: "Jak się masz?",
        translation: "Как дела?",
        audioUrl: "path_to_polish_audio_2.mp3",
      },
      {
        word: "Dziękuję bardzo",
        translation: "Большое спасибо",
        audioUrl: "path_to_polish_audio_3.mp3",
      },
      // ... (остальные простые предложения)
      {
        word: "Gdzie jest dworzec kolejowy?",
        translation: "Где находится железнодорожный вокзал?",
        audioUrl: "path_to_polish_audio_50.mp3",
      },
      // Сложные предложения
      {
        word: "Czy mogę zarezerwować stolik na dzisiejszy wieczór?",
        translation: "Могу ли я забронировать столик на сегодняшний вечер?",
        audioUrl: "path_to_polish_audio_51.mp3",
      },
      {
        word: "Czy wiesz, gdzie mogę znaleźć aptekę otwartą całą dobę?",
        translation:
          "Ты знаешь, где можно найти аптеку, которая работает круглосуточно?",
        audioUrl: "path_to_polish_audio_52.mp3",
      },
      {
        word: "Chciałbym zamówić coś wegetariańskiego z menu, co polecasz?",
        translation:
          "Я бы хотел заказать что-то вегетарианское из меню, что ты порекомендуешь?",
        audioUrl: "path_to_polish_audio_53.mp3",
      },
      {
        word: "Czy mógłbyś mi powiedzieć, jak dojechać do najbliższej stacji metra?",
        translation:
          "Можешь мне сказать, как доехать до ближайшей станции метро?",
        audioUrl: "path_to_polish_audio_54.mp3",
      },
      {
        word: "Czy mogę prosić o dodatkową poduszkę do pokoju?",
        translation: "Можно мне дополнительную подушку в комнату?",
        audioUrl: "path_to_polish_audio_55.mp3",
      },
      {
        word: "Gdzie mogę kupić bilety na jutrzejszy koncert?",
        translation: "Где я могу купить билеты на завтрашний концерт?",
        audioUrl: "path_to_polish_audio_56.mp3",
      },
      {
        word: "Czy mogę prosić o pomoc w wypełnieniu tego formularza?",
        translation: "Можно мне помощь в заполнении этой формы?",
        audioUrl: "path_to_polish_audio_57.mp3",
      },
      {
        word: "Czy mogę zobaczyć twój dowód osobisty?",
        translation: "Могу я увидеть твое удостоверение личности?",
        audioUrl: "path_to_polish_audio_58.mp3",
      },
      {
        word: "Jaki jest najkrótszy sposób dotarcia do centrum miasta?",
        translation: "Какой самый короткий путь до центра города?",
        audioUrl: "path_to_polish_audio_59.mp3",
      },
      {
        word: "Czy mogę zarezerwować pokój z widokiem na morze?",
        translation: "Можно забронировать комнату с видом на море?",
        audioUrl: "path_to_polish_audio_60.mp3",
      },
      {
        word: "Czy możesz mi powiedzieć, ile kosztuje wynajęcie samochodu na jeden dzień?",
        translation:
          "Ты можешь мне сказать, сколько стоит аренда машины на один день?",
        audioUrl: "path_to_polish_audio_61.mp3",
      },
      {
        word: "Czy jest możliwość przedłużenia terminu płatności?",
        translation: "Есть возможность продления срока оплаты?",
        audioUrl: "path_to_polish_audio_62.mp3",
      },
      {
        word: "Czy mogę prosić o wycenę na wykonanie tej usługi?",
        translation: "Можно мне смету на выполнение этой услуги?",
        audioUrl: "path_to_polish_audio_63.mp3",
      },
      {
        word: "Czy mogę zadać kilka pytań dotyczących tego projektu?",
        translation:
          "Могу я задать несколько вопросов касательно этого проекта?",
        audioUrl: "path_to_polish_audio_64.mp3",
      },
      {
        word: "Czy mógłbyś mi powiedzieć, jakie są warunki wynajmu mieszkania?",
        translation: "Можешь мне сказать, какие условия аренды квартиры?",
        audioUrl: "path_to_polish_audio_65.mp3",
      },
      {
        word: "Jakie dokumenty są potrzebne do założenia konta bankowego?",
        translation: "Какие документы нужны для открытия банковского счета?",
        audioUrl: "path_to_polish_audio_66.mp3",
      },
      {
        word: "Czy możesz mi powiedzieć, gdzie mogę znaleźć najbliższą stację benzynową?",
        translation: "Можешь мне сказать, где находится ближайшая заправка?",
        audioUrl: "path_to_polish_audio_67.mp3",
      },
      {
        word: "Czy mogę prosić o informację, jakie są opcje transportu publicznego w tym mieście?",
        translation:
          "Можно мне информацию о вариантах общественного транспорта в этом городе?",
        audioUrl: "path_to_polish_audio_68.mp3",
      },
      {
        word: "Czy mogę umówić się na spotkanie z lekarzem na jutro rano?",
        translation: "Могу я записаться на прием к врачу на завтра утром?",
        audioUrl: "path_to_polish_audio_69.mp3",
      },
      {
        word: "Czy mogę prosić o przesłanie faktury na mój adres e-mail?",
        translation: "Можно выслать счет-фактуру на мой электронный адрес?",
        audioUrl: "path_to_polish_audio_70.mp3",
      },
      {
        word: "Czy mogę zamówić usługę dostawy jedzenia do domu?",
        translation: "Можно заказать доставку еды на дом?",
        audioUrl: "path_to_polish_audio_71.mp3",
      },
      {
        word: "Czy mogę prosić o więcej informacji na temat tego kursu językowego?",
        translation: "Можно мне больше информации о данном языковом курсе?",
        audioUrl: "path_to_polish_audio_72.mp3",
      },
      {
        word: "Czy mogę zarezerwować wizytę u fryzjera na jutro?",
        translation: "Можно записаться к парикмахеру на завтра?",
        audioUrl: "path_to_polish_audio_73.mp3",
      },
      {
        word: "Jakie są godziny otwarcia najbliższego supermarketu?",
        translation: "Каковы часы работы ближайшего супермаркета?",
        audioUrl: "path_to_polish_audio_74.mp3",
      },
      {
        word: "Czy mogę prosić o pomoc przy wyborze odpowiedniego produktu?",
        translation: "Можно мне помощь в выборе подходящего продукта?",
        audioUrl: "path_to_polish_audio_75.mp3",
      },
      {
        word: "Czy mogę umówić się na spotkanie w sprawie pracy na jutro?",
        translation:
          "Могу я договориться о встрече по поводу работы на завтра?",
        audioUrl: "path_to_polish_audio_76.mp3",
      },
      {
        word: "Czy mogę prosić o sprawdzenie stanu mojego konta?",
        translation: "Можно проверить состояние моего счета?",
        audioUrl: "path_to_polish_audio_77.mp3",
      },
      {
        word: "Czy mogę prosić o pokazanie drogi do najbliższego hotelu?",
        translation: "Можно показать дорогу до ближайшего отеля?",
        audioUrl: "path_to_polish_audio_78.mp3",
      },
      {
        word: "Jakie są opcje płatności za ten produkt?",
        translation: "Какие есть варианты оплаты за этот продукт?",
        audioUrl: "path_to_polish_audio_79.mp3",
      },
      {
        word: "Czy mogę prosić o szczegółowe informacje na temat tego produktu?",
        translation: "Можно мне подробную информацию об этом продукте?",
        audioUrl: "path_to_polish_audio_80.mp3",
      },
      {
        word: "Jakie są zasady zwrotu towaru w tym sklepie?",
        translation: "Каковы правила возврата товара в этом магазине?",
        audioUrl: "path_to_polish_audio_81.mp3",
      },
      {
        word: "Czy mogę prosić o podanie numeru telefonu do działu obsługi klienta?",
        translation: "Можно мне номер телефона службы поддержки клиентов?",
        audioUrl: "path_to_polish_audio_82.mp3",
      },
      {
        word: "Jakie są koszty wysyłki tego produktu do Rosji?",
        translation: "Каковы расходы на доставку этого продукта в Россию?",
        audioUrl: "path_to_polish_audio_83.mp3",
      },
      {
        word: "Czy mogę prosić o przepis na to danie?",
        translation: "Можно рецепт этого блюда?",
        audioUrl: "path_to_polish_audio_84.mp3",
      },
      {
        word: "Czy mogę zarezerwować bilet na następny pociąg do Krakowa?",
        translation: "Можно забронировать билет на следующий поезд до Кракова?",
        audioUrl: "path_to_polish_audio_85.mp3",
      },
      {
        word: "Czy możesz mi powiedzieć, jakie są godziny pracy tego muzeum?",
        translation: "Ты можешь мне сказать, какие часы работы этого музея?",
        audioUrl: "path_to_polish_audio_86.mp3",
      },
      {
        word: "Czy mogę prosić o podanie mi listy dostępnych usług?",
        translation: "Можно мне список доступных услуг?",
        audioUrl: "path_to_polish_audio_87.mp3",
      },
      {
        word: "Czy mogę prosić o przesłanie mi katalogu produktów?",
        translation: "Можно мне каталог продуктов?",
        audioUrl: "path_to_polish_audio_88.mp3",
      },
      {
        word: "Czy mogę zarezerwować miejsce na warsztaty kulinarne?",
        translation: "Можно забронировать место на кулинарные мастер-классы?",
        audioUrl: "path_to_polish_audio_89.mp3",
      },
      {
        word: "Czy mogę prosić o więcej informacji na temat tej wycieczki?",
        translation: "Можно мне больше информации о данном туре?",
        audioUrl: "path_to_polish_audio_90.mp3",
      },
      {
        word: "Czy mogę umówić się na spotkanie z menedżerem w sprawie współpracy?",
        translation:
          "Могу я договориться о встрече с менеджером по поводу сотрудничества?",
        audioUrl: "path_to_polish_audio_91.mp3",
      },
      {
        word: "Czy mogę prosić o zwrot pieniędzy za ten produkt?",
        translation: "Можно возврат денег за этот продукт?",
        audioUrl: "path_to_polish_audio_92.mp3",
      },
      {
        word: "Jakie są wymagania dotyczące pracy na tym stanowisku?",
        translation: "Каковы требования для работы на этой должности?",
        audioUrl: "path_to_polish_audio_93.mp3",
      },
      {
        word: "Czy mogę zarezerwować pokój z widokiem na góry?",
        translation: "Можно забронировать комнату с видом на горы?",
        audioUrl: "path_to_polish_audio_94.mp3",
      },
      {
        word: "Czy możesz mi powiedzieć, gdzie znajduje się najbliższy bankomat?",
        translation: "Можешь мне сказать, где находится ближайший банкомат?",
        audioUrl: "path_to_polish_audio_95.mp3",
      },
      {
        word: "Czy mogę prosić o wystawienie faktury VAT za ten zakup?",
        translation: "Можно мне счет-фактуру за эту покупку?",
        audioUrl: "path_to_polish_audio_96.mp3",
      },
      {
        word: "Czy mogę zarezerwować wizytę u dentysty na przyszły tydzień?",
        translation: "Можно записаться к стоматологу на следующую неделю?",
        audioUrl: "path_to_polish_audio_97.mp3",
      },
      {
        word: "Czy mogę prosić o pomoc w znalezieniu odpowiedniego produktu?",
        translation: "Можно мне помощь в поиске подходящего продукта?",
        audioUrl: "path_to_polish_audio_98.mp3",
      },
      {
        word: "Jakie są opcje dostawy tego produktu do mojego kraju?",
        translation:
          "Какие есть варианты доставки этого продукта в мою страну?",
        audioUrl: "path_to_polish_audio_99.mp3",
      },
      {
        word: "Czy mogę prosić o więcej informacji na temat tego kursu?",
        translation: "Можно мне больше информации об этом курсе?",
        audioUrl: "path_to_polish_audio_100.mp3",
      },
      // Другие слова для польского языка
    ];
  } else if (language === "english") {
    return [
      // Простые предложения
      {
        word: "Good morning",
        translation: "Доброе утро",
        audioUrl: "path_to_english_audio_1.mp3",
      },
      {
        word: "How are you?",
        translation: "Как дела?",
        audioUrl: "path_to_english_audio_2.mp3",
      },
      {
        word: "Thank you very much",
        translation: "Большое спасибо",
        audioUrl: "path_to_english_audio_3.mp3",
      },
      // ... (остальные простые предложения)
      {
        word: "Where is the train station?",
        translation: "Где находится железнодорожный вокзал?",
        audioUrl: "path_to_english_audio_50.mp3",
      },
      // Сложные предложения
      {
        word: "Could I book a table for this evening?",
        translation: "Могу ли я забронировать столик на сегодняшний вечер?",
        audioUrl: "path_to_english_audio_51.mp3",
      },
      {
        word: "Do you know where I can find a pharmacy open 24 hours?",
        translation: "Ты знаешь, где можно найти круглосуточную аптеку?",
        audioUrl: "path_to_english_audio_52.mp3",
      },
      {
        word: "I would like to order something vegetarian from the menu, what do you recommend?",
        translation:
          "Я бы хотел заказать что-то вегетарианское из меню, что ты порекомендуешь?",
        audioUrl: "path_to_english_audio_53.mp3",
      },
      {
        word: "Could you tell me how to get to the nearest metro station?",
        translation:
          "Ты можешь сказать, как доехать до ближайшей станции метро?",
        audioUrl: "path_to_english_audio_54.mp3",
      },
      {
        word: "Can I request an extra pillow for the room?",
        translation: "Можно попросить дополнительную подушку в комнату?",
        audioUrl: "path_to_english_audio_55.mp3",
      },
      {
        word: "Where can I buy tickets for tomorrow's concert?",
        translation: "Где я могу купить билеты на завтрашний концерт?",
        audioUrl: "path_to_english_audio_56.mp3",
      },
      {
        word: "Could you help me fill out this form?",
        translation: "Ты можешь помочь мне заполнить эту форму?",
        audioUrl: "path_to_english_audio_57.mp3",
      },
      {
        word: "May I see your ID, please?",
        translation: "Можно увидеть твое удостоверение личности?",
        audioUrl: "path_to_english_audio_58.mp3",
      },
      {
        word: "What is the quickest way to get to the city center?",
        translation: "Какой самый короткий путь до центра города?",
        audioUrl: "path_to_english_audio_59.mp3",
      },
      {
        word: "Can I book a room with a sea view?",
        translation: "Можно забронировать комнату с видом на море?",
        audioUrl: "path_to_english_audio_60.mp3",
      },
      {
        word: "Could you tell me how much it costs to rent a car for a day?",
        translation:
          "Ты можешь сказать, сколько стоит аренда машины на один день?",
        audioUrl: "path_to_english_audio_61.mp3",
      },
      {
        word: "Is it possible to extend the payment deadline?",
        translation: "Есть возможность продления срока оплаты?",
        audioUrl: "path_to_english_audio_62.mp3",
      },
      {
        word: "May I ask for a quote for this service?",
        translation: "Можно запросить смету на выполнение этой услуги?",
        audioUrl: "path_to_english_audio_63.mp3",
      },
      {
        word: "Can I ask a few questions about this project?",
        translation:
          "Могу я задать несколько вопросов касательно этого проекта?",
        audioUrl: "path_to_english_audio_64.mp3",
      },
      {
        word: "Could you tell me what the rental conditions are for this apartment?",
        translation: "Ты можешь сказать, какие условия аренды квартиры?",
        audioUrl: "path_to_english_audio_65.mp3",
      },
      {
        word: "What documents are required to open a bank account?",
        translation: "Какие документы нужны для открытия банковского счета?",
        audioUrl: "path_to_english_audio_66.mp3",
      },
      {
        word: "Could you tell me where the nearest gas station is?",
        translation: "Ты можешь сказать, где находится ближайшая заправка?",
        audioUrl: "path_to_english_audio_67.mp3",
      },
      {
        word: "Can I get information about public transportation options in this city?",
        translation:
          "Можно получить информацию о вариантах общественного транспорта в этом городе?",
        audioUrl: "path_to_english_audio_68.mp3",
      },
      {
        word: "Can I make an appointment with a doctor for tomorrow morning?",
        translation: "Можно записаться на прием к врачу на завтра утром?",
        audioUrl: "path_to_english_audio_69.mp3",
      },
      {
        word: "Can I request to have the invoice sent to my email address?",
        translation: "Можно выслать счет-фактуру на мой электронный адрес?",
        audioUrl: "path_to_english_audio_70.mp3",
      },
      {
        word: "Can I order a food delivery service to my home?",
        translation: "Можно заказать доставку еды на дом?",
        audioUrl: "path_to_english_audio_71.mp3",
      },
      {
        word: "Can I get more information about this language course?",
        translation:
          "Можно получить больше информации о данном языковом курсе?",
        audioUrl: "path_to_english_audio_72.mp3",
      },
      {
        word: "Can I book an appointment with the hairdresser for tomorrow?",
        translation: "Можно записаться к парикмахеру на завтра?",
        audioUrl: "path_to_english_audio_73.mp3",
      },
      {
        word: "What are the opening hours of the nearest supermarket?",
        translation: "Каковы часы работы ближайшего супермаркета?",
        audioUrl: "path_to_english_audio_74.mp3",
      },
      {
        word: "Can I get help choosing the right product?",
        translation: "Можно получить помощь в выборе подходящего продукта?",
        audioUrl: "path_to_english_audio_75.mp3",
      },
      {
        word: "Can I make an appointment for a job interview tomorrow?",
        translation: "Можно договориться о встрече по поводу работы на завтра?",
        audioUrl: "path_to_english_audio_76.mp3",
      },
      {
        word: "Can I get my account balance checked, please?",
        translation: "Можно проверить состояние моего счета?",
        audioUrl: "path_to_english_audio_77.mp3",
      },
      {
        word: "Can you show me the way to the nearest hotel?",
        translation: "Можешь показать дорогу до ближайшего отеля?",
        audioUrl: "path_to_english_audio_78.mp3",
      },
      {
        word: "What are the payment options for this product?",
        translation: "Какие есть варианты оплаты за этот продукт?",
        audioUrl: "path_to_english_audio_79.mp3",
      },
      {
        word: "Can I get detailed information about this product?",
        translation: "Можно получить подробную информацию об этом продукте?",
        audioUrl: "path_to_english_audio_80.mp3",
      },
      {
        word: "What are the return policies of this store?",
        translation: "Каковы правила возврата товара в этом магазине?",
        audioUrl: "path_to_english_audio_81.mp3",
      },
      {
        word: "Can I get the customer service phone number?",
        translation: "Можно получить номер телефона службы поддержки клиентов?",
        audioUrl: "path_to_english_audio_82.mp3",
      },
      {
        word: "What are the shipping costs for this product to Russia?",
        translation: "Каковы расходы на доставку этого продукта в Россию?",
        audioUrl: "path_to_english_audio_83.mp3",
      },
      {
        word: "Can I get the recipe for this dish?",
        translation: "Можно получить рецепт этого блюда?",
        audioUrl: "path_to_english_audio_84.mp3",
      },
      {
        word: "Can I book a ticket for the next train to Krakow?",
        translation: "Можно забронировать билет на следующий поезд до Кракова?",
        audioUrl: "path_to_english_audio_85.mp3",
      },
      {
        word: "Can you tell me what the museum's opening hours are?",
        translation: "Ты можешь сказать, какие часы работы этого музея?",
        audioUrl: "path_to_english_audio_86.mp3",
      },
      {
        word: "Can I ask for a list of available services?",
        translation: "Можно мне список доступных услуг?",
        audioUrl: "path_to_english_audio_87.mp3",
      },
      {
        word: "Can I ask for a product catalog?",
        translation: "Можно мне каталог продуктов?",
        audioUrl: "path_to_english_audio_88.mp3",
      },
      {
        word: "Can I book a spot for the cooking workshop?",
        translation: "Можно забронировать место на кулинарные мастер-классы?",
        audioUrl: "path_to_english_audio_89.mp3",
      },
      {
        word: "Can I get more information about this tour?",
        translation: "Можно мне больше информации о данном туре?",
        audioUrl: "path_to_english_audio_90.mp3",
      },
      {
        word: "Can I arrange a meeting with the manager about a collaboration?",
        translation:
          "Могу я договориться о встрече с менеджером по поводу сотрудничества?",
        audioUrl: "path_to_english_audio_91.mp3",
      },
      {
        word: "Can I request a refund for this product?",
        translation: "Можно возврат денег за этот продукт?",
        audioUrl: "path_to_english_audio_92.mp3",
      },
      {
        word: "What are the requirements for this job position?",
        translation: "Каковы требования для работы на этой должности?",
        audioUrl: "path_to_english_audio_93.mp3",
      },
      {
        word: "Can I book a room with a mountain view?",
        translation: "Можно забронировать комнату с видом на горы?",
        audioUrl: "path_to_english_audio_94.mp3",
      },
      {
        word: "Can you tell me where the nearest ATM is?",
        translation: "Можешь мне сказать, где находится ближайший банкомат?",
        audioUrl: "path_to_english_audio_95.mp3",
      },
      {
        word: "Can I request an invoice for this purchase?",
        translation: "Можно мне счет-фактуру за эту покупку?",
        audioUrl: "path_to_english_audio_96.mp3",
      },
      {
        word: "Can I book a dentist appointment for next week?",
        translation: "Можно записаться к стоматологу на следующую неделю?",
        audioUrl: "path_to_english_audio_97.mp3",
      },
      {
        word: "Can I get help finding the right product?",
        translation: "Можно мне помощь в поиске подходящего продукта?",
        audioUrl: "path_to_english_audio_98.mp3",
      },
      {
        word: "What are the delivery options for this product to my country?",
        translation:
          "Какие есть варианты доставки этого продукта в мою страну?",
        audioUrl: "path_to_english_audio_99.mp3",
      },
      {
        word: "Can I get more information about this course?",
        translation: "Можно мне больше информации об этом курсе?",
        audioUrl: "path_to_english_audio_100.mp3",
      },
      // Другие слова для английского языка
    ];
  } else if (language === "spanish") {
    return [
      {
        word: "Buenos días",
        translation: "Доброе утро",
        audioUrl: "path_to_spanish_audio_1.mp3",
        transcription: "buenos ˈdi.as",
      },
      {
        word: "¿Cómo estás?",
        translation: "Как дела?",
        audioUrl: "path_to_spanish_audio_2.mp3",
        transcription: "ˈko.mo esˈtas",
      },
      {
        word: "Muchas gracias",
        translation: "Большое спасибо",
        audioUrl: "path_to_spanish_audio_3.mp3",
        transcription: "ˈmu.tʃas ˈɡɾa.sjas",
      },
      // ... (другие простые предложения на испанском)
      {
        word: "¿Dónde está la estación de tren?",
        translation: "Где находится железнодорожный вокзал?",
        audioUrl: "path_to_spanish_audio_50.mp3",
        transcription: "ˈdon.de esˈta la es.taˈθjon de tɾen",
      },
      // Сложные предложения на испанском
      {
        word: "¿Podría reservar una mesa para esta noche?",
        translation: "Могу ли я забронировать столик на сегодняшний вечер?",
        audioUrl: "path_to_spanish_audio_51.mp3",
        transcription: "poˈðɾi.a re.serˈβar u.na ˈme.sa pa.ra ˈes.ta ˈno.tʃe",
      },
      {
        word: "¿Sabe dónde puedo encontrar una farmacia abierta las 24 horas?",
        translation: "Ты знаешь, где можно найти круглосуточную аптеку?",
        audioUrl: "path_to_spanish_audio_52.mp3",
        transcription:
          "ˈsa.βe ˈðon.de ˈpwe.ðo en.konˈtɾaɾ u.na faɾˈma.θja aˈβjeɾ.ta las βeˈjen ta ˈo.ɾas",
      },
      {
        word: "Me gustaría pedir algo vegetariano del menú, ¿qué recomienda?",
        translation:
          "Я бы хотел заказать что-то вегетарианское из меню, что ты порекомендуешь?",
        audioUrl: "path_to_spanish_audio_53.mp3",
        transcription:
          "me ɣus.taˈɾi.a peˈðiɾ ˈal.ɡo βe.xe.taˈɾjo del meˈnu ke re.ko.mjenˈda",
      },
      {
        word: "¿Podría decirme cómo llegar a la estación de metro más cercana?",
        translation:
          "Ты можешь сказать, как доехать до ближайшей станции метро?",
        audioUrl: "path_to_spanish_audio_54.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈko.mo ʎeˈɣaɾ a la es.taˈθjon de ˈme.tɾo mas θeɾˈkana",
      },
      {
        word: "¿Puedo pedir una almohada extra para la habitación?",
        translation: "Можно попросить дополнительную подушку в комнату?",
        audioUrl: "path_to_spanish_audio_55.mp3",
        transcription:
          "ˈpwe.ðo peˈðiɾ u.na al.moˈxaða ˈe.xtɾa paɾa la xa.βiˈtaθjon",
      },
      {
        word: "¿Dónde puedo comprar boletos para el concierto de mañana?",
        translation: "Где я могу купить билеты на завтрашний концерт?",
        audioUrl: "path_to_spanish_audio_56.mp3",
        transcription:
          "ˈdon.de ˈpwe.ðo kamˈpaɾ βoˈle.tos paɾa el konˈθjeɾ.to de maˈɲa.na",
      },
      {
        word: "¿Podría ayudarme a llenar este formulario?",
        translation: "Ты можешь помочь мне заполнить эту форму?",
        audioUrl: "path_to_spanish_audio_57.mp3",
        transcription: "poˈðɾi.a a.ʝuˈðaɾ.me a ʎeˈnaɾ ˈes.te for.muˈla",
      },
      {
        word: "¿Puedo ver su identificación, por favor?",
        translation: "Можно увидеть твое удостоверение личности?",
        audioUrl: "path_to_spanish_audio_58.mp3",
        transcription: "ˈpwe.ðo βeɾ su i.den.ti.fi.kaˈθjon poɾ faˈβoɾ",
      },
      {
        word: "¿Cuál es la manera más rápida de llegar al centro de la ciudad?",
        translation: "Какой самый короткий путь до центра города?",
        audioUrl: "path_to_spanish_audio_59.mp3",
        transcription:
          "ˈkwal es la maˈne.ɾa mas ˈra.piða ðe ʎeˈɣaɾ al ˈsen.tɾo ðe la θjuˈðað",
      },
      {
        word: "¿Puedo reservar una habitación con vista al mar?",
        translation: "Можно забронировать комнату с видом на море?",
        audioUrl: "path_to_spanish_audio_60.mp3",
        transcription:
          "ˈpwe.ðo re.serˈβaɾ u.na xa.bi.taˈθjon kon ˈbis.ta al maɾ",
      },
      {
        word: "¿Podría decirme cuánto cuesta alquilar un coche por un día?",
        translation:
          "Ты можешь сказать, сколько стоит аренда машины на один день?",
        audioUrl: "path_to_spanish_audio_61.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwanto ˈkwesta al.kiˈlaɾ un ˈko.tʃe poɾ un ˈði.a",
      },
      {
        word: "¿Es posible extender el plazo de pago?",
        translation: "Есть возможность продления срока оплаты?",
        audioUrl: "path_to_spanish_audio_62.mp3",
        transcription: "es po.siˈβle ek.stenˈðeɾ el ˈplaso ðe ˈpaɣo",
      },
      {
        word: "¿Puedo solicitar un presupuesto para este servicio?",
        translation: "Можно запросить смету на выполнение этой услуги?",
        audioUrl: "path_to_spanish_audio_63.mp3",
        transcription:
          "ˈpwe.ðo so.li.siˈtaɾ un pres.uˈpwesto paɾa esˈte serˈβiθjo",
      },
      {
        word: "¿Puedo hacer algunas preguntas sobre este proyecto?",
        translation:
          "Могу я задать несколько вопросов касательно этого проекта?",
        audioUrl: "path_to_spanish_audio_64.mp3",
        transcription:
          "ˈpwe.ðo aˈseɾ al.ɡu.nas preˈɣuntas so.βɾe esˈte pɾoˈxek.to",
      },
      {
        word: "¿Podría decirme cuáles son las condiciones de alquiler de este apartamento?",
        translation: "Ты можешь сказать, какие условия аренды квартиры?",
        audioUrl: "path_to_spanish_audio_65.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwa.les son las kon.θiˈθjo.nes ðe al.kiˈleɾ ðe es.te apaɾ.taˈmen.to",
      },
      {
        word: "¿Qué documentos son necesarios para abrir una cuenta bancaria?",
        translation: "Какие документы нужны для открытия банковского счета?",
        audioUrl: "path_to_spanish_audio_66.mp3",
        transcription:
          "ke ðo.kuˈmen.tos son neθeˈsaɾjos paɾa aˈβiɾ u.na kwenˈta βaŋˈka.ɾja",
      },
      {
        word: "¿Puede decirme dónde está la gasolinera más cercana?",
        translation: "Ты можешь сказать, где находится ближайшая заправка?",
        audioUrl: "path_to_spanish_audio_67.mp3",
        transcription:
          "ˈpwe.ðe ðiˈɾme ˈðon.de esˈta la ɡaso.liˈne.ɾa mas θeɾˈkana",
      },
      {
        word: "¿Puedo obtener información sobre las opciones de transporte público en esta ciudad?",
        translation:
          "Можно получить информацию о вариантах общественного транспорта в этом городе?",
        audioUrl: "path_to_spanish_audio_68.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ im.foɾ.maˈθjon so.βɾe las oθˈθjo.nes ðe tɾansˈpor.te ˈpuβ.liko en es.ta θjuˈðað",
      },
      {
        word: "¿Puedo concertar una cita con el médico para mañana por la mañana?",
        translation: "Можно записаться на прием к врачу на завтра утром?",
        audioUrl: "path_to_spanish_audio_69.mp3",
        transcription:
          "ˈpwe.ðo konθeɾˈtaɾ u.na ˈsi.ta kon el ˈme.ði.ko paɾa maˈɲa.na poɾ la maˈɲa.na",
      },
      {
        word: "¿Puedo solicitar que la factura se envíe a mi dirección de correo electrónico?",
        translation: "Можно выслать счет-фактуру на мой электронный адрес?",
        audioUrl: "path_to_spanish_audio_70.mp3",
        transcription:
          "ˈpwe.ðo so.li.siˈtaɾ ke la fakˈtu.ɾa se enˈβje a mi aˈðɾes de koˈre.o e.lek.tɾoˈni.ko",
      },
      {
        word: "¿Puedo solicitar un servicio de entrega de comida a mi casa?",
        translation: "Можно заказать доставку еды на дом?",
        audioUrl: "path_to_spanish_audio_71.mp3",
        transcription:
          "ˈpwe.ðo so.li.siˈtaɾ un serˈβiθjo ðe enˈtɾe.ɣa ðe ˈko.mi.ða a mi ˈka.sa",
      },
      {
        word: "¿Puedo obtener más información sobre este curso de idiomas?",
        translation:
          "Можно получить больше информации о данном языковом курсе?",
        audioUrl: "path_to_spanish_audio_72.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ mas im.foɾ.maˈθjon so.βɾe es.te ˈkuɾ.so ðe iˈðjo.mas",
      },
      {
        word: "¿Puedo concertar una cita con el peluquero para mañana?",
        translation: "Можно записаться к парикмахеру на завтра?",
        audioUrl: "path_to_spanish_audio_73.mp3",
        transcription:
          "ˈpwe.ðo konθeɾˈtaɾ u.na ˈsi.ta kon el pe.luˈke.ɾo paɾa maˈɲa.na",
      },
      {
        word: "¿Cuáles son los horarios de apertura del supermercado más cercano?",
        translation: "Каковы часы работы ближайшего супермаркета?",
        audioUrl: "path_to_spanish_audio_74.mp3",
        transcription:
          "ˈkwa.les son los oˈɾa.ɾjos ðe aˈβer.tuɾa del su.peɾ.meɾˈka.ðo mas θeɾˈkano",
      },
      {
        word: "¿Puedo obtener ayuda para elegir el producto adecuado?",
        translation: "Можно получить помощь в выборе подходящего продукта?",
        audioUrl: "path_to_spanish_audio_75.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ a.ʝu.ða paɾa eˈle.xiɾ el pɾoˈðuk.to a.deˈkwa.ðo",
      },
      {
        word: "¿Puedo concertar una cita para una entrevista de trabajo mañana?",
        translation: "Можно договориться о встрече по поводу работы на завтра?",
        audioUrl: "path_to_spanish_audio_76.mp3",
        transcription:
          "ˈpwe.ðo konθeɾˈtaɾ u.na ˈsi.ta paɾa u.na en.tɾeˈβis.ta ðe tɾaˈβa.ʝo maˈɲa.na",
      },
      {
        word: "¿Puedo verificar el saldo de mi cuenta, por favor?",
        translation: "Можно проверить состояние моего счета?",
        audioUrl: "path_to_spanish_audio_77.mp3",
        transcription:
          "ˈpwe.ðo be.ɾi.fiˈkaɾ el ˈsal.do ðe mi ˈkwen.ta poɾ faˈβoɾ",
      },
      {
        word: "¿Puedes mostrarme el camino al hotel más cercano?",
        translation: "Можешь показать дорогу до ближайшего отеля?",
        audioUrl: "path_to_spanish_audio_78.mp3",
        transcription: "ˈpwe.ðes mosˈtɾar.me el kaˈmi.no al oˈtel mas θeɾˈkano",
      },
      {
        word: "¿Cuáles son las opciones de pago para este producto?",
        translation: "Какие есть варианты оплаты за этот продукт?",
        audioUrl: "path_to_spanish_audio_79.mp3",
        transcription:
          "ˈkwa.les son las oθˈθjo.nes ðe ˈpaɣo paɾa esˈte pɾoˈðuk.to",
      },
      {
        word: "¿Puedo obtener información detallada sobre este producto?",
        translation: "Можно получить подробную информацию об этом продукте?",
        audioUrl: "path_to_spanish_audio_80.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ im.foɾ.maˈθjon ðe.taˈʎa.ða so.βɾe es.te pɾoˈðuk.to",
      },
      {
        word: "¿Cuáles son las políticas de devolución de esta tienda?",
        translation: "Каковы условия возврата в этом магазине?",
        audioUrl: "path_to_spanish_audio_81.mp3",
        transcription:
          "ˈkwa.les son las po.liˈti.kas ðe de.βol.uˈθjon ðe es.ta ˈtjen.da",
      },
      {
        word: "¿Puedo solicitar una copia de mi factura, por favor?",
        translation: "Можно запросить копию моего счета-фактуры?",
        audioUrl: "path_to_spanish_audio_82.mp3",
        transcription:
          "ˈpwe.ðo so.li.siˈtaɾ u.na ˈko.pja ðe mi faˈktu.ɾa poɾ faˈβoɾ",
      },
      {
        word: "¿Puedo reservar una mesa en su restaurante para esta noche?",
        translation:
          "Можно мне забронировать столик в вашем ресторане на сегодняшний вечер?",
        audioUrl: "path_to_spanish_audio_83.mp3",
        transcription:
          "ˈpwe.ðo re.serˈβaɾ u.na ˈme.sa en su res.tauˈɾan.te paɾa esˈta ˈno.tʃe",
      },
      {
        word: "¿Puede darme indicaciones para llegar al centro comercial más cercano?",
        translation:
          "Можете дать мне указания, как доехать до ближайшего торгового центра?",
        audioUrl: "path_to_spanish_audio_84.mp3",
        transcription:
          "ˈpwe.ðe ðaɾ.me in.ði.kaˈθjon.es paɾa ʎeˈɣaɾ al ˈsen.tɾo kom.meɾˈθjal mas θeɾˈkano",
      },
      {
        word: "¿Puedo pagar con tarjeta de crédito en este establecimiento?",
        translation: "Могу ли я оплатить кредитной картой в этом заведении?",
        audioUrl: "path_to_spanish_audio_85.mp3",
        transcription:
          "ˈpwe.ðo paˈɣaɾ kon taɾˈxeta ðe ˈkre.ði.to en esˈte es.ta.βle.siˈmjento",
      },
      {
        word: "¿Podría recomendarme un buen lugar para cenar esta noche?",
        translation:
          "Можете посоветовать мне хорошее место для ужина сегодня вечером?",
        audioUrl: "path_to_spanish_audio_86.mp3",
        transcription:
          "poˈðɾi.a re.ko.menˈðaɾ.me un ɡwen luˈɣaɾ paɾa θeˈnaɾ esˈta ˈno.tʃe",
      },
      {
        word: "¿Puedo pedir un taxi para las 7 de la mañana?",
        translation: "Могу ли я заказать такси на 7 утра?",
        audioUrl: "path_to_spanish_audio_87.mp3",
        transcription:
          "ˈpwe.ðo peˈðiɾ un ˈta.ksi paɾa las ˈse.te ðe la maˈɲa.na",
      },
      {
        word: "¿Puede recomendarme un buen lugar para practicar senderismo?",
        translation:
          "Можете посоветовать мне хорошее место для пеших прогулок?",
        audioUrl: "path_to_spanish_audio_88.mp3",
        transcription:
          "ˈpwe.ðe re.ko.menˈðaɾ.me un ɡwen luˈɣaɾ paɾa pɾak.tiˈkaɾ sen.deˈɾis.mo",
      },
      {
        word: "¿Podría decirme cuánto cuesta el billete de ida y vuelta?",
        translation: "Можете сказать мне, сколько стоит билет туда и обратно?",
        audioUrl: "path_to_spanish_audio_89.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwanto ˈkwesta el ˈβiʎe.te ðe iˈða i ˈβwel.ta",
      },
      {
        word: "¿Podría decirme dónde está la oficina de correos más cercana?",
        translation:
          "Ты можешь сказать, где находится ближайшее почтовое отделение?",
        audioUrl: "path_to_spanish_audio_90.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈðon.de esˈta la o.fiˈθina ðe koˈre.os mas θeɾˈkana",
      },
      {
        word: "¿Cuál es la política de cancelación para esta reserva?",
        translation: "Каковы условия отмены бронирования для этого заказа?",
        audioUrl: "path_to_spanish_audio_91.mp3",
        transcription:
          "ˈkwal es la po.liˈti.ka ðe kan.se.laˈθjon paɾa es.ta re.serˈβaθjon",
      },
      {
        word: "¿Puedo hacer una reserva para dos personas para la cena de mañana?",
        translation: "Могу ли я забронировать столик на двоих на ужин завтра?",
        audioUrl: "path_to_spanish_audio_92.mp3",
        transcription:
          "ˈpwe.ðo aˈseɾ u.na re.serˈβa paɾa dos peɾˈso.nas paɾa la ˈθe.na ðe maˈɲa.na",
      },
      {
        word: "¿Podría darme más detalles sobre el seguro médico que ofrece la empresa?",
        translation:
          "Можешь дать мне больше информации о медицинской страховке, которую предлагает компания?",
        audioUrl: "path_to_spanish_audio_93.mp3",
        transcription:
          "poˈðɾi.a ˈðaɾ.me mas deˈtaʎes so.βɾe el seˈɣuɾo ˈme.ði.ko ke ofɾeˈse la em.pɾeˈsa",
      },
      {
        word: "¿Puedo solicitar una guía turística de la ciudad?",
        translation: "Можно запросить туристический гид по городу?",
        audioUrl: "path_to_spanish_audio_94.mp3",
        transcription:
          "ˈpwe.ðo so.li.siˈtaɾ u.na ˈɡwi.a tuˈɾis.ti.ka ðe la θjuˈðað",
      },
      {
        word: "¿Cuál es el procedimiento para obtener una visa de trabajo en este país?",
        translation: "Какова процедура получения рабочей визы в этой стране?",
        audioUrl: "path_to_spanish_audio_95.mp3",
        transcription:
          "ˈkwal es el pɾoθeðiˈmjen.to paɾa oβ.teˈneɾ u.na ˈbi.sa ðe tɾaˈβa.ʝo en esˈte paˈis",
      },
      {
        word: "¿Puede darme información sobre los cursos de formación profesional disponibles?",
        translation:
          "Можете предоставить информацию о доступных курсах профессиональной подготовки?",
        audioUrl: "path_to_spanish_audio_96.mp3",
        transcription:
          "ˈpwe.ðe ðaɾ.me im.foɾ.maˈθjon so.βɾe los ˈkuɾ.sos ðe foɾ.maˈθjon pɾofesjoˈnal dis.poˈni.ble.s",
      },
      {
        word: "¿Podría darme instrucciones sobre cómo llegar al museo de arte moderno?",
        translation:
          "Могли бы вы дать мне инструкции, как добраться до музея современного искусства?",
        audioUrl: "path_to_spanish_audio_97.mp3",
        transcription:
          "poˈðɾi.a ðaɾ.me in.stɾukˈθjon.es so.βɾe ˈko.mo ʎeˈɣaɾ al muˈse.o ðe ˈaɾ.te moˈðeɾ.no",
      },
      {
        word: "¿Puedo conocer los requisitos para obtener un préstamo hipotecario?",
        translation: "Можно узнать требования к получению ипотечного кредита?",
        audioUrl: "path_to_spanish_audio_98.mp3",
        transcription:
          "ˈpwe.ðo ko.noˈseɾ los re.kiˈsi.tos paɾa oβ.teˈneɾ un ˈpɾes.tamo i.po.teˈkaɾjo",
      },
      {
        word: "¿Podría ayudarme a entender cuáles son mis opciones de financiamiento?",
        translation:
          "Можете помочь мне понять, какие у меня есть варианты финансирования?",
        audioUrl: "path_to_spanish_audio_99.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.tenˈðeɾ ˈkwa.les son mis oθˈθjo.nes ðe fi.nanθje.aˈmjento",
      },
      {
        word: "¿Puedo obtener una lista de los hoteles cercanos con buenas críticas?",
        translation:
          "Можно получить список близлежащих отелей с хорошими отзывами?",
        audioUrl: "path_to_spanish_audio_100.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ u.na ˈlis.ta ðe los o.teˈles θeɾˈka.nos kon bwe.nas ˈkɾi.ti.kas",
      },
      {
        word: "¿Puedo obtener ayuda para encontrar un hotel en el centro de la ciudad?",
        translation:
          "Могу ли я получить помощь в поиске отеля в центре города?",
        audioUrl: "path_to_spanish_audio_101.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ a.ʝu.ða paɾa en.konˈtɾaɾ un oˈtel en el ˈsen.tɾo ðe la θjuˈðað",
      },
      {
        word: "¿Puede darme detalles sobre las opciones de menú disponibles?",
        translation: "Можете предоставить информацию о доступных меню?",
        audioUrl: "path_to_spanish_audio_102.mp3",
        transcription:
          "ˈpwe.ðe ðaɾ.me deˈtaʎes so.βɾe las oθˈθjo.nes ðe meˈnu dis.poˈni.ble.s",
      },
      {
        word: "¿Puedo obtener información sobre los beneficios que ofrece esta empresa?",
        translation:
          "Могу я получить информацию о преимуществах, которые предлагает эта компания?",
        audioUrl: "path_to_spanish_audio_103.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ im.foɾ.maˈθjon so.βɾe los be.neˈfiθjos ke ofɾeˈse esˈta em.pɾeˈsa",
      },
      {
        word: "¿Puedo obtener detalles sobre las políticas de privacidad de su sitio web?",
        translation:
          "Могу ли я получить информацию о политике конфиденциальности вашего сайта?",
        audioUrl: "path_to_spanish_audio_104.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ deˈtaʎes so.βɾe las po.liˈti.kas ðe pɾi.βaθi.liˈðað ðe su ˈsi.to web",
      },
      {
        word: "¿Puedo concertar una reunión para discutir este asunto con usted?",
        translation:
          "Могу я договориться о встрече, чтобы обсудить этот вопрос с вами?",
        audioUrl: "path_to_spanish_audio_105.mp3",
        transcription:
          "ˈpwe.ðo konθeɾˈtaɾ u.na re.uˈnjon paɾa dis.kuˈstiɾ esˈte aˈs‿unto kon uˈsteð",
      },
      {
        word: "¿Puedo obtener información sobre las vacantes de empleo en su empresa?",
        translation:
          "Могу ли я получить информацию о вакансиях в вашей компании?",
        audioUrl: "path_to_spanish_audio_106.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ im.foɾ.maˈθjon so.βɾe las baˈkan.tes ðe em.ple.o en su emˈpɾe.sa",
      },
      {
        word: "¿Puedo obtener detalles sobre el proceso de admisión de esta universidad?",
        translation:
          "Могу ли я получить информацию о процессе поступления в этот университет?",
        audioUrl: "path_to_spanish_audio_107.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ deˈtaʎes so.βɾe el pɾoˈθes.o ðe að.miˈsjon ðe es.ta uni.βeɾ.siˈðað",
      },
      {
        word: "¿Cuáles son los requisitos necesarios para obtener una beca?",
        translation:
          "Какие требования необходимо выполнить, чтобы получить стипендию?",
        audioUrl: "path_to_spanish_audio_108.mp3",
        transcription:
          "ˈkwa.les son los re.kiˈsi.tos neθeˈsaɾjos paɾa oβ.teˈneɾ u.na ˈbe.ka",
      },
      {
        word: "¿Podría darme detalles sobre las condiciones del seguro de vida?",
        translation:
          "Можете ли вы дать мне подробности о условиях страхования жизни?",
        audioUrl: "path_to_spanish_audio_109.mp3",
        transcription:
          "poˈðɾi.a ˈðaɾ.me deˈtaʎes so.βɾe las kon.ðiˈθjo.nes ðel seˈɣuɾo ðe ˈβi.ða",
      },
      {
        word: "¿Cuánto tiempo se tarda en obtener una respuesta sobre la solicitud de empleo?",
        translation: "Как долго ждать ответа на заявление о работе?",
        audioUrl: "path_to_spanish_audio_110.mp3",
        transcription:
          "ˈkwan.to tjem.po se ˈtaɾ.ða en oβ.teˈneɾ u.na ɾesˈpwesta so.βɾe la soliθiˈtuð ðe em.ple.o",
      },
      {
        word: "¿Cuáles son los documentos necesarios para obtener un permiso de trabajo?",
        translation:
          "Какие документы нужны для получения разрешения на работу?",
        audioUrl: "path_to_spanish_audio_111.mp3",
        transcription:
          "ˈkwa.les son los ðo.kuˈmen.tos neθeˈsaɾjos paɾa oβ.teˈneɾ un peɾˈmiso ðe tɾaˈβa.ʝo",
      },
      {
        word: "¿Puedo obtener detalles sobre el proceso de reclamación?",
        translation: "Могу я узнать подробности о процессе претензий?",
        audioUrl: "path_to_spanish_audio_112.mp3",
        transcription:
          "ˈpwe.ðo oβ.teˈneɾ deˈtaʎes so.βɾe el pɾoˈθes.o ðe rek.la.maˈθjon",
      },
      {
        word: "¿Podría ayudarme a cambiar la fecha de mi reserva?",
        translation: "Можете помочь мне изменить дату моего бронирования?",
        audioUrl: "path_to_spanish_audio_113.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a ʧamˈβjaɾ la ˈfe.ʧa ðe mi re.serˈβa",
      },
      {
        word: "¿Cuál es la política de cancelación para esta reserva?",
        translation: "Каковы условия отмены бронирования для этого заказа?",
        audioUrl: "path_to_spanish_audio_114.mp3",
        transcription:
          "ˈkwal es la po.liˈti.ka ðe kan.se.laˈθjon paɾa es.ta re.serˈβaθjon",
      },
      {
        word: "¿Podría darme detalles sobre las políticas de seguridad de la empresa?",
        translation:
          "Можете ли вы дать мне информацию о политиках безопасности компании?",
        audioUrl: "path_to_spanish_audio_115.mp3",
        transcription:
          "poˈðɾi.a ðaɾ.me deˈtaʎes so.βɾe las po.liˈti.kas ðe se.ɣuˈɾi.ðað ðe la em.pɾeˈsa",
      },
      {
        word: "¿Puedo solicitar un cambio de habitación en este hotel?",
        translation:
          "Могу ли я попросить перевести меня в другой номер в этом отеле?",
        audioUrl: "path_to_spanish_audio_116.mp3",
        transcription:
          "ˈpwe.ðo so.li.siˈtaɾ un ˈʧam.βe ðe a.βi.taˈθjon en esˈte oˈtel",
      },
      {
        word: "¿Podría ayudarme a organizar el transporte al aeropuerto?",
        translation: "Можете помочь мне организовать транспорт до аэропорта?",
        audioUrl: "path_to_spanish_audio_117.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a oɾ.ɣa.niˈθaɾ el tɾansˈpoɾtje al a.e.ɾoˈpoɾta",
      },
      {
        word: "¿Podría ayudarme a encontrar la mejor opción de alquiler de coche?",
        translation:
          "Могли бы вы помочь мне найти лучший вариант аренды автомобиля?",
        audioUrl: "path_to_spanish_audio_118.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.konˈtɾaɾ la meˈxoɾ oθˈθjon ðe al.kiˈleɾ ðe ˈko.tʃe",
      },
      {
        word: "¿Podría decirme cuál es la mejor manera de llegar al centro de la ciudad desde aquí?",
        translation:
          "Можете сказать мне, как лучше всего добраться до центра города отсюда?",
        audioUrl: "path_to_spanish_audio_119.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme kwal es la meˈxoɾ maˈneɾa ðe ʎeˈɣaɾ al ˈsen.tɾo ðe la θjuˈðað ðesˈde aˈki",
      },
      {
        word: "¿Puedo pagar la factura de mi habitación con tarjeta de débito?",
        translation: "Могу ли я оплатить счет за мой номер кредитной картой?",
        audioUrl: "path_to_spanish_audio_120.mp3",
        transcription:
          "ˈpwe.ðo paˈɣaɾ la faˈktu.ɾa ðe mi a.βi.taˈθjon kon taɾˈxeta ðe ˈðe.βi.to",
      },
      {
        word: "¿Cuál es el procedimiento para registrarse como nuevo paciente?",
        translation: "Какая процедура регистрации в качестве нового пациента?",
        audioUrl: "path_to_spanish_audio_121.mp3",
        transcription:
          "ˈkwal es el pɾoθeðiˈmjen.to paɾa ɾe.xisˈtɾaɾ.se koˈmo ˈnwe.βo paθjenˈte",
      },
      {
        word: "¿Puede decirme dónde está ubicada la piscina?",
        translation: "Можете сказать мне, где находится бассейн?",
        audioUrl: "path_to_spanish_audio_122.mp3",
        transcription: "ˈpwe.ðe ðiɾˈme ˈðon.de esˈta u.biˈkaða la piθiˈna",
      },
      {
        word: "¿Puedo obtener un recibo después de hacer la compra?",
        translation: "Могу я получить чек после покупки?",
        audioUrl: "path_to_spanish_audio_123.mp3",
        transcription:
          "ˈpwe.ðo oβˈte.neɾ un reˈsi.βo ðepˈwes ðe aˈseɾ la ˈkom.pɾa",
      },
      {
        word: "¿Podría recomendarme un buen lugar para practicar yoga?",
        translation:
          "Могли бы вы порекомендовать мне хорошее место для занятий йогой?",
        audioUrl: "path_to_spanish_audio_124.mp3",
        transcription:
          "poˈðɾi.a re.ko.menˈðaɾ.me un ɡwen luˈɣaɾ paɾa pɾak.tiˈkaɾ ˈʝoɣa",
      },
      {
        word: "¿Podría ayudarme a entender cuál es el procedimiento para realizar una devolución?",
        translation:
          "Могли бы вы помочь мне понять, какова процедура возврата товара?",
        audioUrl: "path_to_spanish_audio_125.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.tenˈdeɾ ˈkwal es el pɾoθeðiˈmjen.to paɾa re.a.liˈθaɾ u.na ðe.βo.luˈθjon",
      },
      {
        word: "¿Puedo saber cuáles son las opciones de menú sin gluten en su restaurante?",
        translation:
          "Можно узнать, какие есть варианты меню без глютена в вашем ресторане?",
        audioUrl: "path_to_spanish_audio_126.mp3",
        transcription:
          "ˈpwe.ðo saˈβeɾ ˈkwa.les son las oθˈθjo.nes ðe meˈnu sin ɡluˈten en su res.tauˈɾan.te",
      },
      {
        word: "¿Podría ayudarme a encontrar una clínica médica cercana?",
        translation:
          "Могли бы вы помочь мне найти ближайшую медицинскую клинику?",
        audioUrl: "path_to_spanish_audio_127.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.konˈtɾaɾ u.na ˈklini.ka ˈme.ði.ka θeɾˈka.na",
      },
      {
        word: "¿Puede darme detalles sobre los horarios de apertura y cierre?",
        translation:
          "Можете ли вы дать мне информацию о времени работы и закрытия?",
        audioUrl: "path_to_spanish_audio_128.mp3",
        transcription:
          "ˈpwe.ðe ðaɾ.me deˈtaʎes so.βɾe los oˈɾaɾjos ðe aˈpjeɾ.ta i ˈθje.re",
      },
      {
        word: "¿Puedo saber cuáles son los requisitos necesarios para alquilar un coche?",
        translation:
          "Могу я узнать, какие требования нужно выполнить для аренды автомобиля?",
        audioUrl: "path_to_spanish_audio_129.mp3",
        transcription:
          "ˈpwe.ðo saˈβeɾ ˈkwa.les son los re.kiˈsi.tos neθeˈsaɾjos paɾa al.kiˈlaɾ un ˈko.tʃe",
      },
      {
        word: "¿Cuáles son las opciones de entretenimiento que ofrece su hotel?",
        translation: "Какие развлекательные возможности предлагает ваш отель?",
        audioUrl: "path_to_spanish_audio_130.mp3",
        transcription:
          "ˈkwa.les son las oθˈθjo.nes ðe en.tɾe.teˈn̪i.mjen.to ke ofɾeˈse su oˈtel",
      },
      {
        word: "¿Puede ayudarme a organizar una excursión de un día desde este lugar?",
        translation:
          "Можете помочь мне организовать однодневную экскурсию из этого места?",
        audioUrl: "path_to_spanish_audio_131.mp3",
        transcription:
          "ˈpwe.ðe aʝuˈðaɾ.me a oɾ.ɣa.niˈθaɾ u.na ek.skuɾˈsjon ðe un ˈði.a ðesˈde esˈte me.sta",
      },
      {
        word: "¿Puedo recibir detalles sobre las atracciones turísticas cercanas?",
        translation:
          "Могу ли я получить информацию о близлежащих туристических достопримечательностях?",
        audioUrl: "path_to_spanish_audio_132.mp3",
        transcription:
          "ˈpwe.ðo reθiˈβiɾ deˈtaʎes so.βɾe las a.tɾakˈθjo.nes tu.ɾisˈti.kas θeɾˈka.nas",
      },
      {
        word: "¿Podría ayudarme a encontrar una buena tienda de regalos en esta área?",
        translation:
          "Могли бы вы помочь мне найти хороший магазин подарков в этом районе?",
        audioUrl: "path_to_spanish_audio_133.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.konˈtɾaɾ u.na ˈɣwe.na ˈtjenða ðe reˈɣalos en esˈta aˈɾea",
      },
      {
        word: "¿Puede decirme cómo llegar a la estación de tren más cercana desde aquí?",
        translation:
          "Можете сказать мне, как лучше всего добраться до ближайшего железнодорожного вокзала отсюда?",
        audioUrl: "path_to_spanish_audio_134.mp3",
        transcription:
          "ˈpwe.ðe ðiɾˈme ˈkomo ʎeˈɣaɾ a la es.taˈθjon ðe tɾen mas θeɾˈka.na ðesˈde aˈki",
      },
      {
        word: "¿Podría ayudarme a reservar una mesa para dos personas esta noche?",
        translation:
          "Могли бы вы помочь мне зарезервировать столик на двоих на сегодняшний вечер?",
        audioUrl: "path_to_spanish_audio_135.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a re.serˈβaɾ u.na ˈmesa paɾa dos peɾˈsonas esˈta noˈʧe",
      },
      {
        word: "¿Puedo obtener una copia de mi factura?",
        translation: "Могу ли я получить копию моего счёта?",
        audioUrl: "path_to_spanish_audio_136.mp3",
        transcription: "ˈpwe.ðo oβ.teˈneɾ u.na ˈko.pja ðe mi faˈktu.ɾa",
      },
      {
        word: "¿Podría decirme cuáles son los procedimientos de seguridad que se implementan aquí?",
        translation:
          "Могли бы вы сказать мне, какие здесь используются меры безопасности?",
        audioUrl: "path_to_spanish_audio_137.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwa.les son los pɾoθeðiˈmjen.tos ðe se.ɣuˈɾi.ðað ke se im.ple.menˈtan aˈki",
      },
      {
        word: "¿Puede recomendarme un buen restaurante en la zona?",
        translation:
          "Можете порекомендовать мне хороший ресторан в этом районе?",
        audioUrl: "path_to_spanish_audio_138.mp3",
        transcription:
          "ˈpwe.ðe re.ko.menˈðaɾ.me un ɡwen res.tauˈɾan.te en la ˈθona",
      },
      {
        word: "¿Podría informarme cuál es la mejor manera de acceder a Internet desde la habitación?",
        translation:
          "Могли бы вы сообщить мне, как лучше всего получить доступ в Интернет из номера?",
        audioUrl: "path_to_spanish_audio_139.mp3",
        transcription:
          "poˈðɾi.a im.foɾˈmaɾ.me ˈkwal es la meˈxoɾ maˈneɾa ðe akθeˈðeɾ a inˈteɾ.net ðesˈde la a.βi.taˈθjon",
      },
      {
        word: "¿Cuáles son las atracciones turísticas más populares de esta ciudad?",
        translation:
          "Какие туристические достопримечательности наиболее популярны в этом городе?",
        audioUrl: "path_to_spanish_audio_140.mp3",
        transcription:
          "ˈkwa.les son las a.tɾakˈθjo.nes tu.ɾisˈti.kas mas po.puˈlaɾes ðe esˈta θjuˈðað",
      },
      {
        word: "¿Puedo saber cuáles son las políticas de cancelación para mi reserva?",
        translation: "Могу я узнать, каковы условия отмены моего бронирования?",
        audioUrl: "path_to_spanish_audio_141.mp3",
        transcription:
          "ˈpwe.ðo saˈβeɾ ˈkwa.les son las po.liˈti.kas ðe kan.se.laˈθjon paɾa mi re.serˈβaθjon",
      },
      {
        word: "¿Podría ayudarme a encontrar una buena opción de restaurante vegetariano en esta área?",
        translation:
          "Могли бы вы помочь мне найти хороший вариант вегетарианского ресторана в этом районе?",
        audioUrl: "path_to_spanish_audio_142.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.konˈtɾaɾ u.na ɣwe.na oθˈθjon ðe res.tauˈɾan.te βe.xe.taˈɾja.no en esˈta aˈɾea",
      },
      {
        word: "¿Cuál es la política de privacidad de su empresa?",
        translation: "Какая у вас политика конфиденциальности?",
        audioUrl: "path_to_spanish_audio_143.mp3",
        transcription:
          "ˈkwal es la po.liˈti.ka ðe pɾi.βaθi.liˈðað ðe su emˈpɾe.sa",
      },
      {
        word: "¿Cuál es el proceso para hacer una reclamación?",
        translation: "Каков процесс подачи жалобы?",
        audioUrl: "path_to_spanish_audio_144.mp3",
        transcription: "ˈkwal es el pɾoˈθes.o paɾa aˈseɾ u.na ɾek.laˈmaθjon",
      },
      {
        word: "¿Cuáles son los requisitos necesarios para obtener una tarjeta de crédito?",
        translation:
          "Какие требования нужно выполнить для получения кредитной карты?",
        audioUrl: "path_to_spanish_audio_145.mp3",
        transcription:
          "ˈkwa.les son los re.kiˈsi.tos neθeˈsaɾjos paɾa oβ.teˈneɾ u.na taɾˈxeta ðe ˈkre.ði.to",
      },
      {
        word: "¿Cuánto tiempo se tarda en tramitar mi solicitud?",
        translation: "Как долго займет обработка моего запроса?",
        audioUrl: "path_to_spanish_audio_146.mp3",
        transcription: "ˈkwan.to ˈtjempo se ˈðaɾða en tɾa.miˈtaɾ mi soliθiˈtuð",
      },
      {
        word: "¿Cuáles son las políticas de devolución de su tienda en línea?",
        translation:
          "Какие условия возврата действуют для вашего интернет-магазина?",
        audioUrl: "path_to_spanish_audio_147.mp3",
        transcription:
          "ˈkwa.les son las po.liˈti.kas ðe ðe.βo.luˈθjon ðe su ˈtjenða en ˈli.ne.a",
      },
      {
        word: "¿Cuáles son las medidas que ha tomado la empresa para reducir su impacto ambiental?",
        translation:
          "Какие меры принимает компания для снижения своего воздействия на окружающую среду?",
        audioUrl: "path_to_spanish_audio_148.mp3",
        transcription:
          "ˈkwa.les son las meˈði.ðas ke a toˈmaðo la emˈpɾe.sa paɾa re.ðuˈsiɾ su im.paˈɾto am.bjenˈtal",
      },
      {
        word: "¿Cuál es su política de tratamiento de datos personales?",
        translation: "Какова ваша политика обработки персональных данных?",
        audioUrl: "path_to_spanish_audio_149.mp3",
        transcription:
          "ˈkwal es su po.liˈti.ka ðe tɾa.taˈmjento ðe ˈda.tos peɾ.soˈna.les",
      },
      {
        word: "¿Puede explicarme cuáles son las condiciones para el uso de esta tarjeta de descuento?",
        translation:
          "Можете объяснить мне, каковы условия использования этой скидочной карты?",
        audioUrl: "path_to_spanish_audio_150.mp3",
        transcription:
          "ˈpwe.ðe es.pli.kaɾˈme ˈkwa.les son las kon.ðiˈθjo.nes paɾa el ˈu.so ðe esˈta taɾˈxeta ðe desˈkwen.to",
      },
      {
        word: "¿Podría decirme cuál es el procedimiento para presentar una queja formal?",
        translation:
          "Могли бы вы сказать мне, какова процедура подачи формальной жалобы?",
        audioUrl: "path_to_spanish_audio_151.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwal es el pɾoθeðiˈmjen.to paɾa pɾenθenˈtaɾ u.na ˈkexa foɾˈmal",
      },
      {
        word: "¿Podría ayudarme a cancelar una reserva que hice recientemente?",
        translation: "Могли бы вы помочь мне отменить недавнее бронирование?",
        audioUrl: "path_to_spanish_audio_152.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a kan.seˈlaɾ u.na re.serˈβa θe iˈse reθjenˈte.men.te",
      },
      {
        word: "¿Cuánto tarda en procesarse la devolución de un artículo?",
        translation: "Сколько времени занимает обработка возврата товара?",
        audioUrl: "path_to_spanish_audio_153.mp3",
        transcription:
          "ˈkwan.to ˈtaɾða en pɾo.se.saɾ.se la ðe.βo.luˈθjon ðe un aɾˈti.ku.lo",
      },
      {
        word: "¿Podría ayudarme a entender las políticas de su empresa con respecto a la igualdad de género?",
        translation:
          "Могли бы вы помочь мне понять политику вашей компании по вопросам гендерного равенства?",
        audioUrl: "path_to_spanish_audio_154.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.tenˈdeɾ las po.liˈti.kas ðe su emˈpɾe.sa kon ɾesˈpek.to a la iˈɣwal.ðað ðe ˈxene.ɾo",
      },
      {
        word: "¿Podría indicarme cuáles son las opciones de transporte disponibles en esta área?",
        translation:
          "Могли бы вы сказать мне, какие доступны варианты транспорта в этом районе?",
        audioUrl: "path_to_spanish_audio_155.mp3",
        transcription:
          "poˈðɾi.a in.ðiˈkaɾ.me ˈkwa.les son las oθˈθjo.nes ðe tɾansˈpoɾ.te ðis.poˈni.βles en esˈta aˈɾea",
      },
      {
        word: "¿Puedo saber cuál es el límite de retiro diario para esta cuenta?",
        translation:
          "Могу я узнать, какой предельный размер ежедневного снятия средств с этого счёта?",
        audioUrl: "path_to_spanish_audio_156.mp3",
        transcription:
          "ˈpwe.ðo saˈβeɾ ˈkwal es el ˈlimi.te ðe reˈtiɾo ðiˈaɾjo paɾa esˈta kwenˈta",
      },
      {
        word: "¿Cuáles son las opciones de entretenimiento nocturno en esta ciudad?",
        translation: "Какие есть ночные развлечения в этом городе?",
        audioUrl: "path_to_spanish_audio_157.mp3",
        transcription:
          "ˈkwa.les son las oθˈθjo.nes ðe en.tɾe.teˈn̪i.mjen.to noɣˈtuɾno en esˈta θjuˈðað",
      },
      {
        word: "¿Cuál es su política de privacidad de datos en línea?",
        translation: "Какова ваша политика конфиденциальности в интернете?",
        audioUrl: "path_to_spanish_audio_158.mp3",
        transcription:
          "ˈkwal es su po.liˈti.ka ðe pɾi.βaθi.liˈðað ðe ˈda.tos en ˈli.ne.a",
      },
      {
        word: "¿Podría decirme cuáles son las políticas de su empresa en relación con la sostenibilidad?",
        translation:
          "Могли бы вы сказать мне, каковы политики вашей компании в отношении устойчивости?",
        audioUrl: "path_to_spanish_audio_159.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwa.les son las po.liˈti.kas ðe su emˈpɾe.sa en ɾe.laˈθjon kon la sos.te.niˈβili.ðað",
      },
      {
        word: "¿Puedo obtener información sobre el proceso de selección para su programa de voluntariado?",
        translation:
          "Могу я получить информацию о процессе отбора на вашу программу волонтерства?",
        audioUrl: "path_to_spanish_audio_160.mp3",
        transcription:
          "ˈpwe.ðo oβˈte.neɾ im.foɾ.maˈθjon so.βɾe el pɾoˈθes.o ðe seˈlekθjon paɾa su pɾo.ɣɾaˈma ðe βo.lo.nθaɾje.að",
      },
      {
        word: "¿Cuál es el procedimiento para solicitar la membresía?",
        translation: "Какая процедура получения членства?",
        audioUrl: "path_to_spanish_audio_161.mp3",
        transcription:
          "ˈkwal es el pɾoθeðiˈmjen.to paɾa sole.siˈtaɾ la memˈβɾe.si.a",
      },
      {
        word: "¿Podría informarme acerca de los beneficios de usar su servicio en lugar de otras opciones disponibles?",
        translation:
          "Могли бы вы рассказать мне о преимуществах использования вашего сервиса вместо других доступных вариантов?",
        audioUrl: "path_to_spanish_audio_162.mp3",
        transcription:
          "poˈðɾi.a im.foɾˈmaɾ.me aˈθeɾ.ka ðe los be.neˈfiθjos ðe uˈsaɾ su serˈβi.so en luˈɣaɾ ðe ˈotɾas oθˈθjo.nes dis.poˈni.βles",
      },
      {
        word: "¿Podría decirme cómo funciona el proceso de devolución de productos en su tienda?",
        translation:
          "Могли бы вы сказать мне, как работает процесс возврата товаров в вашем магазине?",
        audioUrl: "path_to_spanish_audio_163.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkomo funθjoˈna el pɾoˈθes.o ðe ðe.βo.luˈθjon ðe pɾoˈðuk.tos en su ˈtjenða",
      },
      {
        word: "¿Cuál es su política de accesibilidad para personas con discapacidades en sus instalaciones?",
        translation:
          "Какова ваша политика доступности для людей с ограниченными возможностями в ваших учреждениях?",
        audioUrl: "path_to_spanish_audio_164.mp3",
        transcription:
          "ˈkwal es su po.liˈti.ka ðe akθe.siˈβili.ðað paɾa peɾˈsonas kon dis.ka.paθiˈliðaðes en sus ins.ta.laˈθjon.es",
      },
      {
        word: "¿Puede proporcionarme detalles sobre el proceso de contratación de su empresa?",
        translation:
          "Можете предоставить мне информацию о процессе найма в вашей компании?",
        audioUrl: "path_to_spanish_audio_165.mp3",
        transcription:
          "ˈpwe.ðe pɾo.βi.ðenˈdaɾ.me ðeˈtaʎes so.βɾe el pɾoˈθes.o ðe kon.tɾaˈta.ɾjon ðe su emˈpɾe.sa",
      },
      {
        word: "¿Cuáles son las opciones de alojamiento disponibles en esta área?",
        translation: "Какие есть варианты проживания в этом районе?",
        audioUrl: "path_to_spanish_audio_166.mp3",
        transcription:
          "ˈkwa.les son las oθˈθjo.nes ðe alo.xaˈmjen.to dis.poˈni.βles en esˈta aˈɾea",
      },
      {
        word: "¿Podría decirme cuáles son los pasos necesarios para inscribirse en su programa de fidelización?",
        translation:
          "Могли бы вы сказать мне, какие необходимые шаги для регистрации в вашей программе лояльности?",
        audioUrl: "path_to_spanish_audio_167.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwa.les son los pasos neθeˈsaɾjos paɾa ins.kɾiˈβiɾ.se en su pɾoˈɣɾa.ma ðe fiðeli.saˈθjon",
      },
      {
        word: "¿Podría proporcionarme detalles sobre las normas de conducta que deben seguirse en su empresa?",
        translation:
          "Могли бы вы предоставить мне информацию о правилах поведения, которые должны соблюдаться в вашей компании?",
        audioUrl: "path_to_spanish_audio_168.mp3",
        transcription:
          "poˈðɾi.a pɾo.βi.ðenˈdaɾ.me ðeˈtaʎes so.βɾe las noɾˈmas ðe konˈduk.ta ke ðeˈβen suˈβlu.ðaɾ.se en su emˈpɾe.sa",
      },
      {
        word: "¿Cuál es la tarifa por el uso de la lavandería en su hotel?",
        translation: "Сколько стоит стирка в вашем отеле?",
        audioUrl: "path_to_spanish_audio_169.mp3",
        transcription:
          "ˈkwal es la taˈɾi.fa poɾ el ˈu.so ðe la la.βanˈde.ɾi.a en su oˈtel",
      },
      {
        word: "¿Puedo obtener información sobre el proceso de reclamación de garantía para productos comprados en su tienda?",
        translation:
          "Могу я получить информацию о процессе предъявления гарантийных претензий на товары, купленные в вашем магазине?",
        audioUrl: "path_to_spanish_audio_170.mp3",
        transcription:
          "ˈpwe.ðo oβˈte.neɾ im.foɾˈmaθjon so.βɾe el pɾoˈθes.o ðe ɾek.la.maˈθjon ðe ɡaɾanˈti.ʝa paɾa pɾoˈðuk.tos komˈpɾaðos en su ˈtjenða",
      },
      {
        word: "¿Podría decirme cuáles son las regulaciones que debo tener en cuenta durante mi estancia aquí?",
        translation:
          "Могли бы вы сказать мне, какие правила я должен соблюдать во время моего пребывания здесь?",
        audioUrl: "path_to_spanish_audio_171.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwa.les son las ɾe.ɣu.laˈθjon.es ke ˈde.βo teˈneɾ en ˈkwen.ta duˈɾan.te mi esˈtan.sja a.ki",
      },
      {
        word: "¿Cuál es su política de relaciones laborales?",
        translation: "Какова ваша политика в области трудовых отношений?",
        audioUrl: "path_to_spanish_audio_172.mp3",
        transcription: "ˈkwal es su po.liˈti.ka ðe re.laˈθjon.es la.boˈɾa.les",
      },
      {
        word: "¿Puedo saber cuáles son los servicios adicionales disponibles en este hotel?",
        translation:
          "Могу я узнать, какие дополнительные услуги предоставляются в этом отеле?",
        audioUrl: "path_to_spanish_audio_173.mp3",
        transcription:
          "ˈpwe.ðo saˈβeɾ ˈkwa.les son los serˈβiθjos a.ðiθjoˈna.les dis.poˈni.βles en esˈte oˈtel",
      },
      {
        word: "¿Podría ayudarme a programar un traslado al aeropuerto para mañana?",
        translation:
          "Могли бы вы помочь мне организовать трансфер в аэропорт на завтра?",
        audioUrl: "path_to_spanish_audio_174.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a pɾo.ɣɾa.maɾ un tɾansˈlaðo al a.eɾoˈpweɾto paɾa maˈɲana",
      },
      {
        word: "¿Podría explicarme cómo funciona su sistema de facturación?",
        translation:
          "Могли бы вы объяснить мне, как работает ваша система выставления счетов?",
        audioUrl: "path_to_spanish_audio_175.mp3",
        transcription:
          "poˈðɾi.a es.pli.kaɾˈme ˈkomo funθjoˈna su sisˈte.ma ðe fak.tu.ɾaˈθjon",
      },
      {
        word: "¿Podría decirme cuál es la cantidad máxima de efectivo que puedo retirar diariamente?",
        translation:
          "Могли бы вы сказать мне, какая максимальная сумма наличных, которую я могу снять ежедневно?",
        audioUrl: "path_to_spanish_audio_176.mp3",
        transcription:
          "poˈðɾi.a ðiɾˈme ˈkwal es la kanˈti.ðað ˈmaksima ðe e.fekˈti.βo ke ˈpwe.ðo reˈtiɾaɾ e.xe.ðeˈnalˈmen.te",
      },
      {
        word: "¿Podría proporcionarme detalles sobre las actividades que se ofrecen en su complejo turístico?",
        translation:
          "Могли бы вы предоставить мне информацию о предлагаемых активностях в вашем курортном комплексе?",
        audioUrl: "path_to_spanish_audio_177.mp3",
        transcription:
          "poˈðɾi.a pɾo.βi.ðenˈdaɾ.me ðeˈtaʎes so.βɾe las ak.tiβiˈðaðes ke se o.fɾeˈθen en su komˈplek.so tuˈɾis.ti.ko",
      },
      {
        word: "¿Puedo saber cuáles son las políticas de su empresa en relación con los derechos humanos?",
        translation:
          "Могу я узнать, каковы политики вашей компании в отношении прав человека?",
        audioUrl: "path_to_spanish_audio_178.mp3",
        transcription:
          "ˈpwe.ðo saˈβeɾ ˈkwa.les son las po.liˈti.kas ðe su emˈpɾe.sa en ɾe.laˈθjon kon los deˈʧos su.maˈnos",
      },
      {
        word: "¿Podría informarme cuáles son los pasos para abrir una cuenta bancaria con su institución?",
        translation:
          "Могли бы вы сообщить мне, какие шаги необходимо предпринять для открытия банковского счета в вашем учреждении?",
        audioUrl: "path_to_spanish_audio_179.mp3",
        transcription:
          "poˈðɾi.a im.foɾˈmaɾ.me ˈkwa.les son los pasos paɾa aˈβiɾ u.na kwenˈta βaŋˈka.ɾja kon su inseθ.uˈθjon",
      },
      {
        word: "¿Podría ayudarme a entender cómo puedo aplicar a una oferta de trabajo en su empresa?",
        translation:
          "Могли бы вы помочь мне понять, как подать заявку на вакансию в вашей компании?",
        audioUrl: "path_to_spanish_audio_180.mp3",
        transcription:
          "poˈðɾi.a a.ʝuˈðaɾ.me a en.tenˈdeɾ ˈkomo ˈpwe.ðo ap.liˈkaɾ a u.na ofeɾˈta ðe tɾaˈβoxo en su emˈpɾe.sa",
      },
      // Другие слова для испанского языка
    ];
  }
}
