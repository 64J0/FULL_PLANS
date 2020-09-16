const { Router } = require("express");

const SendEmailService = require("../services/email-services/SendEmailService");
const AppError = require("../errors/AppError");

const router = Router();

router.get("/pwa", async (request, response, next) => {
  const { name, email, phone, necessity } = request.body;
  const emailDTO = { name, email, phone, necessity };

  SendEmailService.execute(emailDTO)
    .then(() => {
      return response.status(200).send({ message: "Tudo certo! O e-mail foi enviado com sucesso." });
    })
    .catch(() => {
      return next(new AppError("Falha ao enviar e-mail!", 400));
    });
});

module.exports = router;
