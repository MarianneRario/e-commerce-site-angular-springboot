package com.rariom.springbootecommerce.dao;

import com.rariom.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200") // accept calls from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {
}
