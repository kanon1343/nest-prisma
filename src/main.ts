import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// const list: string[] = ['a', 'b', 'c'];

// const result: string = list.reduce((acc: string, current: string, index: number) => {
//   if (index === 0) {
//     return `[data-date='${current}']`;
//   } else {
//     return `${acc},[data-date='${current}']`;
//   }
// }, '');

// console.log(result);
// const list = ['a', 'b', 'c'];

// const a = '[data-date=' + list.join('],[data-date=') + ']';
// console.log(a);
