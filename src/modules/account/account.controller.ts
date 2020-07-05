import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { AccountService } from './account.service'
import { CreateAccDTO } from './create-acc.dto'
@Controller()
export class AccountController {
  constructor(private customerService: AccountService) { }
  // add a customer
  @Post('/create')
  async addCustomer(@Res() res, @Body() createCustomerDTO: CreateAccDTO) {
      const customer = await this.customerService.addAcc(createCustomerDTO);
      if(!createCustomerDTO) {
          return 'error'
      }
      console.log(createCustomerDTO)
      return res.status(HttpStatus.OK).json({
          message: "Customer has been created successfully",
          customer
      })
  }

  // Retrieve customers list
  @Get('api/customers')
  async getAllCustomer(@Res() res) {
      const customers = await this.customerService.getAllAcc();
      return res.status(HttpStatus.OK).json(customers);
  }

  // Fetch a particular customer using ID
  @Get('customer/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
      const customer = await this.customerService.getAccByIds(customerID);
      if (!customer) throw new NotFoundException('Customer does not exist!');
      return res.status(HttpStatus.OK).json(customer);
  }

}
