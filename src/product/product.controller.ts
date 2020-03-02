import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        });
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('Product Not Found');
        res.status(HttpStatus.OK).json(product);
    }

    @Post('/')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const productCreate = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            msg: 'Product Successfully Create',
            productCreate
        });
    }

    @Put('/')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO)
        if (!updateProduct) throw new NotFoundException('Product Not Found');
        return res.status(HttpStatus.OK).json({
            msg: 'Product Successfully Update',
            updateProduct
        });
    }

    @Delete('/')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDelete = await this.productService.deleteProduct(productID);
        if (!productDelete) throw new NotFoundException('Product Not Found');
        return res.status(HttpStatus.OK).json({
            msg: 'Product Successfully Delete',
            productDelete
        });
    }
}
