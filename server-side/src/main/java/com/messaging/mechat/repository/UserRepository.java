package com.messaging.mechat.repository;

import com.messaging.mechat.collection.users.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserData, String> {
    UserData findByEmail(String email);
}
