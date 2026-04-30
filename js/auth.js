/* =====================================================
   NOVACARTEL — auth.js
   Authentication modal & fake auth using localStorage
   ===================================================== */

function openAuth() {
  document.getElementById('auth-modal').classList.add('active');
}

function closeAuth() {
  document.getElementById('auth-modal').classList.remove('active');
}

function closeAuthOnBg(e) {
  if (e.target === document.getElementById('auth-modal')) closeAuth();
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));

  if (tab === 'signin') {
    document.querySelector('.auth-tab-btn:nth-child(1)').classList.add('active');
    document.getElementById('signin-panel').classList.add('active');
  } else {
    document.querySelector('.auth-tab-btn:nth-child(2)').classList.add('active');
    document.getElementById('signup-panel').classList.add('active');
  }
}

function handleSignIn() {
  const email = document.getElementById('si-email').value.trim();
  const pass  = document.getElementById('si-password').value.trim();
  if (!email || !pass) {
    toast('Enter email and password', 'error');
    return;
  }
  // Simple fake auth: any non-empty credentials succeed
  loggedIn = email;
  localStorage.setItem('nc_user', email);
  updateAuthBtn();
  closeAuth();
  toast('Signed in successfully', 'success');
}

function handleSignUp() {
  const name  = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const phone = document.getElementById('su-phone').value.trim();
  const pass  = document.getElementById('su-pass').value.trim();
  const confirm = document.getElementById('su-confirm').value.trim();

  if (!name || !email || !phone || !pass || !confirm) {
    toast('Fill in all fields', 'error');
    return;
  }
  if (pass !== confirm) {
    toast('Passwords do not match', 'error');
    return;
  }
  if (pass.length < 6) {
    toast('Password must be at least 6 characters', 'error');
    return;
  }

  // Fake registration
  loggedIn = email;
  localStorage.setItem('nc_user', email);
  updateAuthBtn();
  closeAuth();
  toast('Account created successfully', 'success');
}

function updateAuthBtn() {
  const btn = document.getElementById('auth-nav-btn');
  if (!btn) return;
  btn.textContent = loggedIn ? 'Account' : 'Sign In';
}