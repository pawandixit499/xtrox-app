export const BASE_URL = 'http://10.0.2.2:8000/api/v1';

export const TOKEN_SECRET = {
  grant_type: 'password',
  client_id: '3',
  client_secret: 'S3fu9AeLIKLLIQGKSc3tpySyDxdsuc9xM2IxqpUR',
  scope: '*',
};

export const HearAbout = [
  {
    name: 'AHJ',
    id: 1,
  },
  {
    name: 'Email',
    id: 2,
  },
  {
    name: 'Phone call',
    id: 3,
  },
  {
    name: 'Letter In Mail',
    id: 4,
  },
  {
    name: 'Other',
    id: 0,
  },
];

export const timeZone = [
  {
    id: 'Eastern',
    name: 'Eastern',
  },
  {
    id: 'Central',
    name: 'Central',
  },
  {
    id: 'Mountain',
    name: 'Mountain',
  },
  {
    id: 'Pacific',
    name: 'Pacific',
  },
  {
    id: 'Alaska',
    name: 'Alaska',
  },
  {
    id: 'Hawaii',
    name: 'Hawaii',
  },
];

export const cardType = [
  {
    id: 'American Express',
    name: 'American Express',
  },
  {
    id: 'MasterCard',
    name: 'MasterCard',
  },
  {
    id: 'Visa',
    name: 'Visa',
  },
];

const cardExpiryMonth: { id: string; name: string }[] = [];
const cardExpiryYear: { id: string; name: string }[] = [];
let year = new Date().getFullYear();

for (let i = 1; i <= 12; i++) {
  cardExpiryYear.push({
    id: `${year + i}`,
    name: `${year + i}`,
  });
  cardExpiryMonth.push({
    id: `${i}`,
    name: `${i}`,
  });
}

export { cardExpiryMonth, cardExpiryYear };
