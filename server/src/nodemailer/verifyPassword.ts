import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string | null
  email: string
  uuid: string
}

export const verifyPassword = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Добро пожаловать, ${credentials.name ?? 'user'}!`,
  html: `<h1> Сброс пароля</h1>\
	<p>Для сброса пароля перейдите по ссылке внизу</p>\
	<a href="${process.env.BASE_URL || 'http://localhost:4000'}/user/confirm/reset?key=${
    credentials.uuid
  }">Сбросить пароль</a>`,
})
