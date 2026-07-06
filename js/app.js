// =============================================
//  MATIFIT - App Logic & Mock Data
// =============================================

// ---- MOCK DATA (estructura lista para Supabase) ----
// Cuando conectes Supabase, solo reemplazas esta variable
// con una llamada async: const { data: semanas } = await supabase.from('semanas').select('*, ejercicios(*)')

const MOCK_DATA = {
  trainer: {
    nombre: "Matías",
    apellido: "García",
    tag: "Personal Trainer Certificado",
    descripcion: "Con más de 5 años de experiencia transformando vidas a través del fitness, me especializo en diseñar planes de entrenamiento personalizados que se adaptan a tus objetivos y estilo de vida.",
    descripcion2: "Mi metodología combina ciencia del ejercicio con motivación real. Cada plan está diseñado para maximizar resultados, minimizar lesiones y hacer que disfrutes el proceso.",
    stats: [
      { numero: "150+", label: "Clientes Activos" },
      { numero: "5+", label: "Años Experiencia" },
      { numero: "98%", label: "Satisfacción" }
    ],
    features: [
      { icon: "🎯", titulo: "Plan Personalizado", desc: "Adaptado a tus metas" },
      { icon: "📊", titulo: "Seguimiento Real", desc: "Progreso medible" },
      { icon: "🏆", titulo: "Certificado", desc: "NSCA & ACSM" },
      { icon: "💬", titulo: "Soporte 24/7", desc: "Siempre disponible" }
    ]
  },

  semanas: [
    {
      id: 1,
      titulo: "Semana 1 — Base y Activación",
      subtitulo: "Introducción y adaptación muscular",
      tag: "Principiante",
      ejercicios: [
        {
          id: 1,
          nombre: "Sentadilla con Barra",
          descripcion: "El rey de los ejercicios. Activa cuádriceps, glúteos, isquiotibiales y core. Fundamental para construir fuerza de base.",
          imagen: "assets/images/squat.png",
          duracion: "45 min",
          dificultad: "Intermedio",
          series: "4",
          repeticiones: "12",
          descanso: "60 seg",
          musculos: ["Cuádriceps", "Glúteos", "Core"]
        },
        {
          id: 2,
          nombre: "Peso Muerto",
          descripcion: "Ejercicio compuesto que recluta la mayor cantidad de músculos del cuerpo. Fundamental para desarrollar fuerza posterior.",
          imagen: "assets/images/deadlift.png",
          duracion: "50 min",
          dificultad: "Avanzado",
          series: "3",
          repeticiones: "8",
          descanso: "90 seg",
          musculos: ["Isquiotibiales", "Glúteos", "Espalda baja"]
        },
        {
          id: 3,
          nombre: "Press de Banca",
          descripcion: "Ejercicio clásico para el desarrollo del pectoral, deltoides anterior y tríceps. Trabaja potencia en empuje horizontal.",
          imagen: "assets/images/bench.png",
          duracion: "40 min",
          dificultad: "Intermedio",
          series: "4",
          repeticiones: "10",
          descanso: "75 seg",
          musculos: ["Pectoral", "Deltoides", "Tríceps"]
        },
        {
          id: 4,
          nombre: "Dominadas",
          descripcion: "El mejor ejercicio para la espalda sin equipamiento. Desarrolla dorsal ancho, bíceps y mejora la postura general.",
          imagen: "assets/images/pullup.png",
          duracion: "35 min",
          dificultad: "Avanzado",
          series: "3",
          repeticiones: "8",
          descanso: "90 seg",
          musculos: ["Dorsal", "Bíceps", "Core"]
        },
        {
          id: 5,
          nombre: "Sentadilla Goblet",
          descripcion: "Variación de sentadilla ideal para aprender la técnica correcta. Activa core y mejora movilidad de cadera.",
          imagen: "assets/images/squat.png",
          duracion: "30 min",
          dificultad: "Facil",
          series: "3",
          repeticiones: "15",
          descanso: "45 seg",
          musculos: ["Cuádriceps", "Core", "Glúteos"]
        },
        {
          id: 6,
          nombre: "Remo con Barra",
          descripcion: "Ejercicio compuesto para espalda media, trabajando romboides, trapecio medio y bíceps. Mejora la postura.",
          imagen: "assets/images/deadlift.png",
          duracion: "40 min",
          dificultad: "Intermedio",
          series: "4",
          repeticiones: "10",
          descanso: "60 seg",
          musculos: ["Espalda media", "Bíceps", "Trapecio"]
        }
      ]
    },
    {
      id: 2,
      titulo: "Semana 2 — Volumen e Intensidad",
      subtitulo: "Aumentamos la carga y el volumen de trabajo",
      tag: "Intermedio",
      ejercicios: [
        {
          id: 7,
          nombre: "Sentadilla Frontal",
          descripcion: "Variación que exige mayor movilidad de tobillo y muñeca. Enfatiza cuádriceps y requiere mayor activación del core.",
          imagen: "assets/images/squat.png",
          duracion: "50 min",
          dificultad: "Avanzado",
          series: "4",
          repeticiones: "8",
          descanso: "90 seg",
          musculos: ["Cuádriceps", "Core", "Glúteos"]
        },
        {
          id: 8,
          nombre: "Press Militar",
          descripcion: "Desarrollo completo de hombros. Trabaja los tres haces del deltoides más tríceps y estabilizadores del core.",
          imagen: "assets/images/bench.png",
          duracion: "45 min",
          dificultad: "Intermedio",
          series: "4",
          repeticiones: "10",
          descanso: "75 seg",
          musculos: ["Deltoides", "Tríceps", "Core"]
        },
        {
          id: 9,
          nombre: "Hip Thrust",
          descripcion: "El ejercicio número uno para glúteos. Máxima activación y desarrollo del glúteo mayor con carga progresiva.",
          imagen: "assets/images/deadlift.png",
          duracion: "40 min",
          dificultad: "Facil",
          series: "4",
          repeticiones: "12",
          descanso: "60 seg",
          musculos: ["Glúteos", "Isquiotibiales", "Core"]
        },
        {
          id: 10,
          nombre: "Remo en Polea",
          descripcion: "Ejercicio de tirón horizontal que trabaja la espalda media con perfecta tensión constante durante todo el movimiento.",
          imagen: "assets/images/pullup.png",
          duracion: "35 min",
          dificultad: "Facil",
          series: "3",
          repeticiones: "15",
          descanso: "45 seg",
          musculos: ["Espalda media", "Bíceps", "Antebrazos"]
        },
        {
          id: 11,
          nombre: "Zancadas con Mancuernas",
          descripcion: "Ejercicio unilateral para piernas que mejora el equilibrio y trabaja glúteos y cuádriceps de forma independiente.",
          imagen: "assets/images/squat.png",
          duracion: "40 min",
          dificultad: "Intermedio",
          series: "3",
          repeticiones: "12",
          descanso: "60 seg",
          musculos: ["Cuádriceps", "Glúteos", "Equilibrio"]
        },
        {
          id: 12,
          nombre: "Curl de Bíceps",
          descripcion: "Aislamiento completo del bíceps. Fundamental para el desarrollo del brazo y fuerza en ejercicios de tirón.",
          imagen: "assets/images/bench.png",
          duracion: "30 min",
          dificultad: "Facil",
          series: "4",
          repeticiones: "12",
          descanso: "45 seg",
          musculos: ["Bíceps", "Braquial", "Antebrazos"]
        }
      ]
    },
    {
      id: 3,
      titulo: "Semana 3 — Fuerza Máxima",
      subtitulo: "Protocolo de fuerza con cargas pesadas",
      tag: "Avanzado",
      ejercicios: [
        {
          id: 13,
          nombre: "Sentadilla Búlgara",
          descripcion: "Elevada exigencia de equilibrio y fuerza unilateral. Máxima activación de glúteos y cuádriceps con menor carga.",
          imagen: "assets/images/squat.png",
          duracion: "55 min",
          dificultad: "Avanzado",
          series: "4",
          repeticiones: "8",
          descanso: "120 seg",
          musculos: ["Cuádriceps", "Glúteos", "Equilibrio"]
        },
        {
          id: 14,
          nombre: "Peso Muerto Rumano",
          descripcion: "Variación del peso muerto con énfasis en isquiotibiales y glúteos. Excelente para desarrollar la cadena posterior.",
          imagen: "assets/images/deadlift.png",
          duracion: "50 min",
          dificultad: "Intermedio",
          series: "4",
          repeticiones: "10",
          descanso: "90 seg",
          musculos: ["Isquiotibiales", "Glúteos", "Espalda baja"]
        },
        {
          id: 15,
          nombre: "Fondos en Paralelas",
          descripcion: "Ejercicio compuesto de empuje que trabaja el pectoral inferior, tríceps y deltoides anterior con el peso corporal.",
          imagen: "assets/images/bench.png",
          duracion: "40 min",
          dificultad: "Avanzado",
          series: "4",
          repeticiones: "12",
          descanso: "75 seg",
          musculos: ["Pectoral", "Tríceps", "Deltoides"]
        },
        {
          id: 16,
          nombre: "Dominada Supina",
          descripcion: "Variación con agarre supino que incrementa la participación del bíceps braquial durante el movimiento de tirón.",
          imagen: "assets/images/pullup.png",
          duracion: "45 min",
          dificultad: "Avanzado",
          series: "4",
          repeticiones: "8",
          descanso: "90 seg",
          musculos: ["Dorsal", "Bíceps", "Romboides"]
        }
      ]
    },
    {
      id: 4,
      titulo: "Semana 4 — Definición y Metabolismo",
      subtitulo: "Circuitos HIIT y trabajo cardiovascular",
      tag: "Cardio",
      ejercicios: [
        {
          id: 17,
          nombre: "Burpees con Salto",
          descripcion: "Ejercicio full body de alta intensidad. Quema calorías de forma acelerada y mejora la capacidad cardiovascular.",
          imagen: "assets/images/squat.png",
          duracion: "25 min",
          dificultad: "Avanzado",
          series: "5",
          repeticiones: "10",
          descanso: "30 seg",
          musculos: ["Full body", "Cardiovascular", "Core"]
        },
        {
          id: 18,
          nombre: "Sprint Intervals",
          descripcion: "Protocolo HIIT de alta intensidad. Alterna 20 segundos de sprint máximo con 10 segundos de descanso activo.",
          imagen: "assets/images/deadlift.png",
          duracion: "20 min",
          dificultad: "Avanzado",
          series: "8",
          repeticiones: "20 seg",
          descanso: "10 seg",
          musculos: ["Piernas", "Cardiovascular", "Core"]
        },
        {
          id: 19,
          nombre: "Mountain Climbers",
          descripcion: "Ejercicio de cardio que trabaja core, hombros y piernas simultáneamente. Perfecto para definición abdominal.",
          imagen: "assets/images/bench.png",
          duracion: "20 min",
          dificultad: "Intermedio",
          series: "4",
          repeticiones: "30",
          descanso: "30 seg",
          musculos: ["Core", "Hombros", "Cadera flexores"]
        },
        {
          id: 20,
          nombre: "Box Jumps",
          descripcion: "Pliometría para desarrollar potencia explosiva en piernas. Activa fibras rápidas y mejora la velocidad de reacción.",
          imagen: "assets/images/pullup.png",
          duracion: "30 min",
          dificultad: "Avanzado",
          series: "4",
          repeticiones: "8",
          descanso: "60 seg",
          musculos: ["Cuádriceps", "Glúteos", "Potencia"]
        }
      ]
    }
  ]
};


