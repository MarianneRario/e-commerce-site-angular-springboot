package com.rariom.springbootecommerce.dao;

import com.rariom.springbootecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


/** OVERRIDE THE DEFAULT (productCategories to productCategory)
 * collectionResourceRel -> provide the name for the collection resource relationship
 * Name of the JSON entry -> productCategory
 * Reference to the path -> /product-category
 */
@CrossOrigin(origins = "http://localhost:4200") // accept calls from web browser scripts for this origin
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
