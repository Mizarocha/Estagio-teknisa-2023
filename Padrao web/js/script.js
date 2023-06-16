$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99");
});

function validarCPF() {
  const cpfFormatado = document.getElementById("cpf").value;
  const cpf = limpaFormatacao(cpfFormatado);

  if (cpf.length !== 11) {
    mostraResultado("CPF deve conter 11 digitos.", "red");
    return;
  }
  if (verificaDigitosRepetidos(cpf)) {
    mostraResultado("CPF não pode conter repetição do mesmo digito.", "red");
    return;
  }
  const digito1 = calcularDigitoVerificador(cpf, 1);
  const digito2 = calcularDigitoVerificador(cpf, 2);

  if (!digito1) {
    mostraResultado(`CPF inválido - ${cpfFormatado}`, "red");
    return;
  }

  if (!digito2) {
    mostraResultado(`CPF inválido - ${cpfFormatado}`, "red");
    return;
  }
}

function calcularDigitoVerificador(cpf, posicao) {
  const sequencia = cpf.slice(0, 8 + posicao).split("");

  let soma = 0;
  let multiplicador = 9 + posicao;

  for (const numero of sequencia) {
    soma += multiplicador * Number(numero);
    multiplicador--;
  }
  const restoDivisao = (soma * 10) % 11;
  const digito = cpf.slice(8 + posicao, 9 + posicao);

  return restoDivisao == digito;
}

function limpaFormatacao(cpf) {
  //cpf = cpf.replace('.', '');  //pegar onde tiver ponto e mudar para vazio
  cpf = cpf.replace(/\D/g, ""); //remove qualquer coisa diferente de caracteres por vazio

  return cpf;
}

function mostraResultado(texto, cor) {
  const span = document.getElementById("resultado");
  span.innerHTML = texto;
  span.style.color = cor;
}

function verificaDigitosRepetidos(cpf) {
  return cpf.split("").every((d) => d === cpf[0]);
}
