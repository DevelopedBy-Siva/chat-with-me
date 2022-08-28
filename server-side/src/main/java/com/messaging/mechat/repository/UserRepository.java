package com.messaging.mechat.repository;

import com.messaging.mechat.collection.users.UserDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserDetails, String> {
}
