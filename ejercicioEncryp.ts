const fs = require('fs');
const NodeRSA = require('node-rsa');

// Rutas a los archivos
const mensajePath = '/Users/andre/Desktop/Especialización Inegeniría de Software/Semestre 2/Seguridad/documento_afsa.txt';
const clavePrivadaPath = '/Users/andre/Desktop/Especialización Inegeniría de Software/Semestre 2/Seguridad/seguridad.priv.pem';
const clavePublicaPath = '/Users/andre/Desktop/Especialización Inegeniría de Software/Semestre 2/Seguridad/afsa.pub.pem';

// Lee el mensaje desde el archivo en el escritorio
const mensaje = fs.readFileSync(mensajePath, 'utf8');

// Crea una instancia de RSA
const key = new NodeRSA({ b: 2048 });

// Genera un par de claves (pública y privada)
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');

// Guarda las claves en archivos
fs.writeFileSync(clavePrivadaPath, privateKey);
fs.writeFileSync(clavePublicaPath, publicKey);

// Firma el mensaje con la llave privada
const firma = key.sign(mensaje, 'base64', 'utf8');
//const firma = '/Users/andre/Desktop/Especialización Inegeniría de Software/Semestre 2/Seguridad/firma_afsa';


// Verifica la firma con la llave pública
const isValid = key.verify(mensaje, firma, 'utf8', 'base64');

// Encripta el mensaje con la llave pública
const mensajeEncriptado = key.encrypt(mensaje, 'base64');

// Desencripta el mensaje con la llave privada
const mensajeDesencriptado = key.decrypt(mensajeEncriptado, 'utf8');

// Resultados
console.log('Mensaje original:', mensaje);
console.log('Firma:', firma);
console.log('Firma válida:', isValid);
console.log('Mensaje encriptado:', mensajeEncriptado);
console.log('Mensaje desencriptado:', mensajeDesencriptado);


