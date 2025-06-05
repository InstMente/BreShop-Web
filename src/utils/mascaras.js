export const formatarComMascara = (value, mask) => {
  if (!value) return '';
  const numericValue = value.replace(/\D/g, '');
  let maskedValue = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '#') {
      maskedValue += numericValue[valueIndex] || '';
      valueIndex++;
    } else {
      maskedValue += mask[i];
    }

    if (valueIndex >= numericValue.length) break;
  }

  return maskedValue;
};

export const MASCARA_CPF = '###.###.###-##';
export const MASCARA_CELULAR = '(##) #####-####';
export const MASCARA_CEP = '#####-###';
export const MASCARA_CARTAO = '#### #### #### ####';
export const MASCARA_VALIDADE = '##/##';
export const MASCARA_CVV = '###';
