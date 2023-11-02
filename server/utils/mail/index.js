const mailer = require("nodemailer");
const config = require("../config");
const logger = require("../../logger");
const { ErrorCodes } = require("../../exceptions");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const user = config.MAIL_SERVICE_USER;

const transport = mailer.createTransport({
  service: config.MAIL_SERVICE_PROVIDER,
  auth: {
    user,
    pass: config.MAIL_SERVICE_PASSWORD,
  },
});

const TYPE = {
  FORGOT_PSWD: "FORGOT_PSWD",
};

function send(type, data) {
  const options = {
    from: user,
    to: data.requestedBy,
    subject: null,
    html: null,
  };
  return new Promise((resolve, reject) => {
    switch (type) {
      case "FORGOT_PSWD":
        options.subject = `Verify your ${config.APP_NAME} account`;

        const emailTemplateSource = fs.readFileSync(
          path.join(__dirname, "/verify_template.hbs"),
          "utf8"
        );
        const template = handlebars.compile(emailTemplateSource);
        options.html = template({
          name: data.username,
          code: data.verificationCode,
          expiry: Math.round(config.VERIFY_CODE_EXPIRY / 60),
        });
        break;
      default:
        reject(ErrorCodes.ERR_INVALID_REQUEST);
    }
    transport.sendMail(options, (err, info) => {
      if (err) {
        logger.error(err);
        reject(ErrorCodes.ERR_MAIL_FAILED);
      }
      resolve(info);
    });
  });
}

module.exports.type = TYPE;
module.exports.sendMail = send;
