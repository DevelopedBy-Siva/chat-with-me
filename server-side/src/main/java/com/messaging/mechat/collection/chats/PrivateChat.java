package com.messaging.mechat.collection.chats;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;

@ToString
@Getter
@Setter
@Document(collection = "PrivateChats")
public class PrivateChat {

    @Id
    private String id;
    private String chatId;
    private String sender;
    private String receiver;
    private String message;
    private String createdAt = OffsetDateTime.now().toString();

}
