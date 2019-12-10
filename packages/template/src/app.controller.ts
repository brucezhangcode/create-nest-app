import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('')
  hi() {
    return 'hi, just go !';
  }
}
