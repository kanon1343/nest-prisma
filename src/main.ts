import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// const inputArray = [
//   { a: '111', _a: '222' },
//   { b: '333', _b: '444' },
//   { c: '555', _c: '666' },
// ];

// const resultArray = inputArray.map(obj =>
//   Object.entries(obj).reduce((acc, [key, value]) => {
//     if (!key.startsWith('_')) {
//       acc[key] = value;
//     }
//     return acc;
//   }, {})
// );

// console.log(resultArray);
