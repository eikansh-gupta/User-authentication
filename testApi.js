const fetch = require('node-fetch'); 

async function testRegister() {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', password: 'password123!' }),
  });
  const data = await res.json();
  console.log('Register:', data);
}

async function testLogin() {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', password: 'password123!' }),
  });
  const data = await res.json();
  console.log('Login:', data);
}

(async () => {
  await testRegister();
  await testLogin();
})();
