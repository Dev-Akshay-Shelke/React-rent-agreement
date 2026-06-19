import twilio from 'twilio'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    }
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'
  const to = process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+919356480165'

  if (!accountSid || !authToken) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Twilio credentials are not configured' }),
    }
  }

  let payload = {}
  try {
    payload = event.body ? JSON.parse(event.body) : {}
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Invalid JSON payload' }),
    }
  }

  const body = [
    `*New Callback Request*`,
    `Name: ${payload.name || 'N/A'}`,
    `Mobile: ${payload.mobile || 'N/A'}`,
    `City: ${payload.city || 'N/A'}`,
    `Email: ${payload.email || 'N/A'}`,
    `Message: ${payload.message || 'N/A'}`,
  ].join('\n')

  try {
    const client = twilio(accountSid, authToken)
    const message = await client.messages.create({
      from,
      body,
      to,
    })

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, sid: message.sid }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: error.message || 'Twilio send failed' }),
    }
  }
}
