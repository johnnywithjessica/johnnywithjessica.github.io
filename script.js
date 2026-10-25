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
