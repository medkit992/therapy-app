import nodemailer from 'nodemailer';

// For SMS via email-to-SMS (Verizon)
const carrierGateways: Record<string,string> = {
  verizon: 'vtext.com',
  att:     'txt.att.net',
  tmobile: 'tmomail.net',
  // add others as needed
};

let transporterPromise = nodemailer.createTestAccount()
    .then((testAccount: nodemailer.TestAccount) => {  // ← annotate here
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    });

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = await transporterPromise;
  const info = await transporter.sendMail({
    from: '"TherapyApp" <no-reply@therapyapp.test>',
    to,
    subject,
    html,
  });
  console.log('📧 Email sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export async function sendSms(
  phoneNumber: string,
  carrier: string,
  message: string
) {
  const gateway = carrierGateways[carrier.toLowerCase()];
  if (!gateway) throw new Error(`Unknown carrier: ${carrier}`);
  const toAddress = `${phoneNumber.replace(/\D/g,'')}@${gateway}`;
  // SMS gateways usually ignore subject & html/text distinction
  await sendEmail(toAddress, '', `<p>${message}</p>`);
  console.log('📱 SMS sent to:', toAddress);
}
