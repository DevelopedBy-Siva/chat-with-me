package com.messaging.mechat.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GlobalConfigurations {

    @Bean
    public ObjectWriter objectMapper() {
        return new ObjectMapper().writer().withDefaultPrettyPrinter();
    }

}
