function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById('btn-kick');
const $secondBtn = $getElById('btn-second-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

$btn.addEventListener('click', function () {
    makeKicks(20, 20);
});

$secondBtn.addEventListener('click', function () {
    makeKicks(50, 20);
});

function makeKicks(characterPower, enemyPower) {
    character.changeHP(random(enemyPower));
    enemy.changeHP(random(characterPower));
}

function init() {
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    this.elProgressbar.style.width = this.damageHP + '%';
}

function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    addLog(log);

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        $btn.disabled = true;
        $secondBtn.disabled = true;
    }

    this.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, damage) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}`
    ];

    return logs[random(logs.length - 1)];
}

function addLog(newLogText) {
    const $logs = document.querySelector('#logs');
    const $p = document.createElement('p');

    $p.innerText = newLogText;
    $logs.insertBefore($p, $logs.children[0]);
}

init();
