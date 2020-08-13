import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Query,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccDTO, LoginAccDTO } from './create-acc.dto';
@Controller('account')
export class AccountController {
  constructor(private accService: AccountService) {}
  // add a account
  @Post('/create')
  async addAccount(@Res() res, @Body() createCustomerDTO: CreateAccDTO) {
    const account = await this.accService.addAcc(createCustomerDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Account has been created successfully',
      account,
    });
  }

  // Retrieve accounts list
  @Get('accounts')
  async getAllAccounts(@Res() res) {
    const acc = await this.accService.getAllAcc();
    return res.status(HttpStatus.OK).json(acc);
  }

  // Fetch a particular account using ID
  @Get('account/:accountID')
  async getAccountByID(@Res() res, @Param('accountID') accountID) {
    const acc = await this.accService.getAccByIds(accountID);
    if (!acc) throw new NotFoundException('Account does not exist!');
    return res.status(HttpStatus.OK).json(acc);
  }
  @Post('/update')
  async updateAccount(
    @Res() res,
    @Query('accountID') accountID,
    @Body() createAccDTO: CreateAccDTO,
  ) {
    const account = await this.accService.updateAcc(accountID, createAccDTO);
    if (!account) throw new NotFoundException('Account does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Account has been successfully updated!',
      account,
    });
  }
  @Post('/login')
  async login(@Res() res, @Body() loginAcc: LoginAccDTO) {
    const token = await this.accService.login(loginAcc);
    return res.status(HttpStatus.OK).json({
      message: 'Login success!',
      token,
    });
  }
}
