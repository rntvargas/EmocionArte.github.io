/**
 * EmocionArte Interactive Digital Stories
 * Based on PDF Document "EmocionArte" for 5-year-olds
 */

const STORIES = [
    {
        id: 'bruja-cole',
        title: 'La Bruja va al Cole',
        emotion: 'Miedo / Adaptación',
        color: '#9D4EDD',
        icon: '🧹',
        image: 'assets/bruja_cole.jpg',
        description: 'Ayuda a disminuir el temor al ingreso o permanencia en la escuela, promoviendo la seguridad y buena convivencia.',
        pages: [
            {
                text: 'La brujita Marilú sentía muchas cosquillitas en la barriga. ¡Era su primer día en el colegio "Huellitas del Saber"!',
                image: 'assets/bruja_cole.jpg',
                question: null
            },
            {
                text: 'Al llegar a la puerta, vio a muchos niños corriendo y riendo. Tenía miedo de no saber jugar con ellos.',
                image: 'assets/bruja_cole.jpg',
                question: null
            },
            {
                text: 'La profesora la recibió con una cálida sonrisa y le dijo: "¡Bienvenida Marilú! Aquí todos aprendemos y jugamos juntos".',
                image: 'assets/bruja_cole.jpg',
                question: null
            },
            {
                text: 'Marilú respiró profundo, agarró su varita mágica y descubrió que el colegio era un lugar hermoso y lleno de amigos.',
                image: 'assets/bruja_cole.jpg',
                question: {
                    prompt: '¿Cómo se sintió la brujita Marilú al principio?',
                    options: [
                        { text: 'Con miedo y nerviosa 😨', correct: true, feedback: '¡Correcto! Es normal sentir miedo al empezar algo nuevo.' },
                        { text: 'Enojada y gritando 😡', correct: false, feedback: 'En realidad, sentía mariposas en la barriga y miedo de no conocer a nadie.' },
                        { text: 'Dormida 😴', correct: false, feedback: '¡No! Estaba bien despierta pero con temorcito.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'gatita-nube',
        title: 'La Gatita Nube',
        emotion: 'Tristeza, Miedo y Alegría',
        color: '#4EA8DE',
        icon: '🐱',
        image: 'assets/gatita_nube.jpg',
        description: 'Favorece la identificación de emociones como la tristeza, el miedo y la alegría, promoviendo la empatía.',
        pages: [
            {
                text: 'Nube es una gatita muy suavecita que vive entre nubes de colores. Un día perdió su ovillo de lana favorito.',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Al principio sintió tristeza y unas gotitas cayeron de sus ojos. "Extraño mi juguete", dijo suavemente.',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Su amigo el conejito la vio y le dio un abrazo muy apretado: "¡No te preocupes, te ayudo a buscarlo!"',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Juntos encontraron el ovillo detrás de una nube azul. ¡Nube saltó de alegría y su corazoncito brilló de emoción!',
                image: 'assets/gatita_nube.jpg',
                question: {
                    prompt: '¿Qué hizo el conejito cuando vio triste a la gatita Nube?',
                    options: [
                        { text: 'La abrazó y la ayudó (Empatía) 🤝💛', correct: true, feedback: '¡Bravo! Cuando ayudamos a un amigo triste, practicamos la empatía.' },
                        { text: 'Se fue a jugar solo 🐰', correct: false, feedback: 'No, el conejito prefirió acompañarla y ayudarla.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'como-soy-yo',
        title: '¿Cómo soy yo?',
        emotion: 'Autoestima y Cualidades',
        color: '#FF70A6',
        icon: '🪞',
        image: 'assets/hero.jpg',
        description: 'Favorece el conocimiento personal, el reconocimiento de cualidades, la autoestima y la aceptación.',
        pages: [
            {
                text: 'Mateo se miró en el espejo mágico. Vio sus ojos brillantes, su sonrisa contagiosa y sus rizos despeinados.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Descubrió que es muy bueno para cantar, armar torres gigantes y dar abrazos calentitos.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Mateo comprendió que cada niño es único, especial y maravilloso tal como es.',
                image: 'assets/hero.jpg',
                question: {
                    prompt: '¿Por qué eres tú muy especial?',
                    options: [
                        { text: '¡Porque tengo cualidades únicas y talentos hermosos! ⭐', correct: true, feedback: '¡Así es! Eres único y genial en el mundo.' },
                        { text: 'Porque soy igual a todos los demás 😐', correct: false, feedback: '¡No! Cada persona tiene algo especial que la hace única.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'prestas-juguetes',
        title: '¿Me prestas tus juguetes?',
        emotion: 'Compartir y Empatía',
        color: '#06D6A0',
        icon: '🧸',
        image: 'assets/hero.jpg',
        description: 'Trabaja valores como compartir, respetar las pertenencias de los demás y la resolución pacífica de conflictos.',
        pages: [
            {
                text: 'En el parque, Leo estaba jugando con un camión rojo brillante. Sofía quería jugar con él también.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'En lugar de quitarle el camión, Sofía respiró y le preguntó amablemente: "¿Me lo prestas cuando termines?"',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Leo sonrió y dijo: "¡Juguemos juntos construyendo una gran carretera!" Ambos se divirtieron el doble.',
                image: 'assets/hero.jpg',
                question: {
                    prompt: '¿Qué es lo mejor que podemos hacer si queremos un juguete de un amigo?',
                    options: [
                        { text: 'Pedirlo amablemente y compartir 🤝', correct: true, feedback: '¡Excelente! Hablar con respeto evita peleas y crea grandes amistades.' },
                        { text: 'Jalarlo con fuerza y llorar 😭', correct: false, feedback: 'Si quitamos las cosas, podemos lastimar los sentimientos de los demás.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'pelusilla-regalo',
        title: 'Pelusilla compra un regalo',
        emotion: 'Generosidad y Gratitud',
        color: '#FF9F1C',
        icon: '🎁',
        image: 'assets/gatita_nube.jpg',
        description: 'Desarrolla la generosidad, la gratitud y la importancia de demostrar afecto mediante pequeños actos de bondad.',
        pages: [
            {
                text: 'El perrito Pelusilla quería regalarle algo hermoso a su abuelita en su cumpleaños.',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Recogió flores amarillas del campo y le dibujó una tarjeta con muchos corazones.',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Su abuelita lo abrazó fuerte y le dijo: "El mejor regalo es el amor con el que lo hiciste".',
                image: 'assets/gatita_nube.jpg',
                question: {
                    prompt: '¿Cuál es el regalo más valioso que podemos dar a nuestros seres queridos?',
                    options: [
                        { text: 'Nuestro cariño, atención y amor ❤️', correct: true, feedback: '¡Muy bien! Los gestos del corazón son los más bonitos.' },
                        { text: 'Cosas carísimas solamente 💰', correct: false, feedback: '¡El amor y la bondad valen mucho más!' }
                    ]
                }
            }
        ]
    },
    {
        id: 'botas-chubasqueros',
        title: 'Botas y Chubasqueros',
        emotion: 'Autocuidado y Autonomía',
        color: '#FFD166',
        icon: '🌧️',
        image: 'assets/hero.jpg',
        description: 'Promueve hábitos de autocuidado y prevención frente a los cambios climáticos, desarrollando la autonomía.',
        pages: [
            {
                text: 'Empezó a llover fuerte afuera. Las gotitas sonaban "plip, plap" en la ventana.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Camila se puso sola sus botas amarillas y su chubasquero impermeable para no mojarse.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Salió a saltar en los charquitos segura y abrigada. ¡Cuidar de nuestro cuerpo nos permite jugar felices!',
                image: 'assets/hero.jpg',
                question: {
                    prompt: '¿Por qué debemos abrigarnos y ponernos botas en la lluvia?',
                    options: [
                        { text: 'Para cuidar nuestra salud y no enfermarnos 🧥', correct: true, feedback: '¡Correcto! El autocuidado nos mantiene fuertes y sanos.' },
                        { text: 'Para ensuciar todo 🤪', correct: false, feedback: 'Nos protegemos para mantenernos sanos mientras jugamos.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'nieve-navidad',
        title: 'Nieve en Navidad',
        emotion: 'Solidaridad y Compañerismo',
        color: '#4EA8DE',
        icon: '❄️',
        image: 'assets/hero.jpg',
        description: 'Estimula la imaginación, el compañerismo y el fortalecimiento de los valores familiares.',
        pages: [
            {
                text: 'Caía la nieve blanca sobre las casitas. El pajarito Tití tenía frío en su nido.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'La familia de ositos lo invitó a su chimenea y le compartieron una galletita caliente.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Tití cantó una hermosa melodía de agradecimiento. La navidad es compartir en familia y ayudar.',
                image: 'assets/hero.jpg',
                question: {
                    prompt: '¿Qué valor practicaron los ositos al recibir a Tití?',
                    options: [
                        { text: 'La solidaridad y la generosidad 🤝🌟', correct: true, feedback: '¡Eso es! Ayudar a quien lo necesita nos llena de alegría.' },
                        { text: 'El egoísmo 😒', correct: false, feedback: 'Los ositos fueron muy amables y solidarios.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'olores-colores-primavera',
        title: 'Olores y Colores en Primavera',
        emotion: 'Disfrute y Sensación de Asombro',
        color: '#06D6A0',
        icon: '🌸',
        image: 'assets/gatita_nube.jpg',
        description: 'Estimula la observación, la percepción sensorial y el disfrute del entorno natural.',
        pages: [
            {
                text: 'Llegó la primavera y el jardín se llenó de mariposas, rosas y jazmines.',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Valentina olió una flor de vainilla y escuchó el zumbido alegre de las abejitas.',
                image: 'assets/gatita_nube.jpg',
                question: null
            },
            {
                text: 'Sintió una profunda calma y felicidad al contemplar los hermosos colores de la naturaleza.',
                image: 'assets/gatita_nube.jpg',
                question: {
                    prompt: '¿Qué emoción sentimos al ver y oler las flores hermosas?',
                    options: [
                        { text: 'Alegría, calma y asombro 🌸✨', correct: true, feedback: '¡Maravilloso! La naturaleza nos regala mucha paz y felicidad.' },
                        { text: 'Enojo 😡', correct: false, feedback: 'Ver cosas bellas suele darnos alegría y paz.' }
                    ]
                }
            }
        ]
    },
    {
        id: 'viaje-escoba',
        title: 'De viaje en una escoba',
        emotion: 'Imaginación y Creatividad',
        color: '#9D4EDD',
        icon: '🧙‍♀️',
        image: 'assets/bruja_cole.jpg',
        description: 'Fortalece la imaginación, la creatividad y el pensamiento narrativo.',
        pages: [
            {
                text: 'Con una simple escoba de palo, Lucas imaginó que volaba sobre castillos de algodón de azúcar.',
                image: 'assets/bruja_cole.jpg',
                question: null
            },
            {
                text: 'Visitó planetas de queso y saludó a dragones amistosos que echaban chispas de colores.',
                image: 'assets/bruja_cole.jpg',
                question: null
            },
            {
                text: '¡Con la imaginación podemos inventar mundos fantásticos y divertirnos sin límites!',
                image: 'assets/bruja_cole.jpg',
                question: {
                    prompt: '¿Qué necesitamos para viajar a mundos mágicos en nuestros juegos?',
                    options: [
                        { text: '¡Nuestra gran imaginación y creatividad! 🚀💭', correct: true, feedback: '¡Exacto! La imaginación es un súper poder maravilloso.' },
                        { text: 'Comprar ropa costosa 💸', correct: false, feedback: '¡Solo necesitas tu mente y tus ganas de jugar!' }
                    ]
                }
            }
        ]
    },
    {
        id: 'cole-piscina',
        title: 'Un cole en la piscina',
        emotion: 'Trabajo en Equipo y Reglas',
        color: '#EF476F',
        icon: '🏊‍♂️',
        image: 'assets/hero.jpg',
        description: 'Promueve la convivencia, el respeto por las normas, el trabajo en equipo y la confianza.',
        pages: [
            {
                text: 'Hoy la clase de educación inicial fue a la piscina inflable del colegio.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Antes de entrar, la maestra recordó las reglas: caminar despacito y cuidar a los compañeros.',
                image: 'assets/hero.jpg',
                question: null
            },
            {
                text: 'Todos jugaron a pasarse la pelota en equipo y se rieron un montón cuidándose entre sí.',
                image: 'assets/hero.jpg',
                question: {
                    prompt: '¿Por qué son importantes las normas cuando jugamos en grupo?',
                    options: [
                        { text: 'Para estar seguros y convivir felices en armonía 🌊🤝', correct: true, feedback: '¡Súper! Respetar reglas nos mantiene a salvo a todos.' },
                        { text: 'Para aburrirnos 😴', correct: false, feedback: 'Las reglas aseguran que todos puedan divertirse sin lastimarse.' }
                    ]
                }
            }
        ]
    }
];
