const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    if (!text || typeof text !== 'string') {
        throw new Error('Se requiere un string válido para generar el código QR');
    }

    try {
        const qrCodeData = await QRCode.toDataURL(text);
        return qrCodeData;
    } catch (err) {
        console.error('Error al generar el código QR:', err.message);
        throw err;
    }
};

module.exports = { generateQRCode };
