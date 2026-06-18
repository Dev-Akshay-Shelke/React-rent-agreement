/**
 * Send a WhatsApp notification via CallMeBot directly from the browser.
 * Credentials come from .env.local (VITE_WA_PHONE + VITE_WA_APIKEY).
 * For production, swap this out for a server-side PHP endpoint.
 */
export async function sendContactEmail(params) {
  return sendNotification(params)
}

export async function sendWhatsAppNotification(params) {
  return sendNotification(params)
}

async function sendNotification(params) {
  const phone  = import.meta.env.VITE_WA_PHONE
  const apikey = import.meta.env.VITE_WA_APIKEY

  if (!phone || !apikey || apikey === 'YOUR_CALLMEBOT_KEY') {
    console.warn('[notify] WhatsApp credentials not set in .env.local')
    return { success: false, note: 'Credentials missing.' }
  }

  const { name = 'N/A', mobile = 'N/A', city = '', subject = '', message = '' } = params

  const text = [
    '📋 *New Enquiry - Prime Docs*',
    `👤 Name: ${name}`,
    `📞 Mobile: ${mobile}`,
    city    ? `📍 City: ${city}`       : null,
    subject ? `📌 Subject: ${subject}` : null,
    message ? `💬 Message: ${message}` : null,
  ].filter(Boolean).join('\n')

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apikey}`

  try {
    // no-cors: we just need to fire the request; CallMeBot doesn't set CORS headers
    await fetch(url, { method: 'GET', mode: 'no-cors' })
    console.log('[notify] WhatsApp notification sent.')
    return { success: true }
  } catch (err) {
    console.warn('[notify] WhatsApp request failed:', err.message)
    return { success: false }
  }
}
