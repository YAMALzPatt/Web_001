window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if(loadingScreen){
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    const overlay = document.getElementById('page-transition');
    if(overlay) overlay.classList.remove('active');
});

function goToPage(url) {
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = '#FFA500';
    overlay.style.zIndex = 99999;
    overlay.style.opacity = 0;
    overlay.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = 1;
    }, 10);

    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');
    if(url.startsWith('#')) return;
    link.addEventListener('click', e => {
        e.preventDefault();
        goToPage(url);
    });
});

document.addEventListener('click', e => {
    const circle = document.createElement('div');
    circle.className = 'click-effect';
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 600);

    for(let i=0; i<8; i++){
        const particle = document.createElement('div');
        particle.className = 'orange-particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = 50 + Math.random()*50;
        particle.style.setProperty('--dx', Math.cos(angle)*distance + 'px');
        particle.style.setProperty('--dy', Math.sin(angle)*distance + 'px');
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
});

function showToast(message){
    let toast = document.getElementById('toast');
    if(!toast){
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

const copyBtn = document.getElementById('copy-email');
if(copyBtn){
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.dataset.email).then(() => {
            showToast('Email copied!');
        });
    });
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

if(searchInput && searchBtn && searchResults){
    const items = [
        { name: "About Me", link: "#about", desc: "ฉันชอบสร้างเว็บไซต์สวยๆ มีลูกเล่น และออกแบบ UI/UX" },
        { name: "Skills", link: "#skills", desc: "HTML, CSS, JavaScript, React, Animation, Responsive Design" },
        { name: "Projects", link: "#projects", desc: "เว็บไซต์โปรไฟล์, ร้านค้าออนไลน์, เกมง่ายๆ, เว็บแอปพลิเคชัน" },
        { name: "Contact", link: "#contact", desc: "Email: example@mail.com, Line/WhatsApp: 012-345-6789" }
    ];

    function search(){
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        if(!query) return;
        const results = items.filter(item =>
            item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
        );
        if(results.length === 0){
            searchResults.innerHTML = `<p>ไม่พบผลลัพธ์สำหรับ "<strong>${query}</strong>"</p>`;
            return;
        }
        results.forEach(r => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h2>${r.name}</h2><p>${r.desc}</p>`;
            card.onclick = () => goToPage(r.link);
            searchResults.appendChild(card);
        });
    }

    searchBtn.addEventListener('click', search);
    searchInput.addEventListener('keypress', e => { if(e.key==='Enter') search(); });
}

const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Message sent successfully!');
        contactForm.reset();
    });
}
/* ========== ORANGE BACKGROUND GENERATOR + PARALLAX ========== */
(function(){
    const field = document.getElementById('orange-field');
    if(!field) return;
  
    // สร้างวงกลมส้มแบบสุ่มจำนวน N
    const N = 14;
    const W = window.innerWidth;
    const H = window.innerHeight;
  
    for(let i=0;i<N;i++){
      const dot = document.createElement('span');
      dot.className = 'orange-dot';
  
      // ขนาด/ความโปร่ง/ตำแหน่ง/ความยาวอนิเมชันแบบสุ่มเล็กน้อย
      const size = 110 + Math.random()*220;      // 110–330px
      const alpha = 0.10 + Math.random()*0.12;   // 0.10–0.22
      const x  = Math.random()*W,  y  = Math.random()*H;
      const x2 = x + (Math.random()*160 - 80);   // ลอยซ้ายขวา
      const y2 = y + (Math.random()*140 - 70);   // ลอยขึ้นลง
      const dur = 14 + Math.random()*12;         // 14–26s
  
      dot.style.setProperty('--size', `${size}px`);
      dot.style.setProperty('--alpha', alpha);
      dot.style.setProperty('--x',  x.toFixed(1));
      dot.style.setProperty('--y',  y.toFixed(1));
      dot.style.setProperty('--x2', x2.toFixed(1));
      dot.style.setProperty('--y2', y2.toFixed(1));
      dot.style.setProperty('--dur', `${dur}s`);
      dot.style.animationDelay = `${(-Math.random()*dur).toFixed(2)}s`; // เริ่มไม่พร้อมกัน
  
      field.appendChild(dot);
    }
  
    // พารัลแลกซ์ให้รูปขยับนิด ๆ ตามเมาส์/นิ้ว
    const photos = document.querySelectorAll('.bg-photo');
    const depthMap = new Map([
      ['depth-1',  6],   // ขยับน้อย (อยู่ “ใกล้”)
      ['depth-2', 10],
      ['depth-3', 16]    // ขยับมาก (อยู่ “ไกล”)
    ]);
  
    const move = (x, y) => {
      const mx = (x / window.innerWidth  - 0.5) * 2;   // -1..1
      const my = (y / window.innerHeight - 0.5) * 2;
      photos.forEach(el => {
        let depth = 10;
        for(const [cls, val] of depthMap.entries()){
          if(el.classList.contains(cls)) { depth = val; break; }
        }
        el.style.setProperty('--tx', `calc(-50% + ${mx * depth}px)`);
        el.style.setProperty('--ty', `calc(-50% + ${my * depth}px)`);
      });
    };
  
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY), {passive:true});
    window.addEventListener('touchmove', e => {
      const t = e.touches[0]; if(t) move(t.clientX, t.clientY);
    }, {passive:true});
  })();
  // background animation
document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".layer");
    layers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed");
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });
  
  // smooth orange gradient animation
  let colors = [
    [255, 140, 0],
    [255, 90, 0],
    [255, 165, 0],
    [255, 69, 0]
  ];
  let step = 0;
  let colorIndices = [0, 1, 2, 3];
  let gradientSpeed = 0.002;
  
  function updateGradient() {
    if (colors.length == 0) return;
  
    let c0_0 = colors[colorIndices[0]];
    let c0_1 = colors[colorIndices[1]];
    let c1_0 = colors[colorIndices[2]];
    let c1_1 = colors[colorIndices[3]];
  
    let istep = 1 - step;
    let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
  
    let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
  
    document.querySelector(".background").style.background =
      "linear-gradient(-45deg, " + color1 + ", " + color2 + ")";
  
    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      colorIndices[1] =
        (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
      colorIndices[3] =
        (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
    }
  }
  
  setInterval(updateGradient, 10);
  
  // button hover animation
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.1)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });