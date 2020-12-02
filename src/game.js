import Pokemon from "./pokemon.js";
import { random, $getElById, generateLog, addLog } from "./utils.js";

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

  async getAllPokemons() {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
    const result = await response.json();
    return result;
  }

  async getPokemonByName(name = 'Pikachu') {
    const response = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons?name=${name}`);
    const result = await response.json();
    return result;
  }

  async getPokemonById(id = 25) {
    const response = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons?id=${id}`);
    const result = await response.json();
    return result;
  }

  async getRandomPokemon() {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
    const result = await response.json();
    return result;
  }

  async getAttacksParameters(player1Id, attackId, player2Id) {
    const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1Id}&attackId=${attackId}&player2id=${player2Id}`);
    const result = await response.json();
    return result;
  }

  async startGame() {
    console.log('Start game!');
    // Убираем все кнопки
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
    // Чистим лог
    const $logs = document.querySelector('#logs');
    $logs.innerHTML = '';

    // Создаем игроков
    const pikachu = await this.getPokemonByName('Pikachu');
    const playerName = pikachu.name;
    const $player1NameEl = $getElById('name-player1');
    $player1NameEl.innerText = playerName;
    const player1 = new Pokemon({
      ...pikachu,
      selectors: 'player1',
    });

    const $player1ElImg = document.getElementById('img-player1');
    $player1ElImg.src = player1.img;

    // Выбираем случайное имя из списка покемонов...
    let randomPokemon = await this.getRandomPokemon();
    let enemyPokemonName = randomPokemon.name;
    console.log(`Ваш первый противник - ${enemyPokemonName}!`);
    const $player2NameEl = $getElById('name-player2');
    $player2NameEl.innerText = enemyPokemonName;
    // ...и получаем его объект с характеристиками
    let enemyPokemon = await this.getPokemonByName(enemyPokemonName);
    
    let player2 = new Pokemon({
      ...enemyPokemon,
      selectors: 'player2',
    });


    let $player2ElImg = document.getElementById('img-player2');
    $player2ElImg.src = player2.img;

    // Добавляем кнопки атаки
    const $control = document.querySelector('.control');

    const playerPokemon = await this.getPokemonByName(playerName);
    const playerPokemonId = playerPokemon.id;
    const enemyPokemonId = enemyPokemon.id;

    player1.attacks.forEach( async (item, index) => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = item.name;

      const btnCount = countBtn(item.maxCount, $btn);
      $btn.addEventListener('click', async () => {
        btnCount();
        // Бьём мы
        let attack = await this.getAttacksParameters(playerPokemonId, index + 1, enemyPokemonId);
        let player1DamageCount = attack.kick.player1;
        let player2DamageCount = attack.kick.player2;

        player2.changeHP(player2DamageCount, function (player2DamageCount) {
          addLog(generateLog(player2, player1, player2DamageCount));
        });
        if (player2.hp.current !== 0) {
          // Бьёт противник
          player1.changeHP(player1DamageCount, function (player1DamageCount) {
            addLog(generateLog(player1, player2, player1DamageCount));
          });
          
          if (player1.hp.current === 0) {
            console.log('Вы проиграли...');
            this.resetGame();
          }
        } else {
          // Выбираем новое случайное имя из списка покемонов...
          randomPokemon = await this.getRandomPokemon();
          enemyPokemonName = randomPokemon.name;
          console.log(`Ваш новый противник - ${enemyPokemonName}!`);
          $player2NameEl.innerText = enemyPokemonName;
          // ...и получаем его объект с характеристиками
          enemyPokemon = await this.getPokemonByName(enemyPokemonName);
          
          player2 = new Pokemon({
            ...enemyPokemon,
            selectors: 'player2',
          });


          $player2ElImg = document.getElementById('img-player2');
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