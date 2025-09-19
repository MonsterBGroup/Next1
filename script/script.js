let cart = [];

function addToCart(itemName) {
    cart.push(itemName);
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        cartItems.appendChild(li);
    });

    // Exibir o carrinho automaticamente
    document.getElementById("cart").classList.remove("hidden");
}

function closeCart() {
    document.getElementById("cart").classList.add("hidden");
}

document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("cart").classList.toggle("hidden");
});

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        toggleBtn.textContent = "🌙 Modo Escuro";
    } else {
        toggleBtn.textContent = "☀️ Modo Claro";
    }
});


  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.fade-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const sliderTrack = document.getElementById('slider-track');

    let currentIndex = 0;
    let timer;
    const intervalTime = 5000;

    function showSlide(index) {
      // corrigir índice se fora do range
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // remover classes active de todos
      slides.forEach((s, i) => {
        s.classList.remove('active');
        dots[i].classList.remove('active');
      });

      // ativar os corretos
      slides[index].classList.add('active');
      dots[index].classList.add('active');

      currentIndex = index;
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startTimer() {
      timer = setInterval(nextSlide, intervalTime);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    // clique nas setas
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    // clique nas bolinhas
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = Number(dot.getAttribute('data-index'));
        showSlide(idx);
        resetTimer();
      });
    });

    // ---- ARRSTAR / SWIPE ----
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
      sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
      if (isDragging) requestAnimationFrame(animation);
    }

    sliderTrack.addEventListener('mousedown', dragStart);
    sliderTrack.addEventListener('touchstart', dragStart);
    sliderTrack.addEventListener('mousemove', dragMove);
    sliderTrack.addEventListener('touchmove', dragMove);
    sliderTrack.addEventListener('mouseup', dragEnd);
    sliderTrack.addEventListener('mouseleave', dragEnd);
    sliderTrack.addEventListener('touchend', dragEnd);
    sliderTrack.addEventListener('touchcancel', dragEnd);

    function dragStart(event) {
      isDragging = true;
      startPos = getPositionX(event);
      prevTranslate = 0;  // reset
      clearInterval(timer);
      sliderTrack.style.cursor = 'grabbing';
      animationID = requestAnimationFrame(animation);
    }

    function dragMove(event) {
      if (!isDragging) return;
      const currentPosition = getPositionX(event);
      currentTranslate = currentPosition - startPos;
    }

    function dragEnd() {
      if (!isDragging) return;
      cancelAnimationFrame(animationID);
      isDragging = false;
      sliderTrack.style.cursor = 'grab';
      // decidir se trocou de slide
      if (currentTranslate < -100) {
        nextSlide();
      } else if (currentTranslate > 100) {
        prevSlide();
      } else {
        // se arrasto fraco, voltar ao mesmo slide (não faz nada)
        showSlide(currentIndex);
      }
      resetTimer();
      // reset tradutor pro próximo drag
      currentTranslate = 0;
      prevTranslate = 0;
      sliderTrack.style.transform = `translateX(0px)`;
    }

    // iniciar
    showSlide(0);
    startTimer();
  });

