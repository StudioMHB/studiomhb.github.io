/* =========================================================
   Studio MHB — shared header, footer and "more games" strip.
   Edit them here once and every page updates.
   ========================================================= */

const GAMES = [
  {
    id: 'gloam',
    title: 'Gloam',
    page: 'gloam.html',
    img: 'GloamCapsule.jpg',
    blurb: 'A co-op roguelite set in dark civil war era America. You and everything else in the land have been tainted rotten. Find redemption in vanquishing the embodiments of sin.',
    steam: 'https://store.steampowered.com/app/4932360/Gloam/',
    badge: 'Free demo',
    press: 'press-gloam.html'
  },
  {
    id: 'inherimage',
    title: 'In Her Image',
    page: 'in-her-image.html',
    img: 'library_hero.png',
    blurb: 'A psychological horror game about descent through grief.',
    steam: 'https://store.steampowered.com/app/4053030/In_Her_Image/'
  }
];

const EMAIL = 'studiomillr@gmail.com';

const SOCIALS = [
  { name: 'YouTube', url: 'https://www.youtube.com/@MillerHandbook', icon: 'Youtube.svg' },
  { name: 'TikTok',  url: 'https://www.tiktok.com/@millerhandbook',  icon: 'Tiktok.svg' },
  { name: 'Steam',   url: 'https://store.steampowered.com/app/4932360/Gloam/', icon: 'Steam.svg' }
];

// Hides a card image that hasn't been added yet, so the card shows its gradient instead
function hideMissing(img) { img.style.display = 'none'; }

function cardHTML(g) {
  return `
    <a class="game-card" href="${g.page}">
      ${g.badge ? `<span class="badge">${g.badge}</span>` : ''}
      <img src="${g.img}" alt="${g.title}" onerror="hideMissing(this)">
      <div class="game-card-info">
        <h3>${g.title}</h3>
        <p>${g.blurb}</p>
        <span class="arrow">View game →</span>
      </div>
    </a>`;
}

// Card plus a Steam button underneath (used on the homepage)
function entryHTML(g) {
  return `
    <div class="game-entry">
      ${cardHTML(g)}
      <div class="card-actions">
        <a class="btn btn-primary btn-small" href="${g.steam}" target="_blank" rel="noopener">
          <img src="Steam.svg" alt=""> Wishlist on Steam
        </a>
        <a class="btn btn-ghost btn-small" href="${g.page}">Learn more</a>
      </div>
    </div>`;
}

const socialIcons = SOCIALS.map(s =>
  `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}"><img src="${s.icon}" alt="${s.name}"></a>`
).join('');

// ---------- Header ----------
const header = document.createElement('header');
header.className = 'site-header' + (document.body.dataset.header === 'solid' ? ' solid' : '');
header.innerHTML = `
  <a class="logo" href="index.html">Studio MHB</a>
  <div class="header-right">
    <nav class="site-nav">
      <a href="index.html#games">Games</a>
      <a href="about.html">About</a>
      <a href="index.html#contact">Contact</a>
    </nav>
    <div class="socials">${socialIcons}</div>
  </div>`;
document.body.prepend(header);

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Homepage game grid ----------
const grid = document.getElementById('game-grid');
if (grid) grid.innerHTML = GAMES.map(entryHTML).join('');

// ---------- "More games" strip on game pages ----------
const current = document.body.dataset.game;
const more = document.getElementById('more-games');
if (more && current) more.innerHTML = GAMES.filter(g => g.id !== current).map(entryHTML).join('');

// ---------- Footer ----------
const footer = document.createElement('footer');
footer.className = 'site-footer';
footer.innerHTML = `
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Studio MHB</div>
        <p>An independent game studio of two.<br>Every asset handmade. No generative AI.</p>
      </div>
      <div>
        <h4>Games</h4>
        <ul>${GAMES.map(g => `<li><a href="${g.page}">${g.title}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Studio</h4>
        <ul>
          <li><a href="about.html">About us</a></li>
          <li><a href="mailto:${EMAIL}">Contact</a></li>
          ${GAMES.filter(g => g.press).map(g => `<li><a href="${g.press}">${g.title} press kit</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul>${SOCIALS.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.name}</a></li>`).join('')}</ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Studio MHB. All rights reserved.</span>
      <a href="#top">Back to top ↑</a>
    </div>
  </div>`;
document.body.append(footer);

// ---------- Fade in on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---------- Copy email buttons ----------
document.querySelectorAll('.copy-email').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.email || EMAIL).then(() => {
      const label = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = label, 1500);
    });
  });
});