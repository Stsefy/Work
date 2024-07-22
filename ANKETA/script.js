let userFam;
do {
  userFam = prompt("Введите свою фамилию");
} while (!userFam);

let userName;
do {
  userName = prompt("Введите свое имя");
} while (!userName);

let userSurname;
do {
  userSurname = prompt("Введите свое отчество");
} while (!userSurname);

let ageStr;
let age;
do {
  ageStr = prompt("Введите свой возраст");
  age = parseInt(ageStr);
} while (!ageStr || isNaN(age));

const gender = confirm("Ваш пол - мужской?");

const pension = gender ? 65 : 60;

alert(
  `Ваше ФИО: ${userFam} ${userName} ${userSurname}
Ваш возраст в годах: ${age}
Ваш возраст в днях: ${age * 365}
Через 5 лет вам будет: ${age + 5}
Ваш пол: ${gender ? "мужской" : "женский"}
Вы на пенсии: ${age >= pension ? "да" : "нет"}`
);
