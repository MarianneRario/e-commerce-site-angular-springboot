package com.rariom.springbootecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    // @OneToMany -> one product_category can contain many products
    // "category" -> name of the field from Product.java
    // When using a @OneToMany mapping we can use the mappedBy parameter
    // to indicate that the given column is owned by another entity (Product).
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;

}
