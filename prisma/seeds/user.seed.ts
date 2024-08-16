import { faker } from '@faker-js/faker';
// import { UserRole } from 'src/modules/user/enums';

const getByIdx = [
  { role: 'administrator', email: 'admin@email.com' },
  { role: 'supervisor', email: 'supervisor@email.com' },
  { role: 'operational', email: 'operational@email.com' },
  { role: 'logistic', email: 'logistic@email.com' },
  { role: 'security', email: 'security@email.com' },
];

export const UserSeed = Array.from({ length: 4 }).map((_, idx) => ({
  name: faker.name.fullName(),
  email: getByIdx[idx]['email'],
  password: 'secret',
  phone: faker.phone.number('92#########'),
  role: getByIdx[idx]['role'],
}));
