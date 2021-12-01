const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'Shop',
			path: '/products',
		})
	})
}

exports.getProduct = (req, res, next) => {
	const { id } = req.params

	Product.findById(id, (product) => {
		res.render('shop/product-detail', {
			pageTitle: product.title,
			product,
			path: '/products',
		})
	})
}

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
		})
	})
}

exports.getCart = (req, res, next) => {
	res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'Your cart',
	})
}

exports.postCard = (req, res, next) => {
	const { id } = req.body

	res.redirect('/cart')
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
