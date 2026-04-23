export async function onRequestPost(context) {
  const { request, env } = context;

  const cors = {
    'Access-Control-Allow-Origin': 'https://crocodilerockriverlodge.pages.dev',
    'Content-Type': 'application/json',
  };

  if (!env.MAILERLITE_TOKEN) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers: cors });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
  }

  const str = (v, max = 500) => (typeof v === 'string' ? v.slice(0, max).trim() : '');
  const email = str(body.email, 200);
  const first = str(body.first_name, 100);
  const last = str(body.last_name, 100);
  const phone = str(body.phone, 40);
  const checkin = str(body.checkin, 20);
  const checkout = str(body.checkout, 20);
  const guests = str(body.guests, 20);
  const message = str(body.message, 2000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers: cors });
  }
  if (!first || !last) {
    return new Response(JSON.stringify({ error: 'Name required' }), { status: 400, headers: cors });
  }

  const payload = {
    email,
    fields: { name: first, last_name: last, phone, checkin, checkout, guests, message },
    groups: ['183297776718709816'],
    status: 'active',
  };

  const upstream = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.MAILERLITE_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: 'Upstream failure' }), { status: 502, headers: cors });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
}
