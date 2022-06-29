package com.rariom.springbootecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

// THIS IS THE OWNING SIDE
@Entity // make this class a db entity
@Table(name = "product") // map this class to db table
@Data // automatically generates getters and setters
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // @ManyToOne -> many products can only have one category each
    // @JoinColumn annotation points to the PK of the ProductCategory
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category; // foreign key

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    // hibernate will automatically manage the timestamps
    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;
}
