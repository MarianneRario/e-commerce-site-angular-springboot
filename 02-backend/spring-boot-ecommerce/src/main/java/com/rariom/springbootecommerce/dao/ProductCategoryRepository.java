package com.rariom.springbootecommerce.dao;

import com.rariom.springbootecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/** OVERRIDE THE DEFAULT
 * collectionResourceRel -> provide the name for the collection resource relationship
 * Name of the JSON entry -> productCategory
 * Reference to the path -> /product-category
 */
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
