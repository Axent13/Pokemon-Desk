import Pokemon from "./pokemon.js";
import { random, $getElById, generateLog, addLog } from "./utils.js";
import { pokemons } from "./pokemons.js";

class Game {
  constructor() {
    console.log('Game created!');
    const $controls = document.querySelector('.control');

    const $startBtn = document.createElement('button');
    $startBtn.classList.add('button', 'start-button');
    $startBtn.innerText = 'Начать игру';
    $startBtn.addEventListener('click', () => {
      this.startGame();
    });
    $controls.appendChild($startBtn);
  }

  startGame() {
    console.log('Start game!');
    // Убираем все кнопки
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
    // Чистим лог
    const $logs = document.querySelector('#logs');
    $logs.innerHTML = '';

    // Создаем игроков
    const pikachu = pokemons.find(item => item.name === 'Pikachu');
    const player1 = new Pokemon({
      ...pikachu,
      selectors: 'player1',
    });

    const $player1ElImg = document.getElementById('img-player1');
    $player1ElImg.src = pokemons[0].img;

    // Выбираем случайное имя из списка покемонов...
    let enemyPokemonName = pokemons[random(pokemons.length) - 1].name;
    console.log(`Ваш первый противник - ${enemyPokemonName}!`);
    // ...и получаем его объект с характеристиками
    let enemyPokemon = pokemons.find(item => item.name === enemyPokemonName);

    let player2 = new Pokemon({
      ...enemyPokemon,
      selectors: 'player2',
    });

    const $player2ElImg = document.getElementById('img-player2');
    $player2ElImg.src = player2.img;

    // Добавляем кнопки атаки
    const $control = document.querySelector('.control');

    player1.attacks.forEach(item => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = item.name;
      const btnCount = countBtn(item.maxCount, $btn);
      $btn.addEventListener('click', () => {
        btnCount();
        // Бьём мы
        player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
          addLog(generateLog(player2, player1, count));
        });
        if (player2.hp.current !== 0) {
          // Бьёт противник
          player1.changeHP(random(player2.attacks[0].maxDamage, player2.attacks[0].minDamage), function (count) {
            addLog(generateLog(player1, player2, count));
          });
          
          if (player1.hp.current === 0) {
            console.log('Вы проиграли...');
            this.resetGame();
          }
        } else {
          // Выбираем новое случайное имя из списка покемонов...
          enemyPokemonName = pokemons[random(pokemons.length) - 1].name;
          console.log(`Появляется новый противник - ${enemyPokemonName}!`);
          // ...и получаем его объект с характеристиками
          enemyPokemon = pokemons.find(item => item.name === enemyPokemonName);

          player2 = new Pokemon({
            ...enemyPokemon,
            selectors: 'player2',
          });

          const $player2ElImg = document.getElementById('img-player2');
          $player2ElImg.src = player2.img;
        }
      });

      $control.appendChild($btn);
    });

    function countBtn(count = 6, el) {
      const innerText = el.innerText;
      el.innerText = `${innerText} (${count})`;
      return function () {
        count--;
        if (count === 0) {
          el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
      }
    }

    // Добавлем в конец кнопку перезапуска
    const $resetBtn = document.createElement('button');
    $resetBtn.classList.add('button', 'restart-button');
    $resetBtn.innerText = 'Перезапустить игру';
    $resetBtn.addEventListener('click', () => {
      this.resetGame();
    });
    $control.appendChild($resetBtn);
  }

  resetGame() {
    console.log('Reset game...');
    this.startGame();
  }
}

export default Game;