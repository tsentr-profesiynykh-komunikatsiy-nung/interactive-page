// script.js

// Fake data
const faculties = [
  'Факультет математики', 'Факультет фізики', 'Факультет хімії', 'Факультет біології',
  'Факультет інформатики', 'Факультет геології', 'Факультет економіки', 'Факультет права',
  'Факультет історії', 'Факультет філології', 'Факультет психології', 'Факультет мистецтв',
  'Факультет журналістики', 'Факультет туризму', 'Факультет педагогіки', 'Факультет соціології',
  'Факультет менеджменту', 'Факультет екології', 'Факультет архітектури', 'Факультет енергетики'
];
const departments = [
  'Кафедра математики', 'Кафедра алгебри', 'Кафедра геометрії', 'Кафедра аналізу',
  'Кафедра фізики', 'Кафедра хімії', 'Кафедра біології', 'Кафедра інформатики'
];
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
  mainButtons.forEach(btn => {
    const button = document.createElement('button');
    button.className = 'main-btn';
    button.textContent = btn.label;
    button.onclick = () => handleMainButton(btn.id);
    mainContent.appendChild(button);
  });
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
  addBackButton(renderMainButtons);
  const header = document.createElement('h2');
  header.textContent = 'Факультети';
  mainContent.appendChild(header);
  const wrap = document.createElement('div');
  wrap.className = 'faculty-wrap';
  faculties.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.className = 'faculty-btn';
    btn.textContent = name;
    btn.onclick = () => renderDepartments(context);
    wrap.appendChild(btn);
  });
  mainContent.appendChild(wrap);
}

function renderDepartments(context) {
  mainContent.innerHTML = '';
  addBackButton(() => renderFaculties(context));
  const header = document.createElement('h2');
  header.textContent = 'Кафедри';
  mainContent.appendChild(header);
  const wrap = document.createElement('div');
  wrap.className = 'faculty-wrap';
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
  addBackButton(() => renderDepartments(context));
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
  addBackButton(renderMainButtons);
  const header = document.createElement('h2');
  header.textContent = 'Комунікація';
  mainContent.appendChild(header);
  const text = document.createElement('div');
  text.className = 'communication-text';
  text.textContent = 'Тут буде інформація про комунікацію.';
  mainContent.appendChild(text);
}

function addBackButton(callback) {
  // Only add back button if not on home page
  if (!mainContent.classList.contains('home')) {
    const back = document.createElement('button');
    back.className = 'back-btn';
    back.innerHTML = '← Назад';
    back.onclick = callback;
    mainContent.appendChild(back);
  }
}

// Initial render
renderMainButtons();
