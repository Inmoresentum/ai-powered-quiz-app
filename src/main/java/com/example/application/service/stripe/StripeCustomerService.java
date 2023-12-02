package com.example.application.service.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import org.springframework.stereotype.Service;

@Service
public class StripeCustomerService {

    public static Customer findCustomerByEmail(String email) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();

        CustomerSearchResult result = Customer.search(params);

        return !result.getData().isEmpty() ? result.getData().get(0) : null;
    }

    public static Customer findOrCreateCustomer(String email, String name) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();

        CustomerSearchResult result = Customer.search(params);


        if (result.getData().isEmpty()) {
            CustomerCreateParams customerCreateParams = CustomerCreateParams.builder()
                    .setName(name)
                    .setEmail(email)
                    .build();

            return Customer.create(customerCreateParams);
        } else {
            return result.getData().get(0);
        }

    }
}