import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string | null | undefined
  email: string
  uuid: string
}

export const verifyAccount = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Добро пожаловать, ${credentials.name ?? 'user'}!`,
  html: `<h1> Подтвердите свой email</h1>\
	<p>Для подтверждения email перейдите по ссылке внизу</p>\
	<a href="${process.env.BASE_URL || 'https://pern-next-graphql.vercel.app'}/user/confirm/account?key=${
    credentials.uuid
  }">Подтвердить email</a>`,
})
