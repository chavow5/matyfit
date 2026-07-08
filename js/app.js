// =============================================
//  MATIFIT - App Logic & Mock Data (Bilingual)
// =============================================

// ---- TRANSLATION DICTIONARY FOR STATIC INTERFACE ----
const TRANSLATIONS = {
  es: {
    nav_inicio: "Inicio",
    nav_sobre: "Sobre mí",
    nav_planes: "Planes",
    nav_contacto: "Contacto",
    nav_cta: "Comenzar ahora →",
    side_title_nav: "Navegación",
    side_title_sec: "Secciones",
    hero_badge: "Personal Trainer Certificado",
    hero_title_1: "Entrená con",
    hero_title_2: "Transforma tu vida",
    hero_btn_planes: "Ver planes 💪",
    hero_btn_sobre: "Conocerme mejor",
    sobre_tag: "Mi historia",
    sobre_title: "¿Quién soy?",
    sobre_subtitle: "El entrenador que te acompaña en cada paso del camino",
    about_exp: "Años de exp.",
    about_greeting: "Hola, soy Matías",
    planes_tag: "Contenido",
    planes_title: "Planes de Entrenamiento",
    contacto_tag: "Hablemos",
    contacto_title: "¿Listo para empezar?",
    contacto_subtitle: "Contactame y diseñamos tu plan personalizado",
    contacto_info_title: "Encontrame en",
    contacto_info_desc: "Seguime en redes sociales para ver contenido diario de entrenamiento, nutrición y motivación.",
    contact_wa: "WhatsApp directo",
    form_label_name: "Nombre",
    form_placeholder_name: "Tu nombre completo",
    form_label_email: "Email",
    form_placeholder_email: "tu@email.com",
    form_label_goal: "Objetivo",
    form_placeholder_goal: "¿Qué querés lograr?",
    form_label_msg: "Mensaje",
    form_placeholder_msg: "Contame más sobre vos y tus metas...",
    form_submit: "Enviar mensaje 🚀",
    footer_copy: "© 2026 Matifit. Todos los derechos reservados.",
    footer_by: "Hecho con 💪 por Matías García",
    modal_protocol_title: "PROTOCOLO DE ENTRENAMIENTO",
    modal_series: "Series",
    modal_reps: "Reps",
    modal_descanso: "Descanso",
    btn_ver_todo_more: "Ver todo",
    btn_ver_todo_less: "Ocultar",
    toast_success: "✅ Mensaje enviado. Te contactaremos pronto!",
    aria_modal_close: "Cerrar modal",
    aria_nav_open: "Abrir menú de navegación",
    sidebar_semana_label: "Semana"
  },
  en: {
    nav_inicio: "Home",
    nav_sobre: "About me",
    nav_planes: "Plans",
    nav_contacto: "Contact",
    nav_cta: "Start now →",
    side_title_nav: "Navigation",
    side_title_sec: "Sections",
    hero_badge: "Certified Personal Trainer",
    hero_title_1: "Train with",
    hero_title_2: "Transform your life",
    hero_btn_planes: "View plans 💪",
    hero_btn_sobre: "Know me better",
    sobre_tag: "My story",
    sobre_title: "About me",
    sobre_subtitle: "The trainer who guides you every step of the way",
    about_exp: "Years of exp.",
    about_greeting: "Hi, I'm Matías",
    planes_tag: "Content",
    planes_title: "Training Plans",
    contacto_tag: "Let's talk",
    contacto_title: "Ready to start?",
    contacto_subtitle: "Contact me and we will design your custom plan",
    contacto_info_title: "Find me on",
    contacto_info_desc: "Follow me on social media for daily training, nutrition, and motivation content.",
    contact_wa: "Direct WhatsApp",
    form_label_name: "Name",
    form_placeholder_name: "Your full name",
    form_label_email: "Email",
    form_placeholder_email: "you@email.com",
    form_label_goal: "Goal",
    form_placeholder_goal: "What do you want to achieve?",
    form_label_msg: "Message",
    form_placeholder_msg: "Tell me more about yourself and your goals...",
    form_submit: "Send message 🚀",
    footer_copy: "© 2026 Matifit. All rights reserved.",
    footer_by: "Made with 💪 by Matías García",
    modal_protocol_title: "TRAINING PROTOCOL",
    modal_series: "Sets",
    modal_reps: "Reps",
    modal_descanso: "Rest",
    btn_ver_todo_more: "View all",
    btn_ver_todo_less: "Hide",
    toast_success: "✅ Message sent. We will contact you soon!",
    aria_modal_close: "Close modal",
    aria_nav_open: "Open navigation menu",
    sidebar_semana_label: "Week"
  }
};

