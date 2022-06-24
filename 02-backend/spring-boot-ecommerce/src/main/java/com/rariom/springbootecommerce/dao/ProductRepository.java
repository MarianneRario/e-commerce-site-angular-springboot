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



    /** QUERY METHOD FOR SEARCHING PRODUCT
     * select * from Product p where p.name like concat('%' , :name, '%')
     *
     * @param name -> dapat kung ano lang naka declare na fields sa Product entity (since may name dun, yun ung isesearch natin)
     * @param pageable
     * @return list of products
     *
     * SPRING DATA REST will automatically expose the endpoint:
     * localhost:8080/api/products/search/findByNameContaining?name=?
     *
     */
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    // custom search query
//    @Query( "select lower(p.name), lower(pc.category_name) " +
//            "from Product p, ProductCategory pc " +
//            "where lower(pc.category_name) = :name " +
//            "OR lower(p.name) like lower('%', :name, '%') " +
//            "order by " +
//            "p.category_id"
//    )
//    Page<Product> returnProductsSearched(@RequestParam("name") String name, Pageable pageable);
}
