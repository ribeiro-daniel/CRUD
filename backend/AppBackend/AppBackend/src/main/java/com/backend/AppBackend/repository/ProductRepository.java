package com.backend.AppBackend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.AppBackend.model.ProductModel;

public interface ProductRepository extends CrudRepository<ProductModel, Integer>{

}
