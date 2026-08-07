/* ============ Fondo de murciélagos ============ */
const sky = document.getElementById('batSky');
for(let i=0;i<9;i++){
  const b=document.createElement('div');
  b.className='flybat'; b.textContent='🦇';
  b.style.top=(Math.random()*80)+'vh';
  b.style.animationDuration=(14+Math.random()*14)+'s';
  b.style.animationDelay=(-Math.random()*20)+'s';
  b.style.fontSize=(16+Math.random()*18)+'px';
  sky.appendChild(b);
}

/* ============ Navegación principal ============ */
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('#mainNav .bat-btn');
function goTo(id){
  pages.forEach(p=>p.classList.toggle('active', p.id===id));
  navBtns.forEach(b=>b.classList.toggle('active', b.dataset.page===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
navBtns.forEach(b=>b.addEventListener('click',()=>{
  goTo(b.dataset.page);
  if(b.dataset.unit) showUnitTab(parseInt(b.dataset.unit));
}));

/* ============ Imagen de perfil (Inicio) ============ */
const uploadBtn=document.getElementById('uploadBtn');
const fileInput=document.getElementById('fileInput');
const photoImg=document.getElementById('photoImg');
const photoHint=document.getElementById('photoHint');
uploadBtn.addEventListener('click', e=>{ e.stopPropagation(); fileInput.click(); });
fileInput.addEventListener('change', ()=>{
  const file=fileInput.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    photoImg.src=e.target.result;
    photoImg.style.display='block';
    photoHint.style.display='none';
  };
  reader.readAsDataURL(file);
});

/* ============ Relámpagos aleatorios de ambiente ============ */
const lightningEl=document.getElementById('lightning');
function scheduleLightning(){
  const delay=6000+Math.random()*9000;
  setTimeout(()=>{
    lightningEl.classList.add('flash');
    setTimeout(()=>lightningEl.classList.remove('flash'),520);
    scheduleLightning();
  }, delay);
}
scheduleLightning();

/* ============ Contenido Unidad 1 (acordeón) ============ */
const unidad1 = [
  { icon:'🧠', title:'Modelo de Von Neumann y Harvard',
    html:`<p><b>Von Neumann:</b> arquitectura en la que las instrucciones y los datos comparten una misma memoria y un mismo bus. Está formada por la CPU (unidad de control + ALU), la memoria y las unidades de entrada/salida. Su principal limitación es el <i>"cuello de botella de Von Neumann"</i>, ya que no se pueden leer datos e instrucciones al mismo tiempo.</p>
    <p><b>Harvard:</b> utiliza memorias y buses separados para datos e instrucciones, lo que permite accesos simultáneos y mayor velocidad. Se usa mucho en microcontroladores y procesadores digitales de señal (DSP).</p>` },
  { icon:'💻', title:'Sistemas operativos',
    html:`<p>Es el software principal que administra el hardware y los recursos de un computador, actuando como intermediario entre el usuario y la máquina.</p>
    <p><b>Funciones:</b> gestión de procesos, memoria, archivos, dispositivos de entrada/salida y seguridad.</p>
    <p><b>Tipos:</b> monousuario/multiusuario, monotarea/multitarea, tiempo real y distribuidos.</p>
    <p><b>Ejemplos:</b> Windows, Linux, macOS, Android.</p>` },
  { icon:'🔢', title:'Sistemas de numeración y conversiones: Binario, Octal y Hexadecimal',
    html:`<p>Un sistema de numeración posicional usa una <b>base</b> que indica cuántos símbolos existen: Binario (base 2: 0-1), Octal (base 8: 0-7) y Hexadecimal (base 16: 0-9 y A-F).</p>
    <p><b>Conversión decimal → otra base:</b> divisiones sucesivas entre la base, tomando los restos de abajo hacia arriba.</p>
    <p><b>Conversión otra base → decimal:</b> multiplicar cada dígito por la base elevada a su posición y sumar.</p>
    <p><b>Binario ↔ Octal/Hexadecimal:</b> se agrupan los bits de 3 en 3 (octal) o de 4 en 4 (hexadecimal).</p>` },
  { icon:'➕', title:'Aritmética binaria',
    html:`<p>Permite sumar, restar, multiplicar y dividir usando solo 0 y 1.</p>
    <ul><li>Suma: 0+0=0, 0+1=1, 1+1=10 (acarreo 1)</li>
    <li>Resta: se aplica préstamo igual que en decimal</li>
    <li>Los números negativos se representan con <b>complemento a 1</b> y <b>complemento a 2</b></li></ul>` },
  { icon:'🔲', title:'Álgebra de Boole',
    html:`<p>Rama de las matemáticas que trabaja con valores lógicos: verdadero (1) y falso (0).</p>
    <p><b>Operadores básicos:</b> AND (·), OR (+), NOT (¬) y XOR.</p>
    <p><b>Leyes principales:</b> conmutativa, asociativa, distributiva y las Leyes de De Morgan.</p>
    <p>Es la base del diseño de circuitos digitales y compuertas lógicas.</p>` },
];
const accU1 = document.getElementById('accordionU1');
unidad1.forEach((t,i)=>{
  const item=document.createElement('div');
  item.className='accordion-item';
  item.innerHTML=`<div class="accordion-head">
      <span class="bat-tag">${t.icon}</span>
      <h4>${t.title}</h4>
      <span class="chevron">▾</span>
    </div>
    <div class="accordion-body">${t.html}</div>`;
  item.querySelector('.accordion-head').addEventListener('click',()=>{
    item.classList.toggle('open');
  });
  accU1.appendChild(item);
});

/* ============ Contenido Unidad 2 (modal) ============ */
const unidad2 = [
  { icon:'🧩', title:'Algoritmos y sus características',
    def:'Secuencia finita y ordenada de pasos que permite resolver un problema o realizar una tarea.',
    exp:'Todo algoritmo debe ser: <b>finito</b> (tener fin), <b>definido</b> (pasos precisos, sin ambigüedad), <b>con entradas</b>, <b>con salidas</b> y <b>efectivo</b> (factible de realizar).',
    ejemplo:'Algoritmo para sumar dos números: 1) Inicio 2) Leer A y B 3) Sumar A+B en C 4) Mostrar C 5) Fin.',
    codigo:`a = float(input("Ingrese A: "))
b = float(input("Ingrese B: "))
c = a + b
print("La suma es:", c)`,
    actividad:'Se diseñó un algoritmo para calcular el promedio de tres calificaciones, identificando claramente las entradas, el proceso y la salida.' },
  { icon:'📊', title:'Los diagramas de flujo como herramienta de modelación de algoritmos',
    def:'Representación gráfica de un algoritmo mediante símbolos estandarizados que muestran el orden de las acciones.',
    exp:'Los símbolos principales son: óvalo (inicio/fin), paralelogramo (entrada/salida), rectángulo (proceso), rombo (decisión) y flechas (flujo). Permiten visualizar la lógica antes de programar.',
    ejemplo:'Diagrama para saber si un número es par o impar: Inicio → Leer N → ¿N % 2 == 0? → Sí: "Es par" / No: "Es impar" → Fin.',
    codigo:`n = int(input("Ingrese un número: "))
if n % 2 == 0:
    print("Es par")
else:
    print("Es impar")`,
    actividad:'Se elaboró el diagrama de flujo para determinar si un número ingresado por el usuario es par o impar.' },
  { icon:'📝', title:'Pseudocódigo: Una herramienta de palabras útil',
    def:'Descripción de un algoritmo escrita en un lenguaje similar al natural, sin la sintaxis estricta de un lenguaje de programación.',
    exp:'Usa palabras clave como Inicio, Leer, Si, Mientras, Fin. Sirve como puente entre la idea del algoritmo y el código real, facilitando su comprensión.',
    ejemplo:`Inicio
  Leer A, B
  Si A > B entonces
     Escribir "A es mayor"
  Sino
     Escribir "B es mayor"
  Fin Si
Fin`,
    codigo:`a = int(input("Ingrese A: "))
b = int(input("Ingrese B: "))
if a > b:
    print("A es mayor")
else:
    print("B es mayor")`,
    actividad:'Se tradujo un pseudocódigo a código Python para comparar dos números e identificar el mayor.' },
  { icon:'🧭', title:'Modelado de problemas',
    def:'Proceso de analizar un problema real y representarlo de forma estructurada (algoritmo, diagrama o pseudocódigo) antes de programarlo.',
    exp:'Etapas: 1) entender el problema, 2) identificar datos de entrada y salida, 3) diseñar la solución paso a paso, 4) verificar y probar la solución.',
    ejemplo:'Modelar el cálculo del área de un círculo: entrada = radio; proceso = área = π × radio²; salida = área.',
    codigo:`import math
radio = float(input("Ingrese el radio: "))
area = math.pi * radio ** 2
print("El área es:", round(area,2))`,
    actividad:'Se modeló el problema de calcular el área y el perímetro de un círculo aplicando las etapas de análisis vistas en clase.' },
];

/* ============ Contenido Unidad 3 (modal, estructura completa) ============ */
const unidad3 = [
  { icon:'🗣️', title:'Lenguajes y paradigmas de programación',
    intro:'Los lenguajes de programación son el medio para comunicarnos con la computadora, y los paradigmas son las distintas formas de enfocar la solución de un problema.',
    def:'Un lenguaje de programación es un conjunto de reglas y símbolos usados para escribir instrucciones que una computadora puede ejecutar. Un paradigma es un estilo o filosofía para estructurar esas instrucciones.',
    importancia:'Elegir el lenguaje y paradigma correcto facilita resolver problemas de forma más clara, eficiente y mantenible.',
    caracteristicas:'Sintaxis propia, nivel de abstracción, portabilidad, y forma de organizar la lógica (procedimientos, objetos, funciones, etc.).',
    tipos:'Paradigmas: <b>estructurado/procedimental</b> (Python, C), <b>orientado a objetos</b> (Java, Python), <b>funcional</b> (Haskell), <b>lógico</b> (Prolog).',
    funcionamiento:'El código fuente escrito por el programador se traduce (compila o interpreta) a instrucciones que el procesador puede ejecutar.',
    ejemplos:'Python (multiparadigma), Java (orientado a objetos), C (estructurado), Prolog (lógico).',
    ventajas:'Ventajas: mayor claridad y reutilización de código. Desventajas: curva de aprendizaje según el paradigma elegido.',
    aplicaciones:'Desarrollo web, aplicaciones móviles, inteligencia artificial, sistemas embebidos.',
    conclusion:'Conocer distintos lenguajes y paradigmas amplía las herramientas del programador para resolver cualquier tipo de problema.' },
  { icon:'🐍', title:'Introducción a la programación en Python',
    intro:'Python es uno de los lenguajes más usados actualmente por su sintaxis simple y su gran variedad de aplicaciones.',
    def:'Python es un lenguaje de programación de alto nivel, interpretado y de propósito general, creado por Guido van Rossum.',
    importancia:'Es ideal para aprender a programar por su sintaxis clara, además de ser muy usado en ciencia de datos, IA y desarrollo web.',
    caracteristicas:'Sintaxis sencilla y legible, tipado dinámico, multiplataforma, gran cantidad de librerías.',
    tipos:'Se puede usar para scripting, desarrollo web (Django/Flask), ciencia de datos, automatización, IA.',
    funcionamiento:'El intérprete de Python lee el código línea por línea y lo ejecuta directamente, sin necesidad de compilarlo previamente.',
    ejemplos:`print("Hola, Hotel Transilvania")`,
    ventajas:'Ventajas: fácil de aprender, gran comunidad. Desventajas: puede ser más lento que lenguajes compilados como C.',
    aplicaciones:'Aplicaciones web, análisis de datos, automatización de tareas, inteligencia artificial.',
    conclusion:'Python es un excelente punto de partida para iniciarse en la programación gracias a su simplicidad y versatilidad.' },
  { icon:'➗', title:'Operadores Algebraicos, Relacionales y Lógicos',
    intro:'Los operadores permiten realizar cálculos, comparaciones y evaluaciones lógicas dentro de un programa.',
    def:'Son símbolos que indican qué operación se debe realizar entre dos o más valores (operandos).',
    importancia:'Son la base para construir expresiones, tomar decisiones y realizar cálculos dentro de cualquier programa.',
    caracteristicas:'Cada tipo de operador trabaja con distintos tipos de datos y devuelve resultados numéricos o booleanos (Verdadero/Falso).',
    tipos:'<b>Algebraicos:</b> +, -, *, /, %, ** &nbsp;|&nbsp; <b>Relacionales:</b> ==, !=, &gt;, &lt;, &gt;=, &lt;= &nbsp;|&nbsp; <b>Lógicos:</b> and, or, not.',
    funcionamiento:'Los operadores algebraicos calculan valores numéricos; los relacionales comparan valores y devuelven True/False; los lógicos combinan condiciones.',
    ejemplos:`a, b = 8, 3
print(a + b)      # 11
print(a > b)      # True
print(a > 5 and b < 5)  # True`,
    ventajas:'Permiten construir expresiones complejas de forma clara; su mal uso puede generar errores lógicos difíciles de detectar.',
    aplicaciones:'Cálculos matemáticos, validaciones de formularios, condiciones de control en cualquier programa.',
    conclusion:'Dominar los operadores es esencial para poder construir expresiones y condiciones correctas en cualquier lenguaje.' },
  { icon:'🔀', title:'Estructuras de Control Condicionales',
    intro:'Permiten que un programa tome decisiones y ejecute distintas acciones según se cumpla o no una condición.',
    def:'Son instrucciones que evalúan una condición lógica y ejecutan un bloque de código u otro dependiendo del resultado (Verdadero/Falso).',
    importancia:'Sin condicionales, un programa siempre haría lo mismo sin poder adaptarse a distintas situaciones.',
    caracteristicas:'Evalúan expresiones booleanas, pueden anidarse y combinarse con operadores lógicos.',
    tipos:'<b>Simple</b> (if), <b>doble</b> (if-else), <b>múltiple</b> (if-elif-else).',
    funcionamiento:'Se evalúa la condición; si es verdadera se ejecuta el bloque correspondiente, si es falsa se pasa a la siguiente condición o al bloque else.',
    ejemplos:`nota = float(input("Ingrese su nota: "))
if nota >= 7:
    print("Aprobado")
elif nota >= 4:
    print("En recuperación")
else:
    print("Reprobado")`,
    ventajas:'Ventajas: dan flexibilidad al programa. Desventajas: demasiadas condiciones anidadas pueden complicar la lectura del código.',
    aplicaciones:'Validación de datos, sistemas de calificación, menús interactivos, control de acceso.',
    conclusion:'Las estructuras condicionales son fundamentales para que un programa reaccione de forma inteligente ante distintas situaciones.' },
  { icon:'🔁', title:'Estructuras de Control Repetitivas',
    intro:'Permiten ejecutar un bloque de instrucciones varias veces sin necesidad de repetir el código manualmente.',
    def:'Son estructuras (bucles) que repiten un conjunto de instrucciones mientras se cumpla una condición o un número determinado de veces.',
    importancia:'Ahorran tiempo y líneas de código al automatizar tareas repetitivas.',
    caracteristicas:'Tienen una condición de control, un cuerpo de instrucciones y, generalmente, una variable que cambia en cada repetición.',
    tipos:'<b>for</b> (número determinado de repeticiones) y <b>while</b> (se repite mientras una condición sea verdadera).',
    funcionamiento:'El bucle evalúa la condición antes de cada repetición (o recorre una secuencia); mientras se cumpla, ejecuta el bloque de código.',
    ejemplos:`for i in range(1,6):
    print("Vuelta número:", i)

contador = 0
while contador < 3:
    print("Contador:", contador)
    contador += 1`,
    ventajas:'Ventajas: reducen código repetido. Desventajas: un mal control de la condición puede generar bucles infinitos.',
    aplicaciones:'Recorrer listas, validar formularios, generar tablas de multiplicar, automatizar procesos.',
    conclusion:'Los bucles for y while son esenciales para automatizar tareas repetitivas de forma eficiente.' },
];

/* ============ Render tarjetas Unidad 2 y 3 ============ */
function renderGrid(container, data, unitNumber){
  container.innerHTML='';
  data.forEach((t,i)=>{
    const c=document.createElement('div');
    c.className='topic-card';
    c.innerHTML=`<span class="bat-tag">${t.icon}</span><h4>${t.title}</h4><p>Toca para ver definición, ejemplo, código y actividad.</p>`;
    c.addEventListener('click',()=>openModal(unitNumber,i));
    container.appendChild(c);
  });
}
renderGrid(document.getElementById('gridU2'), unidad2, 2);
renderGrid(document.getElementById('gridU3'), unidad3, 3);

/* ============ Tabs de unidades ============ */
document.querySelectorAll('.unit-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.unit-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.unit-block').forEach(b=>b.classList.remove('active'));
    document.getElementById('unitBlock'+tab.dataset.unit).classList.add('active');
  });
});
function showUnitTab(n){
  document.querySelectorAll('.unit-tab').forEach(t=>t.classList.toggle('active', t.dataset.unit==n));
  document.querySelectorAll('.unit-block').forEach(b=>b.classList.toggle('active', b.id==='unitBlock'+n));
}

