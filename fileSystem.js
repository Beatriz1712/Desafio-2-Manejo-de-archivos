import {promises as fs } from "fs"
//const fs = require('node:fs')

 
class ProductManager {
  constructor() {

    this.path = "./productos.txt"
    this.products = []
  }
  //propiedad de  la class y luego incrementará
  static id = 0

  //agregando
  addProduct = async (title, description, price, image, code, stock) => {
  if (!title || !description || !price || !image || !code || !stock){
    console.error("INGRESO TODOS LOS DATOS DEL PRODUCTO") 
  }
    ProductManager.id++
    let newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
      id: ProductManager.id
    }
    console.log(newProduct)
    this.products.push(newProduct)

    //crea y escribe
    await fs.writeFile(this.path, JSON.stringify(this.products))
  }
  //leer y transformar
  readProducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8")
    return JSON.parse(respuesta)
  }
  //traer productos
  getProducts = async () => {
    let respuestaGet = await this.readProducts()
    return console.log(respuestaGet);
  }
  //traer por Id
  getProductsById = async (id) => {
    let respuestaGetById = await this.readProducts()
    if (!respuestaGetById.find(product => product.id === id)) {
      console.log("NO SE ENCONTRO ESE PRODUCTO");
    } else {
      console.log(respuestaGetById.find(product => product.id === id));
    }
  }
  //borrar producto por id
  deleteProductsById = async (id) => {
    let respuestaDelete = await this.readProducts()
    let productFilter = respuestaDelete.filter(products => products.id != id)
    await fs.writeFile(this.path, JSON.stringify(productFilter))
    console.log("PRODUCTO ELIMINADO");
  }

  updateProducts = async (productoActualizado) => {
    console.log(productoActualizado);

  }
}


const productos = new ProductManager
//productos.getProducts()
//productos.addProduct("titutlo1","description1", 100, "image1", "code1", 10)
//productos.addProduct("titutlo2","description2", 200, "image2", "code2", 20)
//productos.addProduct("titutlo3","description3", 300, "image3", "code3", 30)
//productos.getProductsById(4)
//productos.deleteProductsById(2)
let productoActualizado = {
  title: 'titutlo3',
  description: 'description3',
  price: 400,
  code: 'code3',
  stock: 30,
  id: 3
}
productos.updateProducts(productoActualizado)