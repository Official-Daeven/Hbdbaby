// Elements
const openBtn = document.getElementById('openBtn');
const landing = document.getElementById('landing');
const main = document.getElementById('main');
const revealBtn = document.getElementById('revealBtn');
const letter = document.getElementById('letter');
const slideshow = document.getElementById('slideshow');
const musicBtn = document.getElementById('playMusic');
const bgMusic = document.getElementById('bgMusic');

// Modal elements
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Landing page open
openBtn.addEventListener('click', () => {
  gsap.to(landing,{opacity:0,duration:1,onComplete:()=>{
    landing.style.display='none';
    main.style.display='flex';
    revealBtn.style.display='inline-block';
  }});
});

// Music toggle
musicBtn.addEventListener('click',()=>{
  if(bgMusic.paused){ 
    bgMusic.play(); 
    musicBtn.textContent='🔇 Pause Music'; 
  } else { 
    bgMusic.pause(); 
    musicBtn.textContent='🎵 Play Music'; 
  }
});

// Confetti
function triggerConfetti(){
  confetti({ particleCount:100, spread:70, origin:{y:0.6}, shapes:['circle','heart'], colors:['#ff6ec7','#ff00ff','#ffcbf2'] });
}

// Balloons
function createBalloon(){
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.background=`hsl(${Math.random()*360},70%,60%)`;
  balloon.style.left=Math.random()*100+'vw';
  balloon.style.animationDuration=5+Math.random()*5+'s';
  document.body.appendChild(balloon);
  setTimeout(()=>balloon.remove(),10000);
}
setInterval(createBalloon,500);

// Your memory texts
const memories = [
  "cutiee 💖",
  "hapii bday 🎉",
  "legal na😏😘",
  "ka gwapaaaa saakong baby 🥺😘",
  "sheesh yay 💖",
  "cutiee na gwapa pa jd sheesh🥺😘",
  "invite ko kaon ray akoa hahah🤣",
  "hinay basi ma hulog ka sakoa aw hahaah😂",
  "18 na ang bata hahahaha🤣",
  "ang baby nko dako na huhu🥺"
];

// Generate slides dynamically
for(let i=0; i<10; i++){
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `<img src="image${i+1}.jpg" alt="Memory ${i+1}"><p>${memories[i]}</p>`;
  slide.onclick = () => { openModal(i); triggerConfetti(); };
  slideshow.appendChild(slide);
}

// Auto slideshow
let slideIndex=0;
function autoSlide(){
  slideIndex++;
  if(slideIndex>=slideshow.children.length) slideIndex=0;
  const slideWidth=slideshow.children[0].offsetWidth+16;
  slideshow.scrollTo({ left: slideWidth*slideIndex, behavior:'smooth' });
}
setInterval(autoSlide,3000);

// Non-blocking typewriter
function typeLetterByParagraph(element){
  const paragraphs = Array.from(element.querySelectorAll('p'));
  element.innerHTML = '';
  let index = 0;

  function typeParagraph(p){
    const newP = document.createElement('p');
    element.appendChild(newP);
    let i = 0;
    function typeChar(){
      if(i < p.innerHTML.length){
        newP.innerHTML += p.innerHTML.charAt(i);
        i++;
        requestAnimationFrame(typeChar);
      } else {
        index++;
        if(index < paragraphs.length) typeParagraph(paragraphs[index]);
      }
    }
    typeChar();
  }

  typeParagraph(paragraphs[0]);
}

// Reveal letter
revealBtn.addEventListener('click',()=>{
  letter.style.display='block';
  revealBtn.style.display='none';
  for(let i=0;i<5;i++) triggerConfetti();
  typeLetterByParagraph(letter);
});

// Modal functions
let currentSlide = 0;
const slides = Array.from(slideshow.children);

function openModal(index){
  modal.style.display = "flex";
  currentSlide = index;
  showSlide(currentSlide);
}

function showSlide(n){
  if(n >= slides.length) currentSlide = 0;
  if(n < 0) currentSlide = slides.length - 1;
  const img = slides[currentSlide].querySelector('img');
  const caption = slides[currentSlide].querySelector('p').textContent;
  modalImg.src = img.src;
  captionText.textContent = caption;
}

// Navigation
nextBtn.onclick = () => { currentSlide++; showSlide(currentSlide); }
prevBtn.onclick = () => { currentSlide--; showSlide(currentSlide); }
closeBtn.onclick = () => { modal.style.display = "none"; }
modal.onclick = (e) => { if(e.target === modal) modal.style.display="none"; }
document.addEventListener('keydown', (e)=>{
  if(modal.style.display === "flex"){
    if(e.key === "ArrowLeft") { currentSlide--; showSlide(currentSlide); }
    if(e.key === "ArrowRight") { currentSlide++; showSlide(currentSlide); }
    if(e.key === "Escape") { modal.style.display="none"; }
  }
});