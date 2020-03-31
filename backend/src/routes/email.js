const { Router } = require("express");

const router = Router();
const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
  async function main() {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const info = await transporter.sendMail({
      from: '"Fred Foo" <foo@example.com>',
      to: "vinigaio97@gmail.com, vinicius.gajo@fullengenharia.com.br",
      subject: "Hello",
      text: "Hello World?",
      html: "<b>Hello World?</b>"
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
  res.send("E-mail enviado");
});

module.exports = router;
