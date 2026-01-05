import nodemailer from 'nodemailer'

// SMTP Configuration from environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

interface ContactEmailParams {
    name: string
    email: string
    subject: string
    message: string
}

/**
 * Send contact form notification email to admin
 */
export async function sendContactEmail(params: ContactEmailParams): Promise<boolean> {
    const { name, email, subject, message } = params
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

    // If email is not configured, skip sending
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('Email not configured, skipping send')
        return false
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border: 1px solid #e9ecef;
            border-top: none;
            border-radius: 0 0 12px 12px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .message-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            white-space: pre-wrap;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca3af;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📬 New Contact Message</h1>
    </div>
    <div class="content">
        <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${name} &lt;${email}&gt;</div>
        </div>
        <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${subject}</div>
        </div>
        <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
        </div>
    </div>
    <div class="footer">
        <p>This message was sent via the ProjectHub contact form.</p>
    </div>
</body>
</html>
    `

    try {
        await transporter.sendMail({
            from: `"ProjectHub" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            html: htmlContent,
            text: `New contact message from ${name} (${email})\n\nSubject: ${subject}\n\n${message}`,
        })

        console.log('Contact email sent successfully')
        return true
    } catch (error) {
        console.error('Failed to send email:', error)
        return false
    }
}

/**
 * Verify SMTP connection
 */
export async function verifyEmailConfig(): Promise<boolean> {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        return false
    }

    try {
        await transporter.verify()
        return true
    } catch (error) {
        console.error('SMTP verification failed:', error)
        return false
    }
}

interface CustomProjectParams {
    name: string
    email: string
    phone?: string
    projectType: string
    budget: string
    timeline: string
    description: string
    features: string
    references?: string
    additionalNotes?: string
}

/**
 * Send custom project request email to admin
 */
export async function sendCustomProjectEmail(params: CustomProjectParams): Promise<boolean> {
    const { name, email, phone, projectType, budget, timeline, description, features, references, additionalNotes } = params
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

    // If email is not configured, skip sending
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('Email not configured, skipping send')
        return false
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border: 1px solid #e9ecef;
            border-top: none;
            border-radius: 0 0 12px 12px;
        }
        .section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #dee2e6;
        }
        .section:last-child {
            border-bottom: none;
        }
        .section-title {
            font-weight: 700;
            color: #6366f1;
            font-size: 16px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .text-box {
            background: white;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            white-space: pre-wrap;
            line-height: 1.8;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #8b5cf6;
            color: white;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca3af;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 New Custom Project Request</h1>
    </div>
    <div class="content">
        <!-- Contact Information -->
        <div class="section">
            <div class="section-title">📋 Contact Information</div>
            <div class="field">
                <div class="field-label">Client Name</div>
                <div class="field-value">${name}</div>
            </div>
            <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">${email}</div>
            </div>
            ${phone ? `
            <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value">${phone}</div>
            </div>
            ` : ''}
        </div>

        <!-- Project Details -->
        <div class="section">
            <div class="section-title">💼 Project Details</div>
            <div class="field">
                <div class="field-label">Project Type</div>
                <div class="field-value"><span class="badge">${projectType}</span></div>
            </div>
            <div class="field">
                <div class="field-label">Budget Range</div>
                <div class="field-value">${budget}</div>
            </div>
            <div class="field">
                <div class="field-label">Desired Timeline</div>
                <div class="field-value">${timeline}</div>
            </div>
        </div>

        <!-- Requirements -->
        <div class="section">
            <div class="section-title">📝 Project Requirements</div>
            <div class="field">
                <div class="field-label">Project Description</div>
                <div class="text-box">${description.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
                <div class="field-label">Key Features & Functionality</div>
                <div class="text-box">${features.replace(/\n/g, '<br>')}</div>
            </div>
            ${references ? `
            <div class="field">
                <div class="field-label">Design References</div>
                <div class="text-box">${references.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            ${additionalNotes ? `
            <div class="field">
                <div class="field-label">Additional Notes</div>
                <div class="text-box">${additionalNotes.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
        </div>
    </div>
    <div class="footer">
        <p>This request was submitted via the ProjectHub custom project form.</p>
    </div>
</body>
</html>
    `

    try {
        await transporter.sendMail({
            from: `"ProjectHub" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            replyTo: email,
            subject: `[Custom Project Request] ${projectType} - ${name}`,
            html: htmlContent,
            text: `New custom project request from ${name} (${email})
            
Project Type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}

Description:
${description}

Features:
${features}

${references ? `References:\n${references}\n\n` : ''}
${additionalNotes ? `Additional Notes:\n${additionalNotes}` : ''}`,
        })

        console.log('Custom project email sent successfully')
        return true
    } catch (error) {
        console.error('Failed to send custom project email:', error)
        return false
    }
}

