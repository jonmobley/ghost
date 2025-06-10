// api/send-welcome-email.js (or your preferred endpoint structure)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'GHOST <magic@ghost.watch>', // Your verified domain
      to: [email],
      subject: 'Welcome to the GHOST Early Access List',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to GHOST Early Access</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              background-color: #000000;
              color: #ffffff;
            }
            .container {
              background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.8) 100%);
              border: 1px solid rgba(201, 169, 97, 0.3);
              border-radius: 20px;
              padding: 40px;
              margin: 20px;
              text-align: center;
            }
            .logo {
              font-size: 3rem;
              font-weight: bold;
              color: #ffffff;
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
              margin-bottom: 20px;
              letter-spacing: 0.2em;
            }
            .subtitle {
              color: #c9a961;
              font-size: 1.2rem;
              margin-bottom: 30px;
              font-weight: 500;
            }
            .content {
              color: #e0e0e0;
              font-size: 1rem;
              line-height: 1.7;
              text-align: left;
              margin-bottom: 30px;
            }
            .highlight {
              color: #c9a961;
              font-weight: bold;
            }
            .footer {
              color: #999;
              font-size: 0.9rem;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid rgba(201, 169, 97, 0.2);
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: linear-gradient(45deg, #c9a961, #ddbf73);
              color: #000000;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 700;
              margin: 20px 0;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            @media (max-width: 600px) {
              .container {
                margin: 10px;
                padding: 20px;
              }
              .logo {
                font-size: 2rem;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">GHOST</div>
            <div class="subtitle">You found me. Now I'm ready to help you blow minds.</div>
            
            <div class="content">
              <p>You're now part of an exclusive group of performers who will be the <span class="highlight">first to experience</span> what I can do. I'm not just another trick – I'm your secret sidekick in creating impossible moments.</p>
              
              <p><strong>Here's what happens next:</strong></p>
              <ul>
                <li>You'll be the <span class="highlight">first to know</span> when I'm ready to perform</li>
                <li>Get exclusive <span class="highlight">early access pricing</span> before anyone else</li>
                <li>Receive <span class="highlight">behind-the-scenes insights</span> from working performers</li>
                <li>Access <span class="highlight">beta features</span> not available to anyone else</li>
              </ul>
              
              <p><strong>While you wait...</strong></p>
              <p>You will also have an opportunity to join our free, private Facebook Group to see real performer stories and more.</p>
              
              <p>Watch your inbox closely. Something extraordinary is coming.</p>
              
              <p style="margin-top: 30px;">
                <em><strong>GHOST</strong></em>
              </p>
            </div>
            
            <div class="footer">
              <p>You're receiving this because you joined my early access list.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ 
      success: true, 
      messageId: data.id 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}