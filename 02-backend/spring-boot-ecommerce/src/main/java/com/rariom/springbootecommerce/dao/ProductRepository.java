package com.rariom.springbootecommerce.dao;

import com.rariom.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:4200") // accept calls from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {

    /** QUERY METHOD
     * select * from product where category_id=?
     * @param id
     * @param pageable
     * @return Products based on category id
     *
     *  SPRING DATA REST will automatically expose the endpoint:
     *  localhost:8080/api/products/search/findByCategoryId?id=2
     */

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

}