// =============================================
//  RENDER FUNCTIONS
// =============================================

function getDifficultyClass(dificultad) {
  const map = {
    'Facil': 'badge-facil',
    'Intermedio': 'badge-intermedio',
    'Avanzado': 'badge-avanzado',
    'Cardio': 'badge-intermedio'
  };
  return map[dificultad] || 'badge-intermedio';
}

function renderEjercicioCard(ejercicio, index) {
  const isHidden = index >= 4 ? 'hidden-card' : '';
  return `
    <div class="ejercicio-card ${isHidden}" 
         data-id="${ejercicio.id}"
         onclick="openModal(${ejercicio.id})"
         role="button"
         tabindex="0"
         aria-label="Ver detalles de ${ejercicio.nombre}">
      <div class="ejercicio-img-wrap">
        <img 
          class="ejercicio-img" 
          src="${ejercicio.imagen}" 
          alt="${ejercicio.nombre}"
          loading="lazy"
        />
        <div class="ejercicio-overlay"></div>
        <span class="ejercicio-badge ${getDifficultyClass(ejercicio.dificultad)}">${ejercicio.dificultad}</span>
        <span class="ejercicio-duration">⏱ ${ejercicio.duracion}</span>
      </div>
      <div class="ejercicio-body">
        <h4 class="ejercicio-name">${ejercicio.nombre}</h4>
        <p class="ejercicio-desc">${ejercicio.descripcion.slice(0, 80)}...</p>
        <div class="ejercicio-sets">
          <span class="set-chip">${ejercicio.series} series</span>
          <span class="set-chip">${ejercicio.repeticiones} reps</span>
          <span class="set-chip">⏸ ${ejercicio.descanso}</span>
        </div>
      </div>
    </div>
  `;
}

