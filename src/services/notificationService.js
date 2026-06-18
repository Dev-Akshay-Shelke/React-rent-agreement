/**
 * Sends notification payload to a serverless function that dispatches
 * WhatsApp messages through Twilio.
 */
export async function sendContactEmail(params) {
  return sendNotification(params)
}

export async function sendWhatsAppNotification(params) {
  return sendNotification(params)
}

async function sendNotification(params) {
  const baseUrl = (import.meta.env.VITE_NOTIFY_URL || '').trim()
  const url = baseUrl || '/.netlify/functions/send-whatsapp'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params ?? {}),
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok || payload.success === false) {
      const reason = payload.error || `HTTP ${response.status}`
      console.warn('[notify] Twilio request failed:', reason)
      return { success: false, note: reason }
    }

    console.log('[notify] Twilio WhatsApp notification sent.')
    return { success: true, sid: payload.sid }
  } catch (err) {
    const reason = err?.message || 'Unable to reach notification endpoint'
    console.warn('[notify] Twilio request failed:', reason)
    return { success: false, note: reason }
  }
}
