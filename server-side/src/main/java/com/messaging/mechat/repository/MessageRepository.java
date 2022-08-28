package com.messaging.mechat.repository;

import com.messaging.mechat.collection.chats.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