function renderSemana(semana, index) {
  const ejerciciosHTML = semana.ejercicios
    .map((ej, i) => renderEjercicioCard(ej, i))
    .join('');

  const hasExtra = semana.ejercicios.length > 4;

  return `
    <section class="semana-section" id="semana-${semana.id}" data-index="${index}">
      <div class="semana-header">
        <div class="semana-header-left">
          <div class="semana-number">${semana.id}</div>
          <div class="semana-info">
            <h2 class="semana-title">
              ${semana.titulo}
              <span class="semana-tag">${semana.tag}</span>
            </h2>
            <p class="semana-subtitle">${semana.subtitulo}</p>
          </div>
        </div>
        ${hasExtra ? `
          <button 
            class="btn-ver-todo" 
            id="btn-semana-${semana.id}"
            onclick="toggleSemana(${semana.id})"
            aria-expanded="false"
            aria-controls="grid-semana-${semana.id}"
          >
            Ver todo <span class="arrow">▼</span>
          </button>
        ` : ''}
      </div>
      <div class="ejercicios-grid" id="grid-semana-${semana.id}">
        ${ejerciciosHTML}
      </div>
    </section>
  `;
}

function renderSidebarLinks(semanas) {
  return semanas.map(s => `
    <a href="#semana-${s.id}" class="sidebar-link" data-target="semana-${s.id}" onclick="closeSidebar()">
      <span class="sidebar-link-icon">💪</span>
      <span>Semana ${s.id}</span>
      <span class="sidebar-link-badge">${s.ejercicios.length}</span>
    </a>
  `).join('');
}

