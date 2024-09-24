// FondoAnimado.js

// Variables globales
const DPR = window.devicePixelRatio;
const colors = [
  ['#EC008C', '#f957b6'],
  ['#EF4136', '#ff7972'],
  ['yellow', '#fff'],
  ['lime', '#7aff7a'],
  ['#27AAE1', '#5ec8f2'],
  ['#662D91', '#a158d8']
];
const tau = Math.PI * 2;
const start = Math.PI; // Posición inicial
const finish = 0.5; // Fin (en % del círculo "tau", básicamente terminando en Math.PI * 2)
const inc = 0.007;
const rainbowHeight = 0.5; // de la altura de la vista
const arcStagger = 0.05; // en %
const sparklesInPerStripe = 3;

let sparkles = [];
let radius;

// Utilidades
const clamp = (min, max, val) => {
  return Math.min(Math.max(min, val), max);
};

const boolRandom = () => {
  return Math.round(Math.random()) ? false : true;
};

// Configuración del lienzo
const sizeCanvas = () => {
  radius = clamp(15, 50, window.innerWidth / 60 / DPR);
  const canvas = document.getElementById('rainbow');
  canvas.width = window.innerWidth * DPR;
  canvas.height = window.innerHeight * DPR;
};

// Propiedades de destello
const addRandom = function(lineWidth) {
  return (boolRandom() ? -1 : 1) * Math.random() * lineWidth;
};

const makeSparkle = ({ cx, cy, radiusX, radiusY, endAngle, lineWidth, color }) => {
  return {
    x: cx + radiusX * Math.cos(endAngle) + addRandom(lineWidth), // quedarse afuera adelante
    y: cy + radiusY * Math.sin(endAngle) + addRandom(lineWidth),
    opacity: 1,
    color,
    rad: Math.max(radius * Math.random() * DPR, 15)
  };
};

// Animación
function animate(percent = 0) {
  const doneAnimatingIn = percent >= finish + arcStagger * colors.length; // animando en arcos de arco iris
  
  let width = window.innerWidth * DPR;
  let height = window.innerHeight * DPR;
  
  const lineWidth = height * 0.5 / colors.length;
  
  const cx = width / 2;
  const startCy = height + lineWidth * rainbowHeight + (height - colors.length * lineWidth) / 3; // Posiblemente simplifícalo ... pero las matemáticas son buenas :)
  
  const startRadiusX = width / 2 + colors.length * lineWidth * 2;
  const startRadiusY = height;
  
  let ctx = document.getElementById('rainbow').getContext('2d');
  ctx.clearRect(0, 0, width, height);
  ctx.globalAlpha = 1;
  ctx.lineWidth = lineWidth;
  
  for (let i = colors.length - 1; i > -1; i--) {
    const [colorLine, colorSparkle] = colors[i];
    
    const cy = startCy + i * (lineWidth / 2 - 1); // - 1 para superposición
    
    // Haciendo estas elipses "cóncavas"
    const radiusX = startRadiusX - i * lineWidth / 2;
    const radiusY = startRadiusY - i * lineWidth / 2;
    
    const endAngle = tau * (percent - i * arcStagger) + start;
    
    const angle = clamp(start, tau * finish + start, endAngle);
    
    // DIBUJAR UNA DE NUESTRAS LÍNEAS DE ELIPSES
    // - Un color de nuestro arco iris
    ctx.beginPath();
    ctx.strokeStyle = colorLine;
    ctx.ellipse(
      cx,
      cy,
      radiusX,
      radiusY,
      0,
      start,
      angle,
      false
    );
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
    
    if (!doneAnimatingIn) {
      // AGREGAR: Animando destellos, sigue el comienzo de cada color
      for (let j = 0; j < sparklesInPerStripe; j++) {
        sparkles.push(
          makeSparkle({ cx, cy, radiusX, radiusY, endAngle: angle, lineWidth, color: colorLine })
        );
      }
    } else {
      // AGREGAR: Destellos normales después de la animación
      sparkles.push(makeSparkle({ cx, cy, radiusX, radiusY, endAngle: Math.random() * Math.PI + Math.PI, lineWidth, color: boolRandom() ? '#fff' : colorSparkle }));
    }
  }
  
  // PINTAR LOS DESTELLOS
  // y prepárate para los próximos destellos también
  const nextSparkles = [];
  for (let i = 0, len = sparkles.length; i < len; i++) {
    const { x, y, opacity, color, rad } = sparkles[i];
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.arc(x - rad, y - rad, rad, 0, Math.PI / 2);
    ctx.arc(x - rad, y + rad, rad, 3 * Math.PI / 2, 2 * Math.PI);
    ctx.arc(x + rad, y + rad, rad, Math.PI, 3 * Math.PI / 2);
    ctx.arc(x + rad, y - rad, rad, Math.PI / 2, Math.PI);
    ctx.fill();
    
    // Destellos que mantenemos
    if (opacity > 0.2 && rad > 0.2) {
      nextSparkles.push({
        x,
        y,
        opacity: opacity - 0.03,
        rad: rad - 0.2,
        color
      });
    }
  }
  sparkles = nextSparkles;
  
  if (!doneAnimatingIn) {
    // Animando nuestro arco iris
    requestAnimationFrame(function() {
      animate(percent + inc);
    });
  } else {
    // Reanudar destellos en arco iris estático
    requestAnimationFrame(function() {
      animate(finish + colors.length * arcStagger);
    });
  }
}

sizeCanvas();
requestAnimationFrame(function() {
  animate();
});
window.addEventListener('resize', sizeCanvas);
