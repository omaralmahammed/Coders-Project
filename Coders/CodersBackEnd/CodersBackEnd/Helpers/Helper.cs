using CodersBackEnd.Models;
using MimeKit;

namespace CodersBackEnd.Helpers
{
    public static class Helper
    {

        public static  async Task SendEmail(string subjectText, string messageText, string userEmail)
        {

            try
            {
                string fromEmail = "techlearnhub.contact@gmail.com";
                string fromName = "Coders Support Team";

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(new MailboxAddress("", userEmail));
                message.Subject = subjectText;
                message.Body = new TextPart("html") { Text = messageText };

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 465, true);
                    await client.AuthenticateAsync(fromEmail, "lyrlogeztsxclank");
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw; 
            }

        }




        public static string GenerateInvoiceHtml(List<Payment> paymentItems)
        {

            if (paymentItems == null || !paymentItems.Any())
            {

                return "<h1>No payment data available for the provided payment ID</h1>";
            }

            var paymentItem = paymentItems.FirstOrDefault();

            if (paymentItem == null)
            {
                // Another safety check, though this won't likely happen due to the previous check
                return "<h1>No payment data available</h1>";
            }



            var html = @"
                <html>
                <head>
                    <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet'>
                    <style>
                         body {
                    font-family: 'Roboto', sans-serif;
                    color: #333;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 80%;
                    margin: auto;
                    background-color: #fff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    color:#116e63;
                }
                .header h1 {
                    margin: 0;
                    font-size: 2.5em;
                    font-weight: 700;
                }
                .header h2 {
                    margin: 0;
                    font-size: 1.5em;
                    font-weight: 400;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: center;
                }
                th {
                    background-color: #e0e0e0; /* Changed to gray */
                    color: #333;
                    font-weight: 700;
                    text-transform: capitalize;
                }
                td {
                    padding: 15px;
                }
                .view-link {
                    color: red; /* Red color for download link */
                    font-weight: bold;
                    text-decoration: none;
                }
                .view-link:hover {
                    text-decoration: underline;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 1.2em;
                    color: #F53737;
                }
                .total {
                    font-weight: 700;
                }

                .studentName{
                    
                    text-align: start;
                    margin-bottom: 20px;
                    color:#116e63;
                }
                </style>
                </head>";


            var firstName = paymentItem.User.FirstName;
            var lastName = paymentItem.User.LastName;
            var email = paymentItem.User.Email;

            var programName = paymentItem.Program.Name;
            var amount = paymentItem.Amount;
            var date = paymentItem.PaymentDate;

            var paymentMethod = paymentItem.PaymentMethod;



            html += $@"
                
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Coders</h1>
                            <h2>Invoice</h2>
                        </div>

                        <div class='studentName'>
                            <p>Name: {firstName} {lastName}</p> 
                            <p>Email: {email}
                        </div>
        
                        <table>
                            <thead>
                                <tr>
                                    <th>Program Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                 <tr>
                                    <th>{programName}</th>
                                    <th>${amount}</th>
                                    <th>{date}</th>
                                    <th>{paymentMethod}</th>
                                </tr>
                            </tbody>
                        </table>
                <body>

            ";





            return html;
        }
    }
}