/* ============ Modal genérico (Unidad 2 / Unidad 3) ============ */
const modalOverlay=document.getElementById('modalOverlay');
const modalBox=document.getElementById('modalBox');
let currentUnit=2, currentIndex=0;

function fieldsFor(unit,item){
  if(unit===2){
    return [
      ['📘 Definición', item.def],
      ['💡 Explicación', item.exp],
      ['✏️ Ejemplo', item.ejemplo],
      ['🐍 Código en Python', item.codigo, true],
      ['✅ Actividad realizada', item.actividad],
    ];
  }else{
    return [
      ['🌙 Introducción', item.intro],
      ['📘 Definición', item.def],
      ['⭐ Importancia', item.importancia],
      ['🔎 Características principales', item.caracteristicas],
      ['🗂️ Tipos / Clasificación', item.tipos],
      ['⚙️ Funcionamiento', item.funcionamiento],
      ['✏️ Ejemplo', item.ejemplos, item.ejemplos && item.ejemplos.includes('\n')],
      ['⚖️ Ventajas y desventajas', item.ventajas],
      ['🌍 Aplicaciones en la vida real', item.aplicaciones],
      ['✅ Conclusión', item.conclusion],
    ];
  }
}

function openModal(unit, index){
  currentUnit=unit; currentIndex=index;
  renderModal();
  modalOverlay.classList.add('open');
}
function closeModal(){ modalOverlay.classList.remove('open'); }
modalOverlay.addEventListener('click', e=>{ if(e.target===modalOverlay) closeModal(); });

