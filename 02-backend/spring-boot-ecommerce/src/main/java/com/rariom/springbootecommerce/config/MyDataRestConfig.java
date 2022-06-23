package com.rariom.springbootecommerce.config;

import com.rariom.springbootecommerce.entity.Product;
import com.rariom.springbootecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

// MAKE THE Product and ProductCategory READ-ONLY

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // autowire JPA entity manager (for exposing entity id's)
    @Autowired
    private EntityManager entityManager;



    // LOCKED THE EDIT FUNCTIONS FOR HTTP METHODS POST, PUT, AND DELETE
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


        /* EXPOSE ENTITY ID IN REST API */
        // call an internal helper method
        exposeIds(config);


    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids

        // - get all the list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities){

            /**
             * entityClasses.add(tempEntityType.getJavaType());
             * will return
             * class com.rariom.springbootecommerce.entity.Product
             * class com.rariom.springbootecommerce.entity.ProductCategory
             */

            entityClasses.add(tempEntityType.getJavaType());

        }

        // - expose the entity ids for the array of entity / domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);

        /**
         * domainTypes are:
         * class com.rariom.springbootecommerce.entity.Product
         * class com.rariom.springbootecommerce.entity.ProductCategory
         */

        config.exposeIdsFor(domainTypes);








    }
}









