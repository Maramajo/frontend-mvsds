package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FrontendMvsdsApplication {

	public static void main(String[] args) {        
		Runtime.getRuntime().addShutdownHook(new Thread(() -> {
        System.out.println(">> Atualizando arquivos antes de encerrar...");
        // sua rotina aqui
    }));
		
		SpringApplication.run(FrontendMvsdsApplication.class, args);
	}

}
