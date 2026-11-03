/* 50-Label Cheat Sheet signup — provider-agnostic.
 *
 * TODO(Dan Cruz): connect an email service. Until then every form falls back
 * to opening the visitor's mail app with a pre-filled request to
 * dan@fatcatcruz.com, so no lead is lost — but you send the PDF
 * by hand.
 *
 * To connect a provider, set the attributes on each <form class="nod-signup-form">
 * (or set window.NOD_SIGNUP = { endpoint, emailField } once, before this script):
 *
 *   data-endpoint     URL the form POSTs to.
 *   data-email-field  Field name the provider expects. Defaults to "email".
 *
 * Known values:
 *   Kit (ConvertKit)  data-endpoint="https://app.kit.com/forms/<FORM_ID>/subscriptions"
 *                     data-email-field="email_address"
 *                     (hello.html already posts to Kit form b9f24e182a.)
 *   Formspree         data-endpoint="https://formspree.io/f/<ID>"   (field: email)
 *   Mailchimp         works poorly here: its form endpoint sends no CORS headers,
 *                     so the browser reports failure even when the signup landed.
 *                     Prefer Kit or Formspree.
 *
 * The provider's own automation should deliver the PDF. Nothing here gates the
 * free practice tool; this is the only place the site asks for an email.
 */
(function () {
  'use strict';
  var FALLBACK_TO = 'dan@fatcatcruz.com';
  var cfg = window.NOD_SIGNUP || {};

  function mailtoHref(email, source) {
    var subject = 'Send me the 50-Label Cheat Sheet';
    var body = 'Please send the 50-Label Cheat Sheet to ' + email + '.\n\n(Signed up from negotiatorsondemand.com — ' + source + ')';
    return 'mailto:' + FALLBACK_TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function say(msg, text, cls) {
    msg.className = 'nod-signup-msg' + (cls ? ' ' + cls : '');
    msg.textContent = text;
  }

  document.querySelectorAll('form.nod-signup-form').forEach(function (form) {
    var input = form.querySelector('input[type=email]');
    var button = form.querySelector('button[type=submit]');
    var msg = form.querySelector('.nod-signup-msg');
    var source = form.getAttribute('data-source') || location.pathname;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (input.value || '').trim();

      if (!input.checkValidity() || !email) {
        say(msg, 'That email doesn’t look right. Try again.', 'err');
        input.focus();
        return;
      }

      // Honeypot: bots fill every field. Answer as if it worked, send nothing.
      var hp = form.querySelector('.hp input, input.hp');
      if (hp && hp.value) {
        say(msg, 'Done. Check your inbox.', 'ok');
        form.reset();
        return;
      }

      var endpoint = form.getAttribute('data-endpoint') || cfg.endpoint || '';
      if (!endpoint) {
        // Not connected yet: hand the request to the visitor's mail app.
        location.href = mailtoHref(email, source);
        say(msg, 'Your email app should open with the request filled in. Hit send and the sheet comes back to you.', 'ok');
        return;
      }

      var field = form.getAttribute('data-email-field') || cfg.emailField || 'email';
      var data = new FormData();
      data.append(field, email);
      data.append('source', source);
      data.append('lead_magnet', '50-label-cheat-sheet');

      button.disabled = true;
      say(msg, 'Sending…');

      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          say(msg, 'Done. Check your inbox — the sheet is on its way.', 'ok');
          form.reset();
        })
        .catch(function () {
          msg.className = 'nod-signup-msg err';
          msg.innerHTML = '';
          msg.appendChild(document.createTextNode('That didn’t go through. '));
          var a = document.createElement('a');
          a.href = mailtoHref(email, source);
          a.textContent = 'Email the request instead';
          msg.appendChild(a);
          msg.appendChild(document.createTextNode('.'));
        })
        .then(function () { button.disabled = false; });
    });
  });
})();
