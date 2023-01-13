type FormatAmountOptions = {
  amount: number | string | null | undefined;
  currency?: string | number;
  showCurrency?: boolean;
  notation?: string;
  options?: object;
  log?: boolean;
  foceTwoDecimals?: boolean;
};

export function formatAmount(params: FormatAmountOptions) {
  const {
    amount = 0,
    currency = 'USD',
    showCurrency,
    notation,
    options: optionsCustom = {},
    foceTwoDecimals,
  } = params;
  let value = String(amount || 0).replace(/,/g, '');

  if (value.includes('e')) {
    value = Number(value).toFixed(16);
  }

  let maximumFractionDigits = 2;

  if (Number.isNaN(Number(value))) {
    value = '0';
  }

  const floatValue = Math.abs(parseFloat(value));

  if (floatValue < 0.01 && floatValue > 0) {
    maximumFractionDigits = 4;
  }

  if (floatValue <= 0.0001 && floatValue > 0) {
    maximumFractionDigits = 7;
  }

  if (floatValue <= 0.0000001 && floatValue > 0) {
    maximumFractionDigits = 8;
  }

  if (floatValue <= 0.00000001 && floatValue > 0) {
    maximumFractionDigits = 9;
  }

  if (floatValue <= 0.000000001 && floatValue > 0) {
    maximumFractionDigits = 12;
  }

  let intlFormat = 'en-US';

  let options = {
    minimumFractionDigits: 2,
    maximumFractionDigits,
    ...optionsCustom,
  };

  if (foceTwoDecimals) {
    options = {
      ...options,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
  }

  if (currency === 'MXN') {
    intlFormat = 'es-MX';
  }

  if (floatValue > 1000000000) {
    options = { ...options, ...{ notation: 'compact', compactDisplay: 'short' } };
  }

  if (showCurrency) {
    options = { ...options, ...{ style: 'currency', currency: currency || 'USD' } };
  }

  if (notation) {
    options = {
      ...options,
      ...{ notation, maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits: 1 },
    };
  }

  const numberFormat = new Intl.NumberFormat(intlFormat, options);
  let parsed = numberFormat.format(Number(value));

  if (!foceTwoDecimals) {
    // Aplica la regla de eliminar los ceros a la derecha
    if (parsed.includes('.')) {
      parsed = parsed.replace(/\.?0+$/, '');
    }
  }

  return parsed;
}

export function formatAssetAmount(
  $amount: number | string,
  options: Intl.NumberFormatOptions = {},
) {
  // Description
  // entre 0 y 9: hasta maximo 8 decimales. Si los decimales comienzan a ser 0, no mostrar los 0. Por ejemplo, 1.12345678, 1.12340000-> 1.1234
  // entre 10 y 9999: 4 decimales, misma logica de los ceros
  // mas de 10000 1 decimal, puede ser cero

  let amount = 0;
  let fractionDigits = 2;

  if (typeof $amount === 'string') {
    try {
      amount = $amount ? parseFloat($amount.replace(/$,/g, '')) : 0;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  } else {
    amount = $amount;
  }

  const absAmount = Math.abs(amount);

  if (absAmount > 0 && absAmount <= 9999) {
    fractionDigits = 8;
  }

  if (absAmount >= 10000) {
    fractionDigits = 2;
  }

  let parsed = formatAmount({
    amount,
    options: {
      ...options,
      maximumFractionDigits: fractionDigits,
    },
  });

  // Aplica la regla de eliminar los ceros a la derecha
  if (parsed.includes('.')) {
    parsed = parsed.replace(/\.?0+$/, '');
  }

  return parsed;
}

export function lengthDecimals(value: any) {
  const text = String(value);
  const index = text.indexOf('.');

  return text.length - index - 1;
}

export function formatAmountLong({ price = '0', maxLengthDecimals = 8, currency = 'USD' }: any) {
  let priceCurrent = price;

  if (typeof price === 'number') {
    priceCurrent = priceCurrent?.toString();

    if (priceCurrent?.includes('e')) {
      priceCurrent = price.toFixed(16);
    }
  }

  const numDecimals = lengthDecimals(priceCurrent);

  const [intString = '', decimalStringSplit = ''] = (priceCurrent ?? '').split('.');

  let decimalString = decimalStringSplit;
  let firstFour = '';
  let firstFive = '';
  let priceLong = '';
  let labelPriceFormat = '';
  let fixDecimals = false;
  let zerosLength = '';

  const priceNumber = parseInt(intString, 10);

  const labelPrice = formatAmount({
    amount: priceNumber,
    showCurrency: true,
    currency,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

  if (priceNumber <= 0) {
    if (decimalString) {
      // Evalua los primeros 5 decimales
      firstFive = decimalString.substring(0, 5);

      if (firstFive === '00000') {
        fixDecimals = true; // Marca que se mostrar el tooltip
        [zerosLength] = decimalString.match(/^0*/);
        firstFour = decimalString.replace(/^0+/, '').substring(0, 4);
      } else {
        decimalString = decimalString.substring(0, maxLengthDecimals);
      }
    }

    priceLong = fixDecimals
      ? `${labelPrice}.${zerosLength}${firstFour}`
      : `${labelPrice}.${decimalString}`;

    labelPriceFormat = fixDecimals ? `${labelPrice}.0...${firstFour}` : `${priceLong}`;

    if (!decimalString) {
      labelPriceFormat = `${labelPrice}`;
      priceLong = `${labelPrice}`;
    }
  } else {
    const twoDecimals = `${decimalString}00`.substring(0, 2);

    labelPriceFormat = `${labelPrice}.${twoDecimals}`;

    priceLong = labelPriceFormat;
  }

  return { labelPriceFormat, priceLong, fixDecimals, numDecimals };
}

export const formatAmountY = (amount: number | string) => {
  let value = String(amount || 0).replace(/,/g, '');
  let nZeros = 0;
  let amountFix = '0.0';
  if (value.includes('e')) {
    value = Number(value).toFixed(18);
  }
  const [nInt, nDecimals = ''] = value.split('.');
  if (nDecimals) {
    nZeros = (nDecimals?.match(/^0+/) || [''])[0].length;
    // @ts-ignore
    const stringZeros = [...Array(nZeros).keys()].map(() => '0').join('');
    const stringNInt = nDecimals.replace(/^0+/, '').substring(0, 4);
    amountFix = `${nInt}.${stringZeros}${stringNInt}`;
  }

  return { nZeros, amountFix };
};
