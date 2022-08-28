package com.messaging.mechat.repository;

import com.messaging.mechat.collection.chats.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, String> {
}
