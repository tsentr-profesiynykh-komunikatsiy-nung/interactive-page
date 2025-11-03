// script.js

let data = null;
let currentContext = { type: null, faculty: null, department: null };

async function loadDataAndInit() {
  const response = await fetch('data.json');
  data = await response.json();
  renderMainButtons();
}

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

function renderFaculties(type) {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Факультети';
  mainContent.appendChild(header);
  const wrap = document.createElement('div');
  wrap.className = 'faculty-wrap';
  data.faculties.forEach(faculty => {
    const btn = document.createElement('button');
    btn.className = 'faculty-btn';
    btn.textContent = faculty.name;
    btn.onclick = () => {
      currentContext = { type, faculty: faculty.name, department: null };
      renderDepartments(type, faculty.name);
    };
    wrap.appendChild(btn);
  });
  mainContent.appendChild(wrap);
}

function renderDepartments(type, facultyName) {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Кафедри';
  mainContent.appendChild(header);
  const wrap = document.createElement('div');
  wrap.className = 'faculty-wrap';
  const faculty = data.faculties.find(f => f.name === facultyName);
  if (!faculty) return;
  faculty.departments.forEach(dept => {
    const btn = document.createElement('button');
    btn.className = 'faculty-btn';
    btn.textContent = dept.name;
    btn.onclick = () => {
      currentContext = { type, faculty: facultyName, department: dept.name };
      renderItems(type, facultyName, dept.name);
    };
    wrap.appendChild(btn);
  });
  mainContent.appendChild(wrap);
}

function renderItems(type, facultyName, departmentName) {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Список';
  mainContent.appendChild(header);
  const faculty = data.faculties.find(f => f.name === facultyName);
  if (!faculty) return;
  const dept = faculty.departments.find(d => d.name === departmentName);
  if (!dept) return;
  const items = dept[type] || [];
  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.company} — ${item.position}`;
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

function handleMainButton(id) {
  mainContent.classList.remove('home');
  if (id === 'practice' || id === 'employment') {
    currentContext = { type: id === 'practice' ? 'практика' : 'працевлаштування', faculty: null, department: null };
    renderFaculties(currentContext.type);
  } else if (id === 'communication') {
    renderCommunication();
  }
}

// Initial render
loadDataAndInit();
