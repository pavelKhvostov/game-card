// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

(() => {
  let counter = 0;
  let firstCard = null;
  let secondCard = null;

  function createNumbersArray(count) {
    if (count <= 0) {
      return [];
    }

    const result = [];
    for (let i = 1; i <= count; i++) {
      result.push(i, i);
    }

    return result;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    const shuffledArray = [...arr]; // Создаем копию исходного массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Генерируем случайный индекс
      // Меняем элементы местами
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count) {
    const originalArray = createNumbersArray(count);
    const shuffledArray = shuffle(originalArray);
    console.log(shuffledArray);

    const cardContainer = document.getElementById("content");

    if (count >= 8) {
      content.style = ` grid-template-columns: repeat(8, 1fr)`;
    }
    if (count > 12) {
      content.style = ` grid-template-columns: repeat(10, 1fr)`;
    }
    if (count > 15) {
      content.style = ` grid-template-columns: repeat(12, 1fr)`;
    }
    shuffledArray.forEach((element) => {
      const card = document.createElement("div");
      card.textContent = element;
      cardContainer.append(card);
      card.classList.add("card");

      card.addEventListener("click", () => {
        if (
          card.classList.contains("open") ||
          card.classList.contains("success")
        ) {
          return;
        }

        if (firstCard != null && secondCard != null) {
          firstCard.classList.remove("open");
          secondCard.classList.remove("open");
          firstCard = null;
          secondCard = null;
          counter = counter + 1;
          if (counter === count) {
            alert("Вы проиграли!");
            window.location.reload();
          }
        }

        card.classList.add("open");

        if (firstCard === null) {
          firstCard = card;
        } else {
          secondCard = card;
        }

        if (firstCard != null && secondCard != null) {
          let firstNumber = firstCard.textContent;
          let secondNumber = secondCard.textContent;
          if (firstNumber === secondNumber) {
            firstCard.classList.add("success");
            secondCard.classList.add("success");
            firstCard = null;
            secondCard = null;
          }
        }

        console.log(shuffledArray.length);
        console.log(document.querySelectorAll("success").length);

        if (
          shuffledArray.length === document.querySelectorAll(".success").length
        ) {
          setTimeout(() => {
            alert("Победа!!!");
            window.location.reload();
          }, 400);
        }
      });
    });
  }

  window.startGame = startGame;
})();
