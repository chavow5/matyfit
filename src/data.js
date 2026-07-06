export const trainer = {
  nombre: 'Matías',
  apellido: 'García',
  tag: 'Personal Trainer Certificado',
  descripcion: 'Con más de 5 años de experiencia transformando vidas a través del fitness, me especializo en diseñar planes de entrenamiento personalizados que se adaptan a tus objetivos y estilo de vida.',
  descripcion2: 'Mi metodología combina ciencia del ejercicio con motivación real. Cada plan está diseñado para maximizar resultados, minimizar lesiones y hacer que disfrutes el proceso.',
  stats: [
    { numero: '150+', label: 'Clientes Activos' },
    { numero: '5+', label: 'Años Experiencia' },
    { numero: '98%', label: 'Satisfacción' }
  ],
  features: [
    { icon: '🎯', titulo: 'Plan Personalizado', desc: 'Adaptado a tus metas' },
    { icon: '📊', titulo: 'Seguimiento Real', desc: 'Progreso medible' },
    { icon: '🏆', titulo: 'Certificado', desc: 'NSCA & ACSM' },
    { icon: '💬', titulo: 'Soporte 24/7', desc: 'Siempre disponible' }
  ]
};

export const semanas = [
  {
    id: 1,
    titulo: 'Semana 1 — Base y Activación',
    subtitulo: 'Introducción y adaptación muscular',
    tag: 'Principiante',
    ejercicios: [
      {
        id: 1,
        nombre: 'Sentadilla con Barra',
        descripcion: 'El rey de los ejercicios. Activa cuádriceps, glúteos, isquiotibiales y core. Fundamental para construir fuerza de base.',
        imagen: '/assets/images/squat.png',
        duracion: '45 min',
        dificultad: 'Intermedio',
        series: '4',
        repeticiones: '12',
        descanso: '60 seg',
        musculos: ['Cuádriceps', 'Glúteos', 'Core']
      },
      {
        id: 2,
        nombre: 'Peso Muerto',
        descripcion: 'Ejercicio compuesto que recluta la mayor cantidad de músculos del cuerpo. Fundamental para desarrollar fuerza posterior.',
        imagen: '/assets/images/deadlift.png',
        duracion: '50 min',
        dificultad: 'Avanzado',
        series: '3',
        repeticiones: '8',
        descanso: '90 seg',
        musculos: ['Isquiotibiales', 'Glúteos', 'Espalda baja']
      },
      {
        id: 3,
        nombre: 'Press de Banca',
        descripcion: 'Ejercicio clásico para el desarrollo del pectoral, deltoides anterior y tríceps. Trabaja potencia en empuje horizontal.',
        imagen: '/assets/images/bench.png',
        duracion: '40 min',
        dificultad: 'Intermedio',
        series: '4',
        repeticiones: '10',
        descanso: '75 seg',
        musculos: ['Pectoral', 'Deltoides', 'Tríceps']
      },
      {
        id: 4,
        nombre: 'Dominadas',
        descripcion: 'El mejor ejercicio para la espalda sin equipamiento. Desarrolla dorsal ancho, bíceps y mejora la postura general.',
        imagen: '/assets/images/pullup.png',
        duracion: '35 min',
        dificultad: 'Avanzado',
        series: '3',
        repeticiones: '8',
        descanso: '90 seg',
        musculos: ['Dorsal', 'Bíceps', 'Core']
      },
      {
        id: 5,
        nombre: 'Sentadilla Goblet',
        descripcion: 'Variación de sentadilla ideal para aprender la técnica correcta. Activa core y mejora movilidad de cadera.',
        imagen: '/assets/images/squat.png',
        duracion: '30 min',
        dificultad: 'Facil',
        series: '3',
        repeticiones: '15',
        descanso: '45 seg',
        musculos: ['Cuádriceps', 'Core', 'Glúteos']
      },
      {
        id: 6,
        nombre: 'Remo con Barra',
        descripcion: 'Ejercicio compuesto para espalda media, trabajando romboides, trapecio medio y bíceps. Mejora la postura.',
        imagen: '/assets/images/deadlift.png',
        duracion: '40 min',
        dificultad: 'Intermedio',
        series: '4',
        repeticiones: '10',
        descanso: '60 seg',
        musculos: ['Espalda media', 'Bíceps', 'Trapecio']
      }
    ]
  },
  {
    id: 2,
    titulo: 'Semana 2 — Volumen e Intensidad',
    subtitulo: 'Aumentamos la carga y el volumen de trabajo',
    tag: 'Intermedio',
    ejercicios: [
      {
        id: 7,
        nombre: 'Sentadilla Frontal',
        descripcion: 'Variación que exige mayor movilidad de tobillo y muñeca. Enfatiza cuádriceps y requiere mayor activación del core.',
        imagen: '/assets/images/squat.png',
        duracion: '50 min',
        dificultad: 'Avanzado',
        series: '4',
        repeticiones: '8',
        descanso: '90 seg',
        musculos: ['Cuádriceps', 'Core', 'Glúteos']
      },
      {
        id: 8,
        nombre: 'Press Militar',
        descripcion: 'Desarrollo completo de hombros. Trabaja los tres haces del deltoides más tríceps y estabilizadores del core.',
        imagen: '/assets/images/bench.png',
        duracion: '45 min',
        dificultad: 'Intermedio',
        series: '4',
        repeticiones: '10',
        descanso: '75 seg',
        musculos: ['Deltoides', 'Tríceps', 'Core']
      },
      {
        id: 9,
        nombre: 'Hip Thrust',
        descripcion: 'El ejercicio número uno para glúteos. Máxima activación y desarrollo del glúteo mayor con carga progresiva.',
        imagen: '/assets/images/deadlift.png',
        duracion: '40 min',
        dificultad: 'Facil',
        series: '4',
        repeticiones: '12',
        descanso: '60 seg',
        musculos: ['Glúteos', 'Isquiotibiales', 'Core']
      },
      {
        id: 10,
        nombre: 'Remo en Polea',
        descripcion: 'Ejercicio de tirón horizontal que trabaja la espalda media con perfecta tensión constante durante todo el movimiento.',
        imagen: '/assets/images/pullup.png',
        duracion: '35 min',
        dificultad: 'Facil',
        series: '3',
        repeticiones: '15',
        descanso: '45 seg',
        musculos: ['Espalda media', 'Bíceps', 'Antebrazos']
      },
      {
        id: 11,
        nombre: 'Zancadas con Mancuernas',
        descripcion: 'Ejercicio unilateral para piernas que mejora el equilibrio y trabaja glúteos y cuádriceps de forma independiente.',
        imagen: '/assets/images/squat.png',
        duracion: '40 min',
        dificultad: 'Intermedio',
        series: '3',
        repeticiones: '12',
        descanso: '60 seg',
        musculos: ['Cuádriceps', 'Glúteos', 'Equilibrio']
      },
      {
        id: 12,
        nombre: 'Curl de Bíceps',
        descripcion: 'Aislamiento completo del bíceps. Fundamental para el desarrollo del brazo y fuerza en ejercicios de tirón.',
        imagen: '/assets/images/bench.png',
        duracion: '30 min',
        dificultad: 'Facil',
        series: '4',
        repeticiones: '12',
        descanso: '45 seg',
        musculos: ['Bíceps', 'Braquial', 'Antebrazos']
      }
    ]
  },
  {
    id: 3,
    titulo: 'Semana 3 — Fuerza Máxima',
    subtitulo: 'Protocolo de fuerza con cargas pesadas',
    tag: 'Avanzado',
    ejercicios: [
      {
        id: 13,
        nombre: 'Sentadilla Búlgara',
        descripcion: 'Elevada exigencia de equilibrio y fuerza unilateral. Máxima activación de glúteos y cuádriceps con menor carga.',
        imagen: '/assets/images/squat.png',
        duracion: '55 min',
        dificultad: 'Avanzado',
        series: '4',
        repeticiones: '8',
        descanso: '120 seg',
        musculos: ['Cuádriceps', 'Glúteos', 'Equilibrio']
      },
      {
        id: 14,
        nombre: 'Peso Muerto Rumano',
        descripcion: 'Variación del peso muerto con énfasis en isquiotibiales y glúteos. Excelente para desarrollar la cadena posterior.',
        imagen: '/assets/images/deadlift.png',
        duracion: '50 min',
        dificultad: 'Intermedio',
        series: '4',
        repeticiones: '10',
        descanso: '90 seg',
        musculos: ['Isquiotibiales', 'Glúteos', 'Espalda baja']
      },
      {
        id: 15,
        nombre: 'Fondos en Paralelas',
        descripcion: 'Ejercicio compuesto de empuje que trabaja el pectoral inferior, tríceps y deltoides anterior con el peso corporal.',
        imagen: '/assets/images/bench.png',
        duracion: '40 min',
        dificultad: 'Avanzado',
        series: '4',
        repeticiones: '12',
        descanso: '75 seg',
        musculos: ['Pectoral', 'Tríceps', 'Deltoides']
      },
      {
        id: 16,
        nombre: 'Dominada Supina',
        descripcion: 'Variación con agarre supino que incrementa la participación del bíceps braquial durante el movimiento de tirón.',
        imagen: '/assets/images/pullup.png',
        duracion: '45 min',
        dificultad: 'Avanzado',
        series: '4',
        repeticiones: '8',
        descanso: '90 seg',
        musculos: ['Dorsal', 'Bíceps', 'Romboides']
      }
    ]
  },
  {
    id: 4,
    titulo: 'Semana 4 — Definición y Metabolismo',
    subtitulo: 'Circuitos HIIT y trabajo cardiovascular',
    tag: 'Cardio',
    ejercicios: [
      {
        id: 17,
        nombre: 'Burpees con Salto',
        descripcion: 'Ejercicio full body de alta intensidad. Quema calorías de forma acelerada y mejora la capacidad cardiovascular.',
        imagen: '/assets/images/squat.png',
        duracion: '25 min',
        dificultad: 'Avanzado',
        series: '5',
        repeticiones: '10',
        descanso: '30 seg',
        musculos: ['Full body', 'Cardiovascular', 'Core']
      },
      {
        id: 18,
        nombre: 'Sprint Intervals',
        descripcion: 'Protocolo HIIT de alta intensidad. Alterna 20 segundos de sprint máximo con 10 segundos de descanso activo.',
        imagen: '/assets/images/deadlift.png',
        duracion: '20 min',
        dificultad: 'Avanzado',
        series: '8',
        repeticiones: '20 seg',
        descanso: '10 seg',
        musculos: ['Piernas', 'Cardiovascular', 'Core']
      },
      {
        id: 19,
        nombre: 'Mountain Climbers',
        descripcion: 'Ejercicio de cardio que trabaja core, hombros y piernas simultáneamente. Perfecto para definición abdominal.',
        imagen: '/assets/images/bench.png',
        duracion: '20 min',
        dificultad: 'Intermedio',
        series: '4',
        repeticiones: '30',
        descanso: '30 seg',
        musculos: ['Core', 'Hombros', 'Cadera flexores']
      },
      {
        id: 20,
        nombre: 'Box Jumps',
        descripcion: 'Pliometría para desarrollar potencia explosiva en piernas. Activa fibras rápidas y mejora la velocidad de reacción.',
        imagen: '/assets/images/pullup.png',
        duracion: '30 min',
        dificultad: 'Avanzado',
        series: '4',
        repeticiones: '8',
        descanso: '60 seg',
        musculos: ['Cuádriceps', 'Glúteos', 'Potencia']
      }
    ]
  }
];
