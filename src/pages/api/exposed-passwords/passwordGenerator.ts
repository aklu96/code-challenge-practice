// use faker library to generate a list of 50 fake exposed passwords
import faker from 'faker';

// store passwords as keys for constant-time lookup
const passwords: Record<string, number> = {
  weakpass: 0
}

for (let i = 1; i < 5; i++) {
  passwords[faker.internet.password()] = i;
}

export default passwords;
