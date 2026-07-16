import { COMPANY } from '../data/images'

/**
 * إرسال طلب التواصل إلى بريد الشركة عبر FormSubmit
 * أول إرسال يطلب تفعيل الإيميل من رسالة تصل إلى info@...
 */
export async function submitContactForm({ name, email, phone, service, message, serviceLabel }) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(COMPANY.email)}`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || '-',
      service: serviceLabel || service || '-',
      message: message || '-',
      _replyto: email,
      _subject: `طلب تواصل جديد — ${name}`,
      _template: 'table',
      _captcha: 'false',
      _cc: COMPANY.emailCare,
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === 'false' || data.success === false) {
    throw new Error(data.message || 'Failed to send')
  }
  return data
}
