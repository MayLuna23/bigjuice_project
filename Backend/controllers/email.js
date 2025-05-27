const { Resend } = require("resend");
const resend = new Resend("re_5YsW1XHK_2CUTGvcUvWxboPYGngs9K2u2");

const zeroSaleEmail = async (user, customer, ubication) => {
  try {
    const response = await resend.emails.send({
      from: "Big Juice <onboarding@resend.dev>",
      to: "camilo.munerac@gmail.com",
      subject: "Venta en $0 realizada",
      html: `<p>Te informamos que se ha efectuado una venta de $0 en la ubicación ${ubication.toUpperCase()}.</p>
             <p>La venta ha sido realizada por el usuario ${user.toUpperCase()}.</p>
             <p>El cliente ha sido ${customer.toUpperCase()}</p>
             <p>Alerta automatica de Big Juice.</p>`,
    });
    return {
      status: 201,
      message: "Notificación enviada exitosamente.",
    };
  } catch (error) {
    console.error("Error al crear la venta:", error);
    return {
      status: 500,
      message: `Error al intentar enviar la Notificación.`,
      error: error.message,
    };
  }
};

module.exports = { zeroSaleEmail };
