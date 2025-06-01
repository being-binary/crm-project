import puppeteer from 'puppeteer';
import fs from 'fs';

export const generatePDF = async (userData) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
    <html>
      <head><style>
        body { font-family: Arial; }
        h1 { color: #333; }
      </style></head>
      <body>
        <h1>Vendor Details</h1>
        <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Company:</strong> ${userData.companyName}</p>
        <p><strong>Service:</strong> ${userData.services}</p>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  

  await browser.close();
  return await page.pdf({ path: 'output.pdf', format: 'A4' });
};

// Example usage

