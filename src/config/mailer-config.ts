import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MailConfig = () => {
  return {
    transport: {
      host: 'mailrelay.comcast.com',
      port: 25,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    },
    defaults: {
      from: '"no-reply@comcast.com',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(), // or new PugAdapter()
      options: {
        strict: true,
      },
    },
  };
};

export const MailTemplate = (recipients: Array<string>, subject: string, htmlData: string) => {
  const to = [
    ...new Set(
      recipients.map((recipient: string) => {
        return recipient.toLowerCase();
      }),
    ),
  ].join();
  return {
    to,
    from: 'no-reply@comcast.com',
    subject: subject,
    html: htmlData,
  };
};

export const AddNotification = (recipients: Array<string>, data: any) => {
  // use data passed to function inside htmlData variable
  const htmlData = `<p>ADD HTML DATA GOES HERE</p><p>${data}</p>`;
  return MailTemplate(recipients, 'ADD SUBJECT HERE', htmlData);
};

export const UpdateNotification = (recipients: Array<string>, data: any) => {
  // use data passed to function inside htmlData variable
  const htmlData = `<p>UPDATE HTML DATA GOES HERE</p><p>${data}</p>`;
  return MailTemplate(recipients, 'UPDATE SUBJECT HERE', htmlData);
};
