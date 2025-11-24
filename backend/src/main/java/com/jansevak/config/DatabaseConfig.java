package com.jansevak.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        String jdbcUrl = dbUrl;
        String dbUser = username;
        String dbPassword = password;

        // Handle Render's postgres:// URL format
        if (dbUrl.startsWith("postgres://")) {
            URI uri = new URI(dbUrl);
            String host = uri.getHost();
            int port = uri.getPort();
            String path = uri.getPath();
            String userInfo = uri.getUserInfo();

            jdbcUrl = String.format("jdbc:postgresql://%s:%d%s", host, port, path);

            if (userInfo != null) {
                String[] parts = userInfo.split(":");
                dbUser = parts[0];
                if (parts.length > 1) {
                    dbPassword = parts[1];
                }
            }
        }

        return DataSourceBuilder.create()
                .url(jdbcUrl)
                .username(dbUser)
                .password(dbPassword)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
