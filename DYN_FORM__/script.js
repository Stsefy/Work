function buildForm(formArray, formId) {
  const formContainer = document.createElement(formId);
  const form = document.createElement("form");
  formArray.forEach((field) => {
    switch (field.kind) {
      case "submit":
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = field.caption;
        form.appendChild(submitButton);
        break;
      case "longtext":
      case "shorttext":
      case "number":
      case "memo":
        const label = document.createElement("label");
        label.textContent = field.label;

        const input = document.createElement("input");
        input.type = field.kind;
        input.name = field.name;
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
        break;
      case "dropdown":
        const label1 = document.createElement("label");
        label.textContent = field.
    }
  });
}

const formDef1 = [
  { label: "Название сайта:", kind: "longtext", name: "sitename" },
  { label: "URL сайта:", kind: "longtext", name: "siteurl" },
  { label: "Посетителей в сутки:", kind: "number", name: "visitors" },
  { label: "E-mail для связи:", kind: "shorttext", name: "email" },
  {
    label: "Рубрика каталога:",
    kind: "dropdown",
    name: "division",
    variants: [
      { text: "здоровье", value: 1 },
      { text: "домашний уют", value: 2 },
      { text: "бытовая техника", value: 3 },
    ],
  },
  {
    label: "Размещение:",
    kind: "radio",
    name: "payment",
    variants: [
      { text: "бесплатное", value: 1 },
      { text: "платное", value: 2 },
      { text: "VIP", value: 3 },
    ],
  },
  { label: "Разрешить отзывы:", kind: "check", name: "votes" },
  { label: "Описание сайта:", kind: "memo", name: "description" },
  { caption: "Опубликовать", kind: "submit" },
];
const formDef2 = [
  { label: "Фамилия:", kind: "longtext", name: "lastname" },
  { label: "Имя:", kind: "longtext", name: "firstname" },
  { label: "Отчество:", kind: "longtext", name: "secondname" },
  { label: "Возраст:", kind: "number", name: "age" },
  { caption: "Зарегистрироваться", kind: "submit" },
];

buildForm(formDef1, "form1");
buildForm(formDef2, "form2");
