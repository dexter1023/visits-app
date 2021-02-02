using System;
using MailKit.Net.Smtp;
using MailKit;
using MailKit.Security;
using MimeKit;
using Visits.Core.Utils;

namespace Visits.Core.Services
{
    public class MailerService
    {
        MimeMessage message;
        SmtpClient client;

        private string smtpServer = "smtp.gmail.com";
        private int smtpPort = 587;
        private string senderEmail = "notule.app@gmail.com";
        private string password = "notule10!!";

        public MailerService()
        {
            client = new SmtpClient();
        }

        public void SendMail(string email, string subject, string body)
        {
            if (Validator.isEmail(email))
            {
                message = new MimeMessage();
                message.From.Add(new MailboxAddress("Aplikacja Wizyty", senderEmail));
                message.To.Add(new MailboxAddress("Użytkownik", email));
                message.Subject = subject;
                message.Body = new TextPart("plain")
                {
                    Text = body
                };
                client.Connect(smtpServer, smtpPort, SecureSocketOptions.StartTlsWhenAvailable);
                client.Authenticate(senderEmail, password);
                client.Send(message);
                client.Disconnect(true);
            }
            else
            {
                throw new ArgumentException("Niepoprawny adres mailowy");
            }
        }
    }
}