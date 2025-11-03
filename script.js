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
  if (type === 'employment') {
    header.textContent = 'Список вакансій';
  } else if (type === 'practice') {
    header.textContent = 'Список компаній для практики';
  } else {
    header.textContent = 'Список';
  }
  mainContent.appendChild(header);
  const faculty = data.faculties.find(f => f.name === facultyName);
  if (!faculty) return;
  const dept = faculty.departments.find(d => d.name === departmentName);
  if (!dept) return;
  const items = dept[type] || [];
  const listWrap = document.createElement('div');
  listWrap.className = 'fancy-list';
  if (type === 'employment') {
    items.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'fancy-list-item employment clickable';
      card.tabIndex = 0;
      card.innerHTML = `<span style="margin-right: 10px;" class="fancy-list-company">${item.company}</span><span class="fancy-list-position">${item.position}</span>`;
      card.onclick = () => {
        renderVacancyDetails('employment', facultyName, departmentName, idx);
      };
      listWrap.appendChild(card);
    });
  } else if (type === 'practice') {
    items.forEach((company, idx) => {
      const card = document.createElement('div');
      card.className = 'fancy-list-item practice clickable';
      card.tabIndex = 0;
      card.innerHTML = `<span class="fancy-list-company">${company}</span>`;
      card.onclick = () => {
        renderVacancyDetails('practice', facultyName, departmentName, idx);
      };
      listWrap.appendChild(card);
    });
  }
  mainContent.appendChild(listWrap);
}

function renderVacancyDetails(type, facultyName, departmentName, idx) {
  mainContent.innerHTML = '';
  addBackButton();
  const faculty = data.faculties.find(f => f.name === facultyName);
  if (!faculty) return;
  const dept = faculty.departments.find(d => d.name === departmentName);
  if (!dept) return;
  const contactBlock = document.createElement('div');
  contactBlock.className = 'vacancy-contact-block';
  let infoText = '';
  if (type === 'employment') {
    infoText = 'Для детальнішої інформації щодо працевлаштування зв\'яжіться з нами:';
  } else {
    infoText = 'Для детальнішої інформації щодо практики зв\'яжіться з нами:';
  }
  const info = document.createElement('div');
  info.className = 'vacancy-info-text';
  info.textContent = infoText;
  contactBlock.appendChild(info);
  const email = document.createElement('div');
  email.className = 'vacancy-email';
  email.innerHTML = `<b>Email:</b> <a href="mailto:${dept.email}">${dept.email}</a>`;
  contactBlock.appendChild(email);
  const phone = document.createElement('div');
  phone.className = 'vacancy-phone';
  phone.innerHTML = `<b>Телефон:</b> <a href="tel:${dept.phone}">${dept.phone}</a>`;
  contactBlock.appendChild(phone);
  mainContent.appendChild(contactBlock);
}

function renderCommunication() {
  mainContent.innerHTML = '';
  addBackButton();
  const header = document.createElement('h2');
  header.textContent = 'Комунікація';
  mainContent.appendChild(header);

  const text = document.createElement('div');
  text.className = 'communication-text';
  text.innerHTML = `
    Якщо у вас є відгуки, питання, пропозиції щодо співпраці або ви бажаєте зв'язатися з нами для комунікації — напишіть або зателефонуйте нам!<br><br>
    <div class="communication-contact-block">
      <div class="communication-contact-label"><b>Номер(и) телефону:</b></div>
      <div class="communication-contact-value"><a href="tel:+380507807525">+380507807525</a></div>
      <div class="communication-contact-label"><b>Електронна пошта:</b></div>
      <div class="communication-contact-value"><a href="mailto:cpk@nung.edu.ua">cpk@nung.edu.ua</a></div>
      <div class="communication-contact-label"><b>Адреса:</b></div>
      <div class="communication-contact-value">вул. Карпатська,15, м. Івано-Франківськ, 76019</div>
      <div class="communication-contact-label"><b>Веб-сайт:</b></div>
      <div class="communication-contact-value"><a href="https://nung.edu.ua/department/tsentr-profesiynykh-komunikatsi" target="_blank">https://nung.edu.ua/department/tsentr-profesiynykh-комунікацій</a></div>
    </div>
  `;
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
    currentContext = { type: id, faculty: null, department: null };
    renderFaculties(currentContext.type);
  } else if (id === 'communication') {
    renderCommunication();
  }
}

// Initial render
loadDataAndInit();