function renderStats(stats) {
  return stats.map(s => `
    <div class="stat-item">
      <div class="stat-number">${s.numero}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function renderFeatures(features) {
  return features.map(f => `
    <div class="feature-item">
      <span class="feature-icon">${f.icon}</span>
      <div class="feature-text">
        <strong>${f.titulo}</strong>
        <span>${f.desc}</span>
      </div>
    </div>
  `).join('');
}


// =============================================
//  MODAL
// =============================================

let allEjercicios = [];

function buildEjercicioIndex(semanas) {
  semanas.forEach(s => {
    s.ejercicios.forEach(ej => {
      allEjercicios.push(ej);
    });
  });
}

function openModal(id) {
  const ej = allEjercicios.find(e => e.id === id);
  if (!ej) return;

  const musculosHTML = ej.musculos.map(m => `<span class="modal-tag">${m}</span>`).join('');
  const setsHTML = `
    <div class="modal-set-chip"><strong>${ej.series}</strong>Series</div>
    <div class="modal-set-chip"><strong>${ej.repeticiones}</strong>Reps</div>
    <div class="modal-set-chip"><strong>${ej.descanso}</strong>Descanso</div>
  `;

  document.getElementById('modal-img').src = ej.imagen;
  document.getElementById('modal-img').alt = ej.nombre;
  document.getElementById('modal-title').textContent = ej.nombre;
  document.getElementById('modal-tags').innerHTML = 
    `<span class="modal-tag ${getDifficultyClass(ej.dificultad)}">${ej.dificultad}</span>` +
    `<span class="modal-tag">⏱ ${ej.duracion}</span>` +
    musculosHTML;
  document.getElementById('modal-desc').textContent = ej.descripcion;
  document.getElementById('modal-sets').innerHTML = setsHTML;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}


// =============================================
//  TOGGLE: VER TODO
// =============================================

function toggleSemana(semanaId) {
  const grid = document.getElementById(`grid-semana-${semanaId}`);
  const btn = document.getElementById(`btn-semana-${semanaId}`);
  const hiddenCards = grid.querySelectorAll('.hidden-card');
  const isExpanded = btn.classList.contains('expanded');

  if (isExpanded) {
    hiddenCards.forEach(card => card.classList.add('hidden-card'));
    btn.innerHTML = 'Ver todo <span class="arrow">▼</span>';
    btn.classList.remove('expanded');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    hiddenCards.forEach(card => card.classList.remove('hidden-card'));
    btn.innerHTML = 'Ocultar <span class="arrow" style="transform:rotate(180deg)">▼</span>';
    btn.classList.add('expanded');
    btn.setAttribute('aria-expanded', 'true');
  }
}


// =============================================
//  SIDEBAR (mobile)
// =============================================

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
  document.body.style.overflow = '';
}


// =============================================
//  SCROLL EFFECTS
// =============================================

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  });
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function initScrollReveal() {
  const sections = document.querySelectorAll('.semana-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Update active sidebar link
        const id = entry.target.id;
        document.querySelectorAll('.sidebar-link').forEach(link => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '-80px 0px -20% 0px' });

  sections.forEach(s => observer.observe(s));
}

function initNavLinks() {
  const links = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < 100) current = section.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });
}


// =============================================
//  CONTACT FORM
// =============================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Mensaje enviado. Te contactaremos pronto!');
    form.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}


// =============================================
//  KEYBOARD ACCESSIBILITY
// =============================================

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('.ejercicio-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}


// =============================================
//  INIT: RENDER EVERYTHING
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const { trainer, semanas } = MOCK_DATA;

  // ---- Render trainer info ----
  document.getElementById('hero-title-name').textContent = trainer.nombre;
  document.getElementById('hero-subtitle').textContent = trainer.descripcion;
  document.getElementById('hero-stats').innerHTML = renderStats(trainer.stats);
  document.getElementById('about-desc-1').textContent = trainer.descripcion;
  document.getElementById('about-desc-2').textContent = trainer.descripcion2;
  document.getElementById('about-features').innerHTML = renderFeatures(trainer.features);

  // ---- Render sidebar ----
  document.getElementById('sidebar-nav').innerHTML = renderSidebarLinks(semanas);

  // ---- Render planes ----
  const planesContainer = document.getElementById('planes-container');
  planesContainer.innerHTML = semanas.map((s, i) => renderSemana(s, i)).join('');

  // ---- Build ejercicio index for modal ----
  buildEjercicioIndex(semanas);

  // ---- Init interactions ----
  initScrollProgress();
  initNavbarScroll();
  initScrollReveal();
  initNavLinks();
  initContactForm();
  initKeyboard();

  console.log('🏋️ Matifit loaded successfully');
});
