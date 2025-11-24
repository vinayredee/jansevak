package com.jansevak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class JanSevakApplication {

	public static void main(String[] args) {
		SpringApplication.run(JanSevakApplication.class, args);
	}

}
