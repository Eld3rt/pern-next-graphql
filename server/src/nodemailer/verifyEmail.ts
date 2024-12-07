import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string | null
  email: string
  uuid: string
}

export const verifyEmail = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Добро пожаловать, ${credentials.name ?? 'user'}!`,
  html: `<h1> Подтвердите новый email</h1>\
	<p>Для подтверждения нового email перейдите по ссылке внизу</p>\
	<a href="${process.env.BASE_URL || 'http://localhost:4000'}/user/confirm/email?key=${
    credentials.uuid
  }">Подтвердить email</a>`,
})
