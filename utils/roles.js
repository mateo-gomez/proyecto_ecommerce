const accessControl = require('accesscontrol')

const ac = new accessControl()

//Roles
//1. Administrador
//2. Cliente
//3. Gerente

//Administrador
//Ver, Crear, Editar, Borrar (* Entidades)

//Cliente
//Ver [productos, Ordenes de venta, transacciones, ordenes de productos, categorias]
//Crear [ordenes de venta, transacciones, ordenes de productos]
//Editar [ordendes de productos]
//Borrar

//Gerente
//Ver [clientes, cupones, status, categorias, sesiones]
//Crear [clientes, cupones, status, categorias, sesiones]
//Editar [clientes, cupones, status, categorias, sesiones]
//Borrar [clientes, cupones, status, categorias, sesiones]

const roles = () => {

    ac.grant('Cliente')
        .readAny('products')
        .readOwn('sales_orders')
        .readOwn('cc_transactions')
        .readOwn('order_products')
        .readAny('categories')
        .createOwn('sales_orders')
        .createOwn('cc_transactions')
        .createOwn('order_products')
        .updateOwn('order_products')
    ac.grant('Gerente').extend('Cliente')
        .readAny('sales_orders')
        .readAny('cc_transactions')
        .readAny('order_products')
        .readAny('coupons')
        .readAny('product_statuses')
        .readAny('product_categories')
        .readAny('sessions')
        .createAny('sales_orders')
        .createAny('cc_transactions')
        .createAny('order_products')
        .createAny('coupons')
        .createAny('product_statuses')
        .createAny('product_categories')
        .createAny('sessions')
        .updateAny('sales_orders')
        .updateAny('cc_transactions')
        .updateAny('order_products')
        .updateAny('coupons')
        .updateAny('product_statuses')
        .updateAny('product_categories')
        .updateAny('sessions')
        .updateAny('products')
        .deleteAny('sales_orders')
        .deleteAny('cc_transactions')
        .deleteAny('order_products')
        .deleteAny('coupons')
        .deleteAny('product_statuses')
        .deleteAny('product_categories')
        .deleteAny('sessions')
        .deleteAny('categories')
        .deleteAny('products')
    ac.grant('Administrador').extend('Gerente')
        .readAny('users')
        .readAny('user_roles')
        .readAny('roles')
        .createAny('users')
        .createAny('user_roles')
        .createAny('roles')
        .createAny('products')
        .updateAny('users')
        .updateAny('user_roles')
        .updateAny('categories')
        .updateAny('roles')
        .deleteAny('users')
        .deleteAny('user_roles')
        .deleteAny('roles')
        

    return ac
    
}

module.exports = roles