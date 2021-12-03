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

	Product.create({
		title,
		price,
		imageUrl,
		description,
	})
		.then((result) => {
			console.log('Created a product!')

			res.redirect('/admin/products')
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.postDeleteProduct = (req, res, next) => {
	const { id } = req.params

	Product.findByPk(id)
		.then((product) => {
			return product.destroy()
		})
		.then((result) => {
			console.log('Product was deleted!')

			res.redirect('/admin/products')
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.getEditProduct = (req, res, next) => {
	const { edit: editMode } = req.query
	const { id } = req.params

	if (!editMode) {
		return res.redirect('/')
	}

	Product.findByPk(id)
		.then((product) => {
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
		.catch((err) => {
			console.log(err)
		})
}

exports.postEditProduct = (req, res, next) => {
	const { productId } = req.body

	const { title, price, imageUrl, description } = req.body

	Product.findByPk(productId)
		.then((product) => {
			product.title = title
			product.price = price
			product.imageUrl = imageUrl
			product.description = description

			return product.save()
		})
		.then((res) => {
			console.log('Updated Product')
			res.redirect('/admin/products')
		})
		.catch((err) => {
			console.log(err)
		})
}

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products',
			})
		})
		.catch((err) => {
			console.log(err)
		})
}
