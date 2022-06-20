package com.rariom.springbootecommerce.config;

import com.rariom.springbootecommerce.entity.Product;
import com.rariom.springbootecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

// MAKE THE Product and ProductCategory READ-ONLY

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        /* PRODUCT REPOSITORY */

        // list of unsupported http method actions: POST, PUT, DELETE
        HttpMethod[] unsupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        /* PRODUCT REPOSITORY */

        // disable the http methods for Product: POST, PUT, DELETE
        // this method will disable the HTTP methods for the Product repository for PUT, POST, and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class) // will apply for product repository
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions)) // pass the array of unsupportedActions
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));



        /* PRODUCT CATEGORY REPOSITORY */
        // disable the http methods for ProductCategory: POST, PUT, DELETE
        // this method will disable the HTTP methods for the ProductCategory repository for PUT, POST, and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class) // will apply for product repository
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions)) // pass the array of unsupportedActions
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));



    }
}
