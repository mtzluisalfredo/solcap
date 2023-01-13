import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { chain, find, orderBy, pickBy } from 'lodash';

import { PropsGetFullName } from '../types/ui';

const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);

dayjs.locale('es');

// @ts-ignore
dayjs.updateLocale('es', {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
});

export type ParamsType = { types?: any; date?: any; startsAt?: any; endsAt?: any };

/* eslint-disable no-bitwise */
export function addAlpha(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  const valOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + valOpacity.toString(16).toUpperCase();
}

export const getFullName = ({ firstName, lastName = '' }: PropsGetFullName) => {
  const [firstLastName = '', secondLastName = ''] = String(lastName).split(' ');

  if (firstLastName.length <= 3) {
    return [firstName, firstLastName, secondLastName].join(' ');
  }

  return [firstName, firstLastName].join(' ');
};

export function uuidKeyTable() {
  // eslint-disable-next-line func-names
  return 'x-4xxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function numberFormat(
  num: any,
  len = 2,
  isAmount = true,
  currency = 'USD',
  hiddenCurrency = false,
) {
  // eslint-disable-next-line no-restricted-globals
  let value = isNaN(Number(num)) ? 0 : num;

  // oculta el simbolo Ej. $12,1212,1212.99 -> 12,1212,1212.99
  const mountStyle = !hiddenCurrency
    ? { style: 'currency', currency }
    : { minimumFractionDigits: len };
  if (value === 0) {
    return Number(value).toLocaleString('en-US', mountStyle);
  }
  // eslint-disable-next-line no-restricted-properties
  const factor = 10 ** len;
  const tempNumber = num * factor;
  const roundedTempNumber = Math.round(tempNumber);
  value = roundedTempNumber / factor;

  if (isAmount) return Number(value).toLocaleString('en-US', mountStyle);
  return value;
}

export const addZeroToStringNumber = (number: number) => {
  if (number?.toString().length === 1) {
    return `0${number}`;
  }
  return number;
};

export const groupTransactions = (transactionsItems: any) => {
  let result: any = [];
  if (Array.isArray(transactionsItems) && transactionsItems.length) {
    result = chain(transactionsItems)
      .map((item) => ({ ...item }))
      .groupBy((element) => dayjs.unix(element.createdAt).format('YYYY'))
      .map((months, year) => {
        let groupByDay = chain(months)
          .map((item) => item)
          .groupBy((element) => dayjs.unix(element.createdAt).format('MMDD'))
          .map((items, nDay) => {
            const transactions: any = items.sort(function (a, b) {
              var c = a.createdAt;
              var d = b.createdAt;
              return d - c;
            });
            const [dayGroup] = transactions;
            return {
              transactions,
              formatDay: !dayGroup ? '' : dayjs.unix(dayGroup.createdAt).format('DD [de] MMMM'),
              numberMonth: !dayGroup
                ? ''
                : parseInt(dayjs.unix(dayGroup.createdAt).format('MM'), 10),
              numberDay: parseInt(nDay, 10),
            };
          })
          .value();
        // para ordenar por mes y dia en grupo
        groupByDay = orderBy(groupByDay, ['numberMonth', 'numberDay'], ['desc', 'desc']);

        return { year, groupByDay };
      })
      .value();

    result = orderBy(result, ['year'], ['desc']);
  }

  return result;
};

export const getNameAddress = ({
  wallets,
  address,
}: {
  wallets: { name: string; address: string }[];
  address: string;
}): { text: string; walletExist: boolean } => {
  const wallet = find(wallets, (w) => w.address === address);

  if (wallet) {
    return {
      text: wallet.name,
      walletExist: true,
    };
  }
  return {
    text: address,
    walletExist: false,
  };
};

export const normalizeQueryParams = (props: ParamsType) => {
  const { types, startsAt, endsAt } = props;
  let typesTransactions = '';
  let paramsUrls = '?';
  let filteredPayload = null;

  if ((types || []).length) {
    typesTransactions = (types || []).map((opt: any) => `&types=${opt}`).join('');
  }

  const payload = {
    types: typesTransactions,
    // date: date && date.day ? `&date=${dayjs(`${date.year}-${date.month}-${date.day}`).unix()}` : '',
    startsAt:
      startsAt && startsAt.day
        ? `&startsAt=${dayjs(`${startsAt.year}-${startsAt.month}-${startsAt.day}`).unix()}`
        : '',
    endsAt:
      endsAt && endsAt.day
        ? `&endsAt=${dayjs(`${endsAt.year}-${endsAt.month}-${endsAt.day}`).unix()}`
        : '',
  };

  filteredPayload = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== ''));
  filteredPayload = pickBy(filteredPayload, (v) => v !== null && v !== undefined && v !== '');

  if (filteredPayload?.startsAt) {
    paramsUrls = `${paramsUrls}${filteredPayload?.startsAt}`;
  }
  if (filteredPayload?.endsAt) {
    paramsUrls = `${paramsUrls}${filteredPayload?.endsAt}`;
  }

  if (filteredPayload?.types) {
    paramsUrls = `${paramsUrls}${filteredPayload?.types}`;
  }

  return paramsUrls.length === 1 ? '' : paramsUrls;
};

export const getNameAssetAmount = ({ asset }: { asset: string }) => {
  let nameAsset = asset;

  if (asset && asset.includes('USDC')) nameAsset = 'USDC';
  if (asset && asset.includes('USDT')) nameAsset = 'USDT';

  return nameAsset;
};
