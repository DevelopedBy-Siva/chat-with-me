package com.messaging.mechat.repository;

import com.messaging.mechat.collection.chats.GroupChat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GroupChatRepository extends MongoRepository<GroupChat, String> {
}
