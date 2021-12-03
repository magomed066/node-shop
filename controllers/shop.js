const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'Shop',
				path: '/products',
			})
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.getProduct = (req, res, next) => {
	const { id } = req.params

	Product.findByPk(id)
		.then((product) => {
			res.render('shop/product-detail', {
				pageTitle: product.title,
				product,
				path: '/products',
			})
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'Shop',
				path: '/',
			})
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts()
		})
		.then((products) => {
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your cart',
				products,
			})
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.postCart = (req, res, next) => {
	const { id } = req.body

	let fetchedCart
	let newQuantity = 1

	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart
			return cart.getProducts({ where: { id: id } })
		})
		.then((products) => {
			let product
			if (products.length > 0) {
				product = products[0]
			}

			if (product) {
				const oldQuantity = product.cartItem.quantity
				newQuantity = oldQuantity + 1
				return product
			}

			return Product.findByPk(id)
		})
		.then((product) => {
			return fetchedCart.addProduct(product, {
				through: { quantity: newQuantity },
			})
		})
		.then(() => {
			res.redirect('/cart')
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.postCartDeleteProduct = (req, res, next) => {
	const { id } = req.body

	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts({ where: { id: id } })
		})
		.then(([product]) => {
			return product.cartItem.destroy()
		})
		.then((result) => {
			res.redirect('/cart')
		})
		.catch((err) => console.log(err))
	// Product.findById(id, (product) => {
	// 	Cart.deleteProduct(id, product.price)
	// 	res.redirect('/cart')
	// })
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