function renderModal(){
  const data = currentUnit===2 ? unidad2 : unidad3;
  const item = data[currentIndex];
  const fields = fieldsFor(currentUnit,item);
  let fieldsHtml='';
  fields.forEach(f=>{
    const [label, value, isCode]=f;
    if(!value) return;
    fieldsHtml += `<div class="modal-field"><h5>${label}</h5>`;
    fieldsHtml += isCode ? `<pre>${value}</pre>` : `<p>${value}</p>`;
    fieldsHtml += `</div>`;
  });

  const otherUnit = currentUnit===2 ? 3 : (currentUnit===3 ? null : null);

  modalBox.innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="unit-flag">Unidad ${currentUnit} · ${currentIndex+1} de ${data.length}</div>
    <h3>${item.icon} ${item.title}</h3>
    ${fieldsHtml}
    <div class="modal-nav">
      <button id="mNavPrev">⟵ Anterior</button>
      <button id="mNavNext">Siguiente ⟶</button>
      <button id="mNavBack" class="primary">Volver a Unidad ${currentUnit}</button>
      ${currentUnit===2 ? '<button id="mNavUnit3">Ir a Unidad 3</button>' : ''}
    </div>
  `;
  document.getElementById('mNavPrev').onclick=()=>{
    currentIndex=(currentIndex-1+data.length)%data.length; renderModal();
  };
  document.getElementById('mNavNext').onclick=()=>{
    currentIndex=(currentIndex+1)%data.length; renderModal();
  };
  document.getElementById('mNavBack').onclick=()=>{
    closeModal(); goTo('unidades'); showUnitTab(currentUnit);
  };
  const u3btn=document.getElementById('mNavUnit3');
  if(u3btn){ u3btn.onclick=()=>{ closeModal(); goTo('unidades'); showUnitTab(3); }; }
}

/* ============ Avance (estrellas) con almacenamiento ============ */
const avanceList=document.getElementById('avanceList');
const unidadesAvance=[
  {n:1,label:'Unidad 1: Fundamentos y numeración'},
  {n:2,label:'Unidad 2: Algoritmos y modelado'},
  {n:3,label:'Unidad 3: Programación en Python'},
];
async function getRating(n){
  try{
    const v = localStorage.getItem('avance-unidad-'+n);
    return v ? parseInt(v) : 0;
  }catch(e){ return 0; }
}
async function setRating(n, val){
  try{ localStorage.setItem('avance-unidad-'+n, String(val)); }catch(e){ /* almacenamiento no disponible */ }
}

async function renderAvance(){
  avanceList.innerHTML='';
  for(const u of unidadesAvance){
    const rating = await getRating(u.n);
    const row=document.createElement('div');
    row.className='avance-row';
    row.innerHTML=`<h4>🦇 ${u.label}</h4>
      <div class="stars" data-unit="${u.n}">
        ${[1,2,3,4,5].map(i=>`<span class="star ${i<=rating?'filled':''}" data-val="${i}">★</span>`).join('')}
      </div>`;
    avanceList.appendChild(row);
    row.querySelectorAll('.star').forEach(star=>{
      star.addEventListener('click', async ()=>{
        const val=parseInt(star.dataset.val);
        const wrap=star.parentElement;
        wrap.querySelectorAll('.star').forEach(s=>{
          s.classList.toggle('filled', parseInt(s.dataset.val)<=val);
        });
        await setRating(u.n, val);
      });
    });
  }
}
renderAvance();

/* ============ Juego (quiz) ============ */
const preguntas=[
  {q:'¿Qué modelo usa memorias separadas para datos e instrucciones?', o:['Von Neumann','Harvard','Booleano','Binario'], r:1},
  {q:'¿Cuál es la función principal de un sistema operativo?', o:['Diseñar páginas web','Administrar hardware y recursos','Crear diagramas de flujo','Traducir idiomas'], r:1},
  {q:'¿Cuántos símbolos tiene el sistema binario?', o:['2','8','10','16'], r:0},
  {q:'¿Qué representa el complemento a 2?', o:['Números pares','Números negativos en binario','Letras en hexadecimal','Colores'], r:1},
  {q:'¿Qué operador del Álgebra de Boole representa la negación?', o:['AND','OR','NOT','XOR'], r:2},
  {q:'¿Qué característica NO pertenece a un algoritmo?', o:['Finito','Ambiguo','Definido','Efectivo'], r:1},
  {q:'¿Qué símbolo de diagrama de flujo representa una decisión?', o:['Óvalo','Rectángulo','Rombo','Flecha'], r:2},
  {q:'El pseudocódigo se caracteriza por...', o:['Ser código compilado','Estar en lenguaje similar al natural','Ser solo binario','No usarse en programación'], r:1},
  {q:'¿Qué es modelar un problema?', o:['Ignorarlo','Representarlo de forma estructurada antes de programar','Borrar el código','Ejecutarlo directamente'], r:1},
  {q:'Python es un lenguaje...', o:['Compilado y de bajo nivel','Interpretado y de alto nivel','Solo para hardware','Exclusivo de bases de datos'], r:1},
  {q:'¿Cuál es un operador relacional?', o:['+','and','>=','**'], r:2},
  {q:'¿Qué estructura repite un bloque de código mientras una condición sea verdadera?', o:['if','while','print','def'], r:1},
  {q:'¿Qué estructura se usa para tomar decisiones múltiples?', o:['for','while','if-elif-else','import'], r:2},
  {q:'¿Qué paradigma organiza el código en clases y objetos?', o:['Funcional','Orientado a objetos','Lógico','Ensamblador'], r:1},
  {q:'En Python, ¿qué imprime print("Hola")?', o:['Un error','Hola','12345','Nada'], r:1},
];

const gameStart=document.getElementById('gameStart');
const gamePlay=document.getElementById('gamePlay');
const gameResult=document.getElementById('gameResult');
const gameQuestion=document.getElementById('gameQuestion');
const gameOptions=document.getElementById('gameOptions');
const gameProgress=document.getElementById('gameProgress');
let quizOrder=[], quizIndex=0, quizScore=0;

document.getElementById('startGameBtn').addEventListener('click', startGame);
function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]); }
function startGame(){
  quizOrder=shuffle(preguntas.map((_,i)=>i)).slice(0,10);
  quizIndex=0; quizScore=0;
  gameStart.style.display='none'; gameResult.style.display='none';
  gamePlay.style.display='block';
  showQuestion();
}
function showQuestion(){
  const p=preguntas[quizOrder[quizIndex]];
  gameProgress.textContent=`Pregunta ${quizIndex+1} de ${quizOrder.length} · Puntaje: ${quizScore}`;
  gameQuestion.textContent='🦇 '+p.q;
  gameOptions.innerHTML='';
  p.o.forEach((opt,i)=>{
    const b=document.createElement('button');
    b.className='opt-btn';
    b.textContent=opt;
    b.onclick=()=>answer(i,b,p);
    gameOptions.appendChild(b);
  });
}
function answer(i,btn,p){
  document.querySelectorAll('.opt-btn').forEach(b=>b.disabled=true);
  if(i===p.r){ btn.classList.add('correct'); quizScore++; }
  else{
    btn.classList.add('wrong');
    gameOptions.children[p.r].classList.add('correct');
  }
  setTimeout(()=>{
    quizIndex++;
    if(quizIndex<quizOrder.length) showQuestion();
    else finishGame();
  }, 900);
}
function finishGame(){
  gamePlay.style.display='none';
  gameResult.style.display='block';
  let msg, emoji;
  const pct=quizScore/quizOrder.length;
  if(pct>=0.8){ msg='¡Excelente! Drácula está impresionado.'; emoji='🧛‍♂️🎉'; }
  else if(pct>=0.5){ msg='¡Buen intento! Sigue repasando las unidades.'; emoji='🧟‍♀️👍'; }
  else{ msg='Necesitas repasar más las unidades... ¡tú puedes!'; emoji='🦇📚'; }
  gameResult.innerHTML=`<h3>${emoji} Resultado</h3><p>Obtuviste ${quizScore} de ${quizOrder.length} respuestas correctas.</p><p>${msg}</p><button class="big-btn" onclick="startGame()">Jugar de nuevo</button>`;
}