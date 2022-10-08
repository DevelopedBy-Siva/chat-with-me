package com.messaging.mechat.repository;

import com.messaging.mechat.collection.users.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserData, String> {
    Optional<UserData> findByEmail(String email);
}
