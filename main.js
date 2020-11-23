const $btn = document.getElementById('btn-kick');
const $secondBtn = document.getElementById('btn-second-kick');
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

function clicksCounter(count = 0, maxCount = 6) {
    return function() {
        if (count < maxCount) {
            return ++count;
        } else {
            return -1;
        }
    }
}

const firstBtnCounter = clicksCounter();
const secondBtnCounter = clicksCounter();

$btn.addEventListener('click', function () {
    const clicksCount = firstBtnCounter();
    if (clicksCount === -1) {
        console.log('Закончились клики!');
    } else {
        console.log(`Сделано ${clicksCount} кликов из 6-ти.\nОсталось ${6 - clicksCount} нажатий!`);
        makeKicks(20, 20);
    }
});

$secondBtn.addEventListener('click', function () {
    const clicksCount = secondBtnCounter();
    if (clicksCount === -1) {
        console.log('Закончились клики!');
    } else {
        console.log(`Сделано ${clicksCount} кликов из 6-ти.\nОсталось ${6 - clicksCount} нажатий!`);
        makeKicks(50, 20);
    }
});

function makeKicks(characterPower, enemyPower) {
    changeHP(random(enemyPower), character);
    changeHP(random(characterPower), enemy);
}

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btn.disabled = true;
        $secondBtn.disabled = true;
    } else {
        person.damageHP -= count;
    }
    renderHP(person);
}

const random = (num) => Math.ceil(Math.random() * num);

init();
