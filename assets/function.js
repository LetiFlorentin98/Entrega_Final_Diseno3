// Funcionalidad menú mobile
const nav = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');

if (navToggle && nav && navClose) {
  navToggle.addEventListener('click', () => {
    nav.classList.add('open');
  });
  navClose.addEventListener('click', () => {
    nav.classList.remove('open');
  });
  // Cerrar menú al hacer click en un enlace (opcional)
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
});

// Interacción sección pasos (steps)
document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.steps__step');
  const infos = document.querySelectorAll('.steps__info');
  const colorClasses = ['is-violeta', 'is-naranja', 'is-rosa', 'is-celeste'];
  steps.forEach(btn => {
    btn.addEventListener('click', function () {
      const step = this.getAttribute('data-step');
      steps.forEach(b => b.classList.remove('active'));
      infos.forEach((i, idx) => {
        i.classList.remove('active');
        const inner = i.querySelector('.steps__info-inner');
        colorClasses.forEach(c => {
          i.classList.remove(c);
          if (inner) inner.classList.remove(c);
        });
        if (idx == step) {
          i.classList.add('active');
          i.classList.add(colorClasses[step]);
          if (inner) inner.classList.add(colorClasses[step]);
        }
      });
      this.classList.add('active');
    });
  });
  // Inicializar color en el primer paso
  const firstInfo = document.querySelector('.steps__info.active');
  const firstInner = firstInfo ? firstInfo.querySelector('.steps__info-inner') : null;
  if (firstInfo) {
    colorClasses.forEach(c => {
      firstInfo.classList.remove(c);
      if (firstInner) firstInner.classList.remove(c);
    });
    firstInfo.classList.add(colorClasses[0]);
    if (firstInner) firstInner.classList.add(colorClasses[0]);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  flatpickr("#fecha-cambio", {
    dateFormat: "d/m/Y",
    locale: "es",
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    defaultDate: null,
    allowInput: false,
    disableMobile: true
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Calcular el primer y último día del mes actual
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  flatpickr("#fecha-cambio", {
    dateFormat: "d/m/Y",
    locale: "es",
    minDate: firstDay,
    maxDate: lastDay,
    defaultDate: null,
    allowInput: false,
    disableMobile: true,
    showMonths: 1,
    showDaysInNextAndPreviousMonths: false,
    monthSelectorType: 'static'
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Accordion para FAQs
  const faqItems = document.querySelectorAll('.faqs__item');
  // Eliminar cualquier display:block inline en las respuestas
  faqItems.forEach(item => {
    const answer = item.querySelector('.faqs__answer');
    if (answer) answer.removeAttribute('style');
  });
  function updateFaqIcons() {
    faqItems.forEach(item => {
      const iconSpan = item.querySelector('.faqs__question-icon');
      const oldIcon = iconSpan ? iconSpan.querySelector('i') : null;
      const title = item.querySelector('.faqs__question-title');
      if (!iconSpan || !oldIcon) return;

      // Determina el ícono correcto
      const iconType = item.classList.contains('active') ? 'minus' : 'plus';

      // Crea un nuevo <i> y reemplaza el anterior
      const newIcon = document.createElement('i');
      newIcon.setAttribute('data-lucide', iconType);
      iconSpan.replaceChild(newIcon, oldIcon);

      // Actualiza la clase del título
      if (item.classList.contains('active')) {
        if (title) title.classList.add('faqs__question-title--active');
      } else {
        if (title) title.classList.remove('faqs__question-title--active');
      }
    });
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }
  faqItems.forEach((item, idx) => {
    const btn = item.querySelector('.faqs__question');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = item.classList.contains('active');
      // Si ya está activa, no hacer nada (no permitir cerrar todas)
      if (isActive) return;
      // Cerrar todos
      faqItems.forEach(i => {
        i.classList.remove('active');
      });
      // Abrir la seleccionada
      item.classList.add('active');
      updateFaqIcons();
    });
    // Permitir abrir/cerrar haciendo click en toda la card
    item.addEventListener('click', function (e) {
      if (!e.target.classList.contains('faqs__question') && !e.target.closest('.faqs__question')) {
        btn.click();
      }
    });
  });
  // Inicializar íconos correctamente según el estado inicial
  setTimeout(updateFaqIcons, 50);
});

// Lógica para el formulario de contacto

document.addEventListener('DOMContentLoaded', function () {

  
  const form = document.getElementById('contactoForm');
  if (!form) return;
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');
  const enviarBtn = document.getElementById('enviarBtn');
  const charCount = document.getElementById('charCount');

  function validarEmail(valor) {
    // Validación simple de email real
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function actualizarEstadoBoton() {
    const nombreValido = nombre.value.trim().length > 0;
    const apellidoValido = apellido.value.trim().length > 0;
    const emailValido = validarEmail(email.value.trim());
    if (nombreValido && apellidoValido && emailValido) {
      enviarBtn.disabled = false;
    } else {
      enviarBtn.disabled = true;
    }
  }

  // Contador de caracteres en textarea
  mensaje.addEventListener('input', function () {
    const largo = mensaje.value.length;
    charCount.textContent = `${largo} de 500 max characters`;
  });

  // Validación en tiempo real
  [nombre, apellido, email].forEach(input => {
    input.addEventListener('input', actualizarEstadoBoton);
  });

  // Inicializar estado
  actualizarEstadoBoton();

  // Validación final al enviar
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    actualizarEstadoBoton();
    if (enviarBtn.disabled) return;
    // Mostrar popup de éxito
    const popup = document.getElementById('contactoPopup');
    popup.style.display = 'flex';
    // Cerrar popup al hacer clic en el botón o después de 2.5s
    const cerrarBtn = document.getElementById('cerrarPopupBtn');
    function cerrarPopup() {
      popup.style.display = 'none';
      cerrarBtn.removeEventListener('click', cerrarPopup);
      if (nombre) nombre.focus();
    }
    cerrarBtn.addEventListener('click', cerrarPopup);
    setTimeout(cerrarPopup, 2500);
    form.reset();
    charCount.textContent = '0 de 500 max characters';
    actualizarEstadoBoton();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.plan-benefits__item');
  const bar = document.querySelector('.plan-benefits__bar');
  if (!items.length || !bar) return;
  let current = 0;
  const interval = 10000; // 10 segundos
  let timer;

  function moveBarTo(idx) {
    const el = items[idx];
    const slider = el.parentElement;
    // Calcula la posición relativa dentro del slider
    const top = el.offsetTop;
    const height = el.offsetHeight;
    bar.style.top = top + 'px';
    bar.style.height = height + 'px';
  }

  function showItem(idx) {
    items.forEach((item, i) => {
      if (i === idx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    current = idx;

    // Selecciona la descripción del item activo
    const desc = items[idx].querySelector('.plan-benefits__desc');
    if (desc) {
      // Si ya hay un listener anterior, lo quitamos
      desc.removeEventListener('transitionend', desc._moveBarHandler || (() => { }));
      // Handler para mover la barra al terminar la transición
      const handler = () => {
        moveBarTo(idx);
        desc.removeEventListener('transitionend', handler);
      };
      desc._moveBarHandler = handler;
      desc.addEventListener('transitionend', handler);
    }
    // Mueve la barra inmediatamente por si no hay transición (o es muy rápida)
    moveBarTo(idx);
  }

  function nextItem() {
    current = (current + 1) % items.length;
    showItem(current);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextItem, interval);
  }

  // Click manual
  items.forEach((item, idx) => {
    item.addEventListener('click', function () {
      if (!item.classList.contains('active')) {
        showItem(idx);
        startTimer();
      }
    });
  });

  // Inicializar
  showItem(current);
  startTimer();

  // Recalcular barra en resize
  window.addEventListener('resize', () => moveBarTo(current));
});

function setPlanBenefitsHeight() {
  const container = document.querySelector('.plan-benefits');
  if (!container) return;
  const items = document.querySelectorAll('.plan-benefits__item');
  let max = 0;
  let gap = 0;
  // Detecta el gap real en px solo si hay más de un item
  if (items.length > 1) {
    const first = items[0];
    const second = items[1];
    gap = second.offsetTop - (first.offsetTop + first.offsetHeight);
    // Si el gap es negativo o NaN, lo forzamos a 0
    if (isNaN(gap) || gap < 0) gap = 0;
  }
  items.forEach(item => {
    const desc = item.querySelector('.plan-benefits__desc');
    // Guardar estado original
    const wasActive = item.classList.contains('active');
    // Forzar activo y descripción visible para medir
    item.classList.add('active');
    if (desc) {
      // Guardar estilos originales
      const prevTransition = desc.style.transition;
      const prevOpacity = desc.style.opacity;
      const prevMaxHeight = desc.style.maxHeight;
      const prevDisplay = desc.style.display;
      // Forzar visibilidad
      desc.style.transition = 'none';
      desc.style.opacity = '1';
      desc.style.maxHeight = '200px';
      desc.style.display = '';
      // Medir
      const h = item.offsetHeight;
      if (h > max) max = h;
      // Restaurar
      desc.style.transition = prevTransition;
      desc.style.opacity = prevOpacity;
      desc.style.maxHeight = prevMaxHeight;
      desc.style.display = prevDisplay;
    } else {
      // Medir igual si no hay descripción
      const h = item.offsetHeight;
      if (h > max) max = h;
    }
    // Restaurar estado
    if (!wasActive) item.classList.remove('active');
  });
  // Suma el gap solo si hay más de un item
  if (items.length > 1) {
    container.style.minHeight = (max + gap) + 'px';
  } else {
    container.style.minHeight = max + 'px';
  }
}

// Llama al inicio y en cada resize
setPlanBenefitsHeight();
window.addEventListener('resize', setPlanBenefitsHeight);

document.querySelectorAll('.caracteristica', '.especificacion').forEach(card => {
  card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posición del mouse dentro de la card
      const y = e.clientY - rect.top;

      // Calcular los valores de inclinación
      const rotateX = ((y - rect.height / 2) / rect.height) * -15; // Inclinación vertical
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;  // Inclinación horizontal

      // Ajustar variables CSS para la inclinación
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);

      // Ajustar la posición del borde en función del cursor
      const borderX = Math.max(10, Math.min(x, rect.width - 10)); // Limita entre 10px y el ancho menos 10px
      card.style.setProperty('--border-left', `${borderX}px`); // Posición de la línea borde desde el cursor
  });

  card.addEventListener('mouseleave', () => {
      // Restablecer la posición de la card y el borde al salir del hover
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
  });
});

function toggleMenu(element) {
  const allTitles = document.querySelectorAll('.footer-bottom-mobile .footer-title');
  
  allTitles.forEach(title => {
      const content = title.nextElementSibling;

      if (title !== element) {
          title.classList.remove('active');
          const icon = title.querySelector('.icon');
          icon.innerHTML = '<span class="material-symbols-rounded">remove</span>'; // Cambia a '+' por defecto
          content.style.maxHeight = '0';
      }
  });

  // Toggle el elemento clicado
  element.classList.toggle('active');
  const icon = element.querySelector('.icon');
  const content = element.nextElementSibling;

  if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
      icon.innerHTML = '<span class="material-symbols-rounded">remove</span>'; // Cambia a '-' al abrir
      content.style.maxHeight = content.scrollHeight + 'px';
  } else {
      icon.innerHTML = '<span class="material-symbols-rounded">add</span>'; // Cambia a '+' al cerrar
      content.style.maxHeight = '0';
  }
}