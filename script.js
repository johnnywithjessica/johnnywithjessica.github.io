(() => {
  const config = window.WEDDING_CONFIG || {};
  let url;
  try { url = new URL(config.rsvpUrl); } catch { return; }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
  const link = document.getElementById('rsvp-link');
  link.href = url.href;
  link.hidden = false;
  document.getElementById('rsvp-pending').hidden = true;
  if (config.rsvpDeadline) {
    const deadline = document.getElementById('rsvp-deadline');
    deadline.textContent = config.rsvpDeadline;
    deadline.hidden = false;
  }
})();

// Keep the countdown independent of RSVP configuration.
(() => {
  const section = document.getElementById('countdown');
  if (!section) return;
  const weddingTime = Date.parse(section.dataset.weddingDate);
  if (!Number.isFinite(weddingTime)) return;
  const clock = section.querySelector('.countdown-clock');
  const units = ['days', 'hours', 'minutes', 'seconds'].map(name => section.querySelector(`[data-countdown="${name}"]`));
  let interval;
  function updateCountdown() {
    const remaining = Math.max(0, Math.ceil((weddingTime - Date.now()) / 1000));
    const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
    units.forEach((node, index) => { node.textContent = String(values[index]).padStart(index === 0 ? 3 : 2, '0'); });
    clock.setAttribute('aria-label', `婚禮倒數：${values[0]} 天 ${values[1]} 時 ${values[2]} 分 ${values[3]} 秒。Wedding countdown: ${values[0]} days, ${values[1]} hours, ${values[2]} minutes, ${values[3]} seconds.`);
    clock.hidden = remaining === 0;
    if (remaining === 0) {
      section.querySelector('h2').textContent = '我們的婚禮已開始';
      section.querySelector('.countdown-finished').hidden = false;
      clearInterval(interval);
    }
    return remaining;
  }
  if (updateCountdown() > 0) interval = setInterval(updateCountdown, 1000);
})();
