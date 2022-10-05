package com.messaging.mechat;

import com.messaging.mechat.collection.users.UserData;
import com.messaging.mechat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

@SpringBootApplication
@RequiredArgsConstructor
public class MechatApplication {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;


    public static void main(String[] args) {
        SpringApplication.run(MechatApplication.class, args);
    }

    @PostConstruct
    void init() {
        repo.deleteAll();
        UserData data = new UserData();
        data.setEmail("siva@gmail.com");
        data.setPassword(encoder.encode("12345"));
        repo.save(data);
    }

}
