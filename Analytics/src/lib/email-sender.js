import nodemailer from 'nodemailer';

export class EmailSender {
  constructor({ email: { host, port, user, password } }) {
    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: user,
        pass: password
      }
    });
  }

  send(data, emailList) {
    const { esn, observableProperty, unit, value } = data;

    const messageHTML = `
      <h1>Información del sensor </h1>
      <ul>
        <li><font size=3><i>Esn:</i> ${esn}</font></li>
        <li><font size=3><i>Propiedad Observable:</i> ${observableProperty}</font></li>
        <li><font size=3><i>Unidad:</i> ${unit}</font></li>
        <li><font size=3><i>Valor:</i> <font color="red">${value}</font></font></li>
      </ul>
    `;

    const mailOptions = {
      from: 'Analytics Server',
      to: emailList,
      subject: `ALERTA - Sensor ESN: [${esn}]`,
      html: messageHTML
    };

    this.transporter.sendMail(mailOptions);
  }
}
