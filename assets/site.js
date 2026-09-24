const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => {
 const open = toggle.getAttribute('aria-expanded') !== 'true';
 toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
for (const link of nav.querySelectorAll('a')) {
 if (link.getAttribute('href') === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
}
const form = document.querySelector('#contact-form');
if (form) {
 const status = form.querySelector('#form-status');
 const submitButton = form.querySelector('button[type="submit"]');

 form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  status.classList.add('hidden');
  form.setAttribute('aria-busy', 'true');

  try {
   const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' }
   });
   if (!response.ok) throw new Error('Submission failed');

   form.reset();
   status.textContent = 'Thanks for reaching out! Your message has been sent.';
   status.classList.remove('hidden', 'contact-form-error');
  } catch {
   status.textContent = 'Sorry, your message could not be sent. Please try again or use the direct email link.';
   status.classList.remove('hidden');
   status.classList.add('contact-form-error');
  } finally {
   submitButton.disabled = false;
   submitButton.textContent = 'Send message';
   form.removeAttribute('aria-busy');
  }
 });
}
const dialog = document.createElement('dialog');
dialog.setAttribute('aria-labelledby', 'preview-title');
dialog.innerHTML = '<button type="button" aria-label="Close project preview">Close ✕</button><h2 id="preview-title"></h2><p>Project preview · Full case study coming soon.</p><img alt="">';
document.body.append(dialog);
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); } });
for (const link of document.querySelectorAll('[data-project-preview]')) {
 let card = link.parentElement;
 while(card && !card.querySelector('img')) card = card.parentElement;
 const image = card?.querySelector('img');
 const title = card?.querySelector('h3')?.textContent.trim() || 'Project';
 if(!image) continue;
 link.href = image.getAttribute('src');
 link.setAttribute('aria-label', `View ${title} preview`);
 link.addEventListener('click', e => {
 e.preventDefault(); dialog.querySelector('h2').textContent=title;
 dialog.querySelector('img').src=image.src; dialog.querySelector('img').alt=image.alt;
 dialog.showModal();
 });
}

const resumeLinks = document.querySelectorAll('[data-resume-open]');
if (resumeLinks.length && typeof HTMLDialogElement !== 'undefined' && 'showModal' in HTMLDialogElement.prototype) {
 const resumeDialog = document.createElement('dialog');
 resumeDialog.className = 'resume-dialog';
 resumeDialog.setAttribute('aria-labelledby', 'resume-dialog-title');
 resumeDialog.innerHTML = `
  <div class="resume-dialog-header">
   <h2 id="resume-dialog-title">Blessing Chukwuemeka · Résumé</h2>
   <div class="resume-dialog-actions">
    <a class="resume-download" href="assets/blessing-chukwuemeka-resume.pdf" download>Download PDF</a>
    <button type="button" class="resume-close" aria-label="Close résumé">×</button>
   </div>
  </div>
  <div class="resume-toolbar">
   <span>2 pages</span>
   <div class="resume-zoom-controls">
    <button type="button" class="resume-zoom-out" aria-label="Zoom out">−</button>
    <span class="resume-zoom-level" aria-live="polite">100%</span>
    <button type="button" class="resume-zoom-in" aria-label="Zoom in">+</button>
   </div>
  </div>
  <div class="resume-pages" role="document" aria-label="Blessing Chukwuemeka résumé, two pages">
   <img src="assets/resume-page-1.jpg" alt="Résumé page 1 of 2" width="1158" height="1638">
   <img src="assets/resume-page-2.jpg" alt="Résumé page 2 of 2" width="1158" height="1638" loading="lazy">
  </div>
 `;
 document.body.append(resumeDialog);
 const pages = resumeDialog.querySelector('.resume-pages');
 const images = pages.querySelectorAll('img');
 const zoomOut = resumeDialog.querySelector('.resume-zoom-out');
 const zoomIn = resumeDialog.querySelector('.resume-zoom-in');
 const zoomLevel = resumeDialog.querySelector('.resume-zoom-level');
 let opener = null;
 let zoom = 1;
 const updateZoom = () => {
  const styles = getComputedStyle(pages);
  const availableWidth = pages.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
  const width = Math.min(availableWidth, 820) * zoom;
  for (const image of images) image.style.width = `${width}px`;
  pages.style.alignItems = zoom > 1 ? 'flex-start' : 'center';
  zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
  zoomOut.disabled = zoom === 1;
  zoomIn.disabled = zoom === 3;
 };

 for (const link of resumeLinks) {
  link.addEventListener('click', event => {
   event.preventDefault();
   opener = link;
   resumeDialog.showModal();
   zoom = 1;
   updateZoom();
   pages.scrollTo(0, 0);
  });
 }

 zoomOut.addEventListener('click', () => { zoom = Math.max(1, zoom - 0.5); updateZoom(); });
 zoomIn.addEventListener('click', () => { zoom = Math.min(3, zoom + 0.5); updateZoom(); });
 window.addEventListener('resize', () => { if (resumeDialog.open) updateZoom(); });
 resumeDialog.querySelector('.resume-close').addEventListener('click', () => resumeDialog.close());
 resumeDialog.addEventListener('close', () => opener?.focus());
 resumeDialog.addEventListener('click', event => {
  if (event.target !== resumeDialog) return;
  const bounds = resumeDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) resumeDialog.close();
 });
}

for (const link of document.querySelectorAll('a')) {
 if(!link.textContent.trim() && !link.getAttribute('aria-label')) link.setAttribute('aria-label', link.href.includes('mailto:') ? 'Email Blessing' : 'View case study');
}

const illustrationPreview = document.querySelector('.illustration-preview');
if (illustrationPreview) {
 const button = illustrationPreview.querySelector('.illustration-control');
 const track = illustrationPreview.querySelector('.illustration-track');
 const count = illustrationPreview.querySelector('.illustration-count');
 const pieces = [...track.querySelectorAll('img')];
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let index = 0;
 let timer = null;
 let touchPlaying = false;

 const show = next => {
  index = (next + pieces.length) % pieces.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(pieces.length).padStart(2, '0')}`;
 };
 const stop = (reset = true) => {
  window.clearInterval(timer);
  timer = null;
  if (reset) show(0);
 };
 const play = () => {
  if (reducedMotion.matches || timer) return;
  timer = window.setInterval(() => show(index + 1), 1400);
 };

 button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') play(); });
 button.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !button.matches(':focus-visible')) stop();
 });
 button.addEventListener('focus', play);
 button.addEventListener('blur', () => { touchPlaying = false; stop(); });
 button.addEventListener('click', event => {
  if (event.pointerType === 'touch') {
   touchPlaying = !touchPlaying;
   if (touchPlaying) { show(index + 1); play(); }
   else stop(false);
  } else show(index + 1);
 });
 button.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
   event.preventDefault();
   stop(false);
   show(index + (event.key === 'ArrowRight' ? 1 : -1));
  }
 });
 document.addEventListener('visibilitychange', () => { if (document.hidden) stop(false); });
}
