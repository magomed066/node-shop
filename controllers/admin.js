const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	})
}

exports.postAddProduct = (req, res, next) => {
	const { title, imageUrl, price, description } = req.body

	const product = new Product(null, title, imageUrl, description, price)

	product.save()
	res.redirect('/')
}

exports.postDeleteProduct = (req, res, next) => {
	const { id } = req.params

	Product.deleteById(id)

	res.redirect('/admin/products')
}

exports.getEditProduct = (req, res, next) => {
	const { edit: editMode } = req.query
	const { id } = req.params

	if (!editMode) {
		return res.redirect('/')
	}

	Product.findById(id, (product) => {
		if (!product) {
			return res.redirect('/')
		}

		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product,
		})
	})
}

exports.postEditProduct = (req, res, next) => {
	const { productId } = req.body

	const { title, price, imageUrl, description } = req.body

	const updatedProduct = new Product(
		productId,
		title,
		imageUrl,
		description,
		price,
	)

	updatedProduct.save()

	res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
		})
	})
}
