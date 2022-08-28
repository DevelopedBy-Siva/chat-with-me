package com.messaging.mechat.repository;

import com.messaging.mechat.collection.chats.PrivateChat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PrivateChatRepository extends MongoRepository<PrivateChat, String> {
}
