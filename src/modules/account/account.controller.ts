import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { AccountService } from './account.service'
import { CreateAccDTO } from './create-acc.dto'
@Controller('account')
export class AccountController {
  constructor(private accService: AccountService) { }
  // add a account
  @Post('/create')
  async addCustomer(@Res() res, @Body() createCustomerDTO: CreateAccDTO) {
      const customer = await this.accService.addAcc(createCustomerDTO);
      return res.status(HttpStatus.OK).json({
          message: "Account has been created successfully",
          customer
      })
  }

  // Retrieve accounts list
  @Get('accounts')
  async getAllCustomer(@Res() res) {
      const acc = await this.accService.getAllAcc();
      return res.status(HttpStatus.OK).json(acc);
  }

  // Fetch a particular account using ID
  @Get('account/:accountID')
  async getCustomer(@Res() res, @Param('accountID') accountID) {
      const acc = await this.accService.getAccByIds(accountID);
      if (!acc) throw new NotFoundException('Account does not exist!');
      return res.status(HttpStatus.OK).json(acc);
  }
  @Post('/update')
  async updateAccount(@Res() res, @Query('accountID') accountID, @Body()createCustomerDTO: CreateAccDTO){
      const acc = await this.accService.updateAcc(accountID, createCustomerDTO);
      if (!acc) throw new NotFoundException('Account does not exist!');
      return res.status(HttpStatus.OK).json({
          message: 'Account has been successfully updated',
          acc
      });

  }

}