// ---- BILINGUAL MOCK DATA (Supabase structure ready) ----
const MOCK_DATA = {
  es: {
    trainer: {
      nombre: "Matías",
      apellido: "García",
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
            musculos: ["Cuerpo Completo", "Cardio", "Core"]
          },
          {
            id: 18,
            nombre: "Sprints Interválicos",
            descripcion: "Protocolo HIIT de alta intensidad. Alterna 20 segundos de sprint máximo con 10 segundos de descanso activo.",
            imagen: "assets/images/deadlift.png",
            duracion: "20 min",
            dificultad: "Avanzado",
            series: "8",
            repeticiones: "20 seg",
            descanso: "10 seg",
            musculos: ["Piernas", "Cardio", "Core"]
          },
          {
            id: 19,
            nombre: "Escaladores (Mountain Climbers)",
            descripcion: "Ejercicio de cardio que trabaja core, hombros y piernas simultáneamente. Perfecto para definición abdominal.",
            imagen: "assets/images/bench.png",
            duracion: "20 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "30",
            descanso: "30 seg",
            musculos: ["Core", "Hombros", "Cadera"]
          },
          {
            id: 20,
            nombre: "Saltos al Cajón (Box Jumps)",
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
  },
  en: {
    trainer: {
      nombre: "Matías",
      apellido: "García",
      descripcion: "With over 5 years of experience transforming lives through fitness, I specialize in designing personalized workout plans tailored to your specific goals and lifestyle.",
      descripcion2: "My methodology combines exercise science with real motivation. Each program is engineered to maximize results, minimize injuries, and help you enjoy the process.",
      stats: [
        { numero: "150+", label: "Active Clients" },
        { numero: "5+", label: "Years Experience" },
        { numero: "98%", label: "Satisfaction Rate" }
      ],
      features: [
        { icon: "🎯", titulo: "Custom Program", desc: "Tailored to your goals" },
        { icon: "📊", titulo: "Real Tracking", desc: "Measurable progress" },
        { icon: "🏆", titulo: "Certified Trainer", desc: "NSCA & ACSM" },
        { icon: "💬", titulo: "24/7 Support", desc: "Always available" }
      ]
    },
    semanas: [
      {
        id: 1,
        titulo: "Week 1 — Base & Activation",
        subtitulo: "Introduction and muscular adaptation",
        tag: "Beginner",
        ejercicios: [
          {
            id: 1,
            nombre: "Barbell Squat",
            descripcion: "The king of exercises. Recruits quadriceps, glutes, hamstrings, and core. Crucial for building baseline strength.",
            imagen: "assets/images/squat.png",
            duracion: "45 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "12",
            descanso: "60s",
            musculos: ["Quads", "Glutes", "Core"]
          },
          {
            id: 2,
            nombre: "Deadlift",
            descripcion: "Compound lift recruiting the maximum number of muscle groups in the body. Fundamental for posterior chain strength.",
            imagen: "assets/images/deadlift.png",
            duracion: "50 min",
            dificultad: "Avanzado",
            series: "3",
            repeticiones: "8",
            descanso: "90s",
            musculos: ["Hamstrings", "Glutes", "Lower Back"]
          },
          {
            id: 3,
            nombre: "Bench Press",
            descripcion: "Classic compound exercise for chest, anterior deltoids, and triceps development. Builds horizontal pushing power.",
            imagen: "assets/images/bench.png",
            duracion: "40 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "10",
            descanso: "75s",
            musculos: ["Chest", "Delts", "Triceps"]
          },
          {
            id: 4,
            nombre: "Pull-ups",
            descripcion: "The best back exercise without equipment. Develops latissimus dorsi, biceps, and improves overall upper posture.",
            imagen: "assets/images/pullup.png",
            duracion: "35 min",
            dificultad: "Avanzado",
            series: "3",
            repeticiones: "8",
            descanso: "90s",
            musculos: ["Lats", "Biceps", "Core"]
          },
          {
            id: 5,
            nombre: "Goblet Squat",
            descripcion: "Squat variation excellent for mastering squat depth and mechanics. Highly engages core and hip mobility.",
            imagen: "assets/images/squat.png",
            duracion: "30 min",
            dificultad: "Facil",
            series: "3",
            repeticiones: "15",
            descanso: "45s",
            musculos: ["Quads", "Core", "Glutes"]
          },
          {
            id: 6,
            nombre: "Barbell Row",
            descripcion: "Compound pull targeting mid-back, working rhomboids, mid-traps, and biceps. Essential for posture balance.",
            imagen: "assets/images/deadlift.png",
            duracion: "40 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "10",
            descanso: "60s",
            musculos: ["Mid-back", "Biceps", "Traps"]
          }
        ]
      },
      {
        id: 2,
        titulo: "Week 2 — Volume & Intensity",
        subtitulo: "Increasing workload and load intensity",
        tag: "Intermediate",
        ejercicios: [
          {
            id: 7,
            nombre: "Front Squat",
            descripcion: "Requires greater ankle and wrist mobility. Emphasizes quadriceps and requires high upright core engagement.",
            imagen: "assets/images/squat.png",
            duracion: "50 min",
            dificultad: "Avanzado",
            series: "4",
            repeticiones: "8",
            descanso: "90s",
            musculos: ["Quads", "Core", "Glutes"]
          },
          {
            id: 8,
            nombre: "Military Press",
            descripcion: "Complete shoulder development. Targets three heads of the deltoids plus triceps and core stability.",
            imagen: "assets/images/bench.png",
            duracion: "45 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "10",
            descanso: "75s",
            musculos: ["Delts", "Triceps", "Core"]
          },
          {
            id: 9,
            nombre: "Hip Thrust",
            descripcion: "The absolute best exercise for glute isolation. Maximum activation and growth with progressive overload.",
            imagen: "assets/images/deadlift.png",
            duracion: "40 min",
            dificultad: "Facil",
            series: "4",
            repeticiones: "12",
            descanso: "60s",
            musculos: ["Glutes", "Hamstrings", "Core"]
          },
          {
            id: 10,
            nombre: "Cable Row",
            descripcion: "Horizontal pulling exercise targeting the mid-back with perfect constant tension throughout the range of motion.",
            imagen: "assets/images/pullup.png",
            duracion: "35 min",
            dificultad: "Facil",
            series: "3",
            repeticiones: "15",
            descanso: "45s",
            musculos: ["Mid-back", "Biceps", "Forearms"]
          },
          {
            id: 11,
            nombre: "Dumbbell Lunges",
            descripcion: "Unilateral leg movement improving stability and correcting muscle imbalances in glutes and quadriceps.",
            imagen: "assets/images/squat.png",
            duracion: "40 min",
            dificultad: "Intermedio",
            series: "3",
            repeticiones: "12",
            descanso: "60s",
            musculos: ["Quads", "Glutes", "Balance"]
          },
          {
            id: 12,
            nombre: "Biceps Curl",
            descripcion: "Full isolation of the biceps brachii. Key for arm aesthetics and functional pulling power.",
            imagen: "assets/images/bench.png",
            duracion: "30 min",
            dificultad: "Facil",
            series: "4",
            repeticiones: "12",
            descanso: "45s",
            musculos: ["Biceps", "Brachialis", "Forearms"]
          }
        ]
      },
      {
        id: 3,
        titulo: "Week 3 — Max Strength",
        subtitulo: "Strength protocol utilizing heavy resistance load",
        tag: "Advanced",
        ejercicios: [
          {
            id: 13,
            nombre: "Bulgarian Split Squat",
            descripcion: "High demand on balance and unilateral strength. Heavy glute and quad activation with less spinal loading.",
            imagen: "assets/images/squat.png",
            duracion: "55 min",
            dificultad: "Avanzado",
            series: "4",
            repeticiones: "8",
            descanso: "120s",
            musculos: ["Quads", "Glutes", "Stability"]
          },
          {
            id: 14,
            nombre: "Romanian Deadlift",
            descripcion: "Deadlift variation focusing on hamstrings and glutes stretch. Excellent for developing posterior chain size.",
            imagen: "assets/images/deadlift.png",
            duracion: "50 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "10",
            descanso: "90s",
            musculos: ["Hamstrings", "Glutes", "Lower Back"]
          },
          {
            id: 15,
            nombre: "Parallel Bar Dips",
            descripcion: "Chest and triceps heavy push movement using bodyweight or added load. Excellent lower chest builder.",
            imagen: "assets/images/bench.png",
            duracion: "40 min",
            dificultad: "Avanzado",
            series: "4",
            repeticiones: "12",
            descanso: "75s",
            musculos: ["Lower Chest", "Triceps", "Delts"]
          },
          {
            id: 16,
            nombre: "Chin-ups",
            descripcion: "Underhand pull-up variation that dramatically increases biceps involvement while keeping heavy back recruitment.",
            imagen: "assets/images/pullup.png",
            duracion: "45 min",
            dificultad: "Avanzado",
            series: "4",
            repeticiones: "8",
            descanso: "90s",
            musculos: ["Lats", "Biceps", "Rhomboids"]
          }
        ]
      },
      {
        id: 4,
        titulo: "Week 4 — Definition & Conditioning",
        subtitulo: "HIIT cardiovascular circuit protocols",
        tag: "Cardio",
        ejercicios: [
          {
            id: 17,
            nombre: "Burpees with Jump",
            descripcion: "High-intensity full-body conditioning movement. Rapidly burns calories and boosts VO2 max.",
            imagen: "assets/images/squat.png",
            duracion: "25 min",
            dificultad: "Avanzado",
            series: "5",
            repeticiones: "10",
            descanso: "30s",
            musculos: ["Full Body", "Cardio", "Core"]
          },
          {
            id: 18,
            nombre: "Sprint Intervals",
            descripcion: "High-intensity interval sprinting protocol. Alternate 20s maximum effort sprints with 10s active recovery.",
            imagen: "assets/images/deadlift.png",
            duracion: "20 min",
            dificultad: "Avanzado",
            series: "8",
            repeticiones: "20s",
            descanso: "10s",
            musculos: ["Legs", "Cardio", "Core"]
          },
          {
            id: 19,
            nombre: "Mountain Climbers",
            descripcion: "Cardio core exercise. Simultaneously builds endurance in core, shoulders, and hip flexors.",
            imagen: "assets/images/bench.png",
            duracion: "20 min",
            dificultad: "Intermedio",
            series: "4",
            repeticiones: "30",
            descanso: "30s",
            musculos: ["Core", "Shoulders", "Hips"]
          },
          {
            id: 20,
            nombre: "Box Jumps",
            descripcion: "Plyometrics for explosive power in legs. Recruits fast-twitch muscle fibers and builds jump height.",
            imagen: "assets/images/pullup.png",
            duracion: "30 min",
            dificultad: "Avanzado",
            series: "4",
            repeticiones: "8",
            descanso: "60s",
            musculos: ["Quads", "Glutes", "Power"]
          }
        ]
      }
    ]
  }
};

// ---- APP STATE ----
let currentLanguage = localStorage.getItem('lang') || 'es';
let allEjercicios = [];


// =============================================
//  TRANSLATION CORE
// =============================================

function applyTranslations(lang) {
  // Translate static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Translate placeholders
  const placeholders = {
    'form-nombre': 'form_placeholder_name',
    'form-email': 'form_placeholder_email',
    'form-objetivo': 'form_placeholder_goal',
    'form-mensaje': 'form_placeholder_msg'
  };

  for (const [id, translationKey] of Object.entries(placeholders)) {
    const el = document.getElementById(id);
    if (el && TRANSLATIONS[lang][translationKey]) {
      el.placeholder = TRANSLATIONS[lang][translationKey];
    }
  }

  // Update button active state in navbar
  document.getElementById('lang-es-btn').classList.toggle('active', lang === 'es');
  document.getElementById('lang-es-btn').setAttribute('aria-checked', lang === 'es');
  document.getElementById('lang-en-btn').classList.toggle('active', lang === 'en');
  document.getElementById('lang-en-btn').setAttribute('aria-checked', lang === 'en');

  // Rerender dynamic parts
  const data = MOCK_DATA[lang];
  document.getElementById('hero-subtitle').textContent = data.trainer.descripcion;
  document.getElementById('hero-stats').innerHTML = renderStats(data.trainer.stats);
  document.getElementById('about-desc-1').textContent = data.trainer.descripcion;
  document.getElementById('about-desc-2').textContent = data.trainer.descripcion2;
  document.getElementById('about-features').innerHTML = renderFeatures(data.trainer.features);
  
  // Sidebar links
  document.getElementById('sidebar-nav').innerHTML = renderSidebarLinks(data.semanas);
  
  // Title for planes
  const planesSubtitleText = lang === 'es' 
    ? "Programas diseñados para todos los niveles, organizados semana a semana."
    : "Programs designed for all fitness levels, structured week by week.";
  document.getElementById('planes-subtitle').textContent = planesSubtitleText;

  // Render planes
  const planesContainer = document.getElementById('planes-container');
  planesContainer.innerHTML = data.semanas.map((s, i) => renderSemana(s, i)).join('');

  // Rebuild exercises index for modals
  allEjercicios = [];
  data.semanas.forEach(s => {
    s.ejercicios.forEach(ej => {
      allEjercicios.push(ej);
    });
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

function setLanguage(lang) {
  if (lang === currentLanguage) return;
  currentLanguage = lang;
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
  initScrollReveal(); // Reinitialize scroll reveal observer for new DOM elements
  initKeyboard(); // Reinitialize keyboard triggers for newly rendered cards
}


// =============================================
//  RENDER FUNCTIONS
// =============================================

function getDifficultyClass(dificultad) {
  const map = {
    'Facil': 'badge-facil',
    'Intermedio': 'badge-intermedio',
    'Avanzado': 'badge-avanzado',
    'Easy': 'badge-facil',
    'Intermediate': 'badge-intermedio',
    'Advanced': 'badge-avanzado',
    'Cardio': 'badge-intermedio'
  };
  return map[dificultad] || 'badge-intermedio';
}

function renderEjercicioCard(ejercicio, index) {
  let hiddenClass = '';
  if (index === 2) {
    hiddenClass = 'hide-on-mobile';
  } else if (index >= 3) {
    hiddenClass = 'hide-always';
  }
  const restText = currentLanguage === 'es' ? 'descanso' : 'rest';
  
  return `
    <div class="ejercicio-card ${hiddenClass}" 
         data-id="${ejercicio.id}"
         onclick="openModal(${ejercicio.id})"
         role="button"
         tabindex="0"
         aria-label="${currentLanguage === 'es' ? 'Ver detalles de' : 'View details of'} ${ejercicio.nombre}">
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
          <span class="set-chip">${ejercicio.series} ${currentLanguage === 'es' ? 'series' : 'sets'}</span>
          <span class="set-chip">${ejercicio.repeticiones} reps</span>
          <span class="set-chip">⏸ ${ejercicio.descanso} ${restText}</span>
        </div>
      </div>
    </div>
  `;
}

function renderSemana(semana, index) {
  const ejerciciosHTML = semana.ejercicios
    .map((ej, i) => renderEjercicioCard(ej, i))
    .join('');

  const totalEjercicios = semana.ejercicios.length;
  const hasExtra = totalEjercicios > 2; // Show button if more than 2 exercises (needed for mobile)
  const isOnlyThree = totalEjercicios === 3;
  
  const viewAllText = TRANSLATIONS[currentLanguage].btn_ver_todo_more;
  const btnClass = isOnlyThree ? 'btn-ver-todo hide-on-desktop' : 'btn-ver-todo';

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
      </div>
      
      <div class="ejercicios-grid" id="grid-semana-${semana.id}">
        ${ejerciciosHTML}
      </div>

      ${hasExtra ? `
        <div class="semana-footer-btn">
          <button 
            class="${btnClass}" 
            id="btn-semana-${semana.id}"
            onclick="toggleSemana(${semana.id})"
            aria-expanded="false"
            aria-controls="grid-semana-${semana.id}"
          >
            <span>${viewAllText}</span> <span class="arrow">▼</span>
          </button>
        </div>
      ` : ''}
    </section>
  `;
}

function renderSidebarLinks(semanas) {
  const weekLabel = TRANSLATIONS[currentLanguage].sidebar_semana_label;
  return semanas.map(s => `
    <a href="#semana-${s.id}" class="sidebar-link" data-target="semana-${s.id}" onclick="closeSidebar()">
      <span class="sidebar-link-icon">💪</span>
      <span>${weekLabel} ${s.id}</span>
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

function openModal(id) {
  const ej = allEjercicios.find(e => e.id === id);
  if (!ej) return;

  const musculosHTML = ej.musculos.map(m => `<span class="modal-tag">${m}</span>`).join('');
  const setsHTML = `
    <div class="modal-set-chip"><strong>${ej.series}</strong>${TRANSLATIONS[currentLanguage].modal_series}</div>
    <div class="modal-set-chip"><strong>${ej.repeticiones}</strong>${TRANSLATIONS[currentLanguage].modal_reps}</div>
    <div class="modal-set-chip"><strong>${ej.descanso}</strong>${TRANSLATIONS[currentLanguage].modal_descanso}</div>
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
//  TOGGLE: VER TODO / OCULTAR
// =============================================

function toggleSemana(semanaId) {
  const section = document.getElementById(`semana-${semanaId}`);
  const btn = document.getElementById(`btn-semana-${semanaId}`);
  const isExpanded = section.classList.contains('expanded');

  const moreText = TRANSLATIONS[currentLanguage].btn_ver_todo_more;
  const lessText = TRANSLATIONS[currentLanguage].btn_ver_todo_less;

  if (isExpanded) {
    section.classList.remove('expanded');
    btn.querySelector('span').textContent = moreText;
    btn.classList.remove('expanded');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    section.classList.add('expanded');
    btn.querySelector('span').textContent = lessText;
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

let scrollRevealObserver = null;
function initScrollReveal() {
  if (scrollRevealObserver) scrollRevealObserver.disconnect();

  const sections = document.querySelectorAll('.semana-section');
  scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const id = entry.target.id;
        document.querySelectorAll('.sidebar-link').forEach(link => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '-80px 0px -20% 0px' });

  sections.forEach(s => scrollRevealObserver.observe(s));
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
    const successMsg = TRANSLATIONS[currentLanguage].toast_success;
    showToast(successMsg);
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
    // Prevent duplicate listeners
    card.onkeydown = null;
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}


// =============================================
//  INIT: START APPLICATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Apply language and render first time ----
  applyTranslations(currentLanguage);

  // ---- Init interactions ----
  initScrollProgress();
  initNavbarScroll();
  initScrollReveal();
  initNavLinks();
  initContactForm();
  initKeyboard();

  console.log('🏋️ Matifit loaded successfully (Language: ' + currentLanguage + ')');
});
