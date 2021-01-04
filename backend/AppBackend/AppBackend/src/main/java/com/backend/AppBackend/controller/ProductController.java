package com.backend.AppBackend.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.AppBackend.model.ProductModel;
import com.backend.AppBackend.repository.ProductRepository;

@RestController
public class ProductController {
	@Autowired
	private ProductRepository productRepository;
	
	@RequestMapping(value = "/api/products", method = RequestMethod.POST)
	public ProductModel product(@Valid @RequestBody ProductModel product) {
		return productRepository.save(product);
	}
	@RequestMapping(value = "/api/products", method = RequestMethod.GET)
	public Iterable<ProductModel> getProduct() {
		return productRepository.findAll();
	}
	@RequestMapping(value = "/api/products/{id}", method = RequestMethod.GET)
	public Optional<ProductModel> getById(@PathVariable int id) {
		return productRepository.findById(id);
	}
	@RequestMapping(value = "/api/products/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ProductModel> updateProduct(@RequestBody ProductModel newProduct, @PathVariable int id) {
		return productRepository.findById(id)
			.map(product -> {
				product.setName(newProduct.getName());
				product.setPrice(newProduct.getPrice());
				ProductModel updated = productRepository.save(product);
				return ResponseEntity.ok().body(updated);
			})
				.orElse(ResponseEntity.notFound().build());
		
	}
	@RequestMapping(value = "/api/products/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProduct(@PathVariable @RequestBody int id) {
		return productRepository.findById(id).map(p -> {
			productRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}













