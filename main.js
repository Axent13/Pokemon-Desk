import Pokemon from "./pokemon.js";
import random from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
});

function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById('btn-kick');
const $secondBtn = $getElById('btn-second-kick');

const firstBtnCount = countBtn(6, $btn);
$btn.addEventListener('click', function () {
    firstBtnCount();
    player1.changeHP(random(60, 20), function(count) {
        addLog(generateLog(player1, player2, count));
    });
    player2.changeHP(random(60, 20), function(count) {
        addLog(generateLog(player2, player1, count));
    });
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

const secondBtnCount = countBtn(10, $secondBtn);
$secondBtn.addEventListener('click', function () {
    secondBtnCount();
    player1.changeHP(random(20), function(count) {
        addLog(generateLog(player1, player2, count));
    });
    player2.changeHP(random(20), function(count) {
        addLog(generateLog(player2, player1, count));
    });
});

function generateLog(firstPerson, secondPerson, damage) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`
    ];

    return logs[random(logs.length - 1)];
}

function addLog(newLogText) {
    const $logs = document.querySelector('#logs');
    const $p = document.createElement('p');

    $p.innerText = newLogText;
    $logs.insertBefore($p, $logs.children[0]);
}