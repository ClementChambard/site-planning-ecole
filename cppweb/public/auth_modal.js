const admin_password_modal = document.querySelector('#admin-password-modal');
const password_input = admin_password_modal.querySelector('input');

function try_authentify() {
  const password = password_input.value;
  fetch('/api/check_admin', {
    method: 'POST',
    body: JSON.stringify({ password })
  }).then(r => {
    if (r.status < 400) {
      window.location = '/admin/sondages'
    } else {
      password_input.value = '';
      // TODO: error message ?
    }
  });
}
