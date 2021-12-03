const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/product-list', {
				prods: rows,
				pageTitle: 'Shop',
				path: '/products',
			})
		})
		.catch((err) => console.log(err))
}

exports.getProduct = (req, res, next) => {
	const { id } = req.params

	Product.findById(id)
		.then(([[product]]) => {
			console.log(product)
			res.render('shop/product-detail', {
				pageTitle: product.title,
				product,
				path: '/products',
			})
		})
		.catch((err) => console.log(err))
}

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/index', {
				prods: rows,
				pageTitle: 'Shop',
				path: '/',
			})
		})
		.catch((err) => console.log(err))
}

exports.getCart = (req, res, next) => {
	Cart.getProducts((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = []

			for (let product of products) {
				const cartProductData = cart.products.find(
					(prod) => prod.id === product.id,
				)

				if (cartProductData) {
					cartProducts.push({ productData: product, qty: cartProductData.qty })
				}
			}

			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your cart',
				products: cartProducts,
			})
		})
	})
}

exports.postCart = (req, res, next) => {
	const { id } = req.body
	Product.findById(id, (product) => {
		Cart.addProduct(id, product.price)
	})
	res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
	const { id } = req.body

	Product.findById(id, (product) => {
		Cart.deleteProduct(id, product.price)
		res.redirect('/cart')
	})
}

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		path: '/orders',
		pageTitle: 'Your orders',
	})
}

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	})
}
