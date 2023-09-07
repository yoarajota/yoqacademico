// @ts-nocheck
import { encryptedString, RSAKeyPair } from '../js/RSA';

async function login() {
  try {
    const get = await fetch(
      'https://qacademico.bento.ifrs.edu.br/qacademico/lib/rsa/gerador_chaves_rsa.asp?form=frmLogin&action=%2Fqacademico%2Flib%2Fvalidalogin%2Easp',
      { mode: 'no-cors' }
    )
      .then(async (res) => res)
      .catch((error) => {
        console.log(error);
      });

    console.log(await get.text(), get);

    const formData = new URLSearchParams();
    const key = new RSAKeyPair(
      '487b1d25e53b9f77ade6a38eba7d313',
      '',
      '2e8c2af0701a0b72105d60e6d37c067f'
    );
    console.log(encryptedString(key, '20221130254'));
    formData.append('username', encryptedString(key, 'yourUsername'));
    formData.append('password', encryptedString(key, 'yourPassword'));

    console.log(formData);

    fetch(
      'https://qacademico.bento.ifrs.edu.br/qacademico/lib/validalogin.asp',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      }
    ).then(() => {
      // do something awesome that makes the world a better place
    });
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('button')?.addEventListener('click', () => {
  console.log('oi');
  login();
});
