import express from 'express'
import puppeteer from 'puppeteer'

const port = 8080
const app = express()


app.get('/', (req, res) => {
    res.send('hello world')
})



app.get('/generate-pdf', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        companyName: 'Acme Inc.',
        services: 'Chemicals Buy/Sell',
    }
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
    
    const pdfBuffer = await page.pdf({ path: 'output.pdf', format: 'A4' });
    await browser.close();

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=report.pdf',
    });

    res.send(pdfBuffer);
});


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})

