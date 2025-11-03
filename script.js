// script.js

// Fake data
const faculties = [
  'Факультет математики', 'Факультет фізики', 'Факультет хімії', 'Факультет біології',
  'Факультет інформатики', 'Факультет геології', 'Факультет економіки', 'Факультет права',
  'Факультет історії', 'Факультет філології', 'Факультет психології', 'Факультет мистецтв',
  'Факультет журналістики', 'Факультет туризму', 'Факультет педагогіки', 'Факультет соціології',
  'Факультет менеджменту', 'Факультет екології', 'Факультет архітектури', 'Факультет енергетики'
];
const departmentsByFaculty = {
  'Факультет математики': ['Кафедра алгебри', 'Кафедра геометрії', 'Кафедра аналізу'],
  'Факультет фізики': ['Кафедра теоретичної фізики', 'Кафедра експериментальної фізики'],
  'Факультет хімії': ['Кафедра органічної хімії', 'Кафедра неорганічної хімії'],
  'Факультет біології': ['Кафедра ботаніки', 'Кафедра зоології'],
  'Факультет інформатики': ['Кафедра програмування', 'Кафедра комп’ютерних наук'],
  'Факультет геології': ['Кафедра геології', 'Кафедра геофізики'],
  'Факультет економіки': ['Кафедра економіки', 'Кафедра фінансів'],
  'Факультет права': ['Кафедра цивільного права', 'Кафедра кримінального права'],
  'Факультет історії': ['Кафедра історії України', 'Кафедра всесвітньої історії'],
  'Факультет філології': ['Кафедра української мови', 'Кафедра літератури'],
  'Факультет психології': ['Кафедра загальної психології', 'Кафедра практичної психології'],
  'Факультет мистецтв': ['Кафедра музики', 'Кафедра образотворчого мистецтва'],
  'Факультет журналістики': ['Кафедра друкованих ЗМІ', 'Кафедра телебачення'],
  'Факультет туризму': ['Кафедра туризму', 'Кафедра готельної справи'],
  'Факультет педагогіки': ['Кафедра педагогіки', 'Кафедра дошкільної освіти'],
  'Факультет соціології': ['Кафедра соціології', 'Кафедра соціальної роботи'],
  'Факультет менеджменту': ['Кафедра менеджменту', 'Кафедра логістики'],
  'Факультет екології': ['Кафедра екології', 'Кафедра охорони природи'],
  'Факультет архітектури': ['Кафедра архітектури', 'Кафедра містобудування'],
  'Факультет енергетики': ['Кафедра енергетики', 'Кафедра електротехніки']
};
const items = [
  'Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4', 'Пункт 5'
];

const mainButtons = [
  { label: 'Практика', id: 'practice' },
  { label: 'Працевлаштування', id: 'employment' },
  { label: 'Комунікація', id: 'communication' }
];

const mainContent = document.querySelector('.main-content');

function renderMainButtons() {
  mainContent.classList.add('home');
  mainContent.innerHTML = '';
  // Add a wrapper for welcome and desc
  const infoWrap = document.createElement('div');
  infoWrap.className = 'home-info-wrap';
  const welcome = document.createElement('div');
  welcome.className = 'welcome-block';
  welcome.textContent = 'Вітаємо у Центрі Професійних Комунікацій!';
  infoWrap.appendChild(welcome);
  const desc = document.createElement('div');
  desc.className = 'desc-block';
  desc.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut sunt incidunt dolorem inventore dignissimos voluptatibus modi, fugiat tempore omnis nulla quod cum iure necessitatibus recusandae ea culpa ullam quas repellendus.';
  infoWrap.appendChild(desc);
  mainContent.appendChild(infoWrap);
  // Add a wrapper for the main buttons
  const btnWrap = document.createElement('div');
  btnWrap.className = 'home-btn-wrap';
  mainButtons.forEach(btn => {
    const button = document.createElement('button');
    button.className = 'main-btn';
    button.textContent = btn.label;
    button.onclick = () => handleMainButton(btn.id);
    btnWrap.appendChild(button);
  });
  mainContent.appendChild(btnWrap);
}

function handleMainButton(id) {
  mainContent.classList.remove('home');
  if (id === 'practice' || id === 'employment') {
    renderFaculties(id);
  } else if (id === 'communication') {
    renderCommunication();
  }
}

function renderFaculties(context) {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Факультети';
  mainContent.appendChild(header);
  const wrap = document.createElement('div');
  wrap.className = 'faculty-wrap';
  faculties.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.className = 'faculty-btn';
    btn.textContent = name;
    btn.onclick = () => renderDepartments(context, name);
    wrap.appendChild(btn);
  });
  mainContent.appendChild(wrap);
}

function renderDepartments(context, facultyName) {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Кафедри';
  mainContent.appendChild(header);
  const wrap = document.createElement('div');
  wrap.className = 'faculty-wrap';
  const departments = departmentsByFaculty[facultyName] || [];
  departments.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.className = 'faculty-btn';
    btn.textContent = name;
    btn.onclick = () => renderItems(context);
    wrap.appendChild(btn);
  });
  mainContent.appendChild(wrap);
}

function renderItems(context) {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Список';
  mainContent.appendChild(header);
  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  mainContent.appendChild(ul);
  const contact = document.createElement('div');
  contact.className = 'contact-block';
  contact.textContent = 'Contact something@nung.edu.ua for more information.';
  mainContent.appendChild(contact);
}

function renderCommunication() {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Комунікація';
  mainContent.appendChild(header);
  const text = document.createElement('div');
  text.className = 'communication-text';
  text.textContent = 'Тут буде інформація про комунікацію.';
  mainContent.appendChild(text);
}

function addBackButton() {
  // Only add back button if not on home page
  if (!mainContent.classList.contains('home')) {
    const back = document.createElement('button');
    back.className = 'back-btn';
    back.innerHTML = '← Назад';
    back.onclick = renderMainButtons;
    mainContent.appendChild(back);
  }
}

// Initial render
renderMainButtons();
