const mailer = require("nodemailer");
const config = require("config");
const logger = require("../logger");
const { ErrorCodes } = require("../exceptions");

const TYPE = {
  FORGOT_PSWD: "FORGOT_PSWD",
};

const user = config.get("mail_service.user");

const transport = mailer.createTransport({
  service: config.get("mail_service.service"),
  auth: {
    user,
    pass: config.get("mail_service.pass"),
  },
});

function send(type, data) {
  const options = {
    from: user,
    to: data.requestedBy,
    subject: null,
    text: null,
  };
  return new Promise((resolve, reject) => {
    switch (type) {
      case "FORGOT_PSWD":
        options.subject = `${config.get("app_name")} password change request`;
        options.text = "HEY MAN";
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
